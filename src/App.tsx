import React from "react";
import "./App.css";
import Tracker from "./components/tracker";
import AppBar from "./components/navigation";
import CountDown from "./components/count-down";
import { getLocation } from "./utils/app.utils";
import Background from "./components/background";
import { UserLocation } from "./types/location.types";
import Loader from "./components/loading";
import styled from "@emotion/styled";

type ContainerProps = {
  show: boolean;
};
const CoreContainer = styled.div<ContainerProps>`
  visibility: ${(props) => (props.show ? "block" : "hidden")};
`;

function App() {
  const [location, setLocation] = React.useState<UserLocation>();
  const [xmasState, setXmasState] = React.useState(false);
  const [locationOffset, setLocationOffset] = React.useState<number>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getLocation(setLocation);
    const loader = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(loader);
  }, []);
  return (
    <>
      <AppBar />

      <CoreContainer show={!loading}>
        <CountDown
          setXmasState={setXmasState}
          locationOffset={locationOffset}
          xmasState={xmasState}
        />
        {xmasState && (
          <Tracker
            location={location}
            xmasState={xmasState}
            setLocationOffset={setLocationOffset}
          />
        )}
      </CoreContainer>

      {loading && <Loader />}
      <Background />
    </>
  );
}

export default App;
