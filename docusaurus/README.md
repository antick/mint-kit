# Mint-Doc

Mint doc is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
pnpm install
```

### Local Development

`pnpm start` Starts the development server.

`pnpm build` Bundles your website into static files for production.

`pnpm serve` Serves the built website locally.

`pnpm deploy` Publishes the website to GitHub pages.

### Deployment

Using SSH:

```
USE_SSH=true pnpm deploy
```

Not using SSH:

```
GIT_USER=<Your GitHub Username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
