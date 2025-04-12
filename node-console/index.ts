import runs from './playground';
import chalk from 'chalk';

for await (const run of runs) {
  const runName = chalk.cyan(run.name.trim());
  console.log(chalk.dim(`Running ${runName}...`));
  try {
    await run.run();
    console.log(`${chalk.bgGreen(chalk.whiteBright('Success'))}: ${runName}`);
  } catch (error) {
    console.error(`${chalk.bgRed(chalk.whiteBright('Error:'))} ${chalk.red((error as Error).message)}`);
    console.info(chalk.dim((error as Error).stack));
  }
  if (runs.indexOf(run) !== runs.length - 1) {
    console.log(chalk.dim('\n------------------------\n'));
  }
}
