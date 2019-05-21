import * as types from "../actionTypes";

const defaultState = {
    allExercisesList: {},
    exercisesListForPressedDay: [],
    newAllExerciseListWithout_: {}
};
export const savedExerciseForEachDay = (state = defaultState, action) => {
    switch (action.type) {
        case types.ADD_NEW_EXERCISE_LIST:
            const newAllExerciseListWithout_ = {};
            const allExercisesList = {
                ...state.allExercisesList,
                [action.payload.date]: action.payload.exercises,
            };
            const list = JSON.parse(JSON.stringify(allExercisesList));
            for (let key in list) {
                if (list.hasOwnProperty(key)) {
                    let tmpKey = key.replace(/-/g, '');
                    newAllExerciseListWithout_[tmpKey] = list[key];
                }
            }
            return {
                ...state,
                allExercisesList,
                newAllExerciseListWithout_
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
