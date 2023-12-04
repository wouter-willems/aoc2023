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
  const answer = maxes.reduce((acc: number, cur) => {
    const thisSet = cur['red'] * cur['green'] * cur['blue'];
    return acc + thisSet;
  }, 0);
  console.log(answer);
}
