import * as types from '../actionTypes';


export const exerciseCompleted = (
    state = {
        isCompleted: false, isExerciseListEmpty: true
    }
    , action) => {
    switch (action.type) {
        case types.UPDATE_EMPTY:
            console.warn(action.payload)
            return {...state, isExerciseListEmpty:action.payload}
        default:
            return state;
    }
}



