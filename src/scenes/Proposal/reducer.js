import {
  INIT,
  YEAR_LOWER_MONTH,
  YEAR_LOWER_DAY,
  VALID_YEAR,
  VALID_MONTH,
  MONTH_LOWER_DAY,
  DAY_SELECT
} from './actions';

const proposalReducer = (
  state = {
    days: [],
    months: [],
    years: [],
    defaultDays: 32
  },
  action
) => {
  switch (action.type) {
    /*--------INITIALIZATION--------*/
    case INIT:
      return {
        ...state,
        currentDay: action.day,
        currentMonth: action.month,
        currentYear: action.year,
        chosenYear: action.year,
        yearText: action.year.toString(),
        yearchecked: true
      };

    /*--------YEAR CASES--------*/
    case YEAR_LOWER_MONTH:
      return {
        ...state,
        chosenDay: 0,
        dayText: '',
        selectedMonth: '',
        monthText: '',
        monthchecked: false,
        selectedMonthKey: 0,
        chosenYear: action.item,
        yearText: `${action.item}`,
        yearchecked: true,
        endDay: action.selectedMonthKey == 2 ? (action.item % 4 == 0 ? 29 : 28) : action.endDay
      };
    case YEAR_LOWER_DAY:
      return {
        ...state,
        chosenDay: 0,
        dayText: '',
        chosenYear: action.item,
        yearText: `${action.item}`,
        yearchecked: true,
        endDay: action.selectedMonthKey == 2 ? (action.item % 4 == 0 ? 29 : 28) : action.endDay
      };
    case VALID_YEAR:
      return {
        ...state,
        chosenDay:
          action.selectedMonthKey == 2
            ? action.chosenYear % 4 == 0 && action.item % 4 != 0
              ? 0
              : action.chosenDay
            : action.chosenDay,
        dayText:
          action.selectedMonthKey == 2
            ? action.chosenYear % 4 == 0 && action.item % 4 != 0
              ? ''
              : action.dayText
            : action.dayText,
        chosenYear: action.item,
        yearText: `${action.item}`,
        yearchecked: true,
        endDay: action.selectedMonthKey == 2 ? (action.item % 4 == 0 ? 29 : 28) : action.endDay
      };
    /*--------MONTH CASES--------*/
    case MONTH_LOWER_DAY:
      return {
        ...state,
        chosenDay: 0,
        dayText: '',
        selectedMonth: action.item.string,
        monthText: action.current,
        monthchecked: true,
        selectedMonthKey: action.item.key,
        endDay: action.daysofm
      };
    case VALID_MONTH:
      return {
        ...state,
        selectedMonth: action.item.string,
        monthText: action.current,
        monthchecked: true,
        selectedMonthKey: action.item.key,
        endDay: action.daysofm
      };
    /*--------DAY CASES--------*/
    case DAY_SELECT:
      return {
        ...state,
        chosenDay: action.num,
        dayText: action.current
      };
    default:
      return state;
  }
};
export default proposalReducer;
