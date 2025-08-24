#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { exec } from 'node:child_process';
import cliSelect from 'cli-select';

const choices = ['html-web-page', 'react-app', 'rest-api-with-express', 'rest-api-with-fastify', 'node-console'];

const options = await yargs(hideBin(process.argv)).usage('Usage -e <script_name>').option('e', {
  alias: 'example',
  describe: 'Example to run',
  type: 'string',
  choices,
  demandOption: false,
}).argv;

const { e } = options;
let example = e;

if (!example) {
  const { value } = await cliSelect({ values: choices });
  example = value;
}

let command: string;
switch (example) {
  case 'react-app':
    command = `npm run -w=${example} serve:dev`;
    break;
  default:
    command = `npm run -w=${example} start`;
    break;
}

console.log(`Running ${example}`);
exec(command, { encoding: 'ascii', env: { ...process.env, FORCE_COLOR: '1' } }, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  if (stdout) console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(1);
  }
});
