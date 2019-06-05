import * as types from "../actionTypes";

export const setNotification = (
  state = {
    showSetNotificationModal: false,
    isDayChosenInWeek: [
      { day: "Mon", isChosen: false },
      { day: "Tue", isChosen: false },
      { day: "Wed", isChosen: false },
      { day: "Thu", isChosen: false },
      { day: "Fri", isChosen: false },
      { day: "Sat", isChosen: false },
      { day: "Sun", isChosen: false },
    ],
  },
  action
) => {
  switch (action.type) {
    case types.SET_NOTIFICATION_MODAL_VISIBILITY:
      return { ...state, showSetNotificationModal: action.payload };
    case types.CHOOSE_DAY_IN_WEEK:
      const isDayChosenInWeekCopy = JSON.parse(
        JSON.stringify(state.isDayChosenInWeek)
      );
      isDayChosenInWeekCopy.forEach((item, index) => {
        if (item.day === action.payload.day) {
          item.isChosen = action.payload.isChosen;
        }
      });
      return { ...state, isDayChosenInWeek: isDayChosenInWeekCopy };
    default:
      return state;
  }
};
