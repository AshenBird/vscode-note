const execa = require("execa");
const fs = require("fs-extra");
const vite = require("vite");
const {  getPath } = require("./utils");

fs.ensureDir(getPath("out"));

const watch = async () => {
  const hostWatcher = execa("npm", ["run", "watch:host"]);
  hostWatcher.stdout.pipe(process.stdout);
};

watch();
