import {data} from './day7_input';
import {stringIsSetAndFilled} from "../util/values";
import {removeDuplicatesFromArray} from "../util/arrays";

enum HandType {
  FIVE_OF_A_KIND,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  THREE_OF_A_KIND,
  TWO_PAIR,
  ONE_PAIR,
  HIGH_CARD
}

const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

export function run() {
  const sanitized = data.split('\n')
  .map(line => {
    const hand = line.split(' ')[0];
    return {
      hand,
      bid: Number(line.split(' ')[1]),
      type: getType(hand)
    };
  });
  const sorted = sanitized.sort((a, b) => {
    if (a.type > b.type) {
      return 1;
    }
    if (a.type === b.type) {
      for (let i=0; i < a.hand.length; i++) {
        const me = a.hand[i];
        const other = b.hand[i];
        if (cards.indexOf(me) > cards.indexOf(other)) {
          return 1;
        }
        if (cards.indexOf(me) < cards.indexOf(other)) {
          return -1;
        }
      }
    }
    return -1;
  });
  sorted.reverse();
  console.log(sorted);
  const answer = sorted.reduce((acc, cur, i) => {
    return acc + ((i+1) * cur.bid);
  }, 0);
  console.log(answer);

  function getType(hand: string): HandType {
    const chars = hand.split('');
    const wildcards = chars.filter(e => e === 'J').length;
    const uniques = removeDuplicatesFromArray(chars).filter(e => e!== 'J');
    const counts = uniques.map(e => chars.filter(e2 => e === e2).length).sort((a, b) => b - a);
    // console.log(chars);
    // console.log(uniques);
    // console.log(wildcards);
    if (counts.length === 0) return HandType.FIVE_OF_A_KIND;
    if (counts[0] === (5 - wildcards)) return HandType.FIVE_OF_A_KIND;
    if (counts[0] === (4 - wildcards)) return HandType.FOUR_OF_A_KIND;
    if (counts[0] === (3 - wildcards ) && counts[1] === 2) return HandType.FULL_HOUSE;
    if (counts[0] === (3 - wildcards)) return HandType.THREE_OF_A_KIND;
    if (counts[0] === (2 - wildcards) && counts[1] === 2) return HandType.TWO_PAIR;
    if (counts[0] === (2 - wildcards)) return HandType.ONE_PAIR;
    return HandType.HIGH_CARD;
  }
}
