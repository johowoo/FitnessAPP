import * as types from "../actionTypes";

export const setNotification = (state = {
    showSetNotificationModal: false
}, action) => {
    switch (action.type) {
        case types.SET_NOTIFICATION_MODAL_VISIBILITY:
            console.warn("here", action.payload);
            return {...state, showSetNotificationModal: action.payload};
        default:
            return state;
    }
};
