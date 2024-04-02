# StudioFLACH Webflow Starter Template

A starter template created using @finsweet/developer-starter template

## Included tools

This template contains some preconfigured development tools:

- [Typescript](https://www.typescriptlang.org/): A superset of Javascript that adds an additional layer of Typings, bringing more security and efficiency to the written code.
- [Prettier](https://prettier.io/): Code formatting that assures consistency across all Finsweet's projects.
- [ESLint](https://eslint.org/): Code linting that enforces industries' best practices. It uses [our own custom configuration](https://github.com/finsweet/eslint-config) to maintain consistency across all Finsweet's projects.
- [Playwright](https://playwright.dev/): Fast and reliable end-to-end testing.
- [esbuild](https://esbuild.github.io/): Javascript bundler that compiles, bundles and minifies the original Typescript files.
- [Changesets](https://github.com/changesets/changesets): A way to manage your versioning and changelogs.
- [Finsweet's TypeScript Utils](https://github.com/finsweet/ts-utils): Some utilities to help you in your Webflow development.

## Requirements

This template requires the use of [pnpm](https://pnpm.js.org/en/). You can [install pnpm](https://pnpm.io/installation) with:

```bash
npm i -g pnpm
```

To enable automatic deployments to npm, please read the [Continuous Deployment](#continuous-deployment) section.

## Getting started

Install

```bash
pnpm install
```

Test (Optional)

```bash
pnpm playwright install
```

You can read more about the use of Playwright in the [Testing](#testing) section.

It is also recommended that you install the following extensions in your VSCode editor:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Building

To build the files, you have two defined scripts:

- `pnpm dev`: Builds and creates a local server that serves all files (check [Serving files on development mode](#serving-files-on-development-mode) for more info).
- `pnpm build`: Builds to the production directory (`dist`).

## Integrate with Webflow

```
<script>
const isStaging = window.location.origin.includes('webflow.io');
const script = document.createElement('script');
const styleLink = document.createElement('link');

if (isStaging) {
  script.src = 'http://localhost:3000/index.js';
  styleLink.href = 'http://localhost:3000/style.css';
} else {
  script.src = 'https://cdn.jsdelivr.net/gh/stealves/webflow-test@0.0.0/dist/index.js';
  styleLink.href = 'https://cdn.jsdelivr.net/gh/stealves/webflow-test@0.0.0/dist/style.css';
}

script.dist = true;
styleLink.rel = 'stylesheet';
styleLink.type = 'text/css';

document.head.append(styleLink);
document.head.append(script);
</script>
```
