import * as fsPromise from "node:fs/promises";
import * as process from "process";
import * as readline from "node:readline/promises";

export default function main(args: string[]) {
  if (args.length > 1) {
    console.log("Usage: jlox [script]");
  } else if (args.length == 1) {
    runFile(args[0]);
  } else {
    //console.log("Where REPL start; to be implemented");
    runPrompt();
  }
}

export async function runFile(path: string) {
  const textContent = await fsPromise.readFile(path);
  console.log(textContent.toString());
}

async function runPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
  });

  process.stdout.write("> ");
  for await (const line of rl) {
    if (line === ":q") break;
    line.slice(2);
    process.stdout.write(line + "\n");
    process.stdout.write("> ");
  }
  process.exit();
}
const args = process.argv.slice(2);
module.exports.init = main(args);
