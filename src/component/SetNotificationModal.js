import {
    Button,
    Modal,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    Keyboard,
} from "react-native";
import React, {Component} from "react";
import {Notifications, Permissions, Constants} from 'expo';
import moment from 'moment';
import {
    addCategoryToEditLibraryAction,
    resetCustomWorkoutAddableAction,
    setAddCategoryModalForLibraryVisibilityAction, setNotificationModalVisibilityAction
} from "../store/actions";
import {connect} from "react-redux";

const {width, height} = Dimensions.get("window");

class _SetNotificationModal extends Component {
    state = {
        top: height * 0.3,
    };
    keyboardDidShowHandler = () => {
        this.setState({
            top: height * 0.2,
        });
    };

    async componentDidMount() {
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

    _handleNotification = ({origin, data}) => {
        console.info(`Notification (${origin}) with data: ${JSON.stringify(data)}`)
    };

    _sendImmediateNotification() {
        const localNotification = {
            title: 'Immediate testing Title',
            body: 'Testing body',
            data: {type: 'immediate'}
        };

        console.log('Scheduling immediate notification:', {localNotification})

        Notifications.presentLocalNotificationAsync(localNotification)
            .then(id => console.info(`Immediate notification scheduled (${id})`))
            .catch(err => console.error(err))
    }

    _sendDelayedNotification() {
        const localNotification = {
            title: 'Delayed testing Title',
            body: 'Testing body',
            data: {type: 'delayed'}
        };
        const schedulingOptions = {
            time: (new Date()).getTime() + 5000
        };

        console.log('Scheduling delayed notification:', {localNotification, schedulingOptions})

        Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
            .then(id => console.info(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
            .catch(err => console.error(err))
    }

    render() {
        console.warn("visible", this.props.showSetNotificationModal);
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
                            Please input the weight and reps of this exercise:
                        </Text>
                        <TextInput
                            placeholderTextColor={"#cc6699"}
                            style={styles.weightTextInput}
                            value={this.state.weightText}
                            placeholder=" Notification: 0-300 (KG)"
                            onChangeText={text => {
                                this.setState({weightText: text});
                            }}
                        />
                        <TextInput
                            placeholderTextColor={"#cc6699"}
                            style={styles.weightTextInput}
                            value={this.state.repsText}
                            placeholder=" Reps: 0-50"
                            onChangeText={text => {
                                this.setState({repsText: text});
                            }}
                        />
                        <View
                            style={{flexDirection: "row", justifyContent: "space-around"}}>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    style={styles.modalButton}
                                    color="#00ffcc"
                                    title="Confirm"
                                    onPress={async () => {

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
                <View style={styles.container}>
                    <Button title='Send Immediate Notification' onPress={() => this._sendImmediateNotification()}/>
                    <Button title='Send Delayed Notification' onPress={() => this._sendDelayedNotification()}/>
                    <Button title='Close' onPress={() => this.props.setNotificationModalVisibility(false)}/>
                </View>
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
        left: width * 0.148,
        // top: this.state.top,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 8,
    },
    modalInnerContainer: {
        height: 250,
        width: width * 0.7,
        backgroundColor: "rgba(102,51,204,0.9)",
        paddingTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    modalButtonContainer: {
        width: 0.25 * width,
    },
    weightTextInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        backgroundColor: "rgba(255,140,0,0.1)",
        height: 50,
        color: "#00ffcc",
    },
});
const mapStateToProps = state => ({
    // currentWorkout: state.currentWorkout,
    showSetNotificationModal: state.setNotification.showSetNotificationModal
});

const mapActionsToProps = dispatch => ({
    setNotificationModalVisibility: (bool = false) => {
        dispatch(setNotificationModalVisibilityAction(bool));
    },
});

export const SetNotificationModal = connect(mapStateToProps, mapActionsToProps)(_SetNotificationModal);
