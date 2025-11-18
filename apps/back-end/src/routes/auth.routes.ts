import express from "express";
import { createAuthController } from "../controllers/auth.controller";
import { create_supabase_instance } from "../middlewares/supabaseClient";


export function createAuthRoutes() {
  const router = express.Router();

  const controller = createAuthController({});
  router.use(create_supabase_instance);

  router.get('/auth', controller.discordAuthInit);
  router.get('/auth/callback', controller.callback);
  return router;
}
