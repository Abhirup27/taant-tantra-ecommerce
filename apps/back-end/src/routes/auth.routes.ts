import express from "express";
import { createAuthController } from "../controllers/auth.controller";
import { create_supabase_instance } from "../middlewares/supabaseClient";
import type { AuthService } from "../services/auth.service";


export function createAuthRoutes(authService: AuthService) {
  const router = express.Router();

  const controller = createAuthController({ authService });
  router.use(create_supabase_instance);

  router.get('/auth/google', controller.googleAuthInit);
  router.get('/auth/v1/callback', controller.callback);
  return router;
}
