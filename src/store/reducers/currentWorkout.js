import * as types from "../actionTypes";

export const currentWorkout = (state = [], action) => {
    switch (action.type) {
        case types.ADD_EXERCISE:
            if (!action.payload.weightRepsDataArr) {
                action.payload.weightRepsDataArr = []
            }
            return [...state, action.payload];
        case types.CLEAR_CURRENT_WORKOUT:
            return [];
        case types.ADD_WEIGHT_TO_EXERCISE:
            const stateCopy = JSON.parse(JSON.stringify(state));
            stateCopy.map(item => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    if (!item.weightRepsDataArr) {
                        item.weightRepsDataArr = [];
                    }
                    item.weightRepsDataArr.push({reps: action.payload.reps, weight: action.payload.weight});
                    item.reps = action.payload.reps;
                    item.weight = action.payload.weight;
                }
            });
            return stateCopy;
        case types.DELETE_EXERCISE_FROM_WORKOUTLIST:
            const stateCopyDelete = JSON.parse(JSON.stringify(state));
            stateCopyDelete.map((item, index) => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    stateCopyDelete.splice(index, 1);
                }
            });
            return stateCopyDelete;
        default:
            return state;
    }
};
