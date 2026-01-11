import { ConnectionOptions } from "bullmq";

// redis connection config
const redisConfig: ConnectionOptions = {
  host: Bun.env.REDIS_HOST,
  port: Number(Bun.env.REDIS_PORT), // Cast to number
  username: Bun.env.REDIS_USERNAME || undefined,
  password: Bun.env.REDIS_PASSWORD || undefined,
};

export default redisConfig;
