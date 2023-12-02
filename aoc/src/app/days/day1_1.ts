import {data} from './day1_input';
export function run() {
  const input = data.split('\n');
  const numbers = input
    .map(e => e.split('').filter(char => Number.isFinite(Number(char))));
  const result = numbers.map(e => `${e[0]}${e[e.length-1]}`).map(Number);
  const answer = result.reduce((acc, cur) => acc + cur, 0);
  console.log(answer);
}
