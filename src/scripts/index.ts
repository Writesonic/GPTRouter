import { DataSource } from "typeorm";

import initModels from "./initModels";
import initProviders from "./initProviders";

/**
 * Initialize data for the given typeORM DataSource.
 * @param {DataSource} orm - The typeORM DataSource to initialize data for.
 * @returns {Promise<void>} - A Promise that resolves once the data initialization is complete.
 */
export default async function initData(orm: DataSource) {
  await initProviders(orm);
  await initModels(orm);
}
