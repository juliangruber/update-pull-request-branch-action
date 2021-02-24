'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const main = async () => {
  const token = core.getInput('github_token')

  const octokit = new GitHub(token)

  const listRes = await octokit.pulls.list({
    ...context.repo,
    state: 'open'
  })
  const numbers = listRes.data.map(pull => pull.number)

  for (const number of numbers) {
    const res = await octokit.pulls.get({
      ...context.repo,
      pull_number: number
    })
    const oldSha = res.data.head.sha

    if (res.data.mergeable && res.data.mergeable_state === 'behind') {
      console.log(`Updating pull request ${number}`)

      await octokit.pulls.updateBranch({
        ...context.repo,
        pull_number: number,
        expected_head_sha: oldSha
      })
    }
  }
}

main().catch(err => core.setFailed(err.message))
