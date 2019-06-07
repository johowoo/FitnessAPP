import * as types from "../actionTypes";

const defaultState = {
  allExercisesList: {},
  exercisesListForPressedDay: [],
  newAllExerciseListWithout_: {},
};
export const savedExerciseForEachDay = (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_EXERCISES_LIST_TO_WORKOUT_HISTORY:
    case types.ADD_NEW_EXERCISE_LIST:
      const newAllExerciseListWithout_ = {};
      const allExercisesList = {
        ...state.allExercisesList,
        [action.payload.date]: action.payload.exercises,
      };
      const list = JSON.parse(JSON.stringify(allExercisesList));
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          const tmpKey = key.replace(/-/g, "");
          newAllExerciseListWithout_[tmpKey] = list[key];
        }
      }
      return {
        ...state,
        allExercisesList,
        newAllExerciseListWithout_,
      };

    // case types.ADD_EXERCISES_LIST_TO_WORKOUT_HISTORY:
    //     // const allExercisesListCopy = JSON.parse(JSON.stringify(state.allExercisesList));
    //     // if (!Object.keys(allExercisesListCopy).includes[action.payload.date]) {
    //     //     allExercisesListCopy[action.payload.date] = []
    //     // };
    //     return {
    //         ...state,
    //         allExercisesList: {...state.allExercisesList, [action.payload.date]: action.payload.exercises}
    //     };
    // case types.GET_EXERCISE_LIST_FOR_PRESSED_DAY:
    //     return {
    //         ...state,
    //         exercisesListForPressedDay: state.allExercisesList[action.payload]
    //     }
    default:
      return state;
  }
};
