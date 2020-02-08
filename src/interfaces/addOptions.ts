/**
 * Add command options
 *
 * @export
 * @interface AddOptions
 */
export interface AddOptions {
  /**
   * Path to already existing VM image
   *
   * @type {string}
   * @memberof AddOptions
   */
  imagePath?: string;

  /**
   * Custom SSH port
   *
   * @type {string}
   * @memberof AddOptions
   */
  sshPort?: number;

  /**
   * Custom subdomain
   *
   * @type {string}
   * @memberof AddOptions
   */
  subdomain?: string;
}
