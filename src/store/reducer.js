import {combineReducers} from'redux';
import {currentWorkout} from "./reducers/currentWorkout";
import {ui} from "./reducers/ui";
import {exercises} from "./reducers/exercises";

export const reducer=combineReducers({currentWorkout,ui,exercises})