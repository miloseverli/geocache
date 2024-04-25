import Coordinate from '../models/coordinate';
import { RouteInfo } from '../models/routeinfo';
import GeohashService from './interfaces/geohashservice';
import GoogleRouteInfoService from './googlemaps';
import { RouteInfoService } from './interfaces/routeinfoservice';
import { RedisCache } from './rediscache';
import { RouteInfoStorage } from './interfaces/routeinfostorage';
import { NullStorage } from './nullstorage';

export default class GoogleGeohashService implements GeohashService {
  routeInfoService: RouteInfoService;
  cache: RouteInfoStorage;
  storage: RouteInfoStorage;

  constructor() {
    this.routeInfoService = new GoogleRouteInfoService();
    this.cache = new RedisCache();
    this.storage = new NullStorage();
  }

  private async getFromStorage(origin: Coordinate, destination: Coordinate): Promise<RouteInfo | null> {
    return null;
  }

  private async putInStorage(route: RouteInfo): Promise<RouteInfo> {
    return route;
  }

  async exists(origin: Coordinate, destination: Coordinate) {
    let output = await this.cache.get(origin, destination);
    if (!output) {
      output = await this.getFromStorage(origin, destination);
    }
    return output != null;
  }

  async store(origin: Coordinate, destination: Coordinate) {
    const route = await this.routeInfoService.getRouteInfo(origin, destination);
    await Promise.all([this.cache.put(route), this.putInStorage]);
    return route;
  }

  async get(origin: Coordinate, destination: Coordinate) {
    let route = await this.cache.get(origin, destination);
    let source = 'CACHE';
    if (!route) {
      route = await this.getFromStorage(origin, destination);
      source = 'STORAGE';
      if (!route) {
        route = await this.store(origin, destination);
        source = 'GOOGLE';
        if (!route) {
          throw new Error("can't find anywhere");
        }
      }
    }
    return { route, source };
  }
}
