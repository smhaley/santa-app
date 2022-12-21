import { UserLocation } from "../types/location.types";

type SetLocation = React.Dispatch<
  React.SetStateAction<UserLocation | undefined>
>;

type SetLocationUpdate = React.Dispatch<React.SetStateAction<boolean>>;

export const nullLocation: UserLocation = {
  city: "",
  country_code: "",
  country_name: "",
  latitude: 999,
  longitude: 999,
  postal: "",
  state: "",
};

export const getClientLocation = async (
  setLocation: SetLocation,
  setLocationUpdate?: SetLocationUpdate
) => {
  if ("geolocation" in navigator) {
    return navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        ...nullLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setUserLocationToStorage(userLocation);
      setLocation(userLocation);
      setLocationUpdate && setLocationUpdate(true);
    });
  }
};

export const userLocationCall = async (setLocation: SetLocation) => {
  const res = await fetch("https://geolocation-db.com/json/");
  if (!res.ok) throw new Error("bad resp");
  const location: UserLocation = await res.json();
  setLocation(location);
};

export const getLocation = async (setLocation: SetLocation) => {
  try {
    getClientLocation(setLocation);
  } catch {
    setLocation(nullLocation);
  }
};

export const setUserLocationToStorage = (location: UserLocation) => {
  window.localStorage.setItem(
    "location",
    JSON.stringify({ ...location, date: new Date() })
  );
};

export const getLocationFromStorage = (): UserLocation | undefined => {
  const userLocation = window.localStorage.getItem("location");
  if (userLocation) {
    try {
      const location = JSON.parse(userLocation);
      const setDate = new Date(location.date);
      const currentDate = new Date();
      if (currentDate.getFullYear() === setDate.getFullYear()) {
        return location;
      }
    } catch (e) {
      console.error(e);
    }
  }
};
