# LinkZip GitHub Action

This GitHub Action simplifies the deployment process of static content packaged within a zip archive to [LinkZip](https://linkzip.dev) services.
It streamlines the workflow by automating the steps involved in uploading and deploying the content, ensuring efficiency and accuracy in the deployment process.
With this Action, developers can seamlessly integrate their static content deployment into their GitHub workflows, saving time and effort while ensuring a smooth deployment experience to [LinkZip](https://linkzip.dev) service.

## Inputs

### `api-token`

**Required** LinkZip API token for authentication.

### `deploy-message`

Deployment message (optional).

## Outputs

### `deploy-url`

Deployment URL.

## Example usage

```yaml
uses: linkzip-dev/github-action@v1
with:
  api-token: ${{ secrets.LINKZIP_API_TOKEN }}
  deploy-message: "${{ github.event.head_commit.message }}"
```

Before using this action, make sure you have configured LinkZip API token in your GitHub repository secrets.

For additional customization options and advanced usage, please consult the GitHub Actions documentation.
