import { DataSource } from "typeorm";
import { models } from "../constants";
import { Model } from "../models/Model";
import { Provider } from "../models/Provider";
import { ModelCost } from "../models/ModelCost";

/**
 * Initialize the models in the database using the provided ORM connection.
 * @param {DataSource} orm - The ORM connection to use for database operations
 */
export default async function initModels(orm: DataSource) {
  const existingProviders = await orm.createQueryBuilder().select("provider").from(Provider, "provider").getMany();

  const existingModels = await orm.createQueryBuilder().select("model").from(Model, "model").getMany();

  let filterdModels = models.filter(model => !existingModels.find(existingModel => existingModel.name === model.name));

  await orm
    .createQueryBuilder()
    .insert()
    .into(Model)
    .values(
      filterdModels.map(model => ({
        name: model.name,
        providerId: existingProviders.find(provider => provider.name === model.provider)?.id,
        inputType: model.inputType,
        order: model.order,
      })),
    )
    .execute();

  const newModels = await orm.createQueryBuilder().select("model").from(Model, "model").getMany();

  await orm
    .createQueryBuilder()
    .insert()
    .into(ModelCost)
    .values(
      filterdModels.map(filterdModel => ({
        modelId: newModels.find(model => model.name === filterdModel.name)?.id,
        providerId: newModels.find(model => model.name === filterdModel.name)?.providerId,
        input: filterdModel?.inputCost,
        output: filterdModel?.outputCost,
        factor: filterdModel?.costFactor,
      })),
    )
    .execute();

  existingModels.map(async existingModel => {
    await orm
      .createQueryBuilder()
      .update(Model)
      .where("id = :id", { id: existingModel.id })
      .set({
        inputType: models.find(m => m.name === existingModel.name)?.inputType,
        order: models.find(m => m.name === existingModel.name)?.order,
        providerId: existingProviders.find(
          provider => provider.name === models.find(m => m.name === existingModel.name)?.provider,
        )?.id,
      })
      .execute();

    await orm
      .createQueryBuilder()
      .update(ModelCost)
      .where("modelId = :modelId", { modelId: existingModel.id })
      .set({
        input: models.find(m => m.name === existingModel.name)?.inputCost,
        output: models.find(m => m.name === existingModel.name)?.outputCost,
        factor: models.find(m => m.name === existingModel.name)?.costFactor,
      })
      .execute();
  });

  console.log("Inserted models");
}
