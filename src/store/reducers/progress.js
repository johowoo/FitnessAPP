import * as types from '../actionTypes';

export const progress=(state= []
,action)=>{
    switch(action.type){
        case types.ADD_PROGRESS_PHOTO:
            return [...state, action.payload]
        default:
            return state;
    }
}