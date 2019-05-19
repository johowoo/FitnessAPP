import * as types from "../actionTypes";

export const progress = (state = [], action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case types.ADD_PROGRESS_PHOTO:
            return [...state, action.payload];
        case types.DELETE_PICS_FROM_PROGRESS:
            newState.map((item, index) => {
                if (action.payload.includes(item.date)) {
                    newState.splice(index, 1);
                }
            });
            return newState;
        default:
            return state;
    }
};
