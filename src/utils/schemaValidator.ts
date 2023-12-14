import { TObject } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

/**
 * Validate the data against the given schema and remove extra fields
 * @param {TObject} schema - The schema to validate the data against
 * @param {any} data - The data to be validated
 * @returns {T} - The validated data
 * @throws {Error} - If the data does not match the schema
 */
export const validateData = <T>(schema: TObject, data: any): T => {
  const C = TypeCompiler.Compile(schema);
  // remove extra fields from data
  const properties = schema.properties;
  for (const key in data) {
    if (data.hasOwnProperty(key) && !properties?.[key]) {
      delete data[key];
    }
  }
  const isValid = C.Check(data);
  if (isValid) {
    return data as T;
  }
  throw new Error(JSON.stringify([...C.Errors(data)].map(({ path, message }) => ({ path, message }))));
};
