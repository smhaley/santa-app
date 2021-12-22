# Santa Tracking App

https://smhaley.github.io/santa-app/

## What is it?

Simulated santa tracking application allows users to observe Santa traverse the world. Messages are relative to a given users timezone and Santa's position in the world. 

World map is created presenting a 'predicted path' to a users ip location and Santa's `(lon, lat)` position on the earth.

## How does it work?

The world is split into 24 timezones. Timing is such that Santa hits a given timezone at 0300 local time. Local time is defined as `UTC + offset`. 
At a specific timezone a linear path is calculated. Each minute of a given hour the path is traversed one point until the next timezone offset is hit. The process repeats until each timezone achieves `UTC + offset === 0300` Christmas day.

Traversal begins at `UTC + 15 === 0000 Christmas day` with the first stop in Eastern Siberia at `UTC + 15 === 0300` Christmas day.

