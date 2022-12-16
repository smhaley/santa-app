import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  worldLocations,
  northPolePrepend,
  WorldLocation,
} from "../constants/worldLocations";
import { LatLngExpression } from "leaflet";
import { iconSanta, iconHouse } from "../leaflet/icon";
import styled from "@emotion/styled";
import { UserLocation } from "../types/location.types";
import Legend from "./legend";
import TrackerTitle from "./tracker-title";
import { lineOptions } from "../leaflet/leaflet-path-style";
import { Timeouts } from "../constants/timeouts";
import {
  insertLocalPosition,
  getMinutePoints,
  getCurrentLocation,
  CurrentLocation,
} from "../utils/tracker.utils";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

const SpinnerBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
`;

interface Props {
  xmasState: boolean;
  postLocal: boolean;
  location?: UserLocation;
  setLocationOffset: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Tracker: React.FC<Props> = ({
  location,
  setLocationOffset,
  xmasState,
  postLocal,
}) => {
  const [predictedPath, setPredictedPath] = React.useState<number[][]>();
  const [currentLocation, setCurrentLocation] =
    React.useState<CurrentLocation>();
  const [worldRoute, setWorldRoute] =
    React.useState<WorldLocation[]>(worldLocations);
  const [minutePoints, setMinutePoints] =
    React.useState<{ lat: number; lon: number }[]>();
  const [minute, setMinute] = React.useState<LatLngExpression>();
  const [userLocationIndex, setUserLocationIndex] = React.useState<number>();

  React.useEffect(() => {
    const getLocation = (location: UserLocation) => {
      let worldRoute;
      let predictedMinutes;
      if (location.latitude <= 180) {
        const { localWorld, position } = insertLocalPosition(
          location,
          worldLocations
        );

        setLocationOffset(localWorld[position].gmtOffset);
        worldRoute = localWorld;

        if (worldRoute[position - 1]) {
          predictedMinutes = getMinutePoints(
            worldRoute[position - 1],
            worldRoute[position]
          );
        } else {
          predictedMinutes = getMinutePoints(
            northPolePrepend[2],
            worldRoute[position]
          );
        }
        const predictedLine = predictedMinutes.map((item) => [
          item.lat,
          item.lon,
        ]);
        setPredictedPath(predictedLine);
        setUserLocationIndex(position);
      } else {
        worldRoute = worldLocations;
      }

      const appendedWorldRoute = [...northPolePrepend, ...worldRoute];
      const currentLocation = getCurrentLocation(appendedWorldRoute);
      setWorldRoute(appendedWorldRoute);
      setCurrentLocation(currentLocation);
      if (currentLocation) {
        if (currentLocation.index < appendedWorldRoute.length - 1) {
          const points = getMinutePoints(
            currentLocation.location,
            appendedWorldRoute[currentLocation.index + 1]
          );
          const minDate = new Date();
          const minPoint = points[minDate.getUTCMinutes()];
          setMinute([minPoint.lat, minPoint.lon]);
          setMinutePoints(points);
        }
      }
    };
    location && getLocation(location);
  }, [location, setLocationOffset]);

  React.useEffect(() => {
    const positionUpdate = () => {
      const time = new Date();
      const minute = time.getUTCMinutes();
      const location = getCurrentLocation(worldRoute);

      if (currentLocation && location) {
        if (
          location.index !== currentLocation.index &&
          location.index < worldRoute.length
        ) {
          const points = getMinutePoints(
            location.location,
            worldRoute[location.index + 1]
          );
          setCurrentLocation(location);
          setMinutePoints(points);
        } else {
          if (minutePoints) {
            const point = minutePoints[minute];
            setMinute([point.lat, point.lon]);
          }
        }
      }
    };
    const interval = setInterval(() => {
      positionUpdate();
    }, Timeouts.HALF);

    return () => clearInterval(interval);
  }, [minutePoints, currentLocation, worldRoute]);

  if (minute && xmasState) {
    return (
      <Container
        maxWidth="md"
        sx={{ height: "60vh", minHeight: "300px", zIndex: 5, mb: 5 }}
      >
        <TrackerTitle
          currentLocation={currentLocation}
          postLocal={postLocal}
          from={userLocationIndex}
          community={(location && location.latitude <= 180) || false}
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
            <Popup>Santa's current location!</Popup>
          </Marker>
          {location && (
            <>
              <Marker
                position={[location?.latitude, location?.longitude]}
                icon={iconHouse}
              >
                <Popup>Your current region</Popup>
              </Marker>
              {location && location.latitude <= 180 && <Legend />}
            </>
          )}
        </MapContainer>
      </Container>
    );
  } else if (location && (!minute || !xmasState)) {
    return (
      <SpinnerBox>
        <CircularProgress color="secondary" />
      </SpinnerBox>
    );
  } else return null;
};

export default Tracker;
