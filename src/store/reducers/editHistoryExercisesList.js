import * as types from "../actionTypes";

export const editHistoryExercisesList = (
    state = {
        workoutHistoryExerciseList: {},
        showReminderModal: false,
        reminderTitle: "",
        reminderContent: "",
        checkButtonAvailabilitySets: {}
    },
    action
) => {
    switch (action.type) {
        case types.ADD_EXERCISES_TO_EXERCISE_LIST_OF_WORKOUT_HISTORY:
            if (!action.payload.weightRepsDataArr) {
                action.payload.weightRepsDataArr = [];
            }
            const currentDateExerciseListCopy = state.workoutHistoryExerciseList[action.payload.date] ? JSON.parse(JSON.stringify(state.workoutHistoryExerciseList[action.payload.date])) : [];
            currentDateExerciseListCopy.push(action.payload);
            // const WorkHistoryExerciseCopy = JSON.parse(JSON.stringify(state.workoutHistoryExerciseList));
            // return [...state, action.payload];
            return {
                ...state,
                workoutHistoryExerciseList: {
                    ...state.workoutHistoryExerciseList,
                    [action.payload.date]: currentDateExerciseListCopy
                },
                checkButtonAvailabilitySets: {...state.checkButtonAvailabilitySets, [action.payload.date]: true}
            };

        case types.ADD_WEIGHT_REPS_TO_EXERCISE_IN_CALENDAR_HISTORY:
            const stateCopy = JSON.parse(JSON.stringify(state.workoutHistoryExerciseList[action.payload.date]));
            stateCopy.map(item => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    if (!item.weightRepsDataArr) {
                        item.weightRepsDataArr = [];
                    }
                    if (action.payload.cardioMinutes) {
                        console.warn("here", item);
                        //change minutes
                        item.minutes = action.payload.cardioMinutes;
                    } else {
                        item.weightRepsDataArr.push({reps: action.payload.reps, weight: action.payload.weight});
                        item.reps = action.payload.reps;
                        item.weight = action.payload.weight;
                    }
                }
            });
            return {
                ...state,
                workoutHistoryExerciseList: {...state.workoutHistoryExerciseList, [action.payload.date]: stateCopy}
            };
        case types.DELETE_EXERCISES_FROM_EXERCISE_LIST_OF_WORKOUT_HISTORY:
            // const stateCopyDelete = JSON.parse(JSON.stringify(state.workoutHistoryExerciseList[action.payload.date]));
            const emptyState = [];
            state.workoutHistoryExerciseList[action.payload.date].map((item, index) => {
                if (parseInt(item.time, 10) !== parseInt(action.payload.time, 10)) {
                    emptyState.push(item);
                }
            });
            return {
                ...state,
                workoutHistoryExerciseList: {
                    ...state.workoutHistoryExerciseList,
                    [action.payload.date]: emptyState,
                },
                checkButtonAvailabilitySets: {
                    ...state.checkButtonAvailabilitySets,
                    [action.payload.date]: !!emptyState.length
                }
            };
        case types.EDIT_WEIGHT_REPS_IN_WORKOUT_OF_CALENDAR_HISTORY_ACTION:
            const stateCopyForEditAll = JSON.parse(JSON.stringify(state.workoutHistoryExerciseList[action.payload.date]));
            stateCopyForEditAll.map((item, index) => {
                if (parseInt(item.time, 10) === parseInt(action.payload.time, 10)) {
                    item.sets = action.payload.sets;
                    delete item.weightRepsDataArr;
                    item.weightRepsDataArr = [];
                    let arrTmp = Object.keys(action.payload.weightText);
                    // console.warn("length", arrTmp.length);
                    for (let i = 0; i < arrTmp.length; i++) {
                        item.weightRepsDataArr.push({
                            reps: action.payload.repsText[i],
                            weight: action.payload.weightText[i]
                        });
                    }
                }
            });
            // return {...state, workoutHistoryExerciseList: stateCopyForEditAll};
            return {
                ...state,
                workoutHistoryExerciseList: {
                    ...state.workoutHistoryExerciseList,
                    [action.payload.date]: stateCopyForEditAll
                }
            };
        case types.ADD_EXERCISES_LIST_TO_WORKOUT_HISTORY:
            return {...state};
        case types.SET_REMINDER_MODAL_IN_EDIT_HISTORY:
            return {
                ...state,
                ...action.payload
            };

        case types.CHANGE_CHECK_BUTTON_AVAILABILITY_IN_EDIT_HISTORY:
            return {
                ...state,
                checkButtonAvailabilitySets: {...state.checkButtonAvailabilitySets, [action.payload]: true}
            };
        default:
            return state;
    }
};
