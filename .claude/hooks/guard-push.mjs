#!/usr/bin/env node
// PreToolUse(Bash) guardrail for agent sessions: never push to the prod branch or merge a PR (deny);
// force/delete pushes, deploys and pushes whose target can't be told ask first.
// An accident guard, not a security boundary: the agent runs as the same user. The real gate
// is the merge by a person plus the `gate` step in deploy.yml. Test: node check-guard-push.mjs
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const PROD = /^(main|master)$/
const RANK = { ask: 1, deny: 2 }
const DEPLOY = /^(deploy|desplegar)$/ // package scripts that publish (trazo's `desplegar` pushes main itself)
const DEPLOY_SH = /(^|\/)(deploy|desplegar)\.sh$/
const DENY_PUSH = 'Los agentes no hacen push a main/master: haz push de una rama y abre un PR.'
const DENY_MERGE = 'El merge lo hace una persona del equipo desde GitHub.'
const ASK = 'Esto puede publicar o reescribir el remoto: confírmalo.'
// Words after which the next word is still a command (`grep "git push"` is not a push).
const LAUNCHERS = new Set(['sudo', 'exec', 'command', 'time', 'nohup', 'env', 'xargs', 'timeout', 'nice', 'npx',
  'bunx', 'if', 'then', 'else', 'elif', 'while', 'until', 'do', '{', '!'])
const LAUNCHER_OPTS_WITH_VALUE = {
  env: ['-u', '-C', '-S'],
  sudo: ['-u', '-g', '-C', '-D', '-h', '-p', '-r', '-t', '-U', '--user', '--group'],
  nice: ['-n'],
  timeout: ['-s', '-k', '--signal', '--kill-after'],
  xargs: ['-n', '-I', '-L', '-P', '-d', '-s', '-a', '-E'],
  npx: ['-p', '--package'],
  bunx: ['-p', '--package'],
}
// Whether launcher option `opt` takes the next word as its value: `-u x`, also clustered `-nu x`
// (the first letter that takes a value is last), but not `-ux`, whose value is attached.
function takesValue(launcher, opt) {
  const opts = LAUNCHER_OPTS_WITH_VALUE[launcher] ?? []
  if (opts.includes(opt)) return true
  if (!/^-[a-zA-Z]{2,}$/.test(opt)) return false
  return [...opt.slice(1)].findIndex((ch) => opts.includes('-' + ch)) === opt.length - 2
}
const SHELLS = new Set(['bash', 'sh', 'zsh', 'dash', 'source', '.'])
const GIT_OPTS_WITH_VALUE = new Set(['-c', '--git-dir', '--work-tree', '--namespace', '--exec-path'])
const PUSH_OPTS_WITH_VALUE = new Set(['-o', '--push-option', '--repo', '--receive-pack', '--exec'])

