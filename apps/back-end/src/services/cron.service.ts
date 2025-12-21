
import type { GlideClient, GlideString } from "@valkey/valkey-glide";
import cron from "node-cron";
import type { ShiprocketService } from "./shiprocket.service.js";

export async function create_Cron_Service(valkeyClient: GlideClient, shiprocketClient: ShiprocketService) {

  const last_Shiprocket_auth_string: GlideString | null = await valkeyClient.get('shiprocket_last_auth_time');
  let last_Shiprocket_auth = parseInt(last_Shiprocket_auth_string?.toString() ?? '0');


  //ship rocket token expires exery 240 hours/ 10 days, but I run a cron job every midnight, which first checks if 10 days have passed
  cron.schedule("0 0 * * *", async () => {
    const TEN_DAYS = 10 * 24 * 60 * 60 * 1000;
    if (last_Shiprocket_auth == null) {
      last_Shiprocket_auth = 0;
    }
    if (Date.now() - last_Shiprocket_auth >= TEN_DAYS) {
      await shiprocketClient.auth_Shiprocket();
      last_Shiprocket_auth = Date.now();
      valkeyClient.set('shiprocket_last_auth_time', last_Shiprocket_auth.toString());

      // await saveLastAuthTime(last_Shiprocket_auth);
    }
  });


}


