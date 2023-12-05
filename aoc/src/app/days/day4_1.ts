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
  console.log(sanitized);

  const matches = sanitized.map(e => intersectionOfArrays(e[0], e[1]));
  const scores = matches.map(e => e.length > 0 ? Math.pow(2, e.length - 1) : 0);
  const answer = scores.reduce((a, b) => a + b, 0);
  console.log(answer);
}
