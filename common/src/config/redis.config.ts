import config from "./config.js";
import { RedisOptions } from "ioredis";

const redisConfig: RedisOptions = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  username: config.REDIS_USERNAME,
  password: config.REDIS_PASSWORD
};

export { redisConfig };
