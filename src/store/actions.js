import {createAction} from "redux-actions";
import * as types from "./actionTypes";

export const setExerciseModalVisibility = visible =>
    createAction(types.SET_EXECERCISE_VISIBILITY)(visible);

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
export const addProgressPhoto = data =>
    createAction(types.ADD_PROGRESS_PHOTO)(data);
export const showProgressModal = data =>
    createAction(types.SHOW_PROGRESS_MODAL)(data);
export const showProgressPicker = data =>
    createAction(types.SHOW_PROGRESS_PICKER)(data);
export const changeTmpUriAction = data =>
    createAction(types.CHANGE_TMP_URI)(data);
export const addWeightToExercisesAction = data =>
    createAction(types.ADD_WEIGHT_TO_EXERCISE)(data);
export const editWeightRepsInWorkoutAction = data =>
    createAction(types.EDIT_WEIGHT_REPS_IN_EXERCISE)(data);
export const deleteExerciseFromWorkoutListAction = data =>
    createAction(types.DELETE_EXERCISE_FROM_WORKOUTLIST)(data);
export const updateWeightBFRFromProgressPicsAction = data =>
    createAction(types.UPDATE_WEIGHT_BFR_FROM_PROGRESS_PICS)(data);
export const deletePicsFromProgressAction = data =>
    createAction(types.DELETE_PICS_FROM_PROGRESS)(data);
