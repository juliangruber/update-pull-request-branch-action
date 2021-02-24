# update-pull-request-branch-action

Update all pull requests when the base branch receives a push

## Usage

```yaml
steps:
  - name: Update Pull Request
    uses: Tantalon/update-pull-request-branch-action@v1.1.1
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
```

## License

MIT
