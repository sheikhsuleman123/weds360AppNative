export const INIT = 'INIT';

export const YEAR_LOWER_MONTH = 'YEAR_LOWER_MONTH';
export const YEAR_LOWER_DAY = 'YEAR_LOWER_DAY';
export const VALID_YEAR = 'VALID_YEAR';

export const MONTH_LOWER_DAY = 'MONTH_LOWER_DAY';
export const VALID_MONTH = 'VALID_MONTH';

export const DAY_SELECT = 'DAY_SELECT';

export const initialize = (day, month, year) => dispatch =>
  dispatch({
    type: INIT,
    day,
    month,
    year
  });
export const yearSelect = (
  item,
  currentYear,
  selectedMonth,
  selectedMonthKey,
  currentMonth,
  endDay,
  dayText,
  chosenDay,
  chosenYear,
  currentDay
) => {
  if (item == currentYear) {
    if (selectedMonthKey < currentMonth) {
      return dispatch =>
        dispatch({
          type: LOWER_MONTH,
          item,
          selectedMonth,
          endDay
        });
    } else if (selectedMonthKey == currentMonth) {
      if (chosenDay < currentDay) {
        return dispatch =>
          dispatch({
            type: LOWER_DAY,
            item,
            selectedMonth,
            endDay
          });
      }
    }
  }
  return dispatch =>
    dispatch({
      type: VALID_YEAR,
      selectedMonthKey,
      chosenYear,
      chosenDay,
      dayText,
      item,
      endDay
    });
};
export const monthSelect = (
  item,
  currentMonth,
  chosenDay,
  daysofm,
  currentDay,
  current,
  endDay
) => {
  if (item.key == currentMonth || chosenDay > daysofm) {
    if (chosenDay < currentDay || chosenDay > daysofm) {
      return dispatch =>
        dispatch({
          type: MONTH_LOWER_DAY,
          item,
          current,
          daysofm,
          endDay
        });
    }
  }
  return dispatch =>
    dispatch({
      type: VALID_MONTH,
      item,
      current,
      daysofm
    });
};
export const daySelect = num => {
  let current = '';
  const copy = `${num}`;
  switch (copy.charAt(copy.length - 1)) {
    case '1':
      current = `${num}st of `;
      break;
    case '2':
      current = `${num}nd of `;
      break;
    case '3':
      current = `${num}rd of `;
      break;
    default:
      current = `${num}th of `;
  }
  if (num == '11' || num == '12' || num == '13') {
    current = `${num}th of `;
  }
  return dispatch =>
    dispatch({
      type: DAY_SELECT,
      num,
      current
    });
};
