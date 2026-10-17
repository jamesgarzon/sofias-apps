#!/usr/bin/env node
// PreToolUse(Bash) guardrail for AI agents: never push to the prod branch or merge a PR (deny);
// force/delete pushes, deploys and pushes whose target can't be told ask James first.
// An accident guard, not a security boundary: the agent runs as the same user. The real gate
// is the merge by James plus the `gate` step in deploy.yml. Test: node check-guard-push.mjs
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

const PROD = /^(main|master)$/
const RANK = { ask: 1, deny: 2 }
const DENY_PUSH = 'Los agentes no hacen push a main/master: haz push de una rama y abre un PR.'
const DENY_MERGE = 'El merge lo hace James desde GitHub.'
const ASK = 'Esto puede publicar o reescribir el remoto: confirma, James.'
// Tokens after which the next word is a command, not an argument (`grep "git push"` is not a push).
const LAUNCHERS = new Set(['-c', 'sudo', 'exec', 'command', 'time', 'nohup', 'env', 'xargs', '(', '{', '!'])
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
const atCommand = (tokens, i) => i === 0 || LAUNCHERS.has(tokens[i - 1]) || /^\w+=/.test(tokens[i - 1])

function classifyPush(args, { movedDir, cwd, target }) {
  let all = false, force = false, del = false
  const positional = []
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (PUSH_OPTS_WITH_VALUE.has(a)) i++
    else if (['--all', '--mirror', '--branches'].includes(a)) all = true
    else if (a === '-f' || a.startsWith('--force')) force = true
    else if (a === '-d' || a === '--delete') del = true
    else if (!a.startsWith('-')) positional.push(a)
  }
  if (all) return 'deny'
  const refspecs = positional.slice(1)
  if (!refspecs.length) {
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
    if (dst === 'HEAD') {
      if (movedDir) return 'ask'
      dst = target(cwd) ?? 'HEAD'
    }
    if (PROD.test(dst)) return 'deny'
    if (force || src === '') decision = 'ask'
  }
  return decision
}

export function classify(command, cwd, target = pushTarget) {
  let worst = null
  const raise = (d) => {
    if (d && (!worst || RANK[d] > RANK[worst])) worst = d
  }
  let movedDir = false
  for (const segment of command.split(/&&|\|\||;|\||\n/)) {
    const tokens = segment.replace(/["'`]/g, ' ').replace(/\$\(/g, ' ( ').replace(/\)/g, ' ').trim().split(/\s+/)
    tokens.forEach((tok, i) => {
      const next = tokens.slice(i + 1)
      if (base(tok) === 'firebase' && next[0] === 'deploy') raise('ask')
      if (['npm', 'pnpm', 'yarn'].includes(tok) && (next[0] === 'deploy' || (next[0] === 'run' && next[1] === 'deploy')))
        raise('ask')
      if (!atCommand(tokens, i)) return
      if (tok === 'cd' || tok === 'pushd') movedDir = true
      if (tok === 'gh') {
        if (next[0] === 'pr' && next[1] === 'merge') raise('deny')
        if (next[0] === 'api' && next.some((t) => /\/merges$|\/pulls\/\d+\/merge$/.test(t))) raise('deny')
        if (next[0] === 'workflow' && next[1] === 'run') raise('ask')
      }
      if (base(tok) === 'git') {
        let j = 0, otherDir = false
        while (j < next.length && next[j].startsWith('-')) {
          if (next[j] === '-C') (otherDir = true), j++
          else if (GIT_OPTS_WITH_VALUE.has(next[j])) j++
          j++
        }
        if (next[j] === 'push') raise(classifyPush(next.slice(j + 1), { movedDir: movedDir || otherDir, cwd, target }))
      }
    })
  }
  if (!worst) return null
  const reason = worst === 'ask' ? ASK : /gh\s+(pr\s+merge|api)/.test(command) ? DENY_MERGE : DENY_PUSH
  return { decision: worst, reason }
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
