import * as types from "../actionTypes";
import {monthArrary} from "../../utils/monthArray";

const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const monthToNumberClass = {};

for (let i = 0; i < 12; i++) {
    monthToNumberClass[labels[i]] = i;
}

const defaultState = {
    weightData: [80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80, 80],
    bfrData: [
        0.2,
        0.2,
        0.2,
        0.2,
        0.2,
        0.2,
        0.2,
        0.2,
        0.2,
        0.2,
        0.2,
        0.2,
    ],
};

export const health = (state = defaultState, action) => {
    const newWeightData = state.weightData;
    const newBfrData = state.bfrData;
    switch (action.type) {
        case types.UPDATE_WEIGHT_DATA:
            // console.warn(action.payload)
            const newWeightData = state.weightData;
            newWeightData[monthToNumberClass[action.payload.category]] =
                action.payload.item;
            return {...state, weightData: newWeightData};
        case types.UPDATE_BFR_DATA:
            newBfrData[monthToNumberClass[action.payload.category]] =
                action.payload.item;
            return {...state, bfrData: newBfrData};
        case types.UPDATE_WEIGHT_BFR_FROM_PROGRESS_PICS:
            newBfrData[monthToNumberClass[action.payload.month]] =
                action.payload.BFR;
        default:
            return state;
    }
};
