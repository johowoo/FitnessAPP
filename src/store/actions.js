import {createAction} from 'redux-actions';
import * as types from './actionTypes';

export const setExerciseModalVisibility = (visible) => (
    createAction(types.SET_EXECERCISE_VISIBILITY)(visible)
);

export const addExerciseAction = (exercise) => (
    createAction(types.ADD_EXERCISE)(exercise)
);

export const clearCurrentWorkoutAction = () => (
    createAction(types.CLEAR_CURRENT_WORKOUT)()
)
export const updateEmptyAction = (bool) => (
    createAction(types.UPDATE_EMPTY)(bool)
)
export const setCurrentDateAction = (date) => (
    createAction(types.SET_CURRENT_DATE)(date)
)
export const addMarkedDateAction = (date) => (
    createAction(types.ADD_MARKED_DATE)(date)
)
export const updateWeightAction = (data) => (
    createAction(types.UPDATE_WEIGHT_DATA)(data)
)
export const updateBfrAction = (data) => (
    createAction(types.UPDATE_BFR_DATA)(data)
)
export const addNewExerciseListAction = (data) => (
    createAction(types.ADD_NEW_EXERCISE_LIST)(data)
)
export const addProgressPhoto = (data) => (
    createAction(types.ADD_PROGRESS_PHOTO)(data)
)
export const showProgressModal = (data) => (
    createAction(types.SHOW_PROGRESS_MODAL)(data)
)
export const showProgressPicker = (data) => (
    createAction(types.SHOW_PROGRESS_PICKER)(data)
)

