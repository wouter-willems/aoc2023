import {data} from './day3_input';
import {isValueSet} from "../util/values";

export function run() {
  const sanitized = data
  .split('\n').map(e => e.split(''));
  console.log(sanitized);

  let currentFoundNumber = null;
  let adjacentSymbol = null;
  const numbersWithSymbol = [];
  for(let row= 0; row < sanitized.length; row++) {
    for(let col= 0; col < sanitized[row].length; col++) {
      if(Number.isFinite(Number(sanitized[row][col]))) {
        const symbolPos = getAdjacentSymbol(row, col);
        if (symbolPos) {
          adjacentSymbol = symbolPos;
        }
        if (currentFoundNumber === null) {
          currentFoundNumber = sanitized[row][col];
        } else {
          currentFoundNumber += sanitized[row][col];
        }
      } else {
        if (currentFoundNumber !== null) {
          if (adjacentSymbol) {
            numbersWithSymbol.push({
              val: Number(currentFoundNumber),
              row: adjacentSymbol.row,
              col: adjacentSymbol.col
            });
          }
          currentFoundNumber = null;
          adjacentSymbol = false;
        }
      }
    }
  }

  console.log(numbersWithSymbol);
  const gears = numbersWithSymbol
    .filter((e1, i1) => numbersWithSymbol
      .some((e2, i2) => i1 !== i2 && e1.row === e2.row && e1.col === e2.col)
    );
  const pairs = gears.reduce((acc, cur, i) => {
    const partnerIndex = gears.findIndex((e, myIndex) => i !== myIndex && e.row === cur.row && e.col === cur.col);
    if (partnerIndex > i) {
      return [...acc, [cur, gears[partnerIndex]]];
    }
    return acc;
  }, []);
  const subAnswer = pairs.map(e => e[0].val * e[1].val);
  const answer = subAnswer.reduce((acc, cur) => acc + cur, 0);
  console.log(answer);

  function getAdjacentSymbol(row: number, col: number) {
    if (isSymbol(sanitized[row-1]?.[col-1])) return {row: row-1, col: col-1};
    if (isSymbol(sanitized[row-1]?.[col+0])) return {row: row-1, col: col+0};
    if (isSymbol(sanitized[row-1]?.[col+1])) return {row: row-1, col: col+1};

    if (isSymbol(sanitized[row+0]?.[col-1])) return {row: row+0, col: col-1};
    if (isSymbol(sanitized[row+0]?.[col+1])) return {row: row+0, col: col+1};

    if (isSymbol(sanitized[row+1]?.[col-1])) return {row: row+1, col: col-1};
    if (isSymbol(sanitized[row+1]?.[col+0])) return {row: row+1, col: col+0};
    if (isSymbol(sanitized[row+1]?.[col+1])) return {row: row+1, col: col+1};
    return null;
  }

  function isSymbol(char) {
    if (char === '*') return true;
    return false;
  }
}
