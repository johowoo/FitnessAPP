import * as types from "../actionTypes";
import {initialExerciseSets, initialExerciseCategory} from '../../initialExerciseSets';

//set default value
const defaultState = {
    showReminderModal: false,
    customWorkoutSets: initialExerciseSets,
    customWorkoutCategory: initialExerciseCategory,
    customWorkoutAddable: {},
};

for (let key in initialExerciseSets) {
    defaultState.customWorkoutAddable[key] = true;
}
// console.warn("initialExerciseCategory",initialExerciseCategory);
export const customWorkout = (state = defaultState, action) => {
    switch (action.type) {
        case types.ADD_EXERCISE_SET_TO_CUSTOM_WORKOUT:
            //change addable state
            const addableCopy = JSON.parse(JSON.stringify(state.customWorkoutAddable));
            addableCopy[action.payload.category] = false;
            // console.warn("addableCopy[action.payload]", addableCopy);
            return {
                ...state, customWorkoutAddable: addableCopy
            };
        case types.CLEAR_CURRENT_WORKOUT:
            const customWorkoutAddableEmpty = {};
            for (let key in initialExerciseSets) {
                customWorkoutAddableEmpty[key] = true;
            }
            return {
                ...state, customWorkoutAddable: customWorkoutAddableEmpty
            };

        //todo
        case types.ADD_WEIGHT_REPS_TO_EXERCISE_IN_LIBRARY:
            console.warn("add_payload", action.payload);
            return {
                ...state,
            };
        case types.EDIT_WEIGHT_REPS_IN_WORKOUT_OF_LIBRARY:
            console.warn("edit_payload", action.payload);

            return {
                ...state,
            };
        case types.DELETE_EXERCISE_FROM_WORKOUT_LIST_OF_LIBRARY:

            return {
                ...state,
            };

        // case types.DELETE_EXERCISE_SET_FROM_CUSTOM_WORKOUT:
        //     return {
        //         ...state,
        //         showReminder: action.payload.showReminder,
        //         reminderTitle: action.payload.reminderTitle,
        //         reminderContent: action.payload.reminderContent,
        //         hideConfirmButton: action.payload.hideConfirmButton
        //     };
        // case types.ADD_EXERCISE_SET_FROM_CUSTOM_WORKOUT_TO_CURRENT_WORKOUT:
        //     return {
        //         ...state,
        //         showReminder: action.payload.showReminder,
        //         reminderTitle: action.payload.reminderTitle,
        //         reminderContent: action.payload.reminderContent,
        //         hideConfirmButton: action.payload.hideConfirmButton
        //     };
        default:
            return state;
    }
};
