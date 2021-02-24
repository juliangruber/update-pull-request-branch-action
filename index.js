'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const sleep = dt => new Promise(resolve => setTimeout(resolve, dt))

const main = async () => {
  const token = core.getInput('github-token')
  const numberInput = core.getInput('number')
  const wait = core.getInput('wait') === 'true'

  const octokit = new GitHub(token)

  let numbers
  if (numberInput != null) {
    numbers = [numberInput]
  } else {
    const listRes = await octokit.pulls.list({
      ...context.repo,
      state: 'open'
    })
    numbers = listRes.data.map(pull => pull.number)
  }

  for (const number of numbers) {
    const res = await octokit.pulls.get({
      ...context.repo,
      pull_number: number
    })
    const oldSha = res.data.head.sha
    const rebaseable = res.data.rebaseable

    if (rebaseable) {
      await octokit.pulls.updateBranch({
        ...context.repo,
        pull_number: number,
        expected_head_sha: oldSha
      })

      if (wait) {
        while (true) {
          const res = await octokit.pulls.get({
            ...context.repo,
            pull_number: number
          })
          if (res.data.head.sha !== oldSha) return

          core.debug('sleep')
          await sleep(1000)
        }
      }
    }
  }
}

main().catch(err => core.setFailed(err.message))
