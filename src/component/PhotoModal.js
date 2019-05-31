import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    TextInput,
    Alert, Keyboard,
} from "react-native";
import ApslButton from "apsl-react-native-button";
import {connect} from "react-redux";
import {
    addProgressPhoto,
    showProgressModal,
    showProgressPicker,
    updateBfrAction,
    updateWeightBFRFromProgressPicsAction
} from "../store/actions";
import {validation} from "../utils/validation";
import {ReminderModal} from "./ReminderModal";

const {width, height} = Dimensions.get("window");

class _PhotoModal extends React.Component {
    state = {inputTextWeight: "", inputTextBFR: "", validated: false, top: height * 0.3};
    keyboardDidShowHandler = () => {
        this.setState({
            top: height * 0.2,
        });
    };

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this.keyboardDidShowHandler.bind(this)
        );
    }

    handleSubmit = async () => {
        if (
            validation({
                min: "5",
                max: "40",
                value: parseInt(this.state.inputTextBFR, 10),
            }) &&
            validation({
                min: "40",
                max: "150",
                value: parseInt(this.state.inputTextWeight, 10),
            })
        ) {
            const timeStamp = new Date();
            await this.props.showProgressModalDispatch(false);
            await this.props.addProgressPhotoDispatch({
                photoURI: this.props.tmpURI,
                BFR: this.state.inputTextBFR,
                weight: this.state.inputTextWeight,
                date: timeStamp,
                month: timeStamp.getMonth() + 1,
                day: timeStamp.getDate(),
                year: timeStamp.getFullYear(),
                hour: timeStamp.getHours(),
                minute: timeStamp.getMinutes(),
            });
            await this.props.updateWeightBFRFromProgressPics({
                year: timeStamp.getFullYear(),
                month: timeStamp.getMonth(),
                BFR: this.state.inputTextBFR,
                weight: this.state.inputTextWeight,
            });
            await this.props.showProgressPickerDispatch(false);
        } else {
            this.setState({
                showReminderModal: true,
                reminderTitle: "Invalid data",
                reminderContent: "Please enter valid data",
                hideConfirmButton: true
            });
            // Alert.alert("Please enter valid data", null);
        }
    };

    changeText = (text, name) => {
        this.setState({
            [name]: text,
        });
    };
    handleCloseReminder = (bool) => {
        this.setState({
            showReminderModal: bool
        })
    };

    render() {
        return (
            <Modal transparent visible={this.props.showModal}>
                {/* {this.props.children} */}
                <View style={styles.container}>
                    <View style={{...styles.modalInnerContainer, position: "absolute", top: this.state.top}}>
                        <Text style={{color: "#eee", fontSize: 16, marginLeft: 10}}>
                            Please enter your weight and Body fat rate?
                        </Text>
                        <TextInput
                            style={[styles.dropdownInput, this.props.styles?.dropdownInput]}
                            placeholderTextColor={this.props.placeholderTextColor || "#ccc"}
                            placeholder="  weight:40-150(KG)"
                            value={this.state.inputTextWeight}
                            // onChangeText={text => this.setState({inputTextWeight: text})}
                            onChangeText={text => this.changeText(text, "inputTextWeight")}
                            keyboardType="number-pad"
                        />
                        <TextInput
                            style={[styles.dropdownInput, this.props.styles?.dropdownInput]}
                            placeholderTextColor={this.props.placeholderTextColor || "#ccc"}
                            placeholder="  body fat rate:5-40(%)"
                            value={this.state.inputTextBFR}
                            // onChangeText={text => this.setState({inputTextBFR: text})}
                            onChangeText={text => this.changeText(text, "inputTextBFR")}
                            keyboardType="number-pad"
                        />
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <ApslButton
                                style={[styles.confirmButton, this.props.styles?.confirmButton]}
                                onPress={this.handleSubmit}
                                children={
                                    <Text key="confirm" style={{color: "#FF8c00"}}>
                                        Confirm
                                    </Text>
                                }
                            />
                        </View>
                    </View>
                </View>
                {this.state.showReminderModal &&
                <ReminderModal
                    showReminderModal={this.state.showReminderModal}
                    reminderTitle={this.state.reminderTitle}
                    reminderContent={this.state.reminderContent}
                    handleCloseReminder={this.handleCloseReminder}
                    hideConfirmButton={this.state.hideConfirmButton || true}
                />}
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    progress: state.progress,
    showPicker: state.progressModal.showPicker,
    showModal: state.progressModal.showModal,
    tmpURI: state.progressModal.tmpURI,
});
const mapActionToProps = dispatch => ({
    addProgressPhotoDispatch(data) {
        dispatch(addProgressPhoto(data));
    },
    updateBfrData(data) {
        dispatch(updateBfrAction(data));
    },
    showProgressPickerDispatch(bool) {
        dispatch(showProgressPicker({showPicker: bool}));
    },
    showProgressModalDispatch(bool) {
        dispatch(showProgressModal({showModal: bool}));
    },
    updateWeightBFRFromProgressPics(data) {
        dispatch(updateWeightBFRFromProgressPicsAction(data))
    }
});

export const PhotoModal = connect(
    mapStateToProps,
    mapActionToProps
)(_PhotoModal);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: 8,
    },
    modalInnerContainer: {
        height: width * 0.65,
        width: width * 0.7,
        backgroundColor: "rgba(102,51,204,0.9)",
        paddingTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    dropdownInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        backgroundColor: "rgba(255,140,0,0.1)",
        height: 50,
        color: "#eee",
    },
    dropdownContainer: {
        padding: width * 0.03,
        paddingTop: width * 0.02,
        flexDirection: "row",
    },
    confirmButton: {
        height: 50,
        width: width * 0.3,
        borderColor: "#787",
        marginLeft: width * 0.165,
    },
});
