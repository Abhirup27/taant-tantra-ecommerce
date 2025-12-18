import express from "express";
import { type Express } from "express";
import { DataSource } from "typeorm";
import { createAppServices } from "./services/index.js";
import * as shared from "common";
import { createUserRoutes } from "./routes/user.routes.js";
import { createAuthRoutes } from "./routes/auth.routes.js";
import cors from "cors";
import { GlideClient } from "@valkey/valkey-glide";
import { config } from "common";




async function initValkeyClient() {
  const addresses = [
    {
      host: config.VALKEY_HOST,
      PORT: config.VALKEY_PORT,
    }
  ];

  const client = await GlideClient.createClient({
    addresses: addresses,
    requestTimeout: 500, // 500ms timeout
    clientName: "test_standalone_client",
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

function initDB() {
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

async function bootstrap(): Promise<Express> {
  // console.log(JSON.stringify(shared.config));
  const app = express();
  app.use(express.json());
  const dbConnection = await initDB();
  const valkeyConnection = await initValkeyClient();
  const services = await createAppServices(dbConnection, valkeyConnection);

  //SET THIS WHEN ABOUT TO DEPLOY
  app.use(cors({
    origin: "http://www.localhost:3002",
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }))

  //ROUTES MUST COME AFTER CORS AND CSRF MIDDLEWARE;
  const userRoutes = createUserRoutes(services.userService);
  const authRoutes = createAuthRoutes(services.authService);
  app.use([userRoutes, authRoutes]);



  return app;
}
const app = await bootstrap();

app.listen(shared.config.BACKEND_PORT, () => {
  console.log(`Server running on ${shared.config.BACKEND_DOMAIN} at ${shared.config.BACKEND_PORT}`);
});



