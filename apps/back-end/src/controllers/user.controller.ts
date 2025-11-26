import { type Request, type Response } from "express";
import { type UserService } from "../services/user.service.js";
import { createController } from "../utils/createController.js";

type Deps = {
  userService: UserService;
}

// export function createUserController(userService: UserService) {
//   async function getUser(req: Request, res: Response) {
//     const users = await userService.getUsers();
//     res.json(users);
//   }
//   async function getUserById(req: Request, res: Response) {
//     const user = await userService.getUserById("123");
//     res.json(user);
//   }
//   return { getUser, getUserById };
// }

export const createUserController = createController((deps: Deps) => {

  async function getProfile(_req: Request, _res: Response) {

  }
  async function getUser(_req: Request, res: Response) {
    try {

      const users = await deps.userService.getUsers();
      res.json(users);

    } catch (error) {
      res.sendStatus(500);
    }

  }
  async function getUserById(_req: Request, res: Response) {
    const user = await deps.userService.getUserById("123");
    res.json(user);
  }
  return { getUser, getUserById, getProfile };
})
