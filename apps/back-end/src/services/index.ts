import { DataSource } from "typeorm";
import { createUserService } from "./user.service.js";
import { type UserService } from "./user.service.js";
import { createAuthService, type AuthService } from "./auth.service.js";
import type { User } from "common";
import type { GlideClient } from "@valkey/valkey-glide";
import { createCronService } from "./cron.service.js";

export async function createAppServices(dataSource: DataSource, valkeyClient: GlideClient): Promise<{
  userService: UserService;
  authService: AuthService;
}> {
  const userRepo = dataSource.getRepository<User>('User');


  const cronService = await createCronService(valkeyClient);
  //run auth with shiprocket at startup
  cronService.auth_shiprocket();
  cronService.get_servicibility()

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
