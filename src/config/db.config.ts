import { LoggerOptions } from "typeorm/logger/LoggerOptions";

/**
 * Configuration of database
 *
 * @export
 * @class DBConfig
 */
export class DBConfig {
  /**
   * Type of database
   *
   * @type {string}
   * @memberof DBConfig
   */
  type: string = "sqlite";

  /**
   * Name of database
   *
   * @type {string}
   * @memberof DBConfig
   */
  database: string = "./sqlite.db";

  /**
   * Host of database
   *
   * @type {string}
   * @memberof DBConfig
   */
  host: string = "";

  /**
   * Port of database
   *
   * @type {number}
   * @memberof DBConfig
   */
  port: number = 1433;

  /**
   * Username
   *
   * @type {string}
   * @memberof DBConfig
   */
  username: string = "";

  /**
   * Password
   *
   * @type {string}
   * @memberof DBConfig
   */
  password: string = "";

  /**
   * Logging type
   *
   * @type {string}
   * @memberof DBConfig
   */
  logging: LoggerOptions = ["error"];

  /**
   * Allow TypeORM to automatically synchronize database
   *
   * @type {boolean}
   * @memberof DBConfig
   */
  synchronize: boolean = true;

  /**
   * Allow to drop schema
   *
   * @type {boolean}
   * @memberof DBConfig
   */
  dropSchema: boolean = false;

  /**
   * Allow to cache requests
   *
   * @type {boolean}
   * @memberof DBConfig
   */
  cache: boolean = true;
}
