import type { Response } from "express";
import type { ShiprocketService } from "../services/shiprocket.service.js"
import { create_Controller } from "../utils/createController.js";
import z from "zod";
import type { RequestWithQuery } from "../types/RequestWithQuery.d.ts";


export type OrderController = ReturnType<typeof create_Order_Controller>;

export const ServiceabilityQuerySchema = z.object({
  product_id: z.string().startsWith('P_').min(3),
  pincode: z.string().length(6),
  // weight: z.coerce.number().positive(),
});

type Deps = {
  shiprocket_service: ShiprocketService
};


export const create_Order_Controller = create_Controller((deps: Deps) => {

  async function f_check_item_serviceability(req: RequestWithQuery<typeof ServiceabilityQuerySchema>, res: Response) {

    const { pincode, product_id } = req.parsedQuery;

    const result = await deps.shiprocket_service.check_Pincode_Serviceability(product_id, pincode);

    res.status(200).json({ serviceable: result });
  }

  return { f_check_item_serviceability };
})
