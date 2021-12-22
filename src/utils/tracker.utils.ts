import { WorldLocation } from "../constants/worldLocations";
import { UserLocation } from "../types/location.types";
import { Christmas } from "../constants/christmas";

export type CurrentLocation = {
  location: WorldLocation;
  index: number;
};

export const insertLocalPosition = (
  localPosition: UserLocation,
  worldLocations: WorldLocation[]
) => {
  let localWorld = [...worldLocations];
  let position: number = -1;

  if (localPosition.longitude >= localWorld[0].lon) {
    localWorld[0] = {
      ...localWorld[0],
      lat: localPosition.latitude,
      lon: localPosition.longitude,
    };
    position = 0;
  } else if (localPosition.longitude <= localWorld[localWorld.length - 1].lon) {
    const endIndex = localWorld.length - 1;
    localWorld[endIndex] = {
      ...localWorld[endIndex],
      lat: localPosition.latitude,
      lon: localPosition.longitude,
    };
    position = localWorld.length - 1;
  }

  localWorld.forEach((pos, index) => {
    if (localWorld[index + 1]) {
      if (
        localPosition.longitude <= pos.lon &&
        localPosition.longitude > localWorld[index + 1].lon
      ) {
        localWorld[index] = {
          ...localWorld[index],
          lat: localPosition.latitude,
          lon: localPosition.longitude,
        };
        position = index;
      }
    } else if (localPosition.longitude <= pos.lon) {
      localWorld[index] = {
        ...localWorld[index],
        lat: localPosition.latitude,
        lon: localPosition.longitude,
      };
      position = index;
    }
  });
  return { localWorld, position };
};

export const getMinutePoints = (from: WorldLocation, to: WorldLocation) => {
  const delta = (from.lon - to.lon) / 60;
  const slope = (from.lat - to.lat) / (from.lon - to.lon);
  let out = [];
  for (let i = 0; i < 60; i++) {
    const lon: number = i === 0 ? from.lon : out[i - 1].lon - delta;
    const lat: number = i === 0 ? from.lat : slope * (lon - to.lon) + to.lat;
    out.push({ lat, lon });
  }
  return out;
};

export const getCurrentLocation = (
  worldLocations: WorldLocation[]
): CurrentLocation | undefined => {
  let currentLocation: CurrentLocation | undefined = undefined;
  worldLocations.forEach((location, index) => {
    const currentUTC = Math.floor(
      Date.now() / 1000 + location.gmtOffset * 3600
    );
    const date = new Date(currentUTC * 1000);

    const localHours = date.getUTCHours();
    const localDay = date.getUTCDate();
    const localMonth = date.getUTCMonth();

    if (localDay === Christmas.day && localMonth === Christmas.month) {
      if (localHours >= Christmas.timeBegin && localHours < Christmas.timeEnd) {
        currentLocation = { location, index };
      } else if (localHours === index) {
        currentLocation = { location, index };
      }
    }
  });
  return currentLocation;
};

export const range = (x: number, y: number) => {
  let out = [];
  for (let i = x; i <= y; i++) out.push(i);
  return out;
};
