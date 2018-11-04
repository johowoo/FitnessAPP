import {combineReducers} from'redux';
import {currentWorkout} from "./reducers/currentWorkout";
import {ui} from "./reducers/ui";

export const reducer=combineReducers({currentWorkout,ui})