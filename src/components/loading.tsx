import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { ReactComponent as Santa } from "../assets/santa.svg";

const fade = keyframes`
  50% { opacity: 1; }
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 40%;
  margin-left: calc(50% - 50px);
  svg {
    width: 100px;
    animation: ${fade} 0.85s ease-in-out forwards infinite;
    opacity: 0;
  }
`;
const Loader = () => {
  return (
    <LoaderContainer>
      <Santa />
    </LoaderContainer>
  );
};

export default Loader;
