import dotenv from "dotenv";
let Crypto: typeof import("node:crypto");
if (typeof process !== "undefined" && process?.versions?.node) {
  Crypto = await import("node:crypto");
}
import path from "path";
import { z } from "zod";

const NODE_ENV = process.env.NODE_ENV || "development";
console.log(NODE_ENV);
const envFiles = [`.env.${NODE_ENV}.local`, `.env.${NODE_ENV}`, ".env"];

// if (NODE_ENV !== "production") {
envFiles.forEach((file) => {
  dotenv.config({ path: path.resolve(process.cwd(), file) });
});
// }

const logLevelSchema = z.enum(["debug", "error", "warn", "log", "info"]);
export type LogLevel = z.infer<typeof logLevelSchema>;

const configSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  DB_URL: z.string().default("localhost"),
  DB_PASSWORD: z.string().default(''),

  SUPABASE_URL: z.string().default(''),
  SUPABASE_KEY: z.string().default(''),

  SHIPROCKET_BASE_URL: z.string().default(''),
  SHIPROCKET_API_ID: z.email().default(''),
  SHIPROCKET_API_SECRET: z.string().default(''),

  RATE_LIMITING_WINDOW: z.coerce.number().positive().default(60),
  JWT_SECRET: z
    .string()
    .min(1)
    .default(() => {
      console.log("No JWT secret provided. Generating Random.");
      return Crypto.randomBytes(32).toString("hex");
    }),
  LOGGING: z.coerce.boolean().default(false),
  LOG_TO_FILE: z.coerce.boolean().default(false),
  LOG_LEVELS: z
    .string()
    .transform((val) => val.split(",").map((s) => s.trim()))
    .pipe(z.array(logLevelSchema))
    .default(["debug"]),
  VALKEY_HOST: z.string().default("localhost"),
  VALKEY_PORT: z.coerce.number().positive().default(6379),
  VALKEY_USERNAME: z.string(),
  VALKEY_PASSWORD: z.string(),

  FRONTEND_DOMAIN: z.string().default('localhost'),
  FRONTEND_PORT: z.number().int().positive().default(3002),
  BACKEND_DOMAIN: z.string().default('localhost'),
  BACKEND_PORT: z.coerce.number().int().positive().default(3000),

  FRONTEND_SSL: z.string().default(() => {
    return 'http';
    // if (NODE_ENV == 'development') {
    //   return 'http';
    // } else {
    //   return 'https';
    // }
  }),

  BACKEND_SSL: z.string().default(() => {
    return 'http';
    // if (NODE_ENV == 'development') {
    //   return 'http';
    // } else {
    //   return 'https';
    // }
  }),

});

export type Config = z.infer<typeof configSchema>;

// Parse and validate
export const parseConfig = (): Config => {
  try {
    const config = configSchema.parse(process.env);
    return config;
  } catch (error) {
    if (error) {
      console.error("Invalid environment variables:");
      console.error(error);
    } else {
      console.error("Unexpected error parsing configuration:", error);
    }
    process.exit(1);
  }
};

const config = parseConfig();
export default config;
