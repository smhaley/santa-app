import React from "react";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import { ReactComponent as Path } from "../assets/dashed-line.svg";

const LegendContainer = styled(Box)`
  padding: 5px;
  opacity: 0.9;
  background: white;
  height: 60px;
  width: 320px;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 500;
  svg {
    margin-top: -50px;
    width: 320px;
  }
`;

const Legend = () => {
  return (
    <div className={"leaflet-bottom leaflet-right"}>
      <div className="leaflet-control leaflet-bar">
        <LegendContainer>
          Santa's <b>predicted</b> final path to your community:
          <Path />
        </LegendContainer>
      </div>
    </div>
  );
};

export default Legend;
