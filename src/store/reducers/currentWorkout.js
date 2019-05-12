import * as types from '../actionTypes';


export const currentWorkout=(state=[],action)=>{
    switch(action.type){
        case types.ADD_EXERCISE:
            return [...state,action.payload]

        case types.CLEAR_CURRENT_WORKOUT:
            return []
        case types.ADD_WEIGHT_TO_EXERCISE:

        default:
            return state;
    }
}