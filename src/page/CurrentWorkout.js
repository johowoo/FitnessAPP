import React, {Component} from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {TopBar} from "../ui/TopBar";
import {Fonts} from "../utils/Fonts";
import {setExerciseModalVisibility, addExerciseAction} from '../store/actions';
import {WorkoutList} from "../ui/WorkoutList";
import {ExerciseModal} from "./ExerciseModal";

class _CurrentWorkout extends Component {
    static defaultProps = {
        currentWorkout: [],
        // exercises:[],
    }

    render() {
        return (
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Current Workout</Text>
                </TopBar>
                <View>
                    <WorkoutList
                        setModalVisibility={this.props.setModalVisibility}
                        currentWorkout={this.props.currentWorkout}
                    />
                </View>
                <View>
                    <ExerciseModal
                        // addExercise={this.props.addExercise}
                        sectionExercises={this.props.sectionExercises}
                        extraSectionExercises={this.props.extraSectionExercises}
                        visible={this.props.exerciseModal}
                        closeModal={() => this.props.setModalVisibility(false)}
                    />
                </View>
            </View>
        )
    }

}

const mapStateToProps = state => ({
    currentWorkout: state.currentWorkout,
    exerciseModal: state.ui.exerciseModal,
    sectionExercises: state.exercises.sectionExercises,
    extraSectionExercises: state.exercises.extraSectionExercises,
})
const mapActionsToProps = dispatch => ({
    setModalVisibility(visible) {
        return dispatch(setExerciseModalVisibility(visible))
    },
    addExercise(exercise) {
        return dispatch(addExerciseAction(exercise));
    }
})

export const CurrentWorkout = connect(mapStateToProps, mapActionsToProps)(_CurrentWorkout)

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#ddd'
    },
    textBar: {
        textAlign: 'center',
        color: '#ddd',
        fontSize: 30,
        fontFamily: Fonts.PattayaRegular
    }
})