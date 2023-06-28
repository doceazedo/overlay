import fs from "fs";

const configFileExists = fs.existsSync("config.json");
if (!configFileExists) fs.copyFileSync("config.example.json", "config.json");
