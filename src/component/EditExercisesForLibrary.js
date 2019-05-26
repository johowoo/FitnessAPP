import React, {Component} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {WorkoutList} from "./WorkoutList";
import {LinearGradient} from "expo";
import {
    addExerciseSetToCurrentWorkoutAction,
    updateEmptyAction,
    setEditLibraryExerciseModalVisibilityAction,
    setEditLibraryAddWeightModalVisibilityAction,
    setEditLibraryEditWeightRepsModalVisibilityAction,
    addWeightRepsToExerciseInLibraryAction,
    editWeightRepsInWorkoutOfLibraryAction,
    deleteExerciseFromWorkoutListOfLibraryAction,
    addExerciseFromExerciseModalToCategoryOfLibraryAction
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
    render() {
        const navProps = this.props?.navigation?.state?.params;
        return (
            <LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{flex: 1}}>
                {/*<Text>{navProps.selectedExerciseCategory}</Text>*/}
                <WorkoutList
                    showListFooterComponent={false}
                    workoutSetsData={this.props.customWorkoutSets[navProps.selectedExerciseCategory]}
                    currentWorkout={this.props.customWorkoutSets[navProps.selectedExerciseCategory]}
                    showAddWeightModal={this.props.showAddWeightModalForEditLibrary}
                    showEditWeightReps={this.props.showEditWeightRepsForEditLibrary}
                    setAddWeightModalVisibility={this.props.setEditLibraryAddWeightModalVisibility}
                    setEditWeightRepsModalVisibility={this.props.setEditLibraryEditWeightRepsModalVisibility}
                    //todo
                    selectedExerciseCategory={navProps.selectedExerciseCategory}
                    addWeightRepsToExercise={(props) => this.props.addWeightRepsToExerciseInLibrary({
                        ...props,
                        selectedExerciseCategory: navProps.selectedExerciseCategory
                    })}
                    editWeightRepsInWorkout={(props) => this.props.editWeightRepsInWorkoutOfLibrary({
                        ...props,
                        selectedExerciseCategory: navProps.selectedExerciseCategory
                    })}
                    deleteExerciseFromWorkoutList={(props) => this.props.deleteExerciseFromWorkoutListOfLibrary({
                        ...props,
                        selectedExerciseCategory: navProps.selectedExerciseCategory
                    })}
                />
                <ExerciseModal
                    workoutSetsData={this.props.customWorkoutSets[navProps.selectedExerciseCategory]}
                    sectionExercises={this.props.sectionExercises}
                    extraSectionExercises={this.props.extraSectionExercises}
                    visible={this.props.showExerciseModalForEditLibrary}
                    closeModal={() => this.props.setEditLibraryExerciseModalVisibility(false)}
                    addExercise={(props) => this.props.addExerciseFromExerciseModalToCategoryOfLibrary({
                        ...props,
                        selectedExerciseCategory: navProps.selectedExerciseCategory
                    })}
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
    showExerciseModalForEditLibrary: state.editLibrary.showExerciseModalForEditLibrary,
    showAddWeightModalForEditLibrary: state.editLibrary.showAddWeightModalForEditLibrary,
    showEditWeightRepsForEditLibrary: state.editLibrary.showEditWeightRepsForEditLibrary,
});

const mapActionToProps = dispatch => ({
    addExerciseSetToCurrentWorkout(data) {
        dispatch(addExerciseSetToCurrentWorkoutAction(data));
    },
    updateEmpty(bool) {
        dispatch(updateEmptyAction(bool));
    },
    setEditLibraryExerciseModalVisibility(bool) {
        dispatch(setEditLibraryExerciseModalVisibilityAction(bool))
    },
    setEditLibraryAddWeightModalVisibility(bool) {
        dispatch(setEditLibraryAddWeightModalVisibilityAction(bool))
    },
    setEditLibraryEditWeightRepsModalVisibility(bool) {
        dispatch(setEditLibraryEditWeightRepsModalVisibilityAction(bool))
    },
    addWeightRepsToExerciseInLibrary(bool) {
        dispatch(addWeightRepsToExerciseInLibraryAction(bool))
    },
    editWeightRepsInWorkoutOfLibrary(bool) {
        dispatch(editWeightRepsInWorkoutOfLibraryAction(bool))
    },
    deleteExerciseFromWorkoutListOfLibrary(bool) {
        dispatch(deleteExerciseFromWorkoutListOfLibraryAction(bool))
    },
    addExerciseFromExerciseModalToCategoryOfLibrary(data) {
        dispatch(addExerciseFromExerciseModalToCategoryOfLibraryAction(data))
    }
});

export const EditExercisesForLibrary = connect(
    mapStateToProps,
    mapActionToProps
)(_EditExercisesForLibrary);
