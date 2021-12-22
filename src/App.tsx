import React from "react";
import "./App.css";
import Navigation from "./components/navigation";
import Background from "./components/background";
import SantaTracker from "./components/santa-tracker";
import FAQ from "./components/faq";
import styled from "@emotion/styled";


const DisplayContainer = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? "block" : "none")};
`;

const App = () => {
  const [location, setLocation] = React.useState("tracker");
  return (
    <>
      <Navigation setLocation={setLocation} />
      <DisplayContainer show={location === "tracker"}>
        <SantaTracker />
      </DisplayContainer>
      <DisplayContainer show={location === "faq"}>
        <FAQ />
      </DisplayContainer>
      <Background />
    </>
  );
};

export default App;
