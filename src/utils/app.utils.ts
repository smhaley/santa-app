import { UserLocation } from "../types/location.types";

type SetLocation = React.Dispatch<
  React.SetStateAction<UserLocation | undefined>
>;

export const nullLocation: UserLocation = {
  city: "",
  country_code: "",
  country_name: "",
  latitude: 999,
  longitude: 999,
  postal: "",
  state: "",
};

export const getClientLocation = async (setLocation: SetLocation) => {
  if ("geolocation" in navigator) {
    return navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        ...nullLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
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
