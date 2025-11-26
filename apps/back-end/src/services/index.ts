import { DataSource } from "typeorm";
import { createUserService } from "./user.service.js";
import { type UserService } from "./user.service.js";
import { createAuthService, type AuthService } from "./auth.service.js";
import type { User } from "common";

export function createAppServices(dataSource: DataSource): {
  userService: UserService;
  authService: AuthService;
} {
  const userRepo = dataSource.getRepository<User>('User');
  // let newUser = userRepo.create({});
  // newUser.id = 13;
  // userRepo.save(newUser);
  // console.log(userRepo);
  const userService = createUserService(userRepo);
  const authService = createAuthService(userRepo);
  return {
    userService,
    authService
  };
}
