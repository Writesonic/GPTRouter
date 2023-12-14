# Using Docker

### Step 1: Set environment variables in .env file

You first need to define your environment variables. In most projects, these are typically stored in a `.env` file (Check your project's README.md or documentation for specific instructions on which env variables to define).


### Step 2: Running Docker Compose

Once the `Dockerfile` and `.env` files are set up, we can proceed with running the container. 

Go to the directory containing the `docker-compose.yml` and `.env` files, and run:

```bash
docker-compose up -d --build
```

This command will start all the services defined in `docker-compose.yml` in detached mode (-d), and build the images if they are not already created.

### Step 3: Verify the Setup 

To verify that the container is running, you can use the following command:

```bash
docker-compose ps
```

This command will list all running containers started with `docker-compose`.

### Step 4: Using the Application

To use the application, you might need to access it at `localhost:8000` (or whichever port you have exposed in your `docker-compose.yml`).

### Step 5: Using PostgreSQL

You should be able to connect to your PostgreSQL database via a client such as PgAdmin. You would use `host.docker.internal` as the hostname if the PostgreSQL database is running on your localhost and not inside a container, along with the appropriate username, password and database name.

### Step 6: Stopping the Containers

Once you are done, use the following command to stop your containers:

```bash
docker-compose down
```
Remember to replace any placeholder values in the steps with your actual values.