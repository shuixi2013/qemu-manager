import { DeepPartial } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Service } from "typedi";

import { EntityService } from "@preterer/typeorm-extensions";

import { Machine } from "../entities/machine.entity";
import { MachineRepository } from "../repositories/machine.repository";

/**
 * Service of virtual machines data
 *
 * @export
 * @class MachineService
 * @extends {EntityService<Machine, DeepPartial<Machine>>}
 */
@Service()
export class MachineService extends EntityService<Machine, DeepPartial<Machine>> {
  /**
   * Repository of machines
   *
   * @protected
   * @type {MachineRepository}
   * @memberof MachineService
   */
  @InjectRepository(Machine)
  protected repository: MachineRepository;

  public getByName(name: string): Promise<Machine> {
    return this.repository.findOne({ where: { name } });
  }
}
