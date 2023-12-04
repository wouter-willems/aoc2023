import {data} from './day2_input';

export function run() {
  const input = data.split('\n');
  const sanitized = input
    .map(line => line.split(': ')[1].split('; ')
      .map(e => e.split(', '))
      .map(e => {
        return e.reduce((acc, cur) => {
          const s = cur.split(' ');
          return {
            ...acc,
            [s[1]]: Number(s[0]),
          };
        }, {})
      })
    );
  const maxes = sanitized.map(e => {
    return e.reduce((acc, cur) => {
      Object.keys(cur).forEach(k => {
        if (cur[k] > (acc[k] ?? 0)) {
          acc[k] = cur[k];
        }
      });
      return acc;
    }, {});
  })
  console.log(sanitized);
  console.log(maxes);
  const answer = maxes.reduce((acc: number, cur, i) => {
    if (cur['red'] > 12) return acc;
    if (cur['green'] > 13) return acc;
    if (cur['blue'] > 14) return acc;
    return acc + i + 1;
  }, 0);
  console.log(answer);
}
