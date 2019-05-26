import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {WorkoutList} from "./WorkoutList";
import {LinearGradient} from "expo";
import {
    addExerciseSetToCustomWorkoutAction,
    updateEmptyAction,
    setEditLibraryExerciseModalVisibilityAction
} from "../store/actions";
import {connect} from "react-redux";
import {ExerciseModal} from "../page/ExerciseModal";


//ToDo
//+ -> open the exerciseModal
//x -> close the exerciseModal
//**override
//delete Exercises from customWorkoutSets
//add Exercises to customWorkoutSets
class _EditExercisesForLibrary extends Component {
    state = {exerciseModal: false};

    render() {
        const navProps = this.props?.navigation?.state?.params;
        return (
            <LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{flex: 1}}>
                {/*<Text>{navProps.selectedExerciseCategory}</Text>*/}
                <WorkoutList
                    showListFooterComponent={false}
                    workoutSetsData={this.props.customWorkoutSets[navProps.selectedExerciseCategory]}
                />
                <ExerciseModal
                    sectionExercises={this.props.sectionExercises}
                    extraSectionExercises={this.props.extraSectionExercises}
                    visible={this.props.showExerciseModal}
                    closeModal={() => this.props.setEditLibraryExerciseModalVisibility(false)}
                />
            </LinearGradient>
        )
    }
}

const mapStateToProps = state => ({
    customWorkout: state.customWorkout,
    customWorkoutCategory: state.customWorkout.customWorkoutCategory,
    customWorkoutSets: state.customWorkout.customWorkoutSets,
    sectionExercises: state.exercises.sectionExercises,
    extraSectionExercises: state.exercises.extraSectionExercises,
    showExerciseModal: state.editLibrary.showExerciseModal
});

const mapActionToProps = dispatch => ({
    addExerciseSetToCustomWorkout(data) {
        dispatch(addExerciseSetToCustomWorkoutAction(data));
    },
    updateEmpty(bool) {
        dispatch(updateEmptyAction(bool));
    },
    setEditLibraryExerciseModalVisibility(bool) {
        dispatch(setEditLibraryExerciseModalVisibilityAction(bool))
    }
});

export const EditExercisesForLibrary = connect(
    mapStateToProps,
    mapActionToProps
)(_EditExercisesForLibrary);
