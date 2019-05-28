import * as types from "../actionTypes";

export const editHistoryExercisesList = (
    state = {
        workoutHistoryExerciseList: {}
    },
    action
) => {
    switch (action.type) {
        case types.ADD_EXERCISES_TO_EXERCISE_LIST_OF_WORKOUT_HISTORY:
            if (!action.payload.weightRepsDataArr) {
                action.payload.weightRepsDataArr = [];
            }
            const currentDateExerciseListCopy = state.workoutHistoryExerciseList[action.payload.date] ? JSON.parse(JSON.stringify(state.workoutHistoryExerciseList[action.payload.date])) : [];
            currentDateExerciseListCopy.push(action.payload);
            // const WorkHistoryExerciseCopy = JSON.parse(JSON.stringify(state.workoutHistoryExerciseList));
            // return [...state, action.payload];
            return {
                ...state,
                workoutHistoryExerciseList: {
                    ...state.workoutHistoryExerciseList,
                    [action.payload.date]: currentDateExerciseListCopy
                }
            };
        case types.ADD_EXERCISES_LIST_TO_WORKOUT_HISTORY:
            return {...state};
        default:
            return state;
    }
};
