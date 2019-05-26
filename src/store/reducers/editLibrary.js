import * as types from "../actionTypes";

export const editLibrary = (
    state = {
        showExerciseModal: false,
    },
    action
) => {
    switch (action.type) {
        case types.SET_EDIT_LIBRARY_EXERCISE_MODAL_VISIBILITY:
            return {
                ...state,
                showExerciseModal: action.payload,
            };
        default:
            return state;
    }
};
