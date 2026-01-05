import express from "express";
import { parse_Request_Query } from "../../middlewares/parseQuery.middleware.js";
import { ServiceabilityQuerySchema, type ShipmentController } from "../../controllers/shipment.controller.js";

export function create_Order_Flow_Helper_Routes(controller: ShipmentController) {

  const router = express.Router();

  router.get('/api/v1/location_serviceability',
    parse_Request_Query(ServiceabilityQuerySchema, controller.f_check_item_serviceability)
  );

  return router;

}
