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
                const cacheExercisesDelete = [];
                state.sectionExercises.map((item, index) => {
                        const emptyElement = {};
                        emptyElement.category = item.category;
                        emptyElement.data = item.data.filter((i) => i !== action.payload);
                        cacheExercisesDelete.push(emptyElement);
                    }
                );
            return {...state, sectionExercises: cacheExercisesDelete};
            default:
                return state;
        }
    }
;
