import express from "express";

import { createUserController } from "../controllers/user.controller";
import { type UserService } from "../services/user.service";

export function createUserRoutes(userService: UserService) {
  const router = express.Router();
  const controller = createUserController({ userService });
  router.get("/profile", controller.getProfile);
  router.get("/", controller.getUser);
  // router.get("/:id", controller.getUserById);

  return router;
}
