import Redis from "ioredis";
import { serverConfig } from "./server.config.js";

// singleton pattern
function connectToRedis() {
    try {
        let connection;

        const redisConfig = {
            port: serverConfig.REDIS_PORT,
            host: serverConfig.REDIS_HOST,
            maxRetriesPerRequest: null, // Disable automatic reconnection
        }
        
        return () => {
            if(!connection) {
                connection = new Redis(redisConfig);
            }

            return connection;
        }
    } catch (error) {
        console.log("Error connecting to redis", error);
        throw error;
    }
}

export const getRedisConnectionObject = connectToRedis();