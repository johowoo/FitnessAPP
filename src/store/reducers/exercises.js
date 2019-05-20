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
            const cacheExercises = JSON.parse(JSON.stringify(state.sectionExercises));
            cacheExercises.map(value => {
                if (value.category === action.payload.category) {
                    value.data.push(action.payload.item);
                }
            });
            return {...state, sectionExercises: cacheExercises};
        case types.DELETE_EXERCISE_FROM_SECTIONLIST:
            const cacheExercisesDelete = JSON.parse(JSON.stringify(state.sectionExercises));
            cacheExercisesDelete.map((item, index) => {
                if (item.data.includes(action.payload)) {
                    console.warn(item.data);
                    item.data.splice(item.data.indexOf(item), 1);
                }
            });
            return  {...state, sectionExercises: cacheExercisesDelete};
        default:
            return state;
    }


};
