import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

// export const TopBar = (props) => (
//     <View style={[styles.container, props.style]}>
//         {props.children}
//     </View>
// );

const { width, height } = Dimensions.get("window");

const marginTop = height / width >= 18.5 / 9 ? 35 : 25;

export class TopBar extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 10,
    marginTop,
  },
});
