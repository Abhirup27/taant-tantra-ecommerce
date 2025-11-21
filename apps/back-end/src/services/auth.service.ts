import { Repository } from "typeorm";
import User from "common";


export interface AuthService {
  does_user_exist: (id: string) => Promise<boolean>;
  create_user: (user: { id: string, email?: string, first_name: string, last_name?: string, phone_number?: string }) => Promise<number>;
}
export function createAuthService(userRepo: Repository<User>): AuthService {

  async function does_user_exist(id: string): Promise<boolean> {
    return await userRepo.existsBy({ id });

  }
  async function create_user(user: { id: string, email?: string, first_name: string, last_name?: string, phone_number?: string }) {


    //use zod validation to check if either email or phone number exist, and they are verified. If not verified(at Oauth provider's end), we would have to send an OTP.
    if (!user.email && !user.phone_number) {

      return NO_MAIL_OR_NUMBER; //bad request
    }
    const new_user = userRepo.create({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number
    });

    try {

      const result: User = await userRepo.save(new_user);
    } catch (error) {
      console.error(error);
      return API_ERROR;
    }
    return SUCCESS;
  }

  return { does_user_exist, create_user };
}

export const SUCCESS = 201;
export const NOT_VERIFIED = 1;
export const API_ERROR = 500;
export const NO_MAIL_OR_NUMBER = 400;
export const ALL_CREATE_USER_STATUS_CODES = [
  SUCCESS,
  NOT_VERIFIED,
  NO_MAIL_OR_NUMBER,
  API_ERROR
] as const;


export type CreateUserCodes = typeof ALL_CREATE_USER_STATUS_CODES[number];
