import * as types from "../actionTypes";

export const currentWorkoutModals = (
  state = {
    exerciseModal: false,
  },
  action
) => {
  switch (action.type) {
    case types.SET_EXECERCISE_VISIBILITY:
      return {
        ...state,
        exerciseModal: action.payload,
      };
    default:
      return state;
  }
};
