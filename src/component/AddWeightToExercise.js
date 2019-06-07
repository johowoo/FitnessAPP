import {
  Button,
  Modal,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  Switch,
} from "react-native";
import React, { Component } from "react";
import ModalDropdown from "react-native-modal-dropdown";

const { width, height } = Dimensions.get("window");

export class AddWeightToExercise extends Component {
  state = {
    weightText: "",
    repsText: "",
    top: height * 0.3,
  };

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

  render() {
    return (
      <Modal
        visible={this.props.showAddWeightModal}
        transparent
        onRequestClose={() =>
          this.props.handleCloseWeightModal("showAddWeightModal", false)
        }>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)" }}>
          <View style={{ ...styles.modalOuterContainer, top: this.state.top }}>
            <View
              style={{
                ...styles.modalInnerContainer,
                height: this.props.cardioMinutes ? 200 : 250,
              }}>
              <Text
                style={{
                  color: "#00ffcc",
                  fontSize: 16,
                  marginLeft: 10,
                  marginBottom: 15,
                }}>
                {this.props.cardioMinutes
                  ? "Please input the duration for this cardio exercise:"
                  : "Please input the weight and reps of this exercise:"}
              </Text>
              <TextInput
                placeholderTextColor={"#cc6699"}
                style={styles.weightTextInput}
                value={this.state.weightText}
                placeholder={
                  this.props.cardioMinutes
                    ? "Minutes: 0-300"
                    : " Weight: 0-300 (KG)"
                }
                onChangeText={text => {
                  this.setState({ weightText: text });
                }}
              />
              {!this.props.cardioMinutes && (
                <TextInput
                  placeholderTextColor={"#cc6699"}
                  style={styles.weightTextInput}
                  value={this.state.repsText}
                  placeholder=" Reps: 0-50"
                  onChangeText={text => {
                    this.setState({ repsText: text });
                  }}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}>
                <View style={styles.modalButtonContainer}>
                  <Button
                    style={styles.modalButton}
                    color="#00cccc"
                    title="Confirm"
                    onPress={async () => {
                      let actionPayload = {};
                      if (this.props.cardioMinutes) {
                        actionPayload = {
                          time: this.props.time,
                          cardioMinutes: this.state.weightText,
                        };
                      } else {
                        actionPayload = {
                          time: this.props.time,
                          weight: this.state.weightText,
                          reps: this.state.repsText,
                        };
                      }
                      await this.props.addWeightRepsToExercise(actionPayload);
                      await this.props.handleCloseWeightModal(
                        "showAddWeightModal",
                        false
                      );
                    }}
                  />
                </View>
                <View style={styles.modalButtonContainer}>
                  <Button
                    color="#00cccc"
                    style={styles.modalButton}
                    title="Cancel"
                    onPress={() => {
                      this.props.handleCloseWeightModal(
                        "showAddWeightModal",
                        false
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalOuterContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    position: "absolute",
    left: width * 0.148,
    // top: this.state.top,

    borderRadius: 8,
  },
  modalInnerContainer: {
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
