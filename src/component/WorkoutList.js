import React, {Component} from "react";
import {
    View,
    Text,
    SwipeableFlatList,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Alert,
} from "react-native";
import Button from "apsl-react-native-button";
// import {Icon} from 'expo';
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import {
    addWeightToExercisesAction,
    deleteExerciseFromWorkoutListAction,
    editWeightRepsInWorkoutAction
} from "../store/actions";
import {AddWeightToExercise} from "./AddWeightToExercise";
import {EditWeightReps} from './EditWeightReps';
import LoadingUtil from '../utils/LoadingUtil';
import {ReminderModal} from "./ReminderModal";

const {width, height} = Dimensions.get("window");

export class _WorkoutList extends Component {
    state = {
        showAddWeightModal: false,
        time: 0, // time for the chosen exercise(to add weight & reps)
        showEditWeightReps: false,
        weightRepsDataArr: [],
        sets: 1,
        showReminderModal: false,
    };

    handlePress() {
        this.props.setModalVisibility(true);
    }

    handleCloseWeightModal = (showFlag, bool) => {
        this.setState({
            [showFlag]: bool,
        });
    };
    _renderItem = ({item: {exercise, sets, weight, time, reps, weightRepsDataArr}}) => (
        <TouchableHighlight
            // onPress={(item) => this.handlePress.call(this, item)}
            onPress={async () => {
                if (sets > weightRepsDataArr?.length) {
                    await this.setState({time});
                    await this.setState({showAddWeightModal: true});
                } else {
                    // Alert.alert("Reminder", "You have already added weight and reps for all sets.")
                    await this.setState({
                        showReminderModal: true,
                        reminderTitle: "Reminder",
                        reminderContent: "You have already added weight and reps for all sets.",
                        hideReminderButton: true,
                    })
                }
            }}
            onLongPress={async () => {
                await this.setState({time, weightRepsDataArr, sets});
                await this.setState({showEditWeightReps: true})
            }}
        >
            <View style={styles.listContainer}>
                <View style={styles.listItem}>
                    <View style={{flex: 0.03}}/>
                    <View style={{flex: 0.77}}>
                        <Text style={styles.exerciseText}>{`  ${exercise}`}</Text>
                    </View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.exerciseText}>{sets} sets</Text>
                    </View>
                </View>
                {weightRepsDataArr?.map((item, index) => {
                    if (!item.weight && !item.reps) {
                        weightRepsDataArr.splice(index, 1);
                    } else {
                        return (
                            <View key={item.weight + index + item.reps} style={{...styles.listItem, height: 25}}>
                                <Text
                                    style={{
                                        color: "#bbb",
                                        marginRight: 20,
                                    }}>
                                    {item.weight} KG ✖ {item.reps} reps
                                </Text>
                            </View>
                        )
                    }
                })}
                {(sets > weightRepsDataArr?.length) && <View style={{...styles.listItem, height: 25}}>
                    <Text
                        style={{
                            color: "#bbb",
                            marginRight: 20,
                        }}>
                        {"Touch to add more weight & reps / Hold to edit"}
                    </Text>
                </View>}
            </View>
        </TouchableHighlight>
    );
    handleCloseReminder = (bool) => {
        this.setState({
            showReminderModal: bool
        })
    };
    handleConfirm = async () => {
        LoadingUtil.showLoading();
        await this.props.deleteExerciseFromWorkoutList({
            time: this.state.time,
        });
        if (this.props.currentWorkout.length === 0) {
            await this.props.updateEmpty(true);
        }
        await this.setState({
            showReminderModal: false,
        });
        LoadingUtil.dismissLoading();
    };
    getQuickActions = ({index, item}) => (
        <View style={styles.quickAContent}>
            <TouchableHighlight
                onPress={() => {
                    this.setState({
                        showReminderModal: true,
                        reminderTitle: "Delete",
                        reminderContent: "Do you want to delete this exercise",
                        hideConfirmButton: false,
                        time: item.time,
                    });
                    // Alert.alert("Delete", "Do you want to delete this exercise？", [
                    //     {
                    //         text: "Delete",
                    //         onPress: async () => {
                    //             LoadingUtil.showLoading();
                    //             await this.setState({time: item.time});
                    //             await this.props.deleteExerciseFromWorkoutList({
                    //                 time: this.state.time,
                    //             });
                    //             LoadingUtil.dismissLoading();
                    //         },
                    //     },
                    //     {text: "Cancel"},
                    // ])
                }}>
                <View style={styles.quick}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <View style={{flex: 0.1}}/>
                        <View style={{flex: 0.6, marginLeft: 5}}>
                            <Text style={{color: "#eee"}}>Delete</Text>
                        </View>
                        <View style={{flex: 0.3}}>
                            <Icon name="delete" size={24} color="#bbb" key="delete"/>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
            {this.state.showReminderModal &&
            <ReminderModal
                showReminderModal={this.state.showReminderModal}
                reminderTitle={this.state.reminderTitle}
                reminderContent={this.state.reminderContent}
                handleCloseReminder={this.handleCloseReminder}
                handleConfirm={this.handleConfirm}
                hideConfirmButton={this.state.hideConfirmButton}
            />}
        </View>
    );

    render() {

        const listFooterComponent = (
            <View>
                <View style={styles.addSomeExercises}>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={this.handlePress.bind(this)}
                            style={styles.plusButton}
                            textStyle={styles.plus}
                            children={
                                <Icon name="fitness-center" size={50} color="white" key="add"/>
                            }
                        />
                    </View>
                    <Text style={styles.bigText}>
                        Manual Workout
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            // onPress={this.handlePress.bind(this)}
                            onPress={() => {
                                this.props.navigation.navigate("CustomWorkout");
                            }}
                            style={styles.plusButton}
                            textStyle={styles.plus}
                            children={
                                <FontAwesomeIcon name="pencil" size={50} color="white" key="add"/>
                            }
                        />
                    </View>
                    <Text style={styles.bigText}>
                        Custom Workout
                        {/*add some*/}
                        {/*{"\n"}*/}
                        {/*exercises*/}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => {
                                this.props.navigation.navigate("EditLibrary");
                            }}
                            // onPress={this.handlePress.bind(this)}
                            style={styles.plusButton}
                            textStyle={styles.plus}
                            children={
                                <FontAwesomeIcon name="book" size={50} color="white" key="add"/>
                            }
                        />
                    </View>
                    <Text style={styles.bigText}>
                        Edit Library
                        {/*add some*/}
                        {/*{"\n"}*/}
                        {/*exercises*/}
                    </Text>
                    {this.state.showAddWeightModal && (
                        <AddWeightToExercise
                            showAddWeightModal={this.state.showAddWeightModal}
                            handleCloseWeightModal={this.handleCloseWeightModal}
                            addWeightRepsToExercise={this.props.addWeightRepsToExercise}
                            time={this.state.time}
                        />
                    )}
                    {this.state.showEditWeightReps && (
                        <EditWeightReps
                            showEditWeightReps={this.state.showEditWeightReps}
                            handleCloseWeightModal={this.handleCloseWeightModal}
                            addWeightRepsToExercise={this.props.addWeightRepsToExercise}
                            weightRepsDataArr={this.state.weightRepsDataArr}
                            sets={this.state.sets}
                            time={this.state.time}
                            editWeightRepsInWorkout={this.props.editWeightRepsInWorkout}
                        />
                    )}
                </View>
            </View>
        );
        return (
            <SwipeableFlatList
                style={{marginTop: 2}}
                ListFooterComponent={listFooterComponent}
                data={this.props.currentWorkout}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => item + index}
                renderQuickActions={this.getQuickActions}
                maxSwipeDistance={80}
            />
        );
    }
}

