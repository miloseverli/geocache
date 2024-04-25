import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import Coordinate from '../models/coordinate';
import { RouteInfo } from '../models/routeinfo';
import { RouteInfoService } from './interfaces/routeinfoservice';


const GOOGLE_KEY = process.env.GOOGLE_KEY;

export default class GoogleRouteInfoService implements RouteInfoService {
  async getRouteInfo(origin: Coordinate, destination: Coordinate): Promise<RouteInfo> {
    const client = new Client();
    if (!GOOGLE_KEY) {
      throw new Error('bad google config');
    }

    const dm = await client.distancematrix({
      params: { origins: [origin], destinations: [destination], key: GOOGLE_KEY, mode: TravelMode.driving },
    });
    if (dm.status != 200) {
      throw new Error('bad google result');
    }
    const distance = dm.data.rows[0].elements[0].distance.value;
    const duration = dm.data.rows[0].elements[0].duration.value;
    if (!distance || !duration) {
      throw new Error('bad google result');
    }
    return { distance: Math.round(distance) / 1000, duration, origin, destination };
  }
}
