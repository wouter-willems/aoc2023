import {data} from './day6_input';
import {stringIsSetAndFilled} from "../util/values";

export function run() {
  const [time, records] = data
    .split('\n')
    .map(e => e
      .split(':')[1]
      .split(' ')
      .map(e => e.trim())
      .filter(stringIsSetAndFilled)
      .map(Number)
    );
  const distances = time.map(getDistances);
  const newRecords = distances.map((e, i) => e.filter(d => d > records[i]));
  console.log(newRecords);
  const answer = newRecords.reduce((acc, cur) => {
    return acc*cur.length;
  }, 1);
  console.log(answer);

  function getDistances(maxTime: number) {
    const result = [];
    for(let chargeTime = 1; chargeTime < maxTime; chargeTime++) {
      result.push(chargeTime * (maxTime-chargeTime));
    }
    return result;
  }
}
