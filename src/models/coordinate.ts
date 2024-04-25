export default interface Coordinate {
  latitude: number;
  longitude: number;
}

export function coordToString(c: Coordinate): string {
  return c.latitude.toFixed(4) + ',' + c.longitude.toFixed(4);
}

export function hashRoute(origin: Coordinate, destination: Coordinate): string {
  return coordToString(origin) + ':' + coordToString(destination);
}
