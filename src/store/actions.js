import {createAction} from "redux-actions";
import * as types from "./actionTypes";
//currentWorkout Modals
export const setExerciseModalVisibility = visible =>
    createAction(types.SET_EXERCISE_VISIBILITY)(visible);
export const setAddWeightModalVisibilityAction = visible =>
    createAction(types.SET_ADD_WEIGHT_MODAL_VISIBILITY)(visible);
export const setEditWeightRepsModalVisibilityAction = visible =>
    createAction(types.SET_EDIT_WEIGHT_REPS_MODAL_VISIBILITY)(visible);


export const addExerciseAction = exercise =>
    createAction(types.ADD_EXERCISE)(exercise);
export const addExerciseToSectionListAction = exercise =>
    createAction(types.ADD_EXERCISE_TO_SECTIONLIST)(exercise);
export const deleteExerciseFromSectionListAction = exercise =>
    createAction(types.DELETE_EXERCISE_FROM_SECTIONLIST)(exercise);

export const clearCurrentWorkoutAction = () =>
    createAction(types.CLEAR_CURRENT_WORKOUT)();
export const updateEmptyAction = bool => createAction(types.UPDATE_EMPTY)(bool);
export const setCurrentDateAction = date =>
    createAction(types.SET_CURRENT_DATE)(date);

export const addMarkedDateAction = date =>
    createAction(types.ADD_MARKED_DATE)(date);

export const updateWeightAction = data =>
    createAction(types.UPDATE_WEIGHT_DATA)(data);
export const updateBfrAction = data =>
    createAction(types.UPDATE_BFR_DATA)(data);

export const addNewExerciseListAction = data =>
    createAction(types.ADD_NEW_EXERCISE_LIST)(data);

export const addWeightToExercisesAction = data =>
    createAction(types.ADD_WEIGHT_TO_EXERCISE)(data);
export const editWeightRepsInWorkoutAction = data =>
    createAction(types.EDIT_WEIGHT_REPS_IN_EXERCISE)(data);
export const deleteExerciseFromWorkoutListAction = data =>
    createAction(types.DELETE_EXERCISE_FROM_WORKOUTLIST)(data);
export const updateWeightBFRFromProgressPicsAction = data =>
    createAction(types.UPDATE_WEIGHT_BFR_FROM_PROGRESS_PICS)(data);

//PROGRESS
export const deletePicsFromProgressAction = data =>
    createAction(types.DELETE_PICS_FROM_PROGRESS)(data);
export const deleteOnePicFromProgressAction = data =>
    createAction(types.DELETE_ONE_PIC_FROM_PROGRESS)(data);
export const addProgressPhoto = data =>
    createAction(types.ADD_PROGRESS_PHOTO)(data);
export const showProgressModal = data =>
    createAction(types.SHOW_PROGRESS_MODAL)(data);
export const showProgressPicker = data =>
    createAction(types.SHOW_PROGRESS_PICKER)(data);
export const changeTmpUriAction = data =>
    createAction(types.CHANGE_TMP_URI)(data);
export const changeCurrentDisplayPicAction = data =>
    createAction(types.CHANGE_CURRENT_DISPLAY_PIC)(data);
export const showDeleteConfirmModalInDisplayPictureAction = data =>
    createAction(types.SHOW_DELETE_CONFIRM_MODAL_IN_DISPLAY_PICTURE)(data);


//Custom Workout
export const addExerciseSetToCurrentWorkoutAction = data =>
    createAction(types.ADD_EXERCISE_SET_TO_CURRENT_WORKOUT)(data);
// export const deleteExerciseSetFromCustomWorkoutAction = data =>
//     createAction(types.DELETE_EXERCISE_SET_FROM_CUSTOM_WORKOUT)(data);

//Edit Library
export const setAddCategoryModalForLibraryVisibilityAction = data =>
    createAction(types.SET_ADD_CATEGORY_MODAL_FOR_LIBRARY_VISIBILITY)(data);
export const addCategoryToEditLibraryAction = data =>
    createAction(types.ADD_CATEGORY_TO_EDIT_LIBRARY)(data);


export const setEditLibraryExerciseModalVisibilityAction = data =>
    createAction(types.SET_EDIT_LIBRARY_EXERCISE_MODAL_VISIBILITY)(data);
export const setEditLibraryAddWeightModalVisibilityAction = data =>
    createAction(types.SET_EDIT_LIBRARY_ADD_WEIGHT_MODAL_VISIBILITY)(data);
export const setEditLibraryEditWeightRepsModalVisibilityAction = data =>
    createAction(types.SET_EDIT_LIBRARY_EDIT_WEIGHT_REPS_MODAL_VISIBILITY)(data);



export const addWeightRepsToExerciseInLibraryAction = data =>
    createAction(types.ADD_WEIGHT_REPS_TO_EXERCISE_IN_LIBRARY)(data);
export const editWeightRepsInWorkoutOfLibraryAction = data =>
    createAction(types.EDIT_WEIGHT_REPS_IN_WORKOUT_OF_LIBRARY)(data);
export const deleteExerciseFromWorkoutListOfLibraryAction = data =>
    createAction(types.DELETE_EXERCISE_FROM_WORKOUT_LIST_OF_LIBRARY)(data);

export const addExerciseFromExerciseModalToCategoryOfLibraryAction = data =>
    createAction(types.ADD_EXERCISE_FROM_EXERCISE_MODAL_TO_CATEGORY_OF_LIBRARY)(data);





