import {combineReducers} from'redux';
import {currentWorkout} from "./reducers/currentWorkout";
import {ui} from "./reducers/ui";
import {exercises} from "./reducers/exercises";
import {exerciseCompleted} from './reducers/exerciseCompleted';
import {calendar}from'./reducers/calendar';
import {health}from'./reducers/health';

export const reducer=combineReducers({
    currentWorkout,
    ui,
    exercises,
    exerciseCompleted,
    calendar,
    health
})