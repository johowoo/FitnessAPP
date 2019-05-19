import {
    sectionExercises,
    extraSectionExercises,
} from "../../initialExercises";
import * as types from "../actionTypes";

export const exercises = (
    state = {sectionExercises, extraSectionExercises}, action
) => {
    switch (action.type) {
        case types.ADD_EXERCISE_TO_SECTIONLIST:
            const cacheExercises = state.sectionExercises;
            cacheExercises.map(value => {
                if (value.category === action.payload.category) {
                    value.data.push(action.payload.item);
                }
            });
            return {...state, sectionExercises: cacheExercises};
        default:
            return state;
    }


};
