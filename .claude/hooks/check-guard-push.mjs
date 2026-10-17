// Run: node check-guard-push.mjs → prints "ok" or one "FAIL: …" line per broken case.
import { classify } from './guard-push.mjs'

const cwd = '/repo'
const target = (t) => () => t
const cases = [
  // [command, expected decision, @{push} target of cwd]
  ['git push origin main', 'deny'],
  ['git push origin HEAD:main', 'deny'],
  ['git push origin +feat:refs/heads/master', 'deny'],
  ['git push --all', 'deny'],
  ['git push --mirror backup', 'deny'],
  ['git push', 'deny', 'main'],
  ['git push -u origin', 'deny', 'master'],
  ['gh pr merge 3 --squash', 'deny'],
  ['gh api -X PUT repos/a/b/pulls/3/merge', 'deny'],
  ['gh api repos/a/b/merges -f base=main -f head=x', 'deny'],
  ['echo ok && git push origin main', 'deny'],
  ['git push origin --delete main', 'deny'],
  ['bash -c "git push origin main"', 'deny'],
  ['git push origin HEAD', 'deny', 'main'],
  ['FOO=1 git push origin main', 'deny'],
  ['git -c core.x=y push origin master', 'deny'],
  ['ls $(git push origin main)', 'deny'],
  ['cd ../x && git push', 'ask'],
  ['git -C ../x push', 'ask'],
  ['git push --force-with-lease origin feat', 'ask'],
  ['git push -f', 'ask', 'feat'],
  ['git push origin --delete feat', 'ask'],
  ['git push origin :feat', 'ask'],
  ['git push', 'ask', null],
  ['firebase deploy --only hosting', 'ask'],
  ['./app/node_modules/.bin/firebase deploy --project philos-8', 'ask'],
  ['npx firebase deploy', 'ask'],
  ['pnpm run deploy', 'ask'],
  ['npm run deploy', 'ask'],
  ['pnpm desplegar', 'ask'],
  ['pnpm run desplegar', 'ask'],
  ['bash scripts/desplegar.sh', 'ask'],
  ['./scripts/deploy.sh --prod', 'ask'],
  ['gh workflow run deploy.yml -R owner/repo', 'ask'],
  ['git push origin feat/x', null],
  ['git push -u origin claude/abc', null],
  ['git push origin maintenance', null],
  ['git push origin mainline:mainline', null],
  ['git push', null, 'feat'],
  ['git -C ../x push origin feat', null],
  ['git fetch origin +refs/pull/7/merge:refs/pr-verifier/7', null],
  ["gh api -X POST repos/a/b/statuses/abc -f context=local-checks -f state=success -f description='tree=1 · ok'", null],
  ['gh pr comment 3 --body "listo para merge"', null],
  ['gh pr view 3 --json mergeable,mergeCommit', null],
  ['gh pr create --fill', null],
  ['git commit -m "push to main later"', null],
  ['grep -rn "git push" .', null],
  ['pnpm run deploy:check', null],
]

let fails = 0
for (const [cmd, want, t = 'feat'] of cases) {
  const got = classify(cmd, cwd, target(t))?.decision ?? null
  if (got !== want) {
    fails++
    console.log(`FAIL: ${cmd} → ${got}, want ${want}`)
  }
}
if (!fails) console.log('ok')
process.exitCode = fails
