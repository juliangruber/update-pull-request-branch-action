'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const sleep = dt => new Promise(resolve => setTimeout(resolve, dt))

const main = async () => {
  const token = core.getInput('github-token')
  const number = core.getInput('number')

  const octokit = new GitHub(token)

  const res = await octokit.pulls.get({
    ...context.repo,
    pull_number: number
  })
  const oldSha = res.data.head.sha

  await octokit.pulls.updateBranch({
    ...context.repo,
    pull_number: number
  })

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

main().catch(err => core.setFailed(err.message))
