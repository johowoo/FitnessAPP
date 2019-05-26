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
            const customWorkoutSetsForGivenCategoryCopy = JSON.parse(JSON.stringify(state.customWorkoutSets[action.payload.selectedExerciseCategory]));
            customWorkoutSetsForGivenCategoryCopy.map(item => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    if (!item.weightRepsDataArr) {
                        item.weightRepsDataArr = [];
                    }
                    item.weightRepsDataArr.push({reps: action.payload.reps, weight: action.payload.weight});
                    item.reps = action.payload.reps;
                    item.weight = action.payload.weight;
                }
            });
            return {
                ...state,
                customWorkoutSets: {
                    ...state.customWorkoutSets,
                    [action.payload.selectedExerciseCategory]: customWorkoutSetsForGivenCategoryCopy
                }
            };
        case types.EDIT_WEIGHT_REPS_IN_WORKOUT_OF_LIBRARY:
            const editWorkoutSetsForGivenCategoryCopy = JSON.parse(JSON.stringify(state.customWorkoutSets[action.payload.selectedExerciseCategory]));
            editWorkoutSetsForGivenCategoryCopy.map((item, index) => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    item.sets = action.payload.sets;
                    delete item.weightRepsDataArr;
                    item.weightRepsDataArr = [];
                    let arrTmp = Object.keys(action.payload.weightText);
                    // console.warn("length", arrTmp.length);
                    for (let i = 0; i < arrTmp.length; i++) {
                        item.weightRepsDataArr.push({
                            reps: action.payload.repsText[i],
                            weight: action.payload.weightText[i]
                        });
                    }
                }
            });
            return {
                ...state,
                customWorkoutSets: {
                    ...state.customWorkoutSets,
                    [action.payload.selectedExerciseCategory]: editWorkoutSetsForGivenCategoryCopy
                }
            };
        case types.DELETE_EXERCISE_FROM_WORKOUT_LIST_OF_LIBRARY:
            const deleteWorkoutSetsForGivenCategoryCopy = JSON.parse(JSON.stringify(state.customWorkoutSets[action.payload.selectedExerciseCategory]));
            deleteWorkoutSetsForGivenCategoryCopy.map((item, index) => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    // console.warn("matched", item);
                    deleteWorkoutSetsForGivenCategoryCopy.splice(index, 1);
                }
            });
            return {
                ...state,
                customWorkoutSets: {
                    ...state.customWorkoutSets,
                    [action.payload.selectedExerciseCategory]: deleteWorkoutSetsForGivenCategoryCopy
                }
            };
        case types.ADD_EXERCISE_FROM_EXERCISE_MODAL_TO_CATEGORY_OF_LIBRARY:
            if (!action.payload.weightRepsDataArr) {
                action.payload.weightRepsDataArr = [];
            }
            return {
                ...state,
                customWorkoutSets: {
                    ...state.customWorkoutSets,
                    [action.payload.selectedExerciseCategory]: [...state.customWorkoutSets[action.payload.selectedExerciseCategory], action.payload]
                }
            };
        default:
            return state;
    }
};
