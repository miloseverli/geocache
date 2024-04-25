import Coordinate from '../../models/coordinate';
import { RouteInfo } from '../../models/routeinfo';

export interface RouteInfoStorage {
    get(origin: Coordinate, destination: Coordinate): Promise<RouteInfo | null>;
    put(route: RouteInfo): Promise<RouteInfo>;
}
