import { Column, Entity } from "typeorm";

import { CoreEntity } from "@preterer/typeorm-extensions";

/**
 * Machine entity
 *
 * @export
 * @class Machine
 * @extends {CoreEntity}
 */
@Entity({ name: "machine" })
export class Machine extends CoreEntity {
  @Column({ name: "name", nullable: false, unique: true })
  public name: string;

  @Column({ name: "image_path", nullable: false, unique: true })
  public imagePath: string;

  @Column({ name: "subdomain", nullable: false, unique: true })
  public subdomain: string;

  @Column({ name: "ssh_port", nullable: false, unique: true })
  public sshPort: number;

  @Column({ name: "http_port", nullable: false, unique: true })
  public httpPort: number;

  @Column({ name: "https_port", nullable: false, unique: true })
  public httpsPort: number;
}
