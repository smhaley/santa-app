import React from "react";
import { ReactComponent as Landscape } from "../assets/landscape.svg";
import sleigh from "../assets/sleigh.png";
import tree from "../assets/tree.png";
import reindeer from "../assets/reindeer.png";
import styled from "@emotion/styled";

const LandscapeContainer = styled.div`
  svg {
    z-index: -3;
    position: fixed;
    bottom: 0;
    height: 30%;
    left: 0;
    width: 100%;
  }
`;

const TreeContainer1 = styled.div`
  position: fixed;
  bottom: 20px;
  left: 10%;
  z-index: -2;
  img {
    z-index: -2;
    width: 140px;
    height: 100%;
  }
  .shadow {
    bottom: 11px;
    position: absolute;
    left: 32%;
    width: 50px;
    height: 10px;
    z-index: -2;
    opacity: 0.6;
    background: radial-gradient(#7e7c7c, #f3ebeb);
    border-radius: 50%;
  }
  @media screen and (min-width: 540px) {
    left: 30%;
  }
`;

const TreeContainer2 = styled.div`
  position: fixed;
  bottom: 20px;
  left: 45%;
  z-index: -2;
  img {
    width: 90px;
    height: 100%;
  }
  .shadow {
    bottom: 8px;
    position: absolute;
    left: 28%;
    width: 40px;
    height: 8px;
    z-index: -3;
    opacity: 0.6;
    background: radial-gradient(#7e7c7c, #f3ebeb);
    border-radius: 50%;
  }
  @media screen and (min-width: 540px) {
    left: 55%;
  }
  @media screen and (min-height: 575px) {
    bottom: 40px;
  }
`;

const SleighContainer = styled.div`
  overflow-y: none;
  display: none;
  position: fixed;
  bottom: 0px;
  left: 10%;
  z-index: -2;
  img {
    width: 150px;
    height: 100%;
  }
  .shadow {
    bottom: 27px;
    opacity: 0.4;
    position: absolute;
    left: 12px;
    width: 120px;
    height: 20px;
    z-index: -3;
    opacity: 0.6;
    background: radial-gradient(#7e7c7c, #f3ebeb);
    border-radius: 50%;
  }
  @media screen and (min-width: 540px) {
    display: block;
  }
  @media screen and (min-height: 575px) {
    bottom: 40px;
  }
`;

const DeerContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 45%;
  z-index: -2;
  img {
    width: 140px;
    height: 100%;
  }
  .shadow {
    bottom: 5px;
    position: absolute;
    left: 20%;
    width: 90px;
    height: 15px;
    z-index: -7;
    opacity: 0.6;
    background: radial-gradient(#7e7c7c, #f3ebeb);
    border-radius: 50%;
  }
  @media screen and (min-width: 540px) {
    left: 65%;
  }
`;

const TreeContainer3 = styled.div`
  position: fixed;
  bottom: 10px;
  left: 75%;
  z-index: -2;
  img {
    z-index: -2;
    width: 110px;
    height: 100%;
  }
  .shadow {
    bottom: 9px;
    position: absolute;
    left: 31%;
    width: 40px;
    height: 8px;
    z-index: -3;
    opacity: 0.6;
    background: radial-gradient(#7e7c7c, #f3ebeb);
    border-radius: 50%;
  }
  @media screen and (min-width: 540px) {
    left: 85%;
  }
`;

const Background = () => {
  return (
    <>
      <TreeContainer1>
        <div className="shadow" />
        <img src={tree} alt="tree1" />
      </TreeContainer1>
      <TreeContainer2>
        <div className="shadow" />
        <img src={tree} alt="tree2" />
      </TreeContainer2>
      <TreeContainer3>
        <div className="shadow" />
        <img src={tree} alt="tree3" />
      </TreeContainer3>
      <SleighContainer>
        <div className="shadow" />
        <img src={sleigh} alt="sleigh" />
      </SleighContainer>
      <DeerContainer>
        <div className="shadow" />
        <img src={reindeer} alt="deer" />
      </DeerContainer>
      <LandscapeContainer>
        <Landscape />
      </LandscapeContainer>
    </>
  );
};

export default Background;
