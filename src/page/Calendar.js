import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    FlatList,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import {
    Calendar as
        CalendarComp
} from "react-native-calendars";
import {connect} from "react-redux";
import {LinearGradient} from "expo";
import ApslButton from "apsl-react-native-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import {TopBar} from "../component";
import {
    addWeightToExercisesAction,
    deleteExerciseFromWorkoutListAction,
} from "../store/actions";
import {AddWeightToExercise} from "../component/AddWeightToExercise";
import {PeriodAnalysis} from "../component/PeriodAnalysis";
import {WorkoutList} from "../component/WorkoutList";
import {ExerciseModal} from "./ExerciseModal";

const {width, height} = Dimensions.get("window");

const marginTop = height / width >= 18.5 / 9 ? 35 : 0;

export class _Calendar extends Component {
    state = {
        isModalListVisible: false,
        pressedDay: "",
        displayExercisesList: [],
        time: "",
        showAddWeightModal: false,
    };

    render() {
        return (
            <LinearGradient colors={["#1b98d9", "#51c0bb"]} style={{flex: 1}}>
                <TopBar style={styles.topBar}>
                    {this.props.fontLoaded ? (
                        <Text style={styles.textBar}>Calendar</Text>
                    ) : null}
                </TopBar>
                {/*<LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{flex: 1}}>*/}
                {/*<View style={{marginTop:30}}>*/}
                {/*</View>*/}

                <View style={{marginTop: 10}}>
                    <CalendarComp
                        theme={{
                            // backgroundColor: '#c69',
                            calendarBackground: 'transparent',
                            textSectionTitleColor: '#cc6699',
                            // selectedDayBackgroundColor: '#cc6699',
                            selectedDayTextColor: '#eee',
                            todayTextColor: '#cc6699',
                            dayTextColor: '#eee',
                            textDisabledColor: '#aaa',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: '#fff',
                            monthTextColor: '#eee',
                            indicatorColor: 'blue',
                            textDayFontFamily: 'PattayaRegular',
                            textMonthFontFamily: 'PattayaRegular',
                            textDayHeaderFontFamily: 'PattayaRegular',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}
                        // onVisibleMonthsChange={months => {
                        //     // console.warn("now these months are visible", months);
                        // }}
                        pastScrollRange={50}
                        futureScrollRange={50}
                        scrollEnabled
                        markedDates={this.props.markedDates}
                        onDayPress={day => {
                            const date = day.dateString;
                            if (!this.props.markedDates.hasOwnProperty(date)) {
                                this.props.navigation.navigate("EditHistory", {
                                    date: date
                                });
                                console.warn(date);
                            } else {
                                this.setState({
                                    pressedDay: date,
                                    displayExercisesList: this.props.allExercisesList[date],
                                    isModalListVisible: true,
                                });
                            }
                        }}
                    />
                </View>
                <View style={{marginTop: 30}}>
                    <Text style={styles.analysisTitle}>Analysis</Text>
                    <PeriodAnalysis/>
                </View>

                <Modal
                    visible={this.state.isModalListVisible}
                    style={{flex: 1}}
                    onRequestClose={() => null}>
                    <LinearGradient
                        colors={["#4a168c", "#880e4f"]}
                        style={styles.container}>
                        <ApslButton
                            style={styles.closeButton}
                            onPress={() => {
                                this.setState({
                                    isModalListVisible: false,
                                });
                            }}
                            children={
                                <Icon name="cancel" size={24} color="#bbb" key="cancel"/>
                            }
                        />
                        <View style={styles.topTitle}>
                            {this.props.fontLoaded ? (
                                <Text style={styles.title}>Workout History</Text>
                            ) : null}
                        </View>
                        <View style={{margin: 20}}>
                            {this.props.fontLoaded ? (
                                <Text style={styles.subTitle}>{this.state.pressedDay}</Text>
                            ) : null}
                        </View>
                        <FlatList
                            style={{
                                marginTop: 2,
                                borderTopColor: "#ccc",
                                borderTopWidth: 0.6,
                                marginLeft: 15,
                                marginRight: 15,
                                paddingTop: 10,
                            }}
                            data={this.state.displayExercisesList}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => item + index}
                        />
                        {this.state.showAddWeightModal && (
                            <AddWeightToExercise
                                showAddWeightModal={this.state.showAddWeightModal}
                                handleCloseWeightModal={this.handleCloseWeightModal}
                                addWeightRepsToExercise={this.props.addWeightRepsToExercise}
                                time={this.state.time}
                            />
                        )}
                    </LinearGradient>
                </Modal>
            </LinearGradient>
        );
    }

