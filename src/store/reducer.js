import {combineReducers} from "redux";
import {currentWorkout} from "./reducers/currentWorkout";
import {ui} from "./reducers/ui";
import {exercises} from "./reducers/exercises";
import {exerciseCompleted} from "./reducers/exerciseCompleted";
import {calendar} from "./reducers/calendar";
import {health} from "./reducers/health";
import {savedExerciseForEachDay} from "./reducers/savedExerciseForEachDay";
import {progress} from "./reducers/progress";
import {progressModal} from "./reducers/progressModal";
import {displayPicture} from "./reducers/displayPicture";
import {customWorkout} from "./reducers/customWorkout";
import {editLibrary} from "./reducers/editLibrary";

export const reducer = combineReducers({
    currentWorkout,
    ui,
    exercises,
    exerciseCompleted,
    calendar,
    health,
    savedExerciseForEachDay,
    progress,
    progressModal,
    displayPicture,
    customWorkout,
    editLibrary
});
