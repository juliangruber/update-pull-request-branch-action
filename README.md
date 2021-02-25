# update-pull-request-branch-action

Update a Pull Request from its base branch.

Optionally waits until the branch has been successfully updated,
as the REST api route [doesn't](https://developer.github.com/v3/pulls/#response-3).

## Usage

To update a single pull request and wait until it's complete:
```yaml
steps:
  - name: Update Pull Request
    uses: juliangruber/update-pull-request-branch-action@v1
    with:
      number: 1
      github_token: ${{ secrets.GITHUB_TOKEN }}
```

To update all pull requests without waiting:
```yaml
steps:
  - name: Update All Pull Requests
    uses: juliangruber/update-pull-request-branch-action@v1
    with:
      waitForPullRequestUpdated: false
      github_token: ${{ secrets.GITHUB_TOKEN }}
```

## License

MIT
