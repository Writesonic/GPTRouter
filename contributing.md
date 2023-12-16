# Contributing to GPTRouter

Thank you for your interest in contributing to GPTRouter! This document will guide you through the process of setting up the project and explain how you can contribute to its development. By following these guidelines, you can help us make GPTRouter better for everyone.

## Table of Contents

- [Contributing to GPTRouter](#contributing-to-gptrouter)
  - [Table of Contents](#table-of-contents)
  - [Setting up the Environment](#setting-up-the-environment)
  - [Installing GPTRouter](#installing-gptrouter)
  - [Setting up PostgreSQL](#setting-up-postgresql)
  - [Running GPTRouter](#running-gptrouter)
  - [Contributing to GPTRouter](#contributing-to-gptrouter-1)
  - [Code Style and Guidelines](#code-style-and-guidelines)
  - [Submitting Pull Requests](#submitting-pull-requests)
  - [Creating Issues](#creating-issues)
  - [License](#license)

## Setting up the Environment

To contribute to GPTRouter, ensure that your system meets the following requirements:

- Node.js 18 LTS or later
- npm or yarn package manager
- PostgreSQL database

## Installing GPTRouter

To install and set up the GPTRouter project, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/Writesonic/GPTRouter.git
cd GPTRouter/
```

2. Install project dependencies:

```sh
npm install
# or
yarn install
```

## Setting up PostgreSQL

GPTRouter requires a PostgreSQL database to function. Follow these steps to set up PostgreSQL:

1. Install PostgreSQL in your local environment. Refer to the official PostgreSQL documentation for installation instructions based on your operating system.

2. Create a new PostgreSQL database:

```sh
createdb model_router_db
```

1. Set the DB credentials in .env using .env.example as reference:

Make sure to replace `username` and `password` with your own PostgreSQL credentials.

## Running GPTRouter

To run the GPTRouter project on your local machine, follow these steps:

1. Build the project:

```sh
npm run build
```

2. Start the application:

```sh
npm start
```

The application should now be running on `http://localhost:8000`.

## Contributing to GPTRouter

If you are interested in contributing to GPTRouter's development, take a look at the issues tab on the project's GitHub repository. There, you will find a list of open issues that you can tackle. Feel free to open new issues as well if you encounter any problems or have ideas for improvement.

## Code Style and Guidelines

To maintain a consistent codebase, GPTRouter follows certain code style and coding conventions. Please adhere to the following guidelines when contributing:

- All code should follow the [JavaScript Standard Style](https://standardjs.com) guidelines.

## Submitting Pull Requests

If you have implemented a new feature, fixed a bug, or made any improvements, we welcome your pull requests. Before submitting a pull request, please make sure to do the following:

1. Branch out from the latest `main`.

2. Commit your changes with meaningful commit messages.

3. Push your changes to your forked repository.

4. Submit your pull request to the `main` branch of the main repository.

We will review your changes and get back to you with feedback or merge it if everything looks good.

## Creating Issues

If you encounter any bugs, have suggestions, or want to discuss new features, please create an issue on the project's GitHub repository. Provide a detailed explanation of the problem or your suggestion so that we can understand it better and discuss it with you.

## License

By contributing to GPTRouter, you agree that your contributions will be licensed under the [GNU GENERAL PUBLIC LICENSE](https://www.gnu.org/licenses/gpl-3.0.en.html).
