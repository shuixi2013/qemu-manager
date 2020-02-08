#!/usr/bin/env node

import commander from "commander";

import { registerAdd } from "./commands/add";

registerAdd(commander);

commander.parse(process.argv);
