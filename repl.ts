import * as fs from "node:fs/promises";
import * as process from "process";

export default function main(args: string[]) {
  if (args.length > 1) {
    console.log("Usage: jlox [script]");
  } else if (args.length == 1) {
    runFile(args[0]);
  } else {
    console.log("Where REPL start; to be implemented");
  }
}

export async function runFile(path: string) {
  const textContent = await fs.readFile(path);
  console.log(textContent.toString());
}

const args = process.argv.slice(2);
module.exports.init = main(args);
