import express from "express";
import type { Services } from "../services/index.ts";
import { create_Auth_Controller } from "../controllers/auth.controller.js";
import { create_Auth_Routes } from "./public/auth.routes.js";
import { create_User_Controller } from "../controllers/user.controller.js";
import { create_User_Routes } from "./frontend/user.routes.js";


export function create_Routes(services: Services) {

  const router = express.Router();


  //init all controllers
  const auth_controller = create_Auth_Controller({ authService: services.auth_service });
  const user_controller = create_User_Controller({ userService: services.user_service });

  //create sub routes, pass shared controllers

  const auth_routes = create_Auth_Routes(auth_controller);
  const user_routes = create_User_Routes(user_controller);
  //append sub routes to router
  router.use(auth_routes, user_routes);

  return { router };
}
