
import type { GlideClient, GlideString } from "@valkey/valkey-glide";
import { config } from "common";
import cron from "node-cron";
import { z } from "zod";

export const ShipRocket_Auth_Response_Schema = z.object({
  company_id: z.number().int().positive(),
  created_at: z.string(),
  email: z.email(),
  first_name: z.literal('API'),
  last_name: z.literal('USER'),
  id: z.number().int().positive(),
  token: z.jwt()
})

export async function createCronService(valkeyClient: GlideClient) {

  const last_Shiprocket_auth_string: GlideString | null = await valkeyClient.get('shiprocket_last_auth_time');
  let last_Shiprocket_auth = parseInt(last_Shiprocket_auth_string?.toString() ?? '0');
  async function auth_shiprocket() {
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
      });
      const response = await fetch(config.SHIPROCKET_BASE_URL + 'external/auth/login', {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          email: config.SHIPROCKET_API_ID,
          password: config.SHIPROCKET_API_SECRET
        })
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const responseBody = await response.json();
      const parsedData = ShipRocket_Auth_Response_Schema.parse(responseBody);
      console.log(parsedData.token)
      valkeyClient.set('shiprocket_token', parsedData.token);
    } catch (error) {
      console.error("error when authenticating with Shiprocket: ", error);
    }
  }


  //ship rocket token expires exery 240 hours/ 10 days, but I run a cron job every midnight, which first checks if 10 days have passed
  cron.schedule("0 0 * * *", async () => {
    const TEN_DAYS = 10 * 24 * 60 * 60 * 1000;
    if (last_Shiprocket_auth == null) {
      last_Shiprocket_auth = 0;
    }
    if (Date.now() - last_Shiprocket_auth >= TEN_DAYS) {
      await auth_shiprocket();
      last_Shiprocket_auth = Date.now();
      // await saveLastAuthTime(last_Shiprocket_auth);
    }
  });
  return { auth_shiprocket };
}


