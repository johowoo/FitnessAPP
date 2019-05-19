import {
    sectionExercises,
    extraSectionExercises,
} from "../../initialExercises";
import * as types from "../actionTypes";

export const exercises = (
    state = {sectionExercises, extraSectionExercises}, action
) => {
    const cacheExercises = state.sectionExercises;
    switch (action.type) {
        case types.ADD_EXERCISE_TO_SECTIONLIST:
            cacheExercises.map(item => {
                if (item.category === action.payload.category) {
                    item.data.push(action.payload.item);
                }
            });
            return {...state, sectionExercises: cacheExercises};
        case types.DELETE_EXERCISE_FROM_SECTIONLIST:
            // cacheExercises.map((item, index) => {
            //     console.warn(item.data);
            //     // if (item.data.includes(item)) {
            //     //     item.data.splice(item.data.indexOf(item), 1);
            //     // }
            // });
            return cacheExercises;
        default:
            return state;
    }


};
