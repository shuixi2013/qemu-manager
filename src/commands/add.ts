import { CommanderStatic } from "commander";
import fs from "fs";
import path from "path";
import { DeepPartial } from "typeorm";
import { promisify } from "util";

import { config } from "../config/config";
import { Machine } from "../entities/machine.entity";
import { AddOptions } from "../interfaces/addOptions";
import { runWithService } from "../run";
import { MachineService } from "../services/machine.service";

export async function add(machineService: MachineService, name: string, options?: AddOptions): Promise<string> {
  await checkIfMachineExists(machineService, name);
  const count = await machineService.count();
  const base = 1000 * count;
  const subdomain = options.subdomain || `${name}.${config.baseDomain}`;
  const sshPort = options.sshPort || 10022 + base;
  const httpPort = 10080 + base;
  const httpsPort = 10443 + base;
  const imagePath = options.imagePath || (await copySampleMachine(name));
  const machineConfig = { name, httpPort, httpsPort, sshPort, subdomain };

  await createNginxEntry(machineConfig);
  await machineService.add({ name, imagePath, httpPort, httpsPort, sshPort, subdomain });

  return `Created machine ${name}. Running on domain ${subdomain}. Running SSH on port ${sshPort}`;
}

export function registerAdd(commander: CommanderStatic): void {
  commander
    .command("add <name>")
    .option("-i, --image <imagePath>", "Existing disk image absolute path")
    .option("--ssh-port <sshPort>", "Custom SSH port", (value, _) => parseInt(value))
    .option("-d, --subdomain <subdomain>", "Custom subdomain")
    .action(runWithService(add));
}

function checkIfMachineExists(machineService: MachineService, name: string): Promise<void> {
  return machineService.getByName(name).then(machine => {
    if (machine) {
      throw new Error(`Machine ${name} already exists`);
    }
  });
}

function copySampleMachine(name: string): Promise<string> {
  const machinePath = path.join(config.machinesPath, name + ".img");
  return promisify(fs.copyFile)(config.sampleMachinePath, machinePath).then(() => machinePath);
}

function createNginxEntry(machine: DeepPartial<Machine>): Promise<void> {
  const configPath = path.join(config.nginxPath, "sites-available", machine.name);
  const configLinkPath = path.join(config.nginxPath, "sites-enabled", machine.name);
  return promisify(fs.readFile)(path.join(process.cwd(), "samples/nginx.txt"))
    .then(nginxConfig => nginxConfig.toString())
    .then(nginxConfig =>
      nginxConfig
        .replace(/\$\{subdomain\}/g, machine.subdomain)
        .replace(/\$\{httpPort\}/g, machine.httpPort.toString())
        .replace(/\$\{httpsPort\}/g, machine.httpsPort.toString())
    )
    .then(nginxConfig => promisify(fs.writeFile)(configPath, nginxConfig, {}))
    .then(() => promisify(fs.link)(configPath, configLinkPath));
}