    handleCloseWeightModal = bool => {
        this.setState({
            showAddWeightModal: bool,
        });
    };

    _renderItem = ({item: {exercise, sets, weight, reps, time, weightRepsDataArr}}) => (
        <TouchableWithoutFeedback
            onPress={async () => {
                await this.setState({time});
                await this.setState({showAddWeightModal: true});
            }}>
            <View style={styles.workoutContainer}>
                <View style={styles.listItem}>
                    <View style={{flex: 0.03}}/>
                    <View style={{flex: 0.77}}>
                        <Text style={styles.exerciseText}>{`  ${exercise}`}</Text>
                    </View>
                    <View style={{flex: 0.2}}>
                        <Text style={styles.exerciseText}>{sets} sets</Text>
                    </View>
                </View>
                {weightRepsDataArr && weightRepsDataArr.length > 0 && weightRepsDataArr.map((item, index) => (
                    <View style={{...styles.listItem, height: 30}} key={item.weight + index + item.time}>
                        <Text
                            style={{
                                color: "#bbb",
                                marginRight: 20,
                            }}>
                            {` ${item.weight} KG ✖ ${item.reps} reps`}
                        </Text>
                    </View>
                ))}

            </View>
        </TouchableWithoutFeedback>
    );
}

const mapStateToProps = state => ({
    markedDates: state.calendar.markedDates,
    allExercisesList: state.savedExerciseForEachDay.allExercisesList,
    exercisesListForPressedDay:
    state.savedExerciseForEachDay.exercisesListForPressedDay,
    sectionExercises: state.exercises.sectionExercises,
    extraSectionExercises: state.exercises.extraSectionExercises,
});

const mapActionsToProps = dispatch => ({
    addWeightRepsToExercise: data => {
        dispatch(addWeightToExercisesAction(data));
    },
    deleteExerciseFromWorkoutList: data => {
        dispatch(deleteExerciseFromWorkoutListAction(data));
    },
});
export const Calendar = connect(
    mapStateToProps,
    mapActionsToProps
)(_Calendar);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: marginTop,
    },
    textBar: {
        textAlign: "center",
        color: "#ddd",
        fontSize: 28,
        // fontFamily: Fonts.PattayaRegular
        fontFamily: "PattayaRegular",
    },
    topBar: {
        backgroundColor: "transparent",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#b0b0b0",
    },
    topTitle: {
        height: 90,
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 4,
        borderBottomColor: "#ddd",
    },
    title: {
        textAlign: "center",
        color: "#ddd",
        fontSize: 32,
        // fontFamily: Fonts.PattayaRegular
        fontFamily: "PattayaRegular",
    },
    subTitle: {
        textAlign: "center",
        color: "#ddd",
        fontSize: 24,
        // fontFamily: Fonts.PattayaRegular
        fontFamily: "PattayaRegular",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        justifyContent: "flex-end",
        // borderWidth: 1,
        // borderTopWidth:0,
    },
    exerciseText: {
        fontSize: 20,
        color: "#eee",
    },
    setsText: {
        fontSize: 20,
    },
    closeButton: {
        position: "absolute",
        borderColor: "transparent",
        marginTop,
        right: 20,
        top: 10,
        zIndex: 999,
    },
    workoutContainer: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.6,
        marginBottom: 10,
        // marginLeft: 10,
        // marginRight: 10
    },
    analysisTitle: {
        color: "#ddd",
        fontSize: 26,
        height: 30,
        // textAlign: "center",
        margin: 10,
        marginLeft: 30,
        // marginTop:5,
        marginBottom: 8,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "PattayaRegular"
    },
});
