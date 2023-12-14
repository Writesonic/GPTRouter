import { DataSource } from "typeorm"
import { Model } from "../models/Model"
import { ModelHealthCheck } from "../models/ModelHealthCheck"
import { Provider } from "../models/Provider"
import dotenv from 'dotenv';
import { Prompt } from "../models/Prompt";
import { User } from "../models/User";
import { ModelUsage } from "../models/ModelUsage";
import { ModelCost } from "../models/ModelCost";

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_PORT) {
    throw new Error('Missing one or more required environment variables. Please check your .env file.');
}

/**
 * Creates a new PostgresDataSource connection using the provided environment variables and entity models.
 * @function
 * @returns {DataSource} A new DataSource object for PostgreSQL database connection.
 */
const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Provider,
        ModelHealthCheck,
        Model,
        Prompt,
        User,
        ModelUsage,
        ModelCost
    ],
    synchronize: true
})

export default PostgresDataSource