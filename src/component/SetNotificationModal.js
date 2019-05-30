import {
    Button,
    Modal,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    FlatList,
    Keyboard,
    TouchableOpacity
} from "react-native";
import React, {Component} from "react";
import {Notifications, Permissions, Constants} from 'expo';
import moment from 'moment';
import {
    setNotificationModalVisibilityAction,
    chooseDayInWeekAction
} from "../store/actions";
import {connect} from "react-redux";
import DateTimePicker from "react-native-modal-datetime-picker";
import {getUnixTimeByDay, getTimeDifferenceFromZeroOfToday} from "../utils/unixTimes";

const {width, height} = Dimensions.get("window");

class _SetNotificationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            top: height * 0.3,
            showTimeChosen: false,
            scheduleTimeArr: [],
            timeDifferenceFromZeroOfToday: 43220000
        };
    };

    showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true});
    };
    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };

    handleTimePicked = async date => {
        console.warn("difference", getTimeDifferenceFromZeroOfToday(date.getTime()));
        await this.setState({
            timeChosen: `${date.getHours()}:${date.getMinutes()}`,
            timeDifferenceFromZeroOfToday: getTimeDifferenceFromZeroOfToday(date.getTime())
        });
        await this.setState({
            showTimeChosen: true
        });
        this.hideDateTimePicker();
    };

    keyboardDidShowHandler = () => {
        this.setState({
            top: height * 0.2,
        });
    };

    async componentDidMount() {
        const scheduleTimeArr = [];
        await this.props.isDayChosenInWeek.forEach(async (item, index) => {
            if (item.isChosen) {
                scheduleTimeArr.push(getUnixTimeByDay(index));
            }
        });
        await this.setState({scheduleTimeArr, timeDifferenceFromZeroOfToday: 43220000});

        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this.keyboardDidShowHandler.bind(this)
        );
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
        }
        Notifications.addListener(this._handleNotification);
    }

    _renderItem = ({item, index}) => {
        return (
            <View>
                <TouchableOpacity
                    onPress={async () => {
                        if (!item.isChosen) {
                            if (!this.state.scheduleTimeArr.includes(getUnixTimeByDay(index))) {
                                await this.setState({
                                    scheduleTimeArr: [...this.state.scheduleTimeArr, getUnixTimeByDay(index)]
                                })
                            }
                        } else {
                            const emptyScheduleTimeArr = [];
                            this.state.scheduleTimeArr.forEach(i => {
                                if (i !== getUnixTimeByDay(index)) {
                                    emptyScheduleTimeArr.push(i)
                                }
                            });
                            this.setState({scheduleTimeArr: emptyScheduleTimeArr})
                        }
                        await this.props.chooseDayInWeek({day: item.day, isChosen: !item.isChosen});
                    }}
                    style={{
                        backgroundColor: item.isChosen ? "#c69" : "#888",
                        width: 50,
                        height: 40,
                        margin: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10
                    }}>
                    <Text style={{color: "#eee", fontSize: 18, fontFamily: "PattayaRegular"}}>
                        {item.day}
                    </Text>
                </TouchableOpacity>
            </View>)
    };

    _handleNotification = ({origin, data}) => {
        console.log(`Notification (${origin}) with data: ${JSON.stringify(data)}`)
    };

    // _sendDelayedNotification() {
    //     console.log('Scheduling delayed notification:', {localNotification, schedulingOptions})
    //
    //     Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
    //         .then(id => console.log(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
    //         .catch(err => console.error(err))
    // }

    render() {
        return (
            <Modal
                visible={this.props.showSetNotificationModal}
                transparent={true}
                onRequestClose={() => this.props.setNotificationModalVisibility(false)}>
                <View style={{...styles.modalOuterContainer, top: this.state.top}}>
                    <View style={styles.modalInnerContainer}>
                        <Text
                            style={{
                                color: "#00ffcc",
                                fontSize: 16,
                                marginLeft: 10,
                                marginBottom: 15,
                            }}>
                            Please Select the day you want to receive notifications:
                        </Text>
                        {/*<View>*/}
                        <View>
                            <FlatList
                                // style={{flex: 1, flexDirection: 'row'}}
                                data={this.props.isDayChosenInWeek}
                                renderItem={data => this._renderItem(data)}
                                keyExtractor={(item, index) => item + index}
                                numColumns={5}
                                extraData={this.state}
                                contentContainerStyle={{justifyContent: "center", alignItems: "center"}}
                                style={{marginBottom: 10,}}
                            />
                        </View>
                        <Text
                            style={{
                                color: "#00ffcc",
                                fontSize: 16,
                                marginLeft: 10,
                                marginBottom: 15,
                            }}>
                            Please Select the time you want to receive notifications:
                        </Text>
                        <Button title="Time Picker" onPress={this.showDateTimePicker} color={"#eee"}/>
                        {
                            this.state.showTimeChosen &&
                            <Text>{this.state.timeChosen}
                            </Text>
                        }
                        <DateTimePicker
                            mode={"time"}
                            // datePickerContainerStyleIOS={{backgroundColor:"#eee",color:"#eee"}}
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleTimePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                        {/*</View>*/}
                        <View
                            style={{flexDirection: "row", justifyContent: "space-around"}}>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    style={styles.modalButton}
                                    color="#00ffcc"
                                    title="Confirm"
                                    onPress={async () => {
                                        await Notifications.cancelAllScheduledNotificationsAsync();
                                        //add schedules from notifications
                                        const localNotification = {
                                            title: 'Workout',
                                            body: 'Come on ,meatball. It is time for workout',
                                            data: {type: 'delayed'}
                                        };
                                        this.state.scheduleTimeArr.forEach(item => {
                                            const schedulingOptions = {
                                                time: item + this.state.timeDifferenceFromZeroOfToday,
                                                repeat: "week",
                                            };
                                            Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
                                                .then(id => console.log(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
                                                .catch(err => console.error(err));
                                        });
                                        //add schedules from notifications
                                        await this.props.setNotificationModalVisibility(false);
                                    }}
                                />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    color="#00ffcc"
                                    style={styles.modalButton}
                                    title="Cancel"
                                    onPress={() => {
                                        this.props.setNotificationModalVisibility(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {/*<View style={styles.container}>*/}
                {/*    /!*<Button title='Send Immediate Notification' onPress={() => this._sendImmediateNotification()}/>*!/*/}
                {/*    <Button title='Send Delayed Notification' onPress={() => this._sendDelayedNotification()}/>*/}
                {/*    <Button title='Close' onPress={() => this.props.setNotificationModalVisibility(false)}/>*/}
                {/*</View>*/}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            // backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalOuterContainer: {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            position: "absolute",
            left: width * 0.092,
// left: width * 0.148,
// top: this.state.top,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: 8,
        },
        modalInnerContainer: {
            height: 350,
            width:
                width * 0.8,
            backgroundColor:
                "rgba(102,51,204,0.9)",
            paddingTop:
                20,
            padding:
                10,
            borderRadius:
                8,
        }
        ,
        modalButtonContainer: {
            width: 0.25 * width,
        }
        ,
        weightTextInput: {
            marginLeft: width * 0.03,
            marginRight:
                width * 0.03,
            marginTop:
                width * 0.01,
            marginBottom:
                width * 0.02,
            backgroundColor:
                "rgba(255,140,0,0.1)",
            height:
                50,
            color:
                "#00ffcc",
        }
        ,
    })
;
const mapStateToProps = state => ({
    // currentWorkout: state.currentWorkout,
    showSetNotificationModal: state.setNotification.showSetNotificationModal,
    isDayChosenInWeek: state.setNotification.isDayChosenInWeek
});

const mapActionsToProps = dispatch => ({
    setNotificationModalVisibility: (bool = false) => {
        dispatch(setNotificationModalVisibilityAction(bool));
    },
    chooseDayInWeek: (data) => {
        dispatch(chooseDayInWeekAction(data));
    }
});

export const SetNotificationModal = connect(mapStateToProps, mapActionsToProps)(_SetNotificationModal);
