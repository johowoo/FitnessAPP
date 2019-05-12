import React, {Component} from 'react';
import {
    View,
    Text,
    SwipeableFlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Alert
} from 'react-native';
import Button from 'apsl-react-native-button';
// import {Icon} from 'expo';
import Icon from "react-native-vector-icons/MaterialIcons";
import {connect} from 'react-redux';
import {addWeightToExercisesAction, deleteExerciseFromWorkoutListAction} from '../store/actions';
import {AddWeightToExercise} from "./AddWeightToExercise";

const {width, height} = Dimensions.get('window');


export class _WorkoutList extends Component {
    state = {
        showAddWeightModal: false,
        time: 0  //time for the chosen exercise(to add weight & reps)
    };

    handlePress() {
        this.props.setModalVisibility(true)
    }


    handleCloseWeightModal = (bool) => {
        this.setState({
            showAddWeightModal: bool
        })
    }
    _renderItem = ({item: {exercise, sets, weight, time, reps}}) => {
        // console.warn(exercise,sets);
        return (<TouchableWithoutFeedback
            // onPress={(item) => this.handlePress.call(this, item)}
            onPress={async () => {
                await this.setState({time})
                await this.setState({showAddWeightModal: true})
            }}
            //*************************
            /*final step
            onPress={(item) => {
                this.props.addWeightToExercise({});

            }}
            */
        >
            <View style={styles.listContainer}>
                <View style={styles.listItem}>
                    <View style={{flex: 0.03}}/>
                    <View style={{flex: 0.77}}>
                        <Text style={styles.exerciseText}>{'  ' + exercise}</Text>
                    </View>
                    <View style={{flex: 0.20}}>
                        <Text style={styles.exerciseText}>{sets} sets</Text>
                    </View>
                </View>
                <TouchableHighlight>
                    <View style={{...styles.listItem, height: 30}}>
                        <Text
                            style={{
                                color: "#bbb",
                                marginRight: 20
                            }}>{weight ? ` ${weight} KG ✖ ${reps} reps` : "Touch to edit weight & reps  /  Swipe to delete"}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </TouchableWithoutFeedback>)
    }

    getQuickActions = ({index, item}) => {
        // console.warn("currentWorkout", this.props.currentWorkout);

        return <View style={styles.quickAContent}>
            <TouchableHighlight
                onPress={() => Alert.alert('Delete', "Do you want to delete this exercise？",
                    [
                        {
                            text: "Delete", onPress: async () => {
                                await this.setState({time: item.time});
                                await this.props.deleteExerciseFromWorkoutList({time: this.state.time});
                            }
                        },
                        {text: "Cancel"},
                    ]
                )}
            >
                <View style={styles.quick}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "center"}}>
                        <View style={{flex: 0.1}}>
                        </View>
                        <View style={{flex: 0.6, marginLeft: 5}}>
                            <Text style={{color: "#eee"}}>Delete</Text>
                        </View>
                        <View style={{flex: 0.3}}>
                            <Icon name="delete" size={24} color="#bbb" key="delete"/>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    };
    render() {
        console.log(this.props.currentWorkout);
        const listFooterComponent = (
            <View style={styles.addSomeExercises}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.handlePress.bind(this)} style={styles.plusButton} textStyle={styles.plus}
                        children={<Icon name="fitness-center" size={50} color="white" key="add"/>}
                    />
                </View>
                <Text style={styles.bigText}>add some{'\n'}exercises</Text>
                {this.state.showAddWeightModal &&
                <AddWeightToExercise showAddWeightModal={this.state.showAddWeightModal}
                                     handleCloseWeightModal={this.handleCloseWeightModal}
                                     addWeightRepsToExercise={this.props.addWeightRepsToExercise}
                                     time={this.state.time}
                />}
            </View>
        )
        return (
            <SwipeableFlatList
                style={{marginTop: 2}}
                ListFooterComponent={listFooterComponent}
                data={this.props.currentWorkout} renderItem={this._renderItem}
                keyExtractor={(item, index) => item + index}
                renderQuickActions={this.getQuickActions}
                maxSwipeDistance={80}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    currentWorkout: state.currentWorkout
});

const mapActionsToProps = dispatch => ({
    addWeightRepsToExercise: (data) => {
        dispatch(addWeightToExercisesAction(data))
    },
    deleteExerciseFromWorkoutList: (data) => {
        dispatch(deleteExerciseFromWorkoutListAction(data));
    }
})
export const WorkoutList = connect(mapStateToProps, mapActionsToProps)(_WorkoutList)

const styles = StyleSheet.create({
    addSomeExercises: {
        height: 0.8 * height,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    bigText: {
        lineHeight: 40,
        textAlign: 'center',
        fontSize: 36,
        color: '#eee'
    },
    plusButton: {
        marginTop: 20,
        // borderStyle: null,
        borderWidth: 1,
        borderColor: '#fff',
        height: 60,
        width: 60
    },
    plus: {
        color: 'black',
        fontSize: 60
    },
    workoutList: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: width * .80
    },
    workout: {
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        borderBottomWidth: 1,
        padding: 10
    },
    workoutText: {
        color: 'white',
        fontSize: 24
    },
    listContainer: {
        borderColor: '#999',
        borderWidth: 0.5
    },
    listItem: {
        backgroundColor: "#C69",
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'flex-end',

    },
    exerciseText: {
        fontSize: 20,
        color: '#eee'
    },
    setsText: {
        fontSize: 20,
    },
    quickAContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // marginRight: 15,
        // marginBottom: 10,
    },
    quick: {
        backgroundColor: "rgba(199,50,100,0.8)",
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 80,
        borderRadius: 5,
        elevation: 5,

    },
    delete: {
        color: "#d8fffa",
        marginRight: 30
    }
});