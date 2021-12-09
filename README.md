# Command Palette

A webcomponent providing a nice and user-friendly command palette that you can use on your
website. It supports weighted ranking using a custom made algorithm so the most used commands
are always on top.

This webcomponent is heavily used in [Open Kubernetes Platform](https://github.com/open-kubernetes-platform/okp) and follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i wc-palette
```

## Usage

```html
<script type="module">
  import 'wc-palette/wc-palette.js';
</script>

<wc-palette></wc-palette>
```

## Styling

You can easily style the command palette using CSS properties and CSS parts:

```html
<style>
  wc-palette {
    --background-color: "#7893247",
    --color: 
  }
</style>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
