import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

console.log("this is the redis client");
console.log("REDIS_HOST", process.env.REDIS_HOST);
console.log("REDIS_PORT", process.env.REDIS_PORT);
console.log("REDIS_PASSWORD", process.env.REDIS_PASSWORD);
console.log("REDIS_URL", process.env.REDIS_URL);

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
});
