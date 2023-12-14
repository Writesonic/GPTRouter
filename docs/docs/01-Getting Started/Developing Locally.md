# Getting Started Locally

--- 

## Building Locally

Setting up the Environment
--------------------------

To contribute to GPTRouter, ensure that your system meets the following requirements:
- Node.js 18 LTS or later
- npm or yarn package manager
- PostgreSQL database

Installing GPTRouter
-----------------------

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

Setting up PostgreSQL
---------------------

GPTRouter requires a PostgreSQL database to function. Follow these steps to set up PostgreSQL:

1. Install PostgreSQL in your local environment. Refer to the official PostgreSQL documentation for installation instructions based on your operating system.

2. Create a new PostgreSQL database:

```sh
createdb model_router_db
```

1. Set the DB credentials in .env using .env.example as reference:


Make sure to replace `username` and `password` with your own PostgreSQL credentials.


Running GPTRouter
--------------------

To run the GPTRouter project on your local machine, follow these steps:

1. Start the application:

```sh
npm start
```

The application should now be running on `http://localhost:8000`.
