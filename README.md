# Introduction

This is a structure for typescript+express+swagger server-side structure with jest+babel+eslint. By default, we use mongoose to get access to mongodb. In addition, we add obfuscator to make you dist code safe.

We offer two generators for swagger json and openapi(postman) json. They support convert models(mongoose's schemas) to swagger format and support convert swagger.json to openapi.json(can be used in insomnia, postmam, etc).

# Get Started

## Preparation

Please make sure that your computer has installed and serve MongoDB cause this setup is based on MongoDB and node.js.

After you cloned this repository into your own computer, you'd better create a `.env` file in project root directory. This file will be loaded and set all parameters as environment. We offer a sample file in `<projectRoot>/.env-example`.

Configuration for MongoDB is in `.env` file like below and please fill these parameters with your own values.

```shell
APP_MONGO_PORT=27017
APP_MONGO_HOST=localhost
APP_MONGO_NAME=account
APP_MONGO_AUTH=admin
APP_MONGO_USER=admin
APP_MONGO_PASS=linxiaozhou
```

## Run Server

To run server, you can follow these two steps:

```shell
# install packages
yarn install

# start develop mode
yarn start
```

## Scripts for developers

We support some scripts for you:

```shell
# for development
yarn start

# compile ESnext to ES5
yarn build

# compile ESnext to ES5 and obfuscation
yarn obfus

# run testing
yarn test

# format source code
yarn lint

# get swagger.json
yarn docs

# get postman.json
yarn postman

# generate swagger.json, postman.json, generate swagger files and dictionary
# from mongoose schemas files
yarn generate

```

## Deployment Suggestion

Run build command to build `dist` from `src`:

```shell
yarn build
```

Run obfus command to obfus `dist` directory:

```shell
yarn obfus
```

Deploy `dist`, `node_modules` and `package.json` in your server. Run this command in deployed server to start service:

```shell
yarn serve
```

## ESLint & Prettier

We have configure ESLint and Prettier for typescript(javascript), and by default, editor formatter is set to prettier and will format code on save. If you didn't need auto-formatting, you can modify this configuration in `./.vscode/settings.json`. File is like this:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // Just change this option to false
  "editor.formatOnSave": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": ["javascript", "typescript"],
  "json.format.enable": false
}
```

## Commitlint

All commits should fellow these rules:

- `chore`: daily commit
- `fixed`: fixed some issues
- `feature`: add some features or new functions
- `refactor`: refact code without changing function
- `revert`: revert previous code
- `perf`: improves performance
- `test`: submit test files (unit test, integration test, end-to-end test)
- `docs`: update documents

For example, if we fixed an issue in this commit, we must leave a commit log like this:

```
fixed: fixed an error
```

---

This is supported by [commitlint](https://github.com/conventional-changelog/commitlint)(with `CLI` and `config-conventional`) which lints your commit messages and [husky](https://github.com/typicode/husky/tree/master) which is a git hook that trigger commitlint.

We configured **commitlint** in `commitlint.config.js` in project root directory like this:

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "chore",
        "docs",
        "feature",
        "fixed",
        "refactor",
        "revert",
        "perf",
        "test",
      ],
    ],
  },
};
```

We configured **husky** in `package.json` like this:

```json
"husky": {
	"hooks": {
		"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
	}
}
```

## VS Code Extensions Suggestion

- **ESLnt**
  https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- **Prettier**
  https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

# Technologies

## Basic

- [node.js](https://nodejs.org/en/): a JavaScript runtime built on Chrome's V8 JavaScript engine
- [typescript](https://www.typescriptlang.org/): an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions
- [express](https://expressjs.com/): a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- [mongoose](https://mongoosejs.com/): elegant mongodb object modeling for node.js
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express): a middleware in your express app to serve the Swagger UI bound to your Swagger document

## Tools

- [jest](https://jestjs.io/): A delightful JavaScript Testing Framework with a focus on simplicity
- [babel](https://babeljs.io/): A toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments
- [eslint](https://eslint.org/): A Tool to find and fix problems in your JavaScript code
- [prettier](https://prettier.io/): An opinionated code formatter
- [winston](https://github.com/winstonjs/winston.git): A simple and universal logging library with support for multiple transports
- nodemon
- kill-port

## Packages

- [axios](https://github.com/axios/axios): A Promise based HTTP client for the browser and node.js
- [dotenv](https://www.npmjs.com/package/dotenv): A tool to read `.env` file into environment

# Suggestion

Here are some Suggestions for developers to build up you own apps based on this setup.

- Run `yarn build` to build and don't forget to run `yarn obfus` to obfuscating your source code if your deploying server is not safe or you don't want to make your code open

# Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://linxiaozhou.com"><img src="https://www.linxiaozhou.com:666/upload/linxiaozhou_headimg.jpeg" width="100px;" alt="linxiaozhou"/><br /><sub><b>linxiaozhou</b></sub></a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

> To get latest version of documentation from this url:
> https://onelib.biz:888/blog/a/60331cc7640392758a135e76
