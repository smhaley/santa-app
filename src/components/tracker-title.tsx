import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";

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
  community?: string;
}

const TrackerTitle: React.FC<TrackerTitleProps> = ({ community }) => {
  let communityName: string | undefined = undefined;

  if (typeof community === "string") {
    communityName = community.length ? community : "Unknown Community Name";
  }
  return (
    <TrackTitleContainer>
      <Box sx={{ m: 2, p: 1 }}>
        {communityName ? (
          <>
            <h3>
              Currently Tracking Santa to a Community in your Region: <b>{communityName}</b>
            </h3>

            <p>
              Your region is used to predict Santa's final path to your
              region!
            </p>
          </>
        ) : (
          <>
            <h2>Currently we are unable to find your location.</h2>
            <p>
              We will be unable to predict Santa's final path through you
              location, but he will be sure not to miss the stop!
              <br />
              Please enjoy the map of Santa's journey around the world!
            </p>
          </>
        )}
      </Box>
    </TrackTitleContainer>
  );
};

export default TrackerTitle;
