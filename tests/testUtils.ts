import Container from "typedi";
import * as TypeORM from "typeorm";

import { Machine } from "../src/entities/machine.entity";

/**
 * Mocks in memory DB
 *
 * @export
 * @returns
 */
export function mockDB(): Promise<TypeORM.Connection> {
  TypeORM.useContainer(Container);
  return TypeORM.createConnection({
    type: "sqljs",
    entities: [Machine],
    logger: "advanced-console",
    logging: ["error"],
    dropSchema: true,
    synchronize: true,
    cache: false
  });
}

/**
 * Clears mocked data
 *
 * @export
 * @returns {Promise<void>}
 */
export async function clearData(): Promise<void> {
  await TypeORM.getRepository(Machine).clear();
}
