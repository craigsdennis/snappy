#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const yargs = require("yargs");
const { snappy } = require("../index");

const options = yargs.scriptName("snappy").usage("$0 [args]").options({
  url: {
    description: "single URL to retrieve",
    alias: "u"
  },
  file: {
    description: "location of file that contains a URL per line",
    alias: "i"
  }
}).help().argv;

async function run(options) {
  if (options.file) {
    const fileStream = fs.createReadStream(options.file);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    for await (const line of rl) {
      // Cuidado: Simple CSV parsing, probably some edge cases.
      const [filename, url] = line.split(",");
      const html = await snappy(url);
      const filePathName = path.join(".", "snaps", filename)
      console.log(`Saving ${filePathName}`);
      await fs.writeFileSync(filePathName, html);
    }
  } else {
    const html = await snappy(options.url);
    console.log(html);
  }
}

run(options)
  .catch(err => console.error(err));