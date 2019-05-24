import * as types from "../actionTypes";
import {initialExerciseSets, initialExerciseCategory} from '../../initialExerciseSets';

//set default value
const defaultState = {
    showReminderModal: false,
    // customWorkoutSets: initialExerciseSets,
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
            const addableCopy = state.customWorkoutAddable;
            addableCopy[action.payload] = false;
            return {
                ...state, customWorkoutAddable: addableCopy
            };
        case types.CLEAR_CURRENT_WORKOUT:
            console.warn("default", defaultState.customWorkoutAddable);
            const customWorkoutAddableEmpty = {};
            for (let key in initialExerciseSets) {
                customWorkoutAddableEmpty[key] = true;
            }
            return {
                ...state, customWorkoutAddable: customWorkoutAddableEmpty
            };
        case types.DELETE_EXERCISE_SET_FROM_CUSTOM_WORKOUT:
            return {
                ...state,
                showReminder: action.payload.showReminder,
                reminderTitle: action.payload.reminderTitle,
                reminderContent: action.payload.reminderContent,
                hideConfirmButton: action.payload.hideConfirmButton
            };
        case types.ADD_EXERCISE_SET_FROM_CUSTOM_WORKOUT_TO_CURRENT_WORKOUT:
            return {
                ...state,
                showReminder: action.payload.showReminder,
                reminderTitle: action.payload.reminderTitle,
                reminderContent: action.payload.reminderContent,
                hideConfirmButton: action.payload.hideConfirmButton
            };

        default:
            return state;
    }
};
