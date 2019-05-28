import * as types from "../actionTypes";

export const editLibrary = (
    state = {
        showExerciseModalForEditLibrary: false,
        showAddWeightModalForEditLibrary: false,
        showEditWeightRepsForEditLibrary: false,
        showAddCategoryModal: false,
        workoutHistoryExerciseList: {}
    },
    action
) => {
    switch (action.type) {
        case types.SET_EDIT_LIBRARY_EXERCISE_MODAL_VISIBILITY:
            return {
                ...state,
                showExerciseModalForEditLibrary: action.payload,
            };
        case types.SET_EDIT_LIBRARY_ADD_WEIGHT_MODAL_VISIBILITY:
            return {
                ...state,
                showAddWeightModalForEditLibrary: action.payload,
            };
        case types.SET_EDIT_LIBRARY_EDIT_WEIGHT_REPS_MODAL_VISIBILITY:
            return {
                ...state,
                showEditWeightRepsForEditLibrary: action.payload,
            };
        case types.SET_ADD_CATEGORY_MODAL_FOR_LIBRARY_VISIBILITY:
            return {
                ...state,
                showAddCategoryModal: action.payload,
            };
        case types.ADD_WEIGHT_REPS_TO_EXERCISE_IN_CALENDAR_HISTORY:
            return {
                ...state,
            };
        case types.EDIT_WEIGHT_REPS_IN_WORKOUT_OF_CALENDAR_HISTORY_ACTION:
            return {
                ...state,
            };
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
