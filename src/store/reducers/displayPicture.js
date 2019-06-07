import * as types from "../actionTypes";

const defaultState = { showReminderModal: false };

export const displayPicture = (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW_DELETE_CONFIRM_MODAL_IN_DISPLAY_PICTURE:
      return {
        ...state,
        showReminder: action.payload.showReminder,
        reminderTitle: action.payload.reminderTitle,
        reminderContent: action.payload.reminderContent,
        hideConfirmButton: action.payload.hideConfirmButton,
      };
    default:
      return state;
  }
};
