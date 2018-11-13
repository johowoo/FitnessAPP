import React, {Component} from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {TopBar} from "../component/TopBar";
import {Fonts} from "../utils/Fonts";
import {
    setExerciseModalVisibility,
    addExerciseAction,
    clearCurrentWorkoutAction,
    setCurrentDateAction,
    addMarkedDateAction,
    updateEmptyAction,
    addNewExerciseListAction
} from '../store/actions';
import {WorkoutList} from "../component/WorkoutList";
import {ExerciseModal} from "./ExerciseModal";
import Button from "apsl-react-native-button";
import {formateMonthandDay} from '../utils/formateMonthandDay';


class _CurrentWorkout extends Component {
    static defaultProps = {
        currentWorkout: [],

    }
    handlePressComplete = () => {
        this.props.clearCurrentWorkout();
        const currentTimestamp = new Date();
        const currentDate = `${currentTimestamp.getFullYear()}-${formateMonthandDay(currentTimestamp.getMonth()) + 1}-${formateMonthandDay(currentTimestamp.getDate()+1)}`;
        this.props.addMarkedDate(currentDate);
        this.props.updateEmpty(true)
        this.props.addNewExerciseList({
            date: currentDate,
            exercises: this.props.currentWorkout
        })
    }


    render() {
        console.log(this.props.isExerciseListEmpty)
        return (
            <View>
                <TopBar style={styles.topBar}>
                    <View style={{marginRight: 55}}>
                        <Text style={styles.textBar}>Current Workout</Text>
                    </View>
                    <View style={{position: 'absolute', right: 5, top: -18}}>
                        <Button
                            style={this.props.isExerciseListEmpty ? styles.completeButtonDisabled : styles.completeButton}
                            onPress={this.handlePressComplete.bind(this)}
                            children={<Text key="completed"
                                            style={this.props.isExerciseListEmpty ? styles.completeDisabled : styles.complete}>Completed</Text>}
                        />
                    </View>
                </TopBar>
                <View>
                    <WorkoutList
                        isCompleted={this.props.isCompleted}
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
    isCompleted: state.exerciseCompleted.isCompleted,
    isExerciseListEmpty: state.exerciseCompleted.isExerciseListEmpty,
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
    },
    clearCurrentWorkout() {
        return dispatch(clearCurrentWorkoutAction());
    },
    setCurrentDate(date) {
        return dispatch(setCurrentDateAction(date))
    },
    addMarkedDate(date) {
        return dispatch(addMarkedDateAction(date))
    },
    updateEmpty(bool) {
        return dispatch(updateEmptyAction(bool))
    },
    addNewExerciseList(payload) {
        return dispatch(addNewExerciseListAction(payload))
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
    },
    completeButton: {
        borderColor: '#fff',
        marginTop: 50,
        // borderStyle: null,
        borderWidth: 1,

        height: 30,
        width: 90,
        marginLeft: 50,
    },

    complete: {
        color: '#fff'
    },
    completeButtonDisabled: {
        backgroundColor: 'rgba(50,50,50,0.1)',
        borderColor: '#999',
        marginTop: 50,
        // borderStyle: null,
        borderWidth: 1,
        height: 30,
        width: 90,
        marginLeft: 50,
    },
    completeDisabled: {
        color: '#999'
    }

})