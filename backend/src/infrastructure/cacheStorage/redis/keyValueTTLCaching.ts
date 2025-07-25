import { createClient, RedisClientType } from "redis";
import { IkeyValueTTLCaching } from "../../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";

export class KeyValueTTLCaching implements IkeyValueTTLCaching {
    private redisClient: RedisClientType;
    constructor() {
        this.redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        })

        this.redisClient.on("error", (err) => console.log("Error occured on redis database", err));
        this.redisClient.on("connect", () => console.log("Redis connected succesfully"));
        this.redisClient.on("disconnect", () => console.log("Redis disconnected"))
    }

    async connect() {
        if (!this.redisClient.isOpen) {
            await this.redisClient.connect()
        }
    }

    async setData(key: string, time: number, value: string): Promise<void> {
        if (!this.redisClient.isOpen) {
            await this.connect()
        }
        this.redisClient.setEx(key, time, value);
    }

    async getData(key: string): Promise<string | null> {
        if (!this.redisClient.isOpen) {
            await this.connect()
        }
        return await this.redisClient.get(key);
    }

    async deleteData(key: string): Promise<void> {
        if (!this.redisClient.isOpen) {
            await this.connect()
        }
        await this.redisClient.del(key)
    }
} 