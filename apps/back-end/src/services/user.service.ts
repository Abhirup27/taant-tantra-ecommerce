import { Repository } from "typeorm";
import { type User } from "common";

export interface UserService {
  getUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<any>;
}
export function createUserService(userRepo: Repository<User>): UserService {
  async function getUsers(): Promise<User[]> {
    return await userRepo.find();
  }

  async function getUserById(id: string) {
    return await userRepo.findOneBy({ id });
  }

  return { getUsers, getUserById };
}
