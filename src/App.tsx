import React from "react";
import "./App.css";
import Navigation from "./components/navigation";
import Background from "./components/background";
import SantaTracker from "./components/santa-tracker";
import FAQ from "./components/faq";
import styled from "@emotion/styled";
import Loader from "./components/loading";
import { Timeouts } from "./constants/timeouts";
import Snowfall from "react-snowfall";
import { isApplicationXmasState } from "./utils/count-down.utils";

const DisplayContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
`;

const CoreContainer = styled.div<{ show: boolean }>`
  visibility: ${(props) => (props.show ? "block" : "hidden")};
`;

const App = () => {
  const [location, setLocation] = React.useState("tracker");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const isXmas = isApplicationXmasState();
    const timeout = isXmas ? Timeouts.APP_MOUNT_XMAS : Timeouts.APP_MOUNT;
    const loader = setTimeout(() => {
      setLoading(false);
    }, timeout);
    return () => clearTimeout(loader);
  }, []);

  return (
    <>
      <Snowfall style={{ zIndex: -1 }} />
      {loading && <Loader />}
      <CoreContainer show={!loading}>
        <Navigation setLocation={setLocation} />
        <DisplayContainer show={location === "tracker"}>
          <SantaTracker />
        </DisplayContainer>
        <DisplayContainer show={location === "faq"}>
          <FAQ />
        </DisplayContainer>
        <Background />
      </CoreContainer>
    </>
  );
};

export default App;
