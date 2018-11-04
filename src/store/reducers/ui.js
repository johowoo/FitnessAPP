import * as types from '../actionTypes';

export const ui=(state={
    exerciseModal: false
},action)=>{
    switch(action.type){
        case types.SET_EXECERCISE_VISIBILITY:
            return {
                ...state,
                exerciseModal: action.payload
            }
        default:
            return state;
    }
}