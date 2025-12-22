import express from "express";
import { type Express } from "express";
import { DataSource } from "typeorm";
import { create_App_Services } from "./services/index.js";
import * as shared from "common";
import cors from "cors";
import { GlideClient } from "@valkey/valkey-glide";
import { config } from "common";
import { create_Routes } from "./routes/routes.js";


async function f_initValkeyClient() {
  const addresses = [
    {
      host: config.VALKEY_HOST,
      PORT: config.VALKEY_PORT,
    }
  ];

  const client = await GlideClient.createClient({
    addresses: addresses,
    requestTimeout: 500, // 500ms timeout
    clientName: "taant_tantra_backend",
  }).then((client): GlideClient => {
    console.log("Valkey client initialized");
    return client;
  })
    .catch((err) => {
      console.error("Error during Valkey client initialization:", err);
      process.exit(1);
    });

  return client;
}

async function f_initDB() {
  return shared.AppDataSource.initialize()
    .then((dataSource): DataSource => {
      console.log("Data Source has been initialized");
      return dataSource;
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
      process.exit(1);
    });
}

async function f_bootstrap(): Promise<Express> {
  // console.log(JSON.stringify(shared.config));
  const app = express();
  app.use(express.json());

  const db_connection = await f_initDB();
  const valkey_client = await f_initValkeyClient();

  const services = create_App_Services(db_connection, valkey_client);

  //SET THIS WHEN ABOUT TO DEPLOY
  app.use(cors({
    origin: "http://localhost:3002",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }))

  //ROUTES MUST COME AFTER CORS AND CSRF MIDDLEWARE;
  const routes = create_Routes(services);
  app.use(routes);

  return app;
}
const app = await f_bootstrap();

app.listen(shared.config.BACKEND_PORT, () => {
  console.log(`Server running on ${shared.config.BACKEND_DOMAIN} at ${shared.config.BACKEND_PORT}`);
});



