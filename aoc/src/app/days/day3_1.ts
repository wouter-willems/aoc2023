import {data} from './day3_input';
import {isValueSet} from "../util/values";

export function run() {
  const sanitized = data
  .split('\n').map(e => e.split(''));
  console.log(sanitized);

  let currentFoundNumber = null;
  let adjacentSymbol = false;
  const numbersWithSymbol = [];
  for(let row= 0; row < sanitized.length; row++) {
    for(let col= 0; col < sanitized[row].length; col++) {
      if(Number.isFinite(Number(sanitized[row][col]))) {
        adjacentSymbol = adjacentSymbol || hasAdjacentSymbol(row, col);
        if (currentFoundNumber === null) {
          currentFoundNumber = sanitized[row][col];
        } else {
          currentFoundNumber += sanitized[row][col];
        }
      } else {
        if (currentFoundNumber !== null) {
          if (adjacentSymbol) {
            numbersWithSymbol.push(Number(currentFoundNumber));
          }
          currentFoundNumber = null;
          adjacentSymbol = false;
        }
      }
    }
  }

  console.log(numbersWithSymbol);
  console.log(numbersWithSymbol.reduce((acc, cur) => acc+cur, 0));

  function hasAdjacentSymbol(row: number, col: number) {
    if (isSymbol(sanitized[row-1]?.[col-1])) return true;
    if (isSymbol(sanitized[row-1]?.[col+0])) return true;
    if (isSymbol(sanitized[row-1]?.[col+1])) return true;

    if (isSymbol(sanitized[row+0]?.[col-1])) return true;
    if (isSymbol(sanitized[row+0]?.[col+1])) return true;

    if (isSymbol(sanitized[row+1]?.[col-1])) return true;
    if (isSymbol(sanitized[row+1]?.[col+0])) return true;
    if (isSymbol(sanitized[row+1]?.[col+1])) return true;
    return false;
  }

  function isSymbol(char) {
    if (!isValueSet(char)) return false;
    if (Number.isFinite(Number(char))) return false;
    if (char === '.') return false;
    return true;
  }
}