const mapStateToProps = state => ({
    currentWorkout: state.currentWorkout,
});

const mapActionsToProps = dispatch => ({
    addWeightRepsToExercise: data => {
        dispatch(addWeightToExercisesAction(data));
    },
    deleteExerciseFromWorkoutList: data => {
        dispatch(deleteExerciseFromWorkoutListAction(data));
    },
    editWeightRepsInWorkout: data => {
        dispatch(editWeightRepsInWorkoutAction(data));
    }
});
export const WorkoutList = connect(
    mapStateToProps,
    mapActionsToProps
)(_WorkoutList);

const styles = StyleSheet.create({
    addSomeExercises: {
        height: 0.8 * height,
        // justifyContent: 'center',
        alignItems: "center",
        padding: 10,
    },
    buttonContainer: {
        flexDirection: "row",
    },
    bigText: {
        lineHeight: 40,
        textAlign: "center",
        marginTop: 10,
        fontSize: 25,
        color: "#eee",
        fontFamily: "PattayaRegular"
    },
    plusButton: {
        marginTop: 20,
        // borderStyle: null,
        borderWidth: 1,
        borderColor: "#fff",
        height: 60,
        width: 60,
    },
    plus: {
        color: "black",
        fontSize: 60,
    },
    workoutList: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        width: width * 0.8,
    },
    workout: {
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
        borderBottomWidth: 1,
        padding: 10,
    },
    workoutText: {
        color: "white",
        fontSize: 24,
    },
    listContainer: {
        borderColor: "#999",
        borderWidth: 0.5,
    },
    listItem: {
        backgroundColor: "#C69",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        justifyContent: "flex-end",
    },
    exerciseText: {
        fontSize: 20,
        color: "#eee",
    },
    setsText: {
        fontSize: 20,
    },
    quickAContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        // marginRight: 15,
        // marginBottom: 10,
    },
    quick: {
        backgroundColor: "rgba(199,50,100,0.8)",
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        width: 80,
        borderRadius: 5,
        elevation: 5,
    },
    delete: {
        color: "#d8fffa",
        marginRight: 30,
    },
});
