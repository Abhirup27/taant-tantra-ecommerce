import { DataSource } from "typeorm";
import { create_User_Service } from "./user.service.js";
import { create_Auth_Service } from "./auth.service.js";
import type { Supplier, User } from "common";
import type { GlideClient } from "@valkey/valkey-glide";
import { create_Cron_Service } from "./cron.service.js";
import { create_Shiprocket_Service } from "./shiprocket.service.js";

export type Services = ReturnType<typeof create_App_Services>;

// export type Services = {
//   user_service: UserService,
//   auth_service: AuthService
// };

export function create_App_Services(dataSource: DataSource, valkeyClient: GlideClient) {
  const user_repo = dataSource.getRepository<User>('User');
  const suppliers_repo = dataSource.getRepository<Supplier>('suppliers');


  const user_service = create_User_Service(user_repo);
  const auth_service = create_Auth_Service(user_repo);
  const suppliers_service = create_Shiprocket_Service(valkeyClient, suppliers_repo);

  create_Cron_Service(valkeyClient, suppliers_service);
  //run auth with shiprocket at startup


  return {
    user_service: user_service,
    auth_service: auth_service,
    suppliers_service: suppliers_service,
  };
}
