# LinkZip GitHub Action

This GitHub Action simplifies the deployment process of static content packaged within a zip archive to LinkZip services.

## Inputs

### `api-token`

**Required** LinkZip API token for authentication.

### `deploy-message`

Deployment message (optional).

## Outputs

### `deploy-url`

Deployment URL.

### `deploy-error`

Deployment error message, if any.

## Example usage

```yaml
uses: linkzip-dev/github-action@v1
with:
  api-token: ${{ secrets.LINKZIP_API_TOKEN }}
  deploy-message: "${{ github.event.head_commit.message }}"
```

Before using this action, make sure you have configured LinkZip API token in your GitHub repository secrets.

For additional customization options and advanced usage, please consult the GitHub Actions documentation.
