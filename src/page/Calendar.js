import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, FlatList, TouchableWithoutFeedback, Dimensions} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {TopBar} from "../component";
import {connect} from 'react-redux';
import {LinearGradient} from "expo";
import ApslButton from 'apsl-react-native-button';
import Icon from "react-native-vector-icons/MaterialIcons";

const {width, height} = Dimensions.get('window');

const marginTop = (height / width >= 18.5 / 9) ? 35 : 0;

export class _Calendar extends Component {
    state = {
        isModalListVisible: false,
        pressedDay: '',
        displayExercisesList: [],
    }

    render() {
        // console.warn(this.props.markedDates);
        // console.log(this.props.markedDates);
        // console.warn(this.props.allExercisesList);
        console.log(this.state.displayExercisesList);
        return (
            <View>
                <TopBar style={styles.topBar}>
                    {this.props.fontLoaded ? <Text style={styles.textBar}>Calendar</Text> : null}
                </TopBar>
                <CalendarList
                    onVisibleMonthsChange={(months) => {
                        console.log('now these months are visible', months)
                    }}
                    pastScrollRange={50}
                    futureScrollRange={50}
                    scrollEnabled={true}
                    markedDates={this.props.markedDates}
                    onDayPress={(day) => {
                        const date = day.dateString;
                        if (!this.props.markedDates.hasOwnProperty(date)) return;
                        this.setState({
                            pressedDay: date,
                            displayExercisesList: this.props.allExercisesList[date],
                            isModalListVisible: true
                        })
                    }}
                />
                <Modal
                    visible={this.state.isModalListVisible}
                    style={{flex: 1}}
                    onRequestClose={() => null}
                >
                    <LinearGradient
                        colors={["#4a168c", "#880e4f"]} style={styles.container}>
                        <ApslButton
                            style={styles.closeButton}
                            onPress={() => {
                                this.setState({
                                    isModalListVisible: false
                                })
                            }}
                            children={<Icon name="cancel" size={24} color="#bbb" key="cancel"/>}
                        />
                        <View style={styles.topTitle}>
                            {this.props.fontLoaded ? <Text style={styles.title}>
                                Workout History
                            </Text> : null}
                        </View>

                        <View style={{margin: 20}}>
                            {this.props.fontLoaded ? <Text style={styles.subTitle}>
                                {this.state.pressedDay}
                            </Text> : null}
                        </View>

                        <FlatList
                            style={{marginTop: 2}}
                            data={this.state.displayExercisesList}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => item + index}
                        />
                    </LinearGradient>
                </Modal>


            </View>
        )
    }

    _renderItem = ({item: {exercise, sets}}) => {
        return (<TouchableWithoutFeedback>
            <View style={styles.listItem}>
                <View style={{flex: 0.03}}/>
                <View style={{flex: 0.77}}>
                    <Text style={styles.exerciseText}>{'  ' + exercise}</Text>
                </View>
                <View style={{flex: 0.20}}>
                    <Text style={styles.exerciseText}>{sets} sets</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>)
    }
}

const mapStateToProps = state => ({
    markedDates: state.calendar.markedDates,
    allExercisesList: state.savedExerciseForEachDay.allExercisesList,
    exercisesListForPressedDay: state.savedExerciseForEachDay.exercisesListForPressedDay,
})

export const Calendar = connect(mapStateToProps, null)(_Calendar)
const styles = StyleSheet.create({
    container: {
        flex: 1, paddingTop: marginTop
    },
    textBar: {
        textAlign: 'center',
        color: '#ddd',
        fontSize: 28,
        // fontFamily: Fonts.PattayaRegular
        fontFamily: "PattayaRegular"
    },
    topBar: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b0b0b0'
    },
    topTitle: {
        height: 90,
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 4,
        borderBottomColor: '#ddd'
    },
    title: {
        textAlign: 'center',
        color: '#ddd',
        fontSize: 32,
        // fontFamily: Fonts.PattayaRegular
        fontFamily: "PattayaRegular"

    },
    subTitle: {
        textAlign: 'center',
        color: '#ddd',
        fontSize: 24,
        // fontFamily: Fonts.PattayaRegular
        fontFamily: "PattayaRegular"

    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-around',
        borderColor: '#787',
        borderWidth: 1,
        // borderTopWidth:0,
    },
    exerciseText: {
        fontSize: 20,
        color: '#eee'
    },
    setsText: {
        fontSize: 20,
    },
    closeButton: {
        position: 'absolute',
        borderColor: 'transparent',
        marginTop,
        right: 20,
        top: 10,
        zIndex: 999,
    }
})
