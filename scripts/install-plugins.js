const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const pluginsDir = path.resolve(__dirname, "../plugins");

fs.readdirSync(pluginsDir, { withFileTypes: true }).forEach((dirent) => {
  if (dirent.isDirectory()) {
    const pluginPath = path.join(pluginsDir, dirent.name);
    const packageJsonPath = path.join(pluginPath, "package.json");

    if (fs.existsSync(packageJsonPath)) {
      console.log(`Installing dependencies for plugin: ${dirent.name}`);
      execSync("npm install", { cwd: pluginPath, stdio: "inherit" });
    }
  }
});
