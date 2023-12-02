import {data} from './day1_input';

const dictionary = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}
const dEntries = Object.entries(dictionary);

export function run() {
  const input = data.split('\n');
  const numbers = input.map(line => line.split('').reduce((acc, cur, i) => {
    if (Number.isFinite(Number(cur))) {
      return acc + cur;
    }
    const substr = line.substring(i);
    const match = dEntries.find(([key, value]) => substr.startsWith(key));
    if (match) {
      return acc + match[1];
    }
    return acc;
  }, ''));
  const result = numbers.map(e => {
    return `${e[0]}${e[e.length - 1]}`;
  }).map(Number);
  const answer = result.reduce((acc, cur) => acc + cur, 0);
  console.log(answer);
}
