export type DateDiff = {
  difference: number;
  unit: 'minutes' | 'hours' | 'days';
};

export const dateDiffToNow = (date: Date): DateDiff => {
  let res: DateDiff;
  const timeDiff = Date.now() - date.getTime();

  if (timeDiff > 86400000) {
    res = {
      difference: Math.round(timeDiff / 86400000),
      unit: 'days',
    };
  } else if (timeDiff > 3600000) {
    res = {
      difference: Math.round(timeDiff / 3600000),
      unit: 'hours',
    };
  } else {
    res = {
      difference: Math.round(timeDiff / 60000),
      unit: 'minutes',
    };
  }

  return res;
};
