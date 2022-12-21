import React from "react";
import Tracker from "./tracker";
import CountDown from "./count-down";
import {
  getClientLocation,
  nullLocation,
  getLocationFromStorage,
} from "../utils/app.utils";
import { UserLocation } from "../types/location.types";
import Loader from "./loading";
import styled from "@emotion/styled";
import { Timeouts } from "../constants/timeouts";

type CountDownContainerProps = {
  dim: boolean;
};

const CountDownContainer = styled.div<CountDownContainerProps>`
  opacity: ${(props) => (props.dim ? 0.4 : "hidden")};
`;

const TrackerContainer = styled.div`
  margin-bottom: 250px;
`;

const SantaTracker = () => {
  const [location, setLocation] = React.useState<UserLocation | undefined>();
  const [xmasState, setXmasState] = React.useState(false);
  const [locationOffset, setLocationOffset] = React.useState<number>();
  const [postLocal, setPostLocal] = React.useState<boolean>(false);
  const [locationUpdate, setLocationUpdate] = React.useState(false);

  React.useEffect(() => {
    const existingLocation = getLocationFromStorage();
    if (existingLocation) {
      setLocation(existingLocation);
    } else {
      setLocation(nullLocation);
    }
  }, []);

  React.useLayoutEffect(() => {
    if (xmasState && location && location.latitude > 180) {
      getClientLocation(setLocation, setLocationUpdate);
    }
  }, [xmasState, location]);

  React.useLayoutEffect(() => {
    if (location && location.latitude <= 180 && locationUpdate) {
      const loader = setTimeout(() => {
        setLocationUpdate(false);
      }, Timeouts.POST_LOCATION);
      return () => clearTimeout(loader);
    }
  }, [location, locationUpdate]);

  let tracker: React.ReactNode;

  if (locationUpdate) {
    tracker = <Loader />;
  } else {
    tracker = (
      <Tracker
        location={location}
        postLocal={postLocal}
        xmasState={xmasState}
        setLocationOffset={setLocationOffset}
      />
    );
  }

  return (
    <>
      <CountDownContainer dim={locationUpdate}>
        <CountDown
          setXmasState={setXmasState}
          setPostLocal={setPostLocal}
          locationOffset={locationOffset}
          xmasState={xmasState}
        />
      </CountDownContainer>
      {xmasState && <TrackerContainer>{tracker}</TrackerContainer>}
    </>
  );
};

export default SantaTracker;
