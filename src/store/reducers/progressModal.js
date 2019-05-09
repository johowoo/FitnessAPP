import * as types from '../actionTypes';

export const progressModal = (state = {
                             showModal: false,
                             showPicker: false
                         }
    , action) => {
    switch (action.type) {
        case types.SHOW_PROGRESS_MODAL:
            return {...state, ...action.payload};

        case types.SHOW_PROGRESS_PICKER:
            return {...state, ...action.payload};
        default:
            return state;
    }
}