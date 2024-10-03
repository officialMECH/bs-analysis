# Contributor's Guide

Thank you for taking the time to contribute!

Any contributions to this project are welcome and encouraged, regardless of programming expertise. If you're not sure where to start or how to contribute, you can refer to [these articles](https://contributing.md/) which may give you some useful pointers and insights.

Before you jump the gun, we ask that you first and foremost check the following feeds to see if your issue has already been addressed. That way, you'll have a greater possibility of finding a solution to your issue if it is already resolved or any further developments/context related to your issue from other maintainers or collaborators.

- [**Issues**](https://github.com/officialMECH/bs-analysis/issues): bug reports, feature requests
- [**Discussions**](https://github.com/officialMECH/bs-analysis/discussions): feedback, support, etc.

When creating a new issue or pull request, please use the corresponding templates to better organize the context surrounding your issue, in an effort to make it as easy as possible for maintainers to monitor or respond to.

## For Developers

This project is bootstrapped with a modified [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [Typescript](https://www.typescriptlang.org/) template.

### Prerequisites

- [Node.js](https://nodejs.dev/en/learn/) (LTS is recommended)
- [Visual Studio Code](https://code.visualstudio.com/docs/sourcecontrol/overview#_branches-and-tags)

### Project Setup

1. Install [Node.js](https://nodejs.dev/en/learn/how-to-install-nodejs/) and [Visual Studio Code](https://code.visualstudio.com/Download) if you haven't already.
2. [Create a new fork](https://guides.github.com/activities/forking/) of the repository and [clone it](https://code.visualstudio.com/docs/sourcecontrol/overview#_cloning-a-repository) to your local machine.
3. [Create a new dedicated branch](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository#creating-a-branch) and sync it to your workspace.
4. If you're using Visual Studio Code, install the recommended workspace extensions (VSC should prompt you to do so). This will enable useful workspace integrations that are compatible with the codebase.
5. Open a new terminal in your cloned directory and run `yarn install`. This will install all necessary dependencies and run any supplementary code generation processes.
6. Make your changes! You can run `yarn dev` to start a local development environment or `yarn build` + `yarn preview` for a production environment.
    - If you're running a local development environment, run `yarn prepare` once beforehand to run all necessary codegen workflows for the server.
7. Once the server is running, you can open the `localhost` link that appears in console to preview your changes on your local machine.

#### Git Hooks

Pre-commit hooks are configured via [lefthook](https://github.com/evilmartians/lefthook) to run workflows before making commits to the repository.

**These hooks are not enabled by default**, but you can run `yarn lefthook install` to enable them for your workspace.

### Submitting a Pull Request

If you think you're ready to make a pull request, be sure to run through the following checklist to ensure your code is production-ready:

- [ ] If you did not activate the available git hooks for your workspace, you can run the following command to manually run the linter/formatter on select files: `yarn check --write {files}`.
- [ ] Always run `yarn test` at least once to ensure all unit tests are passing.
- [ ] Make a production build for your application (`yarn build && yarn preview`) and ensure no critical errors are present or noticeable.

## Technologies

- [Biome](https://biomejs.dev/) is used for all linting and formatting concerns. The configured git hooks should run the linting and formatting workflows automatically on pre-commit, but you can also run `yarn biome -h` to run any additional commands as needed.
- [PandaCSS](https://panda-css.com/) is used as the primary styling engine. After running `yarn prepare` or making changes to the `panda.config.ts` file at runtime, the engine will autogenerate the contents of `./styled-system` for use throughout the project.
- Similarly, routing is provided by [Generouted](https://github.com/oedotme/generouted) and will autogenerate the contents of the `src/router.ts` file at runtime.
