import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from "expo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {WorkoutList} from "../component/WorkoutList";

class _EditHistory extends Component {
    render() {
        return (
            <LinearGradient colors={["#219dd1", "#51c0bb"]} style={{flex: 1}}>
                {/*<Text>{navProps.selectedExerciseCategory}</Text>*/}
                {/*<WorkoutList*/}
                {/*    showListFooterComponent={false}*/}
                {/*    workoutSetsData={this.props.customWorkoutSets[navProps.selectedExerciseCategory]}*/}
                {/*    currentWorkout={this.props.customWorkoutSets[navProps.selectedExerciseCategory]}*/}
                {/*    showAddWeightModal={this.props.showAddWeightModalForEditLibrary}*/}
                {/*    showEditWeightReps={this.props.showEditWeightRepsForEditLibrary}*/}
                {/*    setAddWeightModalVisibility={this.props.setEditLibraryAddWeightModalVisibility}*/}
                {/*    setEditWeightRepsModalVisibility={this.props.setEditLibraryEditWeightRepsModalVisibility}*/}
                {/*    //todo*/}
                {/*    selectedExerciseCategory={navProps.selectedExerciseCategory}*/}
                {/*    addWeightRepsToExercise={(props) => this.props.addWeightRepsToExerciseInLibrary({*/}
                {/*        ...props,*/}
                {/*        selectedExerciseCategory: navProps.selectedExerciseCategory*/}
                {/*    })}*/}
                {/*    editWeightRepsInWorkout={(props) => this.props.editWeightRepsInWorkoutOfLibrary({*/}
                {/*        ...props,*/}
                {/*        selectedExerciseCategory: navProps.selectedExerciseCategory*/}
                {/*    })}*/}
                {/*    deleteExerciseFromWorkoutList={(props) => this.props.deleteExerciseFromWorkoutListOfLibrary({*/}
                {/*        ...props,*/}
                {/*        selectedExerciseCategory: navProps.selectedExerciseCategory*/}
                {/*    })}*/}
                {/*/>*/}
                {/*<ExerciseModal*/}
                {/*    workoutSetsData={this.props.customWorkoutSets[navProps.selectedExerciseCategory]}*/}
                {/*    sectionExercises={this.props.sectionExercises}*/}
                {/*    extraSectionExercises={this.props.extraSectionExercises}*/}
                {/*    visible={this.props.showExerciseModalForEditLibrary}*/}
                {/*    closeModal={() => this.props.setEditLibraryExerciseModalVisibility(false)}*/}
                {/*    addExercise={(props) => this.props.addExerciseFromExerciseModalToCategoryOfLibrary({*/}
                {/*        ...props,*/}
                {/*        selectedExerciseCategory: navProps.selectedExerciseCategory*/}
                {/*    })}*/}
                {/*/>*/}
            </LinearGradient>
        )
    }
}

export const EditHistory = connect(null, null)(_EditHistory);
