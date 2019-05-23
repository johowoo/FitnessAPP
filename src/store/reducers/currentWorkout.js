import * as types from "../actionTypes";
import {initialExerciseSets, initialExerciseCategory} from '../../initialExerciseSets';


export const currentWorkout = (state = [], action) => {
    switch (action.type) {
        case types.ADD_EXERCISE:
            if (!action.payload.weightRepsDataArr) {
                action.payload.weightRepsDataArr = []
            }
            return [...state, action.payload];
        case types.CLEAR_CURRENT_WORKOUT:
            return [];
        case types.ADD_WEIGHT_TO_EXERCISE:
            const stateCopy = JSON.parse(JSON.stringify(state));
            stateCopy.map(item => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    if (!item.weightRepsDataArr) {
                        item.weightRepsDataArr = [];
                    }
                    item.weightRepsDataArr.push({reps: action.payload.reps, weight: action.payload.weight});
                    item.reps = action.payload.reps;
                    item.weight = action.payload.weight;
                }
            });
            return stateCopy;
        case types.DELETE_EXERCISE_FROM_WORKOUTLIST:
            const stateCopyDelete = JSON.parse(JSON.stringify(state));
            stateCopyDelete.map((item, index) => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    stateCopyDelete.splice(index, 1);
                }
            });
            return stateCopyDelete;
        case types.EDIT_WEIGHT_REPS_IN_EXERCISE:
            const stateCopyForEditAll = JSON.parse(JSON.stringify(state));
            stateCopyForEditAll.map((item, index) => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    // stateCopyForEditAll.splice(index, 1);
                    // console.warn("item.sets", item.sets);
                    // console.warn("action.payload.sets", action.payload.sets);
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
            return stateCopyForEditAll;
        case types.ADD_EXERCISE_SET_TO_CUSTOM_WORKOUT:
            return [...state, ...initialExerciseSets[action.payload]];
            // return state;
        default:
            return state;
    }
};
