# Contributor's Guide

Thank you for taking the time to contribute!

Any contributions to this project are always welcome and encouraged, regardless of programming expertise. If you're not sure where to start or how to contribute, you can refer to [these articles](https://contributing.md/) which may give you some useful pointers and insights.

Before you jump the gun, we ask that you first and foremost check the following feeds to see if your issue has already been addressed. That way, you'll have a greater possibility of finding a solution to your issue if it is already resolved or any further developments/context related to your issue from other maintainers or collaborators.

- [**Issues**](https://github.com/officialMECH/bs-analysis/issues): bug reports, feature requests
- [**Discussions**](https://github.com/officialMECH/bs-analysis/discussions): feedback, support, etc.

When creating a new issue or pull request, please use the corresponding templates to better organize the context surrounding your issue, in an effort to make it as easy as possible for maintainers to monitor or respond to.

## For Developers

This project is bootstrapped with a modified [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [Typescript](https://www.typescriptlang.org/) template.

### Prerequisites

- [Node.js](https://nodejs.dev/en/learn/) (LTS is recommended)

### Project Setup

1. [Install Node.js](https://nodejs.dev/en/learn/how-to-install-nodejs/) in your workspace if you haven't already.
2. Open a new terminal and run `yarn install` and `yarn prepare`. This will install all necessary dependencies and run supplementary code generation processes.
3. Make your changes! You can run `yarn dev` at anytime to start a local development server or `yarn build` and `yarn preview` to build a local production server and preview your changes.
4. Before you commit your changes, make sure to run `yarn test` at least once to ensure all unit tests are passing, and check for any underlying errors or vulnerabilities that could make your code unsafe to run in production.
5. Once you're ready, you can submit a new pull request and await feedback.

### Other Specifications

- [PandaCSS](https://panda-css.com/) is used as the primary styling engine. After running `yarn prepare` or making changes to the `panda.config.ts` file at runtime, the engine will autogenerate the contents of `src/styles` for use throughout the project.
- Similarly, routing is provided by [Generouted](https://github.com/oedotme/generouted), and will autogenerate the contents of the `src/router.ts` file at runtime.
- ESLint and Prettier will automatically reformat your code when staging new commits to enforce a consistent coding style. If this does not work for some reason, you can run `yarn lint --fix` and `yarn format --write` respectively to manually run the linter/formatter on your code.
