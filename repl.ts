import * as fsPromise from "node:fs/promises";
import * as process from "process";
import * as readline from "node:readline/promises";

let hadError = false;

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
  if (hadError) {
    process.exit(65);
  }
}

function error(line: number, message: string) {
  report(line, "", message);
}

function report(line: number, where: string, message: string) {
  console.error(`[ ${line} ] Error ${where}: ${message}`);
  hadError = true;
}

//This code was adapted from https://jonlinnell.co.uk/articles/node-stdin
//This code is also found in the nodeJS docs
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
    hadError = false;
  }
  process.exit();
}

const args = process.argv.slice(2);
module.exports.init = main(args);
