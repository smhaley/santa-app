import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import { worldLocations } from "../constants/worldLocations";
import { CurrentLocation } from "../utils/tracker.utils";

const TrackTitleContainer = styled(Paper)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;

  h3 {
    opacity: 1;
    font-size: 1.3rem;
    font-weight: 400;
  }

  .text-box {
    padding: 10px;
  }
`;

interface TrackerTitleProps {
  community?: boolean;
  from?: number;
  postLocal: boolean;
  currentLocation?: CurrentLocation;
}

const TrackerTitle: React.FC<TrackerTitleProps> = ({
  community,
  from,
  postLocal,
  currentLocation,
}) => {
  const fromLocation =
    from && worldLocations[from - 1]
      ? worldLocations[from - 1].name
      : "The North Pole";

  let communityMessage: undefined | React.ReactNode;
  if (community && !postLocal) {
    communityMessage = (
      <>
        <h3>We are Currently Tracking Santa to your Community!</h3>
        {from && (
          <>
            <p>
              It looks like Santa will be in <b> {fromLocation} </b>
              before dashing off to you!
            </p>
          </>
        )}
      </>
    );
  } else if (community && postLocal) {
    communityMessage = (
      <>
        <h3>We hope you had a Merry Christmas Morning!</h3>
        <p>Enjoy watching the rest of Santa's trip!</p>
      </>
    );
  }

  return (
    <TrackTitleContainer>
      <Box sx={{ m: 2, p: 1 }}>
        {community ? (
          <> {communityMessage}</>
        ) : (
          <>
            <h3>We are currently tracking Santa's worldwide trip!</h3>
            <p>
              Please enjoy the map of Santa's journey around the world!
            </p>
          </>
        )}
        {currentLocation && (
          <p>
            At the moment, Santa is heading toward{" "}
            {<b>{currentLocation.location.nextStop}</b>}.
          </p>
        )}
      </Box>
    </TrackTitleContainer>
  );
};

export default TrackerTitle;
