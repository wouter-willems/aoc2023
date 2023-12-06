import {data} from './day5_input';
import {stringIsSetAndFilled} from "../util/values";

export function run() {
  const startTs = new Date().getTime();
  function mapSeed(nr: number, step: number) {
    if (step === -1) {
      return nr;
    }
    const match = (mapss[step]).find(e => nr >= e[0] && nr < e[0] + e[2]);
    const destination = match ? match[1] + (nr - match[0]) : nr;
    return mapSeed(destination, step - 1);
  }

  function isInStartRange(nr) {
    for(let i = 0; i < startRanges.length; i+=2) {
      if (nr >= startRanges[i] && nr < startRanges[i] + startRanges[i + 1]) {
        return true;
      }
    }
    return false;
  }

  const sanitized = data
    .split('\n\n')
    .map(e => e
      .split('\n')
    )
  ;
  const [start, ...maps] = sanitized;
  const startRanges = start[0]
    .split(':')[1]
    .split(' ')
    .filter(stringIsSetAndFilled)
    .map(Number);
  console.log(startRanges);
  // const startingPoints = [82, 43, 86, 35];
  const mapss = maps.map(e => {
    const [_, ...rest] = e;
    return rest.map(e => e.split(' ').map(Number));
  });
  console.log(mapss);

  for (let counter = 0; counter < 999999999; counter++) {
    const source = mapSeed(counter, 6);
    if (isInStartRange(source)) {
      console.log('FOUND IT');
      console.log(counter);
      console.log((new Date().getTime() - startTs) / 1000);
      return;
    }
  }
}
