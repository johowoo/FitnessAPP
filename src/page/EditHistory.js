import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from "expo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {WorkoutList} from "../component/WorkoutList";
import {ExerciseModal} from "./ExerciseModal";
import {
    setEditHistoryExerciseModalVisibilityAction,
    setCalendarEditHistoryAddWeightModalVisibilityAction,
    setCalendarEditHistoryEditWeightRepsModalVisibilityAction,
    addWeightRepsToExerciseInCalendarHistoryAction,
    editWeightRepsInWorkoutOfCalendarHistoryAction,
    addExerciseListToWorkoutHistoryAction,
    addExercisesToExerciseListOfWorkoutHistoryAction
} from "../store/actions";

class _EditHistory extends Component {
    render() {
        const navProps = this.props.navigation.state.params;
        return (
            <LinearGradient colors={["#219dd1", "#51c0bb"]} style={{flex: 1}}>
                {/*<Text>{navProps.selectedExerciseCategory}</Text>*/}
                <WorkoutList
                    showListFooterComponent={false}
                    workoutSetsData={this.props.workoutHistoryExerciseList[navProps.date]}
                    showAddWeightModal={this.props.showAddWeightModalForEditHistory}
                    showEditWeightReps={this.props.showEditWeightRepsForEditHistory}
                    setAddWeightModalVisibility={this.props.setCalendarEditHistoryAddWeightModalVisibility}
                    setEditWeightRepsModalVisibility={this.props.setCalendarEditHistoryEditWeightRepsModalVisibility}
                    addWeightRepsToExercise={(props) => this.props.addWeightRepsToExerciseInCalendarHistory({
                        ...props,
                        date: navProps.date
                    })}
                    editWeightRepsInWorkout={(props) => this.props.editWeightRepsInWorkoutOfCalendarHistory({
                        ...props,
                        date: navProps.date
                    })}
                    // deleteExerciseFromWorkoutList={(props) => this.props.deleteExerciseFromWorkoutListOfLibrary({
                    //     ...props,
                    //     selectedExerciseCategory: navProps.selectedExerciseCategory
                    // })}
                />
                <ExerciseModal
                    workoutSetsData={this.props.workoutHistoryExerciseList[navProps.date]}
                    sectionExercises={this.props.sectionExercises}
                    extraSectionExercises={this.props.extraSectionExercises}
                    visible={this.props.showEditHistory}
                    closeModal={() => this.props.setEditHistoryExerciseModalVisibility(false)}
                    addExercise={(props) => this.props.addExercisesToExerciseListOfWorkoutHistory({
                        ...props,
                        date: navProps.date
                    })}
                />
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => ({
    showEditHistory: state.calendar.showEditHistory,
    showAddWeightModalForEditHistory: state.calendar.showAddWeightModalForEditHistory,
    showEditWeightRepsForEditHistory: state.calendar.showEditWeightRepsForEditHistory,
    allExercisesList: state.savedExerciseForEachDay.allExercisesList,
    sectionExercises: state.exercises.sectionExercises,
    extraSectionExercises: state.exercises.extraSectionExercises,
    workoutHistoryExerciseList: state.editHistoryExercisesList.workoutHistoryExerciseList
});

const mapActionToProps = (dispatch) => ({
    setEditHistoryExerciseModalVisibility(data = false) {
        dispatch(setEditHistoryExerciseModalVisibilityAction(data));
    },
    setCalendarEditHistoryAddWeightModalVisibility(data = false) {
        dispatch(setCalendarEditHistoryAddWeightModalVisibilityAction(data));
    },
    setCalendarEditHistoryEditWeightRepsModalVisibility(data = false) {
        dispatch(setCalendarEditHistoryEditWeightRepsModalVisibilityAction(data));
    },
    addWeightRepsToExerciseInCalendarHistory(data = false) {
        dispatch(addWeightRepsToExerciseInCalendarHistoryAction(data));
    },
    editWeightRepsInWorkoutOfCalendarHistory(data = false) {
        dispatch(editWeightRepsInWorkoutOfCalendarHistoryAction(data));
    },
    addExercisesToExerciseListOfWorkoutHistory(data) {
        dispatch(addExercisesToExerciseListOfWorkoutHistoryAction(data))
    },
    addExerciseListToWorkoutHistory(data) {
        dispatch(addExerciseListToWorkoutHistoryAction(data));
    }
});

export const EditHistory = connect(mapStateToProps, mapActionToProps)(_EditHistory);
