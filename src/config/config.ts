import { DBConfig } from "./db.config";

/**
 * Application configuration
 *
 * @export
 * @class Config
 */
export class Config {
  /**
   * Path to machines directory
   *
   * @type {string}
   * @memberof Config
   */
  public machinesPath: string = "/home/preterer/machines";

  /**
   * Path to sample machine
   *
   * @type {string}
   * @memberof Config
   */
  public sampleMachinePath: string = "/home/preterer/machines/sample.img";

  /**
   * We all know it's /etc/nginx, but for testing purposes, this has to be configurable
   *
   * @type {string}
   * @memberof Config
   */
  public nginxPath: string = "/home/preterer/nginx/";

  /**
   * Base domain
   *
   * @type {string}
   * @memberof Config
   */
  public baseDomain: string = "vps.witkac.pl";

  /**
   * DB Config
   *
   * @memberof Config
   */
  public db = new DBConfig();
}

export const config = new Config();
