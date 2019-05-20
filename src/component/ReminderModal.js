import {
    Button,
    Modal,
    Text,
    View,
    StyleSheet,
    Dimensions,
} from "react-native";
import React, {Component} from "react";

const {width, height} = Dimensions.get("window");

export class ReminderModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.showReminderModal}
                style={styles.modal}
                transparent
                onRequestClose={() => this.props.handleCloseReminder(false)}>
                <View style={{...styles.modalOuterContainer}}>
                    <View style={styles.modalInnerContainer}>
                        <Text
                            style={{
                                color: "#00ffcc",
                                justifyContent: 'center',
                                alignItems: "center",
                                fontSize: 20,
                                marginTop: 15,
                                marginLeft: 20,
                                marginBottom: 10,
                            }}>
                            {this.props.reminderTitle}
                        </Text>
                        <Text style={{
                            color: "#eee",
                            fontSize: 20,
                            marginTop: 20,
                            marginLeft: 10,
                            marginBottom: 30,
                        }}> {this.props.reminderContent}</Text>
                        <View
                            style={{flexDirection: "row", justifyContent: "space-around"}}>
                            {!this.props.hideConfirmButton && <View style={styles.modalButtonContainer}>
                                <Button
                                    style={styles.modalButton}
                                    color="#00ffcc"
                                    title="Confirm"
                                    onPress={this.props.handleConfirm || this.props.handleCloseReminder}
                                />
                            </View>}
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    color="#00ffcc"
                                    style={styles.modalButton}
                                    title="Cancel"
                                    onPress={this.handleCancel ? this.handleCancel : () => {
                                        this.props.handleCloseReminder(false)
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    modalOuterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // position: "absolute",
        // left: width * 0.148,
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
