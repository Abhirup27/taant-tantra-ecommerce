import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import * as path from "path";
import config from "./config.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(config.DB_URL);
export const dataSourceConfig: DataSourceOptions = {
  type: "postgres",
  url: config.DB_URL,
  password: config.DB_PASSWORD,
  synchronize: false,
  logging: true,
  entities: [path.resolve(__dirname, "../../dist/entities/*.{ts,js}")],
  migrations: [path.resolve(__dirname, "../migrations/*.{ts,js}")],
};
export const AppDataSource = new DataSource(dataSourceConfig);
