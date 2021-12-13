import L from "leaflet";
import santa from "../assets/santa.svg";
import house from "../assets/house.svg";

export const iconSanta = new L.Icon({
  iconSize: new L.Point(60, 75),
  iconUrl: santa,
});

export const iconHouse = new L.Icon({
  iconSize: new L.Point(40, 50),
  iconUrl: house,
});
