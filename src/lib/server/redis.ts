import Redis from 'ioredis';
import { building } from '$app/environment';

let redisInstance: Redis | null = null;

function createRedis() {
    if (building) return null as unknown as Redis;

    const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
    const instance = new Redis(REDIS_URL, {
        maxRetriesPerRequest: null,
        lazyConnect: true, // Não conecta imediatamente
        retryStrategy: (times) => Math.min(times * 50, 2000)
    });

    instance.on('error', (err: any) => {
        if (err.code !== 'ECONNREFUSED') {
            console.error('Redis Client Error', err);
        }
    });

    return instance;
}

export const redis = createRedis();
