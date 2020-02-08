import { Container } from "typedi";
import * as TypeORM from "typeorm";
import { config } from "../config/config";

/**
 * Connects to applications database
 *
 * @export
 * @returns {Promise<void>}
 */
export async function connectDB(): Promise<void> {
  TypeORM.useContainer(Container);
  await TypeORM.createConnection(connectionConfig());
}

/**
 * Creates connection config
 *
 * @returns {TypeORM.ConnectionOptions}
 */
function connectionConfig(): TypeORM.ConnectionOptions {
  return {
    type: config.db.type as any,
    database: config.db.database,
    username: config.db.username,
    password: config.db.password,
    port: config.db.port,
    host: config.db.host,
    synchronize: config.db.synchronize,
    dropSchema: config.db.dropSchema,
    logging: config.db.logging,
    cache: config.db.cache,
    entities: entities()
  };
}

/**
 * Returns list of entities
 *
 * @returns {((Function | string)[])}
 */
function entities(): (Function | string)[] {
  return ["dist/entities/**/*.js"];
}
