import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {WorkoutList} from "./WorkoutList";
import {LinearGradient} from "expo";
import {addExerciseSetToCustomWorkoutAction, updateEmptyAction} from "../store/actions";
import {connect} from "react-redux";
import {_DisplayPicture} from "../page/DisplayPicture";

class _EditExercisesForLibrary extends Component {
    render() {
        const navProps = this.props?.navigation?.state?.params;
        return (
            <LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{flex: 1}}>
                <Text>{navProps.selectedExerciseCategory}</Text>
                <WorkoutList
                    showListFooterComponent={false}
                    workoutSetsData={this.props.customWorkoutSets[navProps.selectedExerciseCategory]}
                />
            </LinearGradient>
        )
    }
}

const mapStateToProps = state => ({
    customWorkout: state.customWorkout,
    customWorkoutCategory: state.customWorkout.customWorkoutCategory,
    customWorkoutSets: state.customWorkout.customWorkoutSets,
    customWorkoutAddable: state.customWorkout.customWorkoutAddable
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
