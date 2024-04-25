import Coordinate from '../../models/coordinate';
import { RouteInfo } from '../../models/routeinfo';

export default interface GeohashService {
  exists(origin: Coordinate, destination: Coordinate): Promise<boolean>;
  store(origin: Coordinate, destination: Coordinate): Promise<RouteInfo>;

  /**
   * Tries to get the route info object first from the cache, then from storage,
   * then from google maps if not found anywhere else
   * @param origin
   * @param destination
   */
  get(origin: Coordinate, destination: Coordinate): Promise<{ route: RouteInfo; source: string }>;
}
