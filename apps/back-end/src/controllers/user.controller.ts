import { type Request, type Response } from "express";
import { type UserService } from "../services/user.service";
import { createController } from "../utils/createController";

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

export const createUserController = createController((deps: Deps)=> {

  async function getUser(req: Request, res: Response) {
    const users = await deps.userService.getUsers();
    res.json(users);
  }
    async function getUserById(req: Request, res: Response) {
      const user = await deps.userService.getUserById("123");
      res.json(user);
    }
  return { getUser, getUserById };
})
