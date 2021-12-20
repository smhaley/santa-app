import React from "react";
import Tracker from "./tracker";
import CountDown from "./count-down";
import { getClientLocation } from "../utils/app.utils";
import { UserLocation } from "../types/location.types";
import Loader from "./loading";
import styled from "@emotion/styled";
import {Timeouts} from '../constants/timeouts'

type ContainerProps = {
  show: boolean;
};
const CoreContainer = styled.div<ContainerProps>`
  visibility: ${(props) => (props.show ? "block" : "hidden")};
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

  React.useEffect(() => {
    getClientLocation(setLocation);
  }, []);

  React.useEffect(() => {
    const loader = setTimeout(() => {
      location && setLoading(false);
    }, Timeouts.POST_LOCATION);
    return () => clearTimeout(loader);
  }, [location]);
  return (
    <>
      <CoreContainer show={!loading}>
        <CountDown
          setXmasState={setXmasState}
          setPostLocal={setPostLocal}
          locationOffset={locationOffset}
          xmasState={xmasState}
        />
        {xmasState && (
          <TrackerContainer>
            <Tracker
              location={location}
              postLocal={postLocal}
              xmasState={xmasState}
              setLocationOffset={setLocationOffset}
            />
          </TrackerContainer>
        )}
      </CoreContainer>

      {loading && <Loader />}
    </>
  );
};

export default SantaTracker;
