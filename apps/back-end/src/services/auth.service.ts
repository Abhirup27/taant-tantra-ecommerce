import { Repository } from "typeorm";
import User from "common";

export interface AuthService {
  does_user_exist: (id: string) => Promise<boolean>;
  create_user: (user: { id: string, email: string, first_name: string, last_name?: string, phone_number: string }) => Promise<number>;
}
export function createAuthService(userRepo: Repository<User>): AuthService {

  async function does_user_exist(id: string): Promise<boolean> {
    return await userRepo.existsBy({ id });

  }
  async function create_user(user: { id: string, email: string, first_name: string, last_name?: string, phone_number: string }) {

    return 0;
  }

  return { does_user_exist, create_user };
}
