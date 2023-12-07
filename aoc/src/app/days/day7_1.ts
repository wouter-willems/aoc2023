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

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

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
        console.log(me, cards.indexOf(me));
        console.log(other, cards.indexOf(other));
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
  // console.log(getType(sanitized[0].hand));
  // const types = sanitized.map(e => getType(e.hand));
  // console.log(types.map(e => HandType[e]));

  function getType(hand: string): HandType {
    const chars = hand.split('');
    const uniques = removeDuplicatesFromArray(chars);
    const counts = uniques.map(e => chars.filter(e2 => e === e2).length).sort((a, b) => b - a);
    if (counts[0] === 5) return HandType.FIVE_OF_A_KIND;
    if (counts[0] === 4) return HandType.FOUR_OF_A_KIND;
    if (counts[0] === 3 && counts[1] === 2) return HandType.FULL_HOUSE;
    if (counts[0] === 3) return HandType.THREE_OF_A_KIND;
    if (counts[0] === 2 && counts[1] === 2) return HandType.TWO_PAIR;
    if (counts[0] === 2) return HandType.ONE_PAIR;
    return HandType.HIGH_CARD;
  }
}
