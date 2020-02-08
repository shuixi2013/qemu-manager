import Container from "typedi";

import { connectDB } from "./db/db";
import { MachineService } from "./services/machine.service";

export function run(command: (...args) => any): (...args) => Promise<void> {
  console.info(new Date(), "Started");
  return (...args) => {
    return Promise.resolve(command(...args))
      .then(result => {
        console.info(new Date(), "Finished");
        if (result) {
          console.info(new Date(), result);
        }
        process.exit(0);
      })
      .catch((err: Error) => {
        console.error(new Date(), "Error!", err.message);
        process.exit(1);
      });
  };
}

export function runWithService(command: (machineService: MachineService, ...args) => any): (...args) => Promise<void> {
  return (...args) => connectDB().then(() => run(command)(Container.get(MachineService), ...args));
}
