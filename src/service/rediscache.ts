import { createClient } from 'redis';
import Coordinate, { hashRoute } from '../models/coordinate';
import { RouteInfo } from '../models/routeinfo';
import { RouteInfoStorage } from './interfaces/routeinfostorage';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const EXPIRATION = process.env.CACHE_EXPIRATION ? parseInt(process.env.CACHE_EXPIRATION) : 100000;

export class RedisCache implements RouteInfoStorage {
  redisClient;

  constructor() {
    this.redisClient = createClient({ url: REDIS_URL });
  }

  async get(origin: Coordinate, destination: Coordinate): Promise<RouteInfo | null> {
    if (!this.redisClient.isReady) await this.redisClient.connect();
    const hash = hashRoute(origin, destination);
    const route = await this.redisClient.get(hash);
    if (route) {
      return JSON.parse(route) as RouteInfo;
    } else {
      return null;
    }
  }

  async put(route: RouteInfo): Promise<RouteInfo> {
    if (!this.redisClient.isReady) {
      await this.redisClient.connect();
    }
    const hash = hashRoute(route.origin, route.destination);

    await this.redisClient.set(hash, JSON.stringify(route), { EX: EXPIRATION });
    return route;
  }
}
