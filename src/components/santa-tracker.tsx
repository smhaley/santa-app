import React from "react";
import Tracker from "./tracker";
import CountDown from "./count-down";
import { getClientLocation, nullLocation } from "../utils/app.utils";
import { UserLocation } from "../types/location.types";
import Loader from "./loading";
import styled from "@emotion/styled";
import { Timeouts } from "../constants/timeouts";

type ContainerProps = {
  show: boolean;
};

type CountDownContainerProps = {
  dim: boolean;
};
const CoreContainer = styled.div<ContainerProps>`
  visibility: ${(props) => (props.show ? "block" : "hidden")};
`;

const CountDownContainer = styled.div<CountDownContainerProps>`
  opacity: ${(props) => (props.dim ? 0.4 : "hidden")};
`;

const TrackerContainer = styled.div`
  margin-bottom: 250px;
`;

const SantaTracker = () => {
  const [location, setLocation] = React.useState<UserLocation>();
  const [xmasState, setXmasState] = React.useState(false);
  const [locationOffset, setLocationOffset] = React.useState<number>();
  const [postLocal, setPostLocal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);
  const [locationUpdate, setLocationUpdate] = React.useState(false);

  React.useEffect(() => {
    setLocation(nullLocation);
    getClientLocation(setLocation);
    const loader = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(loader);
  }, []);

  React.useLayoutEffect(() => {
    if (location && location.latitude <= 180) {
      setLocationUpdate(true);
      const loader = setTimeout(() => {
        setLocationUpdate(false);
      }, 2000);
      return () => clearTimeout(loader);
    }
  }, [location]);

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
      <CoreContainer show={!loading}>
        <CountDownContainer dim={locationUpdate}>
          <CountDown
            setXmasState={setXmasState}
            setPostLocal={setPostLocal}
            locationOffset={locationOffset}
            xmasState={xmasState}
          />
        </CountDownContainer>
        {xmasState && <TrackerContainer>{tracker}</TrackerContainer>}
      </CoreContainer>

      {loading && <Loader />}
    </>
  );
};

export default SantaTracker;
