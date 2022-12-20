import { Time } from "../components/count-down";
import { Christmas } from "../constants/christmas";

type TimeObject = {
  [index: string]: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

export const isXmas = (timeToXmas: Time, timeToXmasEnd: Time) => {
  const initXmas =
    Object.values(timeToXmas).reduce(
      (accum: number, curr: number) => accum + curr
    ) === 0;

  const xmasEnd =
    Object.values(timeToXmasEnd).reduce(
      (accum: number, curr: number) => accum + curr
    ) > 0;

  return initXmas && xmasEnd;
};

export const getTimeDelta = (offset: number): Time => {
  const dateline = Math.floor(Date.now() / 1000 + offset * 3600);
  const firstXmas = new Date(dateline * 1000);
  const currentYear = firstXmas.getUTCFullYear();

  const xmas = new Date(
    Date.UTC(currentYear, Christmas.month, Christmas.day, 0, 0)
  );

  const delta = xmas.getTime() - firstXmas.getTime();
  const days = Math.floor(delta / day);
  const hours = Math.floor((delta % day) / hour);
  const minutes = Math.floor((delta % hour) / minute);
  const seconds = Math.floor((delta % minute) / second);
  const timeObj: TimeObject = { days, hours, minutes, seconds };
  Object.keys(timeObj).forEach((key) => {
    if (timeObj[key] <= 0) {
      timeObj[key] = 0;
    }
  });

  return timeObj;
};

export const isTimeNonZero = (locationTime: Time) =>
  Object.values(locationTime).reduce(
    (accum: number, curr: number) => accum + curr
  ) > 0;

export const isApplicationXmasState = () => {
  const timeToXmas = getTimeDelta(12);
  const timeToXmasEnd = getTimeDelta(-11 - 3);
  return isXmas(timeToXmas, timeToXmasEnd);
};
