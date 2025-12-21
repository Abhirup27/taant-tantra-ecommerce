import express from "express";

import { type UserController } from "../../controllers/user.controller.js";

export function create_User_Routes(controller: UserController) {
  const router = express.Router();
  router.get("/profile", controller.getProfile);
  router.get("/", controller.getUser);
  // router.get("/:id", controller.getUserById);

  return router;
}
