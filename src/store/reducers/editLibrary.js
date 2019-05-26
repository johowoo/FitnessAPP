import * as types from "../actionTypes";

export const editLibrary = (
    state = {
        showExerciseModalForEditLibrary: false,
        showAddWeightModalForEditLibrary: false,
        showEditWeightRepsForEditLibrary: false
    },
    action
) => {
    switch (action.type) {
        case types.SET_EDIT_LIBRARY_EXERCISE_MODAL_VISIBILITY:
            return {
                ...state,
                showExerciseModalForEditLibrary: action.payload,
            };
        case types.SET_EDIT_LIBRARY_ADD_WEIGHT_MODAL_VISIBILITY:
            console.warn("ADD_WEIGHT_MODAL", action.payload);
            return {
                ...state,
                showAddWeightModalForEditLibrary: action.payload,
            };
        case types.SET_EDIT_LIBRARY_EDIT_WEIGHT_REPS_MODAL_VISIBILITY:
            console.warn("Weight_reps_MODAL", action.payload);
            return {
                ...state,
                showEditWeightRepsForEditLibrary: action.payload,
            };
        default:
            return state;
    }
};
