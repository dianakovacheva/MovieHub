import { createClient } from "redis";

// export const redis = createClient({ url: process.env.REDIS_URL });

// redis.on("ready", () => console.log("Redis client is ready!"));

// redis.on("end", () => console.log("Redis connection has closed."));

// redis.on("error", (err) => console.log("Redis client error.", err));

// await redis.connect().catch(console.error);

export const redis = createClient({ url: process.env.REDIS_URL });

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect();
