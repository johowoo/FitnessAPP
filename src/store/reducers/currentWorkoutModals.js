import * as types from "../actionTypes";

export const currentWorkoutModals = (
    state = {
        exerciseModal: false,
        showAddWeightModal: false,
        showEditWeightReps: false
    },
    action
) => {
    switch (action.type) {
        case types.SET_EXERCISE_VISIBILITY:
            return {
                ...state,
                exerciseModal: action.payload,
            };
        case types.SET_ADD_WEIGHT_MODAL_VISIBILITY:
            return {
                ...state,
                showAddWeightModal: action.payload,
            };
        case types.SET_EDIT_WEIGHT_REPS_MODAL_VISIBILITY:
            return {
                ...state,
                showEditWeightReps: action.payload,
            };
        default:
            return state;
    }
};
