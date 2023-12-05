import {data} from './day5_input';

export function run() {
  function mapSeed(nr: number, step: number) {
    if (step === 7) {
      return nr;
    }
    const match = (mapss[step]).find(e => nr >= e[1] && nr < e[1] + e[2]);
    const destination = match ? match[0] + (nr - match[1]) : nr;
    return mapSeed(destination, step + 1);
  }

  const sanitized = data
    .split('\n\n')
    .map(e => e
      .split('\n')
    )
  ;
  const [start, ...maps] = sanitized;
  const startingPoints = start[0].split(': ')[1].split(' ').map(Number);
  const mapss = maps.map(e => {
    const [_, ...rest] = e;
    return rest.map(e => e.split(' ').map(Number));
  });
  console.log(mapss);

  const destinations = startingPoints.map(e => mapSeed(e, 0));
  console.log(destinations);
  console.log(destinations.reduce((acc, cur) => Math.min(acc, cur), Number.POSITIVE_INFINITY))
}
