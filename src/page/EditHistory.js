import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from "expo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {WorkoutList} from "../component/WorkoutList";
import {ExerciseModal} from "./ExerciseModal";
import LoadingUtil from '../utils/LoadingUtil';
import {
    setEditHistoryExerciseModalVisibilityAction,
    setCalendarEditHistoryAddWeightModalVisibilityAction,
    setCalendarEditHistoryEditWeightRepsModalVisibilityAction,
    addWeightRepsToExerciseInCalendarHistoryAction,
    editWeightRepsInWorkoutOfCalendarHistoryAction,
    addExerciseListToWorkoutHistoryAction,
    addExercisesToExerciseListOfWorkoutHistoryAction,
    deleteExercisesFromExerciseListOfWorkoutHistoryAction,
    setReminderModalInEditHistoryAction,
    addHistoryMarkedDateAction
} from "../store/actions";
import {ReminderModal} from "../component/ReminderModal";

class _EditHistory extends Component {
    state = {showReminderModal: false};
    handleReminderConfirm = async () => {
        const navProps = this.props.navigation.state.params;
        await LoadingUtil.showLoading();
        await this.props.addExerciseListToWorkoutHistory({
            date: navProps.date,
            exercises: this.props.workoutHistoryExerciseList[navProps.date],
        });
        await this.props.addHistoryMarkedDate(navProps.date);
        await this.props.setReminderModalInEditHistory({showReminderModal: false});
        await this.props.navigation.navigate("Calendar");
        await LoadingUtil.dismissLoading();
    };

    render() {
        const navProps = this.props.navigation.state.params;
        console.warn("ExerciseList[navProps.date]", this.props.workoutHistoryExerciseList[navProps.date]);
        return (
            <LinearGradient colors={["#219dd1", "#51c0bb"]} style={{flex: 1}}>
                {/*<Text>{navProps.selectedExerciseCategory}</Text>*/}
                <View><Text style={styles.dateTitle}>{navProps.date}</Text></View>
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
                    deleteExerciseFromWorkoutList={(props) => this.props.deleteExercisesFromExerciseListOfWorkoutHistory({
                        ...props,
                        date: navProps.date
                    })}
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
                {this.props.showReminderModal && <ReminderModal
                    showReminderModal={this.props.showReminderModal}
                    handleCloseReminder={() => this.props.setReminderModalInEditHistory({showReminderModal: false})}
                    reminderTitle={this.props.reminderTitle}
                    reminderContent={this.props.reminderContent}
                    hideConfirmButton={false}
                    handleConfirm={this.handleReminderConfirm}
                />}
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
    workoutHistoryExerciseList: state.editHistoryExercisesList.workoutHistoryExerciseList,
    showReminderModal: state.editHistoryExercisesList.showReminderModal,
    reminderTitle: state.editHistoryExercisesList.reminderTitle,
    reminderContent: state.editHistoryExercisesList.reminderContent
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
    deleteExercisesFromExerciseListOfWorkoutHistory(data) {
        dispatch(deleteExercisesFromExerciseListOfWorkoutHistoryAction(data))
    },
    addExerciseListToWorkoutHistory(data) {
        dispatch(addExerciseListToWorkoutHistoryAction(data));
    },
    setReminderModalInEditHistory: data => {
        dispatch(setReminderModalInEditHistoryAction(data));
    },
    addHistoryMarkedDate: data => {
        dispatch(addHistoryMarkedDateAction(data));
    }
});

const styles = StyleSheet.create({
    dateTitle: {
        fontFamily: "PattayaRegular",
        fontSize: 22,
        color: "#eee",
        margin: 10,
        marginLeft: 20,
        marginTop: 15
    }
});
export const EditHistory = connect(mapStateToProps, mapActionToProps)(_EditHistory);

