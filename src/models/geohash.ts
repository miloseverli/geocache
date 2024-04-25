import Coordinate from "./coordinate";

export interface Geohash {
    hash: string;
    coordinates: Coordinate
}

export interface GeohashCombination {
    origin: Geohash;
    destination: Geohash;
}