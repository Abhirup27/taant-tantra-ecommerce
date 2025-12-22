import type { GlideClient } from "@valkey/valkey-glide";
import { ShiprocketAuthResponseSchema, ShiprocketServiceabilitySchema } from "../types/ShiprocketResponseSchemas.js";
import { config, type Supplier } from "common";
import type { Repository } from "typeorm";

export interface ShiprocketService {

  auth_Shiprocket: () => Promise<boolean>;
  check_Pincode_Serviceability: (product_id: string, pincode: string) => Promise<boolean>;
}

export function create_Shiprocket_Service(valkeyClient: GlideClient, _suppliersRepository: Repository<Supplier>): ShiprocketService {

  async function auth_Shiprocket(): Promise<boolean> {
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
      const parsedData = ShiprocketAuthResponseSchema.parse(responseBody);
      console.log(parsedData.token)

      valkeyClient.set('shiprocket_token', parsedData.token);
      return true;
    } catch (error) {
      console.error("error when authenticating with Shiprocket: ", error);
      return false;
    }
  }

  async function check_Pincode_Serviceability(product_id: string, pincode: string): Promise<boolean> {
    try {
      //fetch product info, the supplier, the stock and then fetch the pincode of all the pickup/warehouses.
      product_id = 'P_01';
      console.log(product_id)
      const token = await valkeyClient.get('shiprocket_token');
      const headers = new Headers({
        "Authorization": `Bearer ${token?.toString()}`,
        "Content-Type": "application/json",
      })

      const response = await fetch(config.SHIPROCKET_BASE_URL + `external/courier/serviceability?pickup_postcode=201306&delivery_postcode=${pincode}&cod=0&weight=1`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const data = await response.json();
      const validatedData = ShiprocketServiceabilitySchema.safeParse(data);
      if (!validatedData.success) {
        console.log(validatedData.error.cause);
        return false;
      }
      console.log(validatedData.data.data.available_courier_companies[0]);
    } catch (error) {
      console.error('Error getting servicibility for area:', error);
    }
    return true
  }

  return { auth_Shiprocket, check_Pincode_Serviceability };
} 
