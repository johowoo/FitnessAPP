import * as types from '../actionTypes';
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const monthToNumberClass = {}

for (let i = 0; i < 12; i++) {
    monthToNumberClass[labels[i]] = i;
}

const defaultState = {
    weightData: [
        85, 84, 82, 84, 83, 80, 78, 82, 84, 83, 80, 78,
    ],
    bfrData: [
        0.20, 0.22, 0.25, 0.24, 0.22, 0.18, 0.20, 0.19, 0.18, 0.16, 0.18, 0.17
    ]
}

export const health = (state = defaultState, action) => {
    switch (action.type) {
        case types.UPDATE_WEIGHT_DATA:
            console.warn(action.payload)
            const newWeightData = state.weightData;
            newWeightData[monthToNumberClass[action.payload.category]] = action.payload.item;
            return {...state,weightData:newWeightData}
        case types.UPDATE_BFR_DATA:
            const newBfrData = state.bfrData;
            newBfrData[monthToNumberClass[action.payload.category]] = action.payload.item;
            return {...state,bfrData:newBfrData}

        default:
            return state;
    }
}