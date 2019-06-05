import * as types from "../actionTypes";

export const editLibrary = (
  state = {
    showExerciseModalForEditLibrary: false,
    showAddWeightModalForEditLibrary: false,
    showEditWeightRepsForEditLibrary: false,
    showAddCategoryModal: false,
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
      return {
        ...state,
        showAddWeightModalForEditLibrary: action.payload,
      };
    case types.SET_EDIT_LIBRARY_EDIT_WEIGHT_REPS_MODAL_VISIBILITY:
      return {
        ...state,
        showEditWeightRepsForEditLibrary: action.payload,
      };
    case types.SET_ADD_CATEGORY_MODAL_FOR_LIBRARY_VISIBILITY:
      return {
        ...state,
        showAddCategoryModal: action.payload,
      };
    default:
      return state;
  }
};
