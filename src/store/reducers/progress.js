import * as types from "../actionTypes";

export const progress = (state = {pics: []}, action) => {
    // const newPics = JSON.parse(JSON.stringify(state.pics));
    const emptyPics = [];
    const currentPic = {};
    switch (action.type) {
        case types.ADD_PROGRESS_PHOTO:
            return {...state, pics: [...state.pics, action.payload]};
        case types.DELETE_ONE_PIC_FROM_PROGRESS:
            // console.warn("payload date".action.payload.date);
            // console.warn("state pics ", state.pics);
            state.pics.forEach((item, index) => {
                if (state.currentPic.date !== item.date) {
                    emptyPics.push(item);
                }
            });
            state.pics.map((item, index) => {
                if (action.payload.date === item.date) {
                    currentPic.index = index > 0 ? index - 1 : 0;
                    currentPic.date = index > 0 ? state.pics[index - 1].date : item.date;
                    currentPic.photoURI = state.pics[currentPic.index].photoURI;
                    currentPic.weight = state.pics[currentPic.index].weight;
                    currentPic.BFR = state.pics[currentPic.index].BFR;
                }
            });
            return {...state, pics: emptyPics, currentPic};

        case types.DELETE_PICS_FROM_PROGRESS:
            newPics.map((item, index) => {
                if (!action.payload.includes(item.date)) {
                    emptyPics.push(item);
                }
            });
            return {...state, pics: emptyPics};
        case types.CHANGE_CURRENT_DISPLAY_PIC:
            currentPic.date = action.payload.date || state.currentPic.date;
            currentPic.index = action.payload.index;
            currentPic.photoURI = state.pics[currentPic.index].photoURI;
            currentPic.weight = state.pics[currentPic.index].weight;
            currentPic.BFR = state.pics[currentPic.index].BFR;
            //**pay attention to 0
            // currentPic.index = action.payload.index || state.currentPic.index;
            return {...state, currentPic};
        default:
            return state;
    }
};
