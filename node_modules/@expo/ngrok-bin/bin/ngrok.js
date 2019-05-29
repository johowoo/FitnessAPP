#!/usr/bin/env node
var spawn = require("child_process").spawn;

var input = process.argv.slice(2);
var bin = require("../");

if (bin !== null) {
  spawn(bin, input, { stdio: "inherit" }).on("exit", process.exit);
} else {
  throw new Error("Platform not supported.");
}
