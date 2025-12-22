import express from "express";
import { ServiceabilityQuerySchema, type OrderController } from "../../controllers/order.controller.js";
import { parse_Request_Query } from "../../middlewares/parseQuery.middleware.js";

export function create_Order_Flow_Helper_Routes(controller: OrderController) {

  const router = express.Router();

  router.get('/api/v1/location_serviceability',
    parse_Request_Query(ServiceabilityQuerySchema, controller.f_check_item_serviceability)
  );

  return router;

}
