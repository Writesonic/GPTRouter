# Contributing to Model-Router

Thank you for your interest in contributing to Model-Router! This document will guide you through the process of setting up the project and explain how you can contribute to its development. By following these guidelines, you can help us make Model-Router better for everyone.

## Table of Contents

- [Contributing to Model-Router](#contributing-to-model-router)
  - [Table of Contents](#table-of-contents)
  - [Setting up the Environment](#setting-up-the-environment)
  - [Installing Model-Router](#installing-model-router)
  - [Setting up PostgreSQL](#setting-up-postgresql)
  - [Running Model-Router](#running-model-router)
  - [Contributing to Model-Router](#contributing-to-model-router-1)
  - [Code Style and Guidelines](#code-style-and-guidelines)
  - [Submitting Pull Requests](#submitting-pull-requests)
  - [Creating Issues](#creating-issues)
  - [License](#license)

## Setting up the Environment

To contribute to Model-Router, ensure that your system meets the following requirements:

- Node.js 18 LTS or later
- npm or yarn package manager
- PostgreSQL database

## Installing Model-Router

To install and set up the Model-Router project, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/Writesonic/model-router.git
cd model-router/
```

2. Install project dependencies:

```sh
npm install
# or
yarn install
```

## Setting up PostgreSQL

Model-Router requires a PostgreSQL database to function. Follow these steps to set up PostgreSQL:

1. Install PostgreSQL in your local environment. Refer to the official PostgreSQL documentation for installation instructions based on your operating system.

2. Create a new PostgreSQL database:

```sh
createdb model_router_db
```

1. Set the DB credentials in .env using .env.example as reference:

Make sure to replace `username` and `password` with your own PostgreSQL credentials.

## Running Model-Router

To run the Model-Router project on your local machine, follow these steps:

1. Start the application:

```sh
npm start
```

The application should now be running on `http://localhost:8000`.

## Contributing to Model-Router

If you are interested in contributing to Model-Router's development, take a look at the issues tab on the project's GitHub repository. There, you will find a list of open issues that you can tackle. Feel free to open new issues as well if you encounter any problems or have ideas for improvement.

## Code Style and Guidelines

To maintain a consistent codebase, Model-Router follows certain code style and coding conventions. Please adhere to the following guidelines when contributing:

- All code should follow the [JavaScript Standard Style](https://standardjs.com) guidelines.

## Submitting Pull Requests

If you have implemented a new feature, fixed a bug, or made any improvements, we welcome your pull requests. Before submitting a pull request, please make sure to do the following:

1. Branch out from the latest `master`.

2. Commit your changes with meaningful commit messages.

3. Push your changes to your forked repository.

4. Submit your pull request to the `master` branch of the main repository.

We will review your changes and get back to you with feedback or merge it if everything looks good.

## Creating Issues

If you encounter any bugs, have suggestions, or want to discuss new features, please create an issue on the project's GitHub repository. Provide a detailed explanation of the problem or your suggestion so that we can understand it better and discuss it with you.

## License

By contributing to Model-Router, you agree that your contributions will be licensed under the [GNU GENERAL PUBLIC LICENSE](https://www.gnu.org/licenses/gpl-3.0.en.html).
