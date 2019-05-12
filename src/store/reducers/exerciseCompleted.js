import * as types from '../actionTypes';

const defaultState = { isCompleted: false, isExerciseListEmpty: true };

export const exerciseCompleted = (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_EMPTY:
      return { ...state, isExerciseListEmpty: action.payload };
    default:
      return state;
  }
};
