# (WIP) Mint Kit 0.1.0 [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fantick%2Fmint-react&text=React-boilerplate&hashtags=react%2Ctailwindcss%2Creactjs)

![version](https://img.shields.io/badge/version-0.1.0-teal.svg) ![license](https://img.shields.io/badge/license-MIT-teal.svg) [![GitHub issues open](https://img.shields.io/github/issues/antick/mint-kit.svg?maxAge=2592000)]() [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/antick/mint-react.svg?maxAge=2592000)]()  [![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/6jgSTR2pAF)

<p align="center">
    <img alt="Mint logo" src="https://i.imgur.com/OuDAqB1.png" width="200px" />
</p>

[![Coverage Status](https://coveralls.io/repos/github/antick/mint-kit/badge.svg?branch=master)](https://coveralls.io/github/antick/mint-kit?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/1f30292f51df0ab5ad22/maintainability)](https://codeclimate.com/github/antick/mint-kit/maintainability)
[![Support via Paypal](https://img.shields.io/badge/support-paypal-yellowgreen.svg?style=flat-square)](https://paypal.me/pankajsanam)

A starter kit for building modular RESTful APIs using Node, Express, and Mongoose.

Quickly start your project with all the essential features required to build a REST API.

## Features

- Written in TypeScript
- Advanced production process management and monitoring using [PM2](https://pm2.keymetrics.io)
- Authentication and authorization using [passport](http://www.passportjs.org)
- Centralized error handling
- Code coverage using [coveralls](https://coveralls.io)
- Consistent editor configuration using [EditorConfig](https://editorconfig.org)
- Continuous integration with [Travis CI](https://travis-ci.org)
- Cross-Origin Resource-Sharing (CORS) enabled using [cors](https://github.com/expressjs/cors)
- Docker support
- Environment variables using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- Express + MongoDB ([Mongoose](http://mongoosejs.com/))
- Git hooks with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- Gzip compression with [compression](https://github.com/expressjs/compression)
- Linting with [eslint](http://eslint.org) + Airbnb linting rules
- Logging using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- Pagination plugin for mongoose
- Request data validation using [Joi](https://github.com/sideway/joi)
- Roles and permissions
- Sanitize request data against xss and query injection
- Set security HTTP headers using [helmet](https://helmetjs.github.io)
- Unit and integration tests using [Jest](https://jestjs.io)

## Getting Started

### Installation

Clone the repo:

```bash
git clone https://github.com/antick/mint-kit.git
cd mint-kit
rm -rf .git
```

Install the dependencies:

```bash
pnpm install
```

Create a config file for setting environment variables and auth tokens:

```bash
cp .env.example .env
```

### Commands

Run this in your local development environment:

```bash
pnpm run start
```

Run this in production:

```bash
pnpm run start:prod
```

#### Testing

```bash
# run all tests
pnpm test

# run all tests in watch mode
pnpm test:watch

# run test coverage
pnpm run coverage
```

#### Docker

```bash
# run docker container in development mode
pnpm run docker

# run all tests in a docker container
pnpm run docker:test
```

Use below string if you want to connect MongoDB Compass with your docker mongo instance:

`mongodb://host.docker.internal:21017/mint`

#### Linting

```bash
# run ESLint
pnpm run lint

# fix ESLint errors
pnpm lint:fix
```

## Project Structure

```
src\
  |--config\             # Global environment variables and configurations
    |--user\             # User module
      |--config\         # User module configuration
      |--controllers\    # User module controllers
        |--validations\    # Request data validation schemas for user module
      |--middlewares\    # User module middlewares
      |--models\         # Mongoose models for User module
      |--services\       # Business logic for user module
      |--tests\          # User module specific tests
   |--utils\             # Common utility classes and functions
   |--test\            # Tests for utils
   |--app.js             # Express app
   |--index.js           # App entry point
   |--router.js          # Entry point for all module routes
```

### API Endpoints

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/534e51edc60565c7a7f6)

**Auth routes**:\
`POST /api/auth/register` - register\
`POST /api/auth/login` - login\
`POST /api/auth/refresh-tokens` - refresh auth tokens\
`POST /api/auth/forgot-password` - send reset password email\
`POST /api/auth/reset-password` - reset password

**User routes**:\
`POST /api/user` - create a user\
`GET /api/user` - get all users (paginated) \
`GET /api/user/:userId` - get a specific user\
`PATCH /api/user/:userId` - update a user\
`DELETE /api/user/:userId` - delete a user

## Logging

Import the logger from `src/utils/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending
order from most important to least important):

```javascript
const logger = require('<path to src>/utils/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\

API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).

### Pagination

The `paginate` plugin adds the `paginate` static method to the mongoose schema.

Adding this plugin to the `User` model schema will allow you to do the following:

```javascript
const queryUsers = async (filter, options) => User.paginate(filter, options);
```

The `filter` param is a regular mongo filter.

The `options` param can have the following (optional) fields:

```javascript
const options = {
  sortBy: 'name:desc',
  limit: 5,
  page: 2,
};
```

## Logs

```bash
pm2 logs
```

## Linting

Linting is done using [ESLint](https://eslint.org/)

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications.

To modify the ESLint configuration, update the `.eslintrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig`

## Generate an application

Run `pnpm nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `pnpm nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@mint-kint/mylib`.

## Remove a workspace

Remove my-feature-lib from the workspace:

```
nx g @nrwl/workspace:remove my-feature-lib
```

Force removal of my-feature-lib from the workspace:

```
nx g @nrwl/workspace:remove my-feature-lib --forceRemove
```

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Contributing

Contributions are more than welcome! Please check out the [contributing guide](CONTRIBUTING.md).

## Documentation

The documentation for Mint React is available [here](https://antick.github.io/mint-kit).

## Author

Pankaj Sanam - [@pankajsanam](https://twitter.com/pankajsanam)

## Support

<a href="https://www.buymeacoffee.com/pankajsanam" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 25px !important;width: 50px !important;"></a>

## License

[MIT License](LICENSE)