// Branch that a bare `git push` in cwd would update, or null when git can't tell (detached HEAD).
function pushTarget(cwd) {
  const git = (...args) =>
    execFileSync('git', ['-C', cwd, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  try {
    return git('rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{push}').replace(/^[^/]+\//, '')
  } catch {}
  try {
    return git('symbolic-ref', '--short', 'HEAD')
  } catch {}
  return null
}

const base = (t) => t.slice(t.lastIndexOf('/') + 1)
// Name of a command word: `supabase@latest` is supabase, `firebase-tools` is firebase.
const nameOf = (t) => base(t).replace(/@.*/, '').replace(/^firebase-tools$/, 'firebase')
// Args after leading global flags (`-R x`, `--workdir x`, `--repo=x`, `--debug`). A flag takes the
// next word as its value unless that word is another flag or one of the subcommands in `subs`.
function afterFlags(args, subs) {
  let i = 0
  while (args[i]?.startsWith('-'))
    i += args[i].includes('=') || args[i + 1]?.startsWith('-') || subs.includes(args[i + 1]) ? 1 : 2
  return args.slice(i)
}

// Heredoc bodies are data, not commands: keep the `<<TAG` line and take the lines after it, through
// TAG, out of the text. A body fed to a shell (`bash <<EOF`, `cat <<EOF | sh`) stays as commands.
// An unquoted tag's body is returned in `bodies`, because bash still runs its `$(…)` and backticks.
// Inside `$(…)` bash also ends the body at a `TAG)` line and runs what follows the `)`.
// A heredoc that never closes means we misread the text, so its lines go back as commands.
// ponytail: a `<<TAG` inside a quoted string or a trailing comment still counts when a TAG line
// follows it (needs the lexer to find tags).
function splitHeredocs(command) {
  const out = [], open = [], bodies = []
  let keep = false
  for (let line of command.split('\n')) {
    if (open.length) {
      const end = line.replace(/^\t+/, '').match(new RegExp(`^${open[0].tag}(\\).*)?$`)) // tags are [\w-]+
      if (!end) {
        (keep ? out : open[0].body).push(line)
        continue
      }
      open.shift()
      if (!end[1]) continue
      line = end[1]
    }
    out.push(line)
    if (/^\s*#/.test(line)) continue // a comment line opens no heredoc
    // `<<'TAG'`, `<<"TAG"` and `<<\TAG` are quoted: bash runs nothing in the body
    for (const m of line.replace(/\$\(\(.*?\)\)/g, '').matchAll(/(?<!<)<<-?\s*(\\|(['"]?))([A-Za-z_][\w-]*)\2/g)) {
      open.push({ tag: m[3], body: [] })
      if (!m[1]) bodies.push(open.at(-1).body)
    }
    // A word of its own, not text in quotes or a comment: `sudo bash`, `| sh`, `ssh host bash`.
    keep = commands(line).some((words) => words.some((w) => /^(bash|sh|zsh|dash)$/.test(base(w))))
  }
  if (open.length) out.push(...open[0].body) // every line after the unclosed tag, in order
  return { text: out.join('\n'), bodies: bodies.map((b) => b.join('\n')) }
}

const BODY = 'heredoc' // lexer state for an unquoted heredoc body: like "…", but `"` is plain text
const ANSI = "$'" // lexer state for $'…': like '…', but `\` escapes the next character

// Splits into simple commands, each a list of words. Quotes keep a word together and are removed;
// ; & | newline ( ) end a command (`2>&1` stays one word), `#` at the start of a word comments out
// the rest of the line, and backslash-newline is dropped. A `$(…)` or backtick, quoted or not, is a
// command of its own; the word around it continues with `$()` in its place (`-C "$(pwd)"` → `-C $()`).
function commands(command, quote = null) {
  const cmds = []
  const stack = [] // open `$(`, backtick and `(`, with the state to restore at the closer
  let cur, word = null
  const end = () => {
    if (word !== null) cur.push(word)
    word = null
  }
  const next = () => (end(), cmds.push((cur = [])))
  next()
  for (let i = 0; i < command.length; i++) {
    const c = command[i]
    if (quote === "'" || quote === ANSI) {
      if (c === "'") quote = null
      else word += quote === ANSI && c === '\\' ? command[++i] ?? '' : c
    } else if (c === '\\') {
      const esc = command[++i] ?? ''
      if (esc !== '\n' && quote !== BODY) word = (word ?? '') + esc
    } else if (!quote && c === stack.at(-1)?.closer) {
      const open = stack.pop()
      next()
      if (open.group) continue
      quote = open.quote
      cur = open.cur
      word = (open.word ?? '') + '$()'
    } else if (c === '`' || (c === '$' && command[i + 1] === '(')) {
      stack.push({ closer: c === '`' ? '`' : ')', quote, cur, word })
      if (c === '$') i++
      word = null
      quote = null
      cmds.push((cur = []))
    } else if (quote) {
      if (c === '"' && quote === '"') quote = null
      else if (quote === '"') word += c // a body's text is data: only its substitutions matter
    } else if (c === '$' && command[i + 1] === "'") (quote = ANSI), (word ??= ''), i++
    else if (c === '"' || c === "'") (quote = c), (word ??= '')
    else if (c === '#' && word === null) {
      while (i + 1 < command.length && command[i + 1] !== '\n') i++
    } else if (c === ' ' || c === '\t') end()
    else if (c === '(') stack.push({ closer: ')', group: true }), next()
    else if (';&|\n)'.includes(c) && !(c === '&' && /[<>]/.test(command[i - 1] + command[i + 1]))) next()
    else word = (word ?? '') + c
  }
  end()
  return cmds.filter((w) => w.length)
}

// Index of the command word, past VAR=x assignments and wrappers like env, timeout or then.
function commandStart(words) {
  let i = 0
  while (i < words.length) {
    const w = base(words[i])
    if (/^\w+=/.test(words[i])) i++
    else if (LAUNCHERS.has(w)) {
      i++
      while (words[i]?.startsWith('-')) i += takesValue(w, words[i]) ? 2 : 1
      if (w === 'timeout') i++ // the duration
    } else break
  }
  return i
}

function classifyPush(args, { movedDir, cwd, target }) {
  let all = false, force = false, del = false, tags = false
  const positional = []
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    const short = /^-[a-zA-Z]+$/.test(a) ? a : '' // -fu, -df: clusters of short flags
    if (PUSH_OPTS_WITH_VALUE.has(a)) i++
    else if (['--all', '--mirror', '--branches'].includes(a)) all = true
    else if (a === '--tags') tags = true
    else if (short.includes('f') || a.startsWith('--force')) force = true
    if (short.includes('d') || a === '--delete') del = true
    if (!a.startsWith('-')) positional.push(a)
  }
  if (all) return 'deny'
  const refspecs = positional.slice(1)
  if (!refspecs.length) {
    if (tags) return force || del ? 'ask' : null // `--tags` alone moves only tags
    if (movedDir) return 'ask'
    const branch = target(cwd)
    if (branch === null) return 'ask'
    if (PROD.test(branch)) return 'deny'
    return force || del ? 'ask' : null
  }
  let decision = force || del ? 'ask' : null
  for (let spec of refspecs) {
    if (spec.startsWith('+')) {
      force = true
      spec = spec.slice(1)
    }
    const colon = spec.lastIndexOf(':')
    const src = colon === -1 ? spec : spec.slice(0, colon)
    let dst = (colon === -1 ? spec : spec.slice(colon + 1)).replace(/^refs\/heads\//, '')
    // ponytail: a destination that is only a `$(…)` or `$VAR` counts as the current branch (it's
    // nearly always `$(git branch --show-current)`), so a contrived `"$(echo main)"` on a feature
    // branch passes. A name with a variable in it (`v$VERSION`, `fix/$X`) is taken as written.
    if (dst === 'HEAD' || dst === '@' || (/^\$(\(\)|\w+|\{[^}]*\})$/.test(dst) && !del)) {
      if (movedDir) return 'ask'
      dst = target(cwd) ?? 'HEAD'
    }
    // ponytail: any wildcard counts as main (`*`, `feat/*`, `refs/*`) unless it stays in tags or notes
    if (PROD.test(dst) || (dst.includes('*') && !/^refs\/(tags|notes)\//.test(dst))) return 'deny'
    if (force || src === '') decision = 'ask'
  }
  return decision
}

// Whether `gh api <args>` changes something: an explicit non-GET method, or fields (gh then POSTs).
function ghWrites(args) {
  const m = args.findIndex((t) => t === '-X' || t === '--method')
  const method = m !== -1 ? args[m + 1] : args.find((t) => /^(-X|--method=)/.test(t))?.replace(/^(-X|--method=)/, '')
  if (method) return !/^get$/i.test(method)
  return args.some((t) => /^(-[fF]|--field|--raw-field|--input)/.test(t))
}

export function classify(command, cwd, target = pushTarget) {
  let worst = null
  const raise = (decision, reason) => {
    if (decision && (!worst || RANK[decision] > RANK[worst.decision]))
      worst = { decision, reason: reason ?? (decision === 'ask' ? ASK : DENY_PUSH) }
  }
  // movedDir: an earlier cd or checkout means target() no longer says what HEAD is; head: the
  // prod branch an earlier checkout switched to, which a bare or HEAD push then updates.
  const state = { movedDir: false, head: null }
  const check = (words) => {
    words = words.slice(commandStart(words))
    if (!words.length) return
    const [cmd, ...next] = words
    const name = nameOf(cmd)
    if (name === 'cd' || name === 'pushd') Object.assign(state, { movedDir: true, head: null })
    if (name === 'eval') walk(next.join(' '))
    if (SHELLS.has(name)) {
      const c = next.findIndex((t) => /^-[a-zA-Z]*c[a-zA-Z]*$/.test(t))
      if (c !== -1) walk(next[c + 1] ?? '')
      else if (!next.includes('-n') && next.some((t) => DEPLOY_SH.test(t))) raise('ask') // -n: syntax check only
    }
    if (DEPLOY_SH.test(cmd)) raise('ask')
    if (name === 'firebase' && afterFlags(next, ['deploy'])[0] === 'deploy') raise('ask')
    if (name === 'supabase') {
      const subs = ['db', 'migration', 'functions', 'secrets', 'config', 'seed', 'gen', 'inspect']
      const sub = afterFlags(next, subs).filter((t) => !t.startsWith('-')).slice(0, 2).join(' ') // `db --debug push`
      // These always write to the hosted project; --linked / --db-url point the others at it too.
      const hosted = /^(db push|functions deploy|secrets (set|unset)|config push|migration repair)$/
      const linked = next.some((t) => /^--(linked|db-url)(=|$)/.test(t))
      const writes = hosted.test(sub) || (linked && /^(db reset|migration (up|squash)|seed)\b/.test(sub))
      if (writes && !next.includes('--dry-run')) raise('ask')
    }
    if (['npm', 'pnpm', 'yarn'].includes(name)) {
      const runs = ['run', 'run-script']
      const a = afterFlags(next, [...runs, 'exec', 'dlx', 'x', 'deploy', 'desplegar']) // past --filter x, -C x
      const script = runs.includes(a[0]) ? afterFlags(a.slice(1), ['deploy', 'desplegar'])[0] : a[0] // `run -r deploy`
      if (DEPLOY.test(script)) raise('ask')
      else if (['exec', 'dlx', 'x'].includes(a[0])) check(a.slice(a[1] === '--' ? 2 : 1)) // `pnpm exec supabase …`
      else check(a)
    }
    if (name === 'gh') {
      const [sub, ...args] = afterFlags(next, ['pr', 'workflow', 'api'])
      if (sub === 'pr' && afterFlags(args, ['merge'])[0] === 'merge') raise('deny', DENY_MERGE)
      if (sub === 'pr' && args[0] === 'checkout') Object.assign(state, { movedDir: true, head: null })
      if (sub === 'workflow' && afterFlags(args, ['run'])[0] === 'run') raise('ask')
      if (sub === 'api') {
        const paths = args.map((t) => t.replace(/\?.*/, ''))
        const hits = (re) => paths.some((t) => re.test(t))
        const writes = ghWrites(args)
        if (writes && hits(/\/merges$|\/pulls\/\d+\/merge\/?$/)) raise('deny', DENY_MERGE)
        if (args.includes('graphql')) {
          let query = args.filter((t) => /^(-[fF]|--(raw-)?field=)?query=/.test(t)).join('\n')
          if (/query=(@|\$(\w+|\{[^}]*\})$)/m.test(query)) raise('ask') // read from a file or a variable: can't tell
          if (/query=\$\(\)$/m.test(query)) { // the whole query is a substitution: only `$(cat <<TAG …)` can be read
            const doc = command.match(/query="?\$\(\s*cat\s+<<-?\s*\\?(['"]?)([\w-]+)\1[^\n]*\n([\s\S]*?)\n\t*\2(\)|\n|$)/)
            if (doc) query = doc[3]
            else raise('ask')
          }
          if (/mergePullRequest|enablePullRequestAutoMerge|mergeBranch/.test(query)) raise('deny', DENY_MERGE)
          if (/updateRefs?\b|createCommitOnBranch|deleteRef/.test(query)) raise('deny')
        }
        if (writes && hits(/\/git\/refs\/heads\/(main|master)$/)) raise('deny')
        // A file commit or a fork sync goes to `branch`, the default branch when it is left out.
        if (writes && hits(/\/contents\/|\/merge-upstream\/?$/)) {
          const branch = args.map((t) => t.match(/^(-[fF]|--(raw-)?field=)?branch=(.*)$/)?.[3]).find((b) => b != null)
          raise(branch == null || PROD.test(branch) ? 'deny' : 'ask')
        }
      }
    }
    if (name === 'git') {
      let j = 0, otherDir = false
      while (j < next.length && next[j].startsWith('-')) {
        if (/^(-C|--git-dir|--work-tree)(=|$)/.test(next[j])) otherDir = true
        if (next[j] === '-C' || GIT_OPTS_WITH_VALUE.has(next[j])) j++
        j++
      }
      const rest = next.slice(j + 1)
      if (['checkout', 'switch'].includes(next[j]) && !rest.includes('--')) { // `-- file` leaves HEAD alone
        const branch = rest.find((t) => !t.startsWith('-')) // `-b NAME start`: NAME
        Object.assign(state, { movedDir: true, head: !otherDir && PROD.test(branch ?? '') ? branch : null })
      }
      if (next[j] === 'push') {
        const checkedOutProd = state.head && !otherDir // overrides target(): HEAD is that branch now
        raise(classifyPush(rest, checkedOutProd
          ? { movedDir: false, cwd, target: () => state.head }
          : { movedDir: state.movedDir || otherDir, cwd, target }))
      }
    }
  }
  const walk = (command) => {
    const { text, bodies } = splitHeredocs(command)
    commands(text).forEach(check)
    for (const body of bodies) commands(body, BODY).forEach(check)
  }
  walk(command)
  return worst
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let input = ''
  for await (const chunk of process.stdin) input += chunk
  let event
  try {
    event = JSON.parse(input)
  } catch {
    process.exit(0) // never block on our own parse error
  }
  const result = classify(event.tool_input?.command ?? '', event.cwd ?? process.cwd())
  if (result)
    console.log(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: result.decision,
        permissionDecisionReason: result.reason,
      },
    }))
}
