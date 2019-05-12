import * as types from '../actionTypes';

const defaultState = {
  allExercisesList: {},
  exercisesListForPressedDay: [],
};
export const savedExerciseForEachDay = (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_NEW_EXERCISE_LIST:
      return {
        ...state,
        allExercisesList: {
          ...state.allExercisesList,
          [action.payload.date]: action.payload.exercises,
        },
      };
      // case types.GET_EXERCISE_LIST_FOR_PRESSED_DAY:
      //     return {
      //         ...state,
      //         exercisesListForPressedDay: state.allExercisesList[action.payload]
      //     }
    default:
      return state;
  }
};
