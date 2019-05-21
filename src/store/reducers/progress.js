import * as types from "../actionTypes";

export const progress = (state = [], action) => {
    const newState = JSON.parse(JSON.stringify(state));
    const emptyState = [];
    switch (action.type) {
        case types.ADD_PROGRESS_PHOTO:
            return [...state, action.payload];
        case types.DELETE_ONE_PIC_FROM_PROGRESS:
            newState.map((item, index) => {
                // console.warn("payload", action.payload.date);
                // console.warn("item", item.date);
                if (action.payload.date !== item.date) {
                    emptyState.push(item);
                }
            });
            return emptyState;
        case types.DELETE_PICS_FROM_PROGRESS:
            newState.map((item, index) => {
                if (!action.payload.includes(item.date)) {
                    emptyState.push(item);
                    // action.payload.map(i => {
                    //     //********index has changed
                    //     if (i !== item.date) {
                    //         emptyState.push()
                    //     }
                    // });
                    // // if (action.payload.indexOf(item.date) !== -1) {
                    // //     console.warn("yes");
                    // //
                }
            });
            return emptyState;
        default:
            return state;
    }
};
