import {data} from './day4_input';
import {isValueSet} from "../util/values";
import {intersectionOfArrays} from "../util/arrays";

export function run() {
  const sanitized = data
    .split('\n')
    .map(e => e.split(': ')[1]
      .split(' | ')
      .map(e => e.split(' ').filter(e => e.length > 0).map(Number))
    );

  const matches = sanitized.map(e => intersectionOfArrays(e[0], e[1]).length)
    .reduce((acc, cur, i) => {
      return {...acc, [i+1]: cur};
    }, {});
  console.log(matches);

  const winnings: Record<number, number> = {};
  let counter = 0;
  for(let i = sanitized.length; i > 0; i--) {
    let myWins = Math.min(matches[i], sanitized.length - i);
    for(let j = 0; j < Math.min(matches[i], sanitized.length - i); j++) {
      myWins += winnings[j+i+1] ?? 0;
      counter++;
    }
    winnings[i] = myWins;
  }
  const answer = Object.values(winnings).reduce((a, b) => a + b, 0) + sanitized.length;
  console.log(answer);
}
