import { DataSource } from "typeorm";

import { Providers } from "../constants";
import { Provider } from "../models/Provider";
const providers = Object.values(Providers);

/**
 * Initializes providers in the database if they do not already exist.
 *
 * @param {DataSource} orm - The TypeORM data source for database operations.
 */
export default async function initProviders(orm: DataSource) {
  const existingProviders = await orm.createQueryBuilder().select("provider").from(Provider, "provider").getMany();
  let filterdProviders = providers.filter(
    provider => !existingProviders.find(existingProvider => existingProvider.name === provider),
  );

  await orm
    .createQueryBuilder()
    .insert()
    .into(Provider)
    .values(filterdProviders.map(provider => ({ name: provider })))
    .execute();

  console.log("Inserted providers");
}
