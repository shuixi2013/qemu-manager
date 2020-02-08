import { EntityRepository } from "typeorm";

import { CoreRepository } from "@preterer/typeorm-extensions";

import { Machine } from "../entities/machine.entity";

/**
 * Repository of virutal machines data
 *
 * @export
 * @class MachineRepository
 * @extends {CoreRepository<Machine>}
 */
@EntityRepository(Machine)
export class MachineRepository extends CoreRepository<Machine> {}
