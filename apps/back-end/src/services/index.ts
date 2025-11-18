import { DataSource } from "typeorm";
import { createUserService } from "./user.service";
import { type UserService } from "./user.service";

export function createAppServices(dataSource: DataSource): {
  userService: UserService;
} {
  const userRepo = dataSource.getRepository('User');
  // let newUser = userRepo.create({});
  // newUser.id = 13;
  // userRepo.save(newUser);
  // console.log(userRepo);
  const userService = createUserService(userRepo);

  return {
    userService,
  };
}
