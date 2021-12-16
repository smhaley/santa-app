export type WorldLocation = {
  name: string;
  lat: number;
  lon: number;
  gmtOffset: number;
};

export const worldLocations: WorldLocation[] = [
  { name: "Russia", lat: 65.86613, lon: 174.87376, gmtOffset: 12 },
  { name: "Australia", lat: -32.63857, lon: 147.01243, gmtOffset: 11 },
  { name: "Papua New Guinea", lat: -6.59329, lon: 142.48018, gmtOffset: 10 },
  { name: "Japan", lat: 35.84936, lon: 136.87356, gmtOffset: 9 },
  { name: "China", lat: 61.81527, lon: 116.46456, gmtOffset: 8 },
  { name: "Malaysia", lat: -6.376445, lon: 106.372045, gmtOffset: 7 },
  { name: "Kazakhstan", lat: 46.836147, lon: 77.727563, gmtOffset: 6 },
  { name: "Turkmenistan", lat: 37.55207, lon: 61.82681, gmtOffset: 5 },
  { name: "Oman", lat: 19.6101, lon: 57.08072, gmtOffset: 4 },
  { name: "Russia", lat: 55.57128, lon: 37.88066, gmtOffset: 3 },
  { name: "Botswana", lat: -22.32775, lon: 25.22292, gmtOffset: 2 },
  { name: "Sweden", lat: 67.13932, lon: 17.34784, gmtOffset: 1 },
  { name: "Ireland", lat: 52.97686, lon: -8.0721, gmtOffset: 0 },
  { name: "Greenland", lat: 70.44809, lon: -22.163, gmtOffset: -1 },
  {
    name: "passing over the ocean",
    lat: 28.36234,
    lon: -40.90976,
    gmtOffset: -2,
  },
  { name: "Brazil", lat: -15.91161, lon: -47.33844, gmtOffset: -3 },
  { name: "Argentina", lat: -40.14364, lon: -65.22449, gmtOffset: -4 },
  { name: "Quebec, Canada", lat: 50.883629, lon: -75.492739, gmtOffset: -5 },
  { name: "Mexico", lat: 19.33282, lon: -99.24341, gmtOffset: -6 },
  { name: "Calgary, Canada", lat: 51.12701, lon: -114.17489, gmtOffset: -7 },
  { name: "California, USA", lat: 37.85772, lon: -122.34872, gmtOffset: -8 },
  { name: "Alaska, USA", lat: 64.835365, lon: -147.776749, gmtOffset: -9 },
  { name: "Hawaii, USA", lat: 21.315603, lon: -157.858093, gmtOffset: -10 },
  { name: "Niue", lat: 28.35143, lon: -177.49739, gmtOffset: -11 },
];

export const northPolePrepend: WorldLocation[] = [
  { name: "The North Pole", lat: 90, lon: 0, gmtOffset: 15 },
  { name: "The North Pole", lat: 83.222, lon: 56.79, gmtOffset: 14 },
  { name: "The North Pole", lat: 78.04178, lon: 125.72426, gmtOffset: 13 },
];
