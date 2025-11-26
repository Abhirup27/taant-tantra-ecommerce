import express from "express";
import { type Express } from "express";
import { DataSource } from "typeorm";
import { createAppServices } from "./services/index.js";
import * as shared from "common";
import { createUserRoutes } from "./routes/user.routes.js";
import { createAuthRoutes } from "./routes/auth.routes.js";
import cors from "cors";

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
  const services = createAppServices(dbConnection);

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



