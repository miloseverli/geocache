import Coordinate from '../../models/coordinate';
import { RouteInfo } from '../../models/routeinfo';


export interface RouteInfoService {
  getRouteInfo(origin: Coordinate, destination: Coordinate): Promise<RouteInfo>;
}
