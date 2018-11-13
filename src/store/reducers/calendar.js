import * as types from '../actionTypes';

const defaultState = {
    markedDates: {
        // '2018-11-01': {selected: true, marked: true, selectedColor: '#1b98d9'},
        // '2018-11-05': {marked: true},
        // '2018-11-07': {marked: true, dotColor: 'red', activeOpacity: 0},
        // '2018-11-09': {disabled: true, disableTouchEvent: true},
        // '2018-11-11': {selected: true, marked: true, selectedColor: 'orange'}
        // '2018-11-12': {selected: true, marked: true, selectedColor: '#1b98d9'}
    },
    currentDate: ''
}
export const calendar = (state = defaultState, action) => {
    switch (action.type) {
        case types.ADD_DATE:
            return {...state, currentDate: action.payload};

        case types.ADD_MARKED_DATE:
            return {...state, markedDates:{...state.markedDates,[action.payload]:{selected: true, marked: true, selectedColor: '#1b98d9'}}}

        default:
            return state;
    }
}