import express from "express";
import { type AuthController } from "../../controllers/auth.controller.js";
import { create_supabase_instance } from "../../middlewares/supabaseClient.js";
// import cors from "cors";

export function create_Auth_Routes(controller: AuthController) {
  const router = express.Router();

  // router.use(create_supabase_instance);

  router.get('/auth/google', create_supabase_instance, controller.googleAuthInit);
  router.get('/auth/v1/callback', create_supabase_instance, controller.callback);

  router.post('/auth/signin', create_supabase_instance, controller.emailSignIn);

  // router.options('/auth/signin', cors({
  //   origin: "http://www.localhost:3002",
  //   methods: ["OPTIONS"],
  //   allowedHeaders: ["Content-Type"],
  //   credentials: true,
  // }));
  return router;
}
