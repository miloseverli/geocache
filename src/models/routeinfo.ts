import Coordinate from "./coordinate";

export interface RouteInfo {
    origin: Coordinate;
    destination: Coordinate;
    distance: number;
    duration: number;
}