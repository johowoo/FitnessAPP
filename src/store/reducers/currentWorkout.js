import * as types from '../actionTypes';


export const currentWorkout=(state=[],action)=>{
    switch(action.type){
        case types.ADD_EXERCISE:
            return [...state,action.payload]
        default:return state;
    }
}