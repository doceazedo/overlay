import fs from "fs";

const configFileExists = fs.existsSync("config.json");
if (!configFileExists) fs.copyFileSync("config.example.json", "config.json");

const tokensDirExists = fs.existsSync("./tokens");
if (!tokensDirExists) fs.mkdirSync("./tokens");
