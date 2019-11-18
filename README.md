# update-pull-request-branch-action

Update a Pull Request from its base branch.

After updating it waits until the branch has been successfully updated,
as the REST api route [doesn't](https://developer.github.com/v3/pulls/#response-3).

## Usage

```yaml
steps:
  - name: Update Pull Request
    uses: juliangruber/update-pull-request-branch-action@v1
    with:
      number: 1
      github-token: ${{ secrets.GITHUB_TOKEN }}
```

## License

MIT
