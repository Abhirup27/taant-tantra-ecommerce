
import { type RouteConfig, route, prefix, index } from "@react-router/dev/routes";

export default [
  // index("./routes/storeHome.tsx"),
  route("/", "./routes/storeHome.tsx"),
  ...prefix("admin", [
    index("./routes/admin.tsx")
  ]),

  ...prefix("supplier", [
    index("./routes/supplier.tsx")
  ])
] satisfies RouteConfig;
