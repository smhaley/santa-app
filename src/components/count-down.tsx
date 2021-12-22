import React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import { getTimeDelta, isXmas, isTimeNonZero } from "../utils/count-down.utils";
import { Timeouts } from "../constants/timeouts";
import { countdownMessages as messageText } from "../content/count-down.content";

export type Time = {
  [key: string]: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownProps = {
  xmas?: boolean;
};

const Counter = styled(Paper)`
  padding-top: 10px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: white;
`;

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CounterLi = styled.li<CountdownProps>`
  display: inline-block;
  font-size: 0.8em;
  list-style-type: none;
  padding: 1em;
  text-transform: uppercase;
  text-align: center;

  span {
    display: block;
    font-size: 2.25rem;
  }

  @media screen and (min-width: 360px) {
    font-size: 0.9em;
    span {
      font-size: 2.9rem;
    }
  }
  ${(props) =>
    !props.xmas &&
    `
      @media screen and (min-width: 470px) {
        font-size: 1.25em;
        span {
          font-size: 3.5rem;
        }
      }  
      @media screen and (min-width: 560px) {
        font-size: 1.5em;
        span {
          font-size: 4.5rem;
        }
  `}
`;

const Title = styled.div<CountdownProps>`
  text-align: center;
  margin-bottom: -10px;
  text-transform: uppercase;
  h1 {
    font-size: 1rem;
    font-weight: 600;
  }
  @media screen and (min-width: 360px) {
    font-size: 1.2em;
    span {
      font-size: 2.9rem;
    }
  }
  @media screen and (min-width: 470px) {
    h1 {
      font-size: 1.25rem;
    }
  }
  @media screen and (min-width: 560px) {
    h1 {
      font-size: 1.65rem;
    }
  }
`;

const OverTitle = styled.div`
  text-align: center;
  padding: 10px;
  text-transform: uppercase;
`;

interface CountDownProps {
  setXmasState: React.Dispatch<React.SetStateAction<boolean>>;
  setPostLocal: React.Dispatch<React.SetStateAction<boolean>>;
  locationOffset?: number;
  xmasState: boolean;
}
const CountDown: React.FC<CountDownProps> = ({
  setXmasState,
  locationOffset,
  xmasState,
  setPostLocal,
}) => {
  const [currentTime, setCurrentTime] = React.useState<Time>(getTimeDelta(-12));
  const [message, setMessage] = React.useState<string>();
  const [xmasOver, setXmasOver] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const timeToXmas = getTimeDelta(12);
      const timeToXmasEnd = getTimeDelta(-11 - 3);
      const xmasIndicator = isXmas(timeToXmas, timeToXmasEnd);
      const preXmas = isTimeNonZero(timeToXmas);

      if (xmasIndicator) {
        if (locationOffset) {
          const locationTime = getTimeDelta(locationOffset - 8);
          const isLocalXmas = isTimeNonZero(locationTime);
          if (!isLocalXmas) {
            setMessage(messageText.post);
            setPostLocal(true);
            setCurrentTime(timeToXmasEnd);
          } else {
            setPostLocal(false);
            setMessage(messageText.current);
            setCurrentTime(locationTime);
          }
        } else {
          setMessage(messageText.post);
          setPostLocal(true);
          setCurrentTime(timeToXmasEnd);
        }
        setXmasState(true);
      } else {
        if (preXmas) {
          setMessage(messageText.pre);
          setCurrentTime(timeToXmas);
        } else {
          setMessage(messageText.over);
          setXmasOver(true);
        }
        setXmasState(false);
      }
    }, Timeouts.SECOND);

    return () => clearInterval(interval);
  }, [currentTime, locationOffset, setXmasState, setPostLocal]);

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: xmasState ? 2 : 20,
        display: message !== undefined ? "block" : "none",
      }}
    >
      <Counter>
        {!xmasOver ? (
          <>
            <Title xmas={true}>
              <h1>{message}</h1>
            </Title>
            <CounterContainer>
              {Object.keys(currentTime).map((time: string) => (
                <CounterLi key={time} xmas={xmasState}>
                  <span>{currentTime[time]}</span>
                  {time}
                </CounterLi>
              ))}
            </CounterContainer>
          </>
        ) : (
          <OverTitle>
            <h1>{message}</h1>
          </OverTitle>
        )}
      </Counter>
    </Container>
  );
};

export default CountDown;
