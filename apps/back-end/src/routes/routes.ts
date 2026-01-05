import express from "express";
import type { Services } from "../services/index.ts";
import { create_Auth_Controller } from "../controllers/auth.controller.js";
import { create_Auth_Routes } from "./public/auth.routes.js";
import { create_User_Controller } from "../controllers/user.controller.js";
import { create_User_Routes } from "./frontend/user.routes.js";
import { create_Order_Flow_Helper_Routes } from "./public/orderFlowHelper.routes.js";
import { create_Shipment_Controller } from "../controllers/shipment.controller.js";


export function create_Routes(services: Services) {

  const router = express.Router();


  //init all controllers
  const auth_controller = create_Auth_Controller({ authService: services.auth_service });
  const user_controller = create_User_Controller({ userService: services.user_service });
  // const order_controller = create_Order_Controller({});
  const shipment_controller = create_Shipment_Controller({ shiprocket_service: services.shipment_service });

  //create sub routes, pass shared controllers

  const auth_routes = create_Auth_Routes(auth_controller);
  const user_routes = create_User_Routes(user_controller);
  const order_flow_routes = create_Order_Flow_Helper_Routes(shipment_controller);

  //append sub routes to router
  router.use([auth_routes, user_routes, order_flow_routes]);

  return router;
}
