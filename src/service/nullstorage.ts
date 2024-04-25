import Coordinate from '../models/coordinate';
import { RouteInfo } from '../models/routeinfo';
import { RouteInfoStorage } from './interfaces/routeinfostorage';

export class NullStorage implements RouteInfoStorage {
  async get(origin: Coordinate, destination: Coordinate): Promise<RouteInfo | null> {
    return null;
  }
  async put(route: RouteInfo): Promise<RouteInfo> {
    return route;
  }
}
