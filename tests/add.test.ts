import Container from "typedi";

import { add } from "../src/commands/add";
import { MachineService } from "../src/services/machine.service";
import { clearData, mockDB } from "./testUtils";

describe("Add", function() {
  let machineService: MachineService;

  beforeAll(async function() {
    await mockDB();
    machineService = Container.get(MachineService);
  });

  afterEach(async function() {
    await clearData();
  });

  it("Should add a default machine", async function() {
    const machinesCount = await machineService.count();
    const name = "test";
    const base = machinesCount * 1000;
    const sshPort = base + 10022;
    const httpPort = base + 10080;
    const httpsPort = base + 10443;
    await add(machineService, name);
    const machine = await machineService.getByName(name);
    expect(machine).toBeDefined();
    expect(machine.sshPort).toBe(sshPort);
    expect(machine.httpPort).toBe(httpPort);
    expect(machine.httpsPort).toBe(httpsPort);
    expect(machine.subdomain).toBe(name);
  });
});
