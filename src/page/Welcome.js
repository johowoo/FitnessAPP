import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";

import { LinearGradient } from "expo";
import Button from "apsl-react-native-button";
import { Fonts } from "../utils/Fonts";

const STATUS_BAR_HEIGHT = 30;
const { height } = Dimensions.get("window");

class Welcome extends Component {
  handlePress() {
    this.props.changeShowWelcome(false);
  }

  render() {
    // console.warn(this.props.showWelcome);
    return (
      <LinearGradient colors={["#4a168c", "#880e4f"]} style={styles.container}>
        <View style={styles.header}>
          {this.props.fontLoaded ? (
            <Text style={styles.headerText}>Joe's Fitness</Text>
          ) : null}
        </View>
        <View style={styles.middle}>
          {this.props.fontLoaded ? (
            <Text style={styles.logText}>Log your fitness</Text>
          ) : null}
        </View>
        <View style={styles.bottom}>
          <Button
            onPress={this.handlePress.bind(this)}
            style={{ borderColor: "#ddd" }}>
            <Text style={styles.buttonText}>Start Workout</Text>
          </Button>
        </View>
      </LinearGradient>
    );
  }
}

export default Welcome;

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS === "ios" ? STATUS_BAR_HEIGHT : 0,
    backgroundColor: "red",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  logText: {
    fontSize: 32,
    color: "#ddd",
    textAlign: "center",
    // fontFamily:Fonts.PacificoRegular
    fontFamily: "PacificoRegular",
  },
  header: {
    height: 0.45 * height,
    justifyContent: "center",
    // alignContent: 'center'
  },
  middle: {
    marginTop: 50,
    height: 0.35 * height,
  },
  bottom: {
    height: 0.2 * height,
    alignItems: "center",
    marginTop: 0,
    marginLeft: 90,
    marginRight: 90,
  },
  headerText: {
    fontSize: 50,
    color: "#ddd",
    textAlign: "center",
    // fontFamily:Fonts.PacificoRegular
    fontFamily: "PacificoRegular",
  },
  buttonText: {
    color: "#ddd",
  },
});
