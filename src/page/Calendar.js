import React, {Component} from 'react';
import {View, Text, StyleSheet, Modal, FlatList, TouchableWithoutFeedback} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {TopBar} from "../component";
import {Fonts} from "../utils/Fonts";
import {connect} from 'react-redux';
import LinearGradient from "react-native-linear-gradient";
import ApslButton from 'apsl-react-native-button';
import Icon from "react-native-vector-icons/MaterialIcons";


export class _Calendar extends Component {
    state = {
        isModalListVisible: false,
        pressedDay: '',
        displayExercisesList: [],
    }
    render() {
        return (
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Calendar</Text>
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
                        const date=day.dateString;
                        if (!this.props.markedDates.hasOwnProperty(date)) return;
                        this.setState({
                            pressedDay:date,
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
                            <Text style={styles.title}>
                               Workout History
                            </Text>

                         </View>

                         <View style={{margin:20}}>
                             <Text style={styles.subTitle}>
                                 {this.state.pressedDay}
                             </Text>
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
        flex: 1
    },
    textBar: {
        textAlign: 'center',
        color: '#ddd',
        fontSize: 30,
        fontFamily: Fonts.PattayaRegular
    },
    topBar: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#ddd'
    },
    topTitle:{
        height:90,
        alignItems:'center',
        padding:20,
        borderBottomWidth: 4,
        borderBottomColor: '#ddd'
    },
    title:{
        textAlign: 'center',
        color: '#ddd',
        fontSize: 32,
        fontFamily: Fonts.PattayaRegular
    },
    subTitle:{
        textAlign: 'center',
        color: '#ddd',
        fontSize: 24,
        fontFamily: Fonts.PattayaRegular
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
    closeButton:{
        position:'absolute',
        borderColor: 'transparent',
        right:20,
        top:10,
        zIndex: 999,
    }

})