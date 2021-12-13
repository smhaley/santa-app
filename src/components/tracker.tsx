import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { worldLocations, WorldLocation } from "../constants/worldLocations";
import { LatLngExpression } from "leaflet";
import { iconSanta, iconHouse } from "../leaflet/icon";
import styled from "@emotion/styled";
import { UserLocation } from "../types/location.types";
import Legend from "./legend";
import TrackerTitle from "./tracker-title";
import { lineOptions } from "../leaflet/leaflet-path-style";
import {
  insertLocalPosition,
  getMinutePoints,
  getCurrentLocation,
  CurrentLocation,
} from "../utils/tracker.utils";

//todo rm
// const testLine = worldRoute.map((val) => [val.lat, val.lon]);

const MINUTE_MS = 1000;

const SpinnerBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

interface Props {
  xmasState: boolean;
  location?: UserLocation;
  setLocationOffset: React.Dispatch<React.SetStateAction<number | undefined>>;
}
const Tracker: React.FC<Props> = ({
  location,
  setLocationOffset,
  xmasState,
}) => {
  const [predictedPath, setPredictedPath] = React.useState<number[][]>();
  const [currentLocation, setCurrentLocation] =
    React.useState<CurrentLocation>();
  const [worldRoute, setWorldRoute] =
    React.useState<WorldLocation[]>(worldLocations);
  const [minutePoints, setMinutePoints] =
    React.useState<{ lat: number; lon: number }[]>();
  const [minute, setMinute] = React.useState<LatLngExpression>();

  React.useEffect(() => {
    const getLocation = (location: UserLocation) => {
      let worldRoute;
      if (location.latitude <= 180) {
        const { localWorld, position } = insertLocalPosition(
          location,
          worldLocations
        );
        worldRoute = localWorld;
        setLocationOffset(localWorld[position].gmtOffset);
        const predictedMinutes = getMinutePoints(
          worldRoute[position - 1],
          worldRoute[position]
        );

        const predictedLine = predictedMinutes.map((item) => [
          item.lat,
          item.lon,
        ]);
        console.log(predictedLine);
        setPredictedPath(predictedLine);
      } else {
        worldRoute = worldLocations;
      }
      const currentLocation = getCurrentLocation(worldRoute);
      setWorldRoute(worldRoute);
      if (currentLocation) {
        if (currentLocation.index < worldRoute.length - 1) {
          const points = getMinutePoints(
            currentLocation.location,
            worldRoute[currentLocation.index + 1]
          );
          setMinutePoints(points);
        }
      }
    };
    location && getLocation(location);
  }, [location, setLocationOffset]);

  React.useEffect(() => {
    const positionUpdate = () => {
      const time = new Date();

      //todo: swap to minutes
      const second = time.getUTCSeconds();

      if (second === 0) {
        if (currentLocation) {
          if (currentLocation.index + 1 < worldRoute.length - 1) {
            const index = currentLocation.index + 1;
            const location = worldRoute[index];
            const points = getMinutePoints(location, worldRoute[index + 1]);
            setCurrentLocation({ location, index });
            setMinutePoints(points);
          }
          // else if (currentLocation.index + 1 === worldRoute.length - 1) {
          //   setXmas(false);
          // }
        }
      } else {
        if (minutePoints) {
          const point = minutePoints[second];
          setMinute([point.lat, point.lon]);
        }
      }
    };
    const interval = setInterval(() => {
      positionUpdate();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [minutePoints, currentLocation, worldRoute]);

  if (minute && xmasState) {
    return (
      <Container
        maxWidth="md"
        sx={{ height: "60vh", minHeight: "300px", zIndex: 5, mb: 5 }}
      >
        <TrackerTitle
          community={
            location && location.latitude <= 180 ? location.city : undefined
          }
        />

        <MapContainer
          center={minute}
          zoom={4}
          scrollWheelZoom={true}
          style={{ height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {predictedPath && (
            <Polyline
              pathOptions={lineOptions}
              positions={predictedPath as LatLngExpression[]}
            />
          )}
          <Marker position={minute} icon={iconSanta}>
            <Popup>Santa current location!</Popup>
          </Marker>
          {location && (
            <>
              <Marker
                position={[location?.latitude, location?.longitude]}
                icon={iconHouse}
              >
                <Popup>Your current location</Popup>
              </Marker>
              {location && location.latitude <= 180 && <Legend />}
            </>
          )}
        </MapContainer>
        <div style={{ height: 20 }} />
      </Container>
    );
  } else if (location && (!minute || !xmasState)) {
    return (
      <SpinnerBox>
        <CircularProgress color="secondary" />
      </SpinnerBox>
    );
  } else return <></>;
};

export default Tracker;
