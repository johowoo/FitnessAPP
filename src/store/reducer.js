import { combineReducers } from "redux";
import { currentWorkout } from "./reducers/currentWorkout";
import { currentWorkoutModals } from "./reducers/currentWorkoutModals";
import { exercises } from "./reducers/exercises";
import { exerciseCompleted } from "./reducers/exerciseCompleted";
import { calendar } from "./reducers/calendar";
import { health } from "./reducers/health";
import { savedExerciseForEachDay } from "./reducers/savedExerciseForEachDay";
import { progress } from "./reducers/progress";
import { progressModal } from "./reducers/progressModal";
import { displayPicture } from "./reducers/displayPicture";
import { customWorkout } from "./reducers/customWorkout";
import { editLibrary } from "./reducers/editLibrary";
import { editHistoryExercisesList } from "./reducers/editHistoryExercisesList";
import { setNotification } from "./reducers/setNotification";

export const reducer = combineReducers({
  currentWorkout,
  currentWorkoutModals,
  exercises,
  exerciseCompleted,
  calendar,
  health,
  savedExerciseForEachDay,
  progress,
  progressModal,
  displayPicture,
  customWorkout,
  editLibrary,
  editHistoryExercisesList,
  setNotification,
});
