import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {WorkoutList} from "./WorkoutList";
import {LinearGradient} from "expo";
import {addExerciseSetToCustomWorkoutAction, updateEmptyAction} from "../store/actions";
import {connect} from "react-redux";
import {ExerciseModal} from "../page/ExerciseModal";


//ToDo
//+ -> open the exerciseModal
//x ->close the exerciseModal
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
                    SectionExercises={this.props.sectionExercises}
                    visible={this.state.exerciseModal}
                    closeModal={() => this.state.setModalVisibility(false)}
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
});

const mapActionToProps = dispatch => ({
    addExerciseSetToCustomWorkout(data) {
        dispatch(addExerciseSetToCustomWorkoutAction(data));
    },
    updateEmpty(bool) {
        dispatch(updateEmptyAction(bool));
    }
});

export const EditExercisesForLibrary = connect(
    mapStateToProps,
    mapActionToProps
)(_EditExercisesForLibrary);
