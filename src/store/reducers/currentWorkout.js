import * as types from '../actionTypes';


export const currentWorkout = (state = [], action) => {
    switch (action.type) {
        case types.ADD_EXERCISE:
            return [...state, action.payload]

        case types.CLEAR_CURRENT_WORKOUT:
            return []
        case types.ADD_WEIGHT_TO_EXERCISE:
            let stateCopy = JSON.parse(JSON.stringify(state));
            stateCopy.map(item => {
                if (item.time == action.payload.time) {
                    item.reps = action.payload.reps;
                    item.weight = action.payload.weight;
                }
            })
            return stateCopy;
        // console.warn("time", action.payload.time);
        // console.warn("weight", action.payload.weight);
        // console.warn("reps", action.payload.reps);
        default:
            return state;
    }
}