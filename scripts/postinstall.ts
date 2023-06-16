import fs from "fs";

const envFileExists = fs.existsSync(".env");
if (!envFileExists) fs.copyFileSync(".env.example", ".env");

const tokensDirExists = fs.existsSync("./tokens");
if (!tokensDirExists) fs.mkdirSync("./tokens");
