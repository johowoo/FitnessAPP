import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import React from "react";

export const FooterComponent = () => (
  <View style={styles.indicatorContainer}>
    <ActivityIndicator
      style={styles.indicator}
      size="large"
      animating
      color="#c69"
    />
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  indicatorContainer: {
    alignItems: "center",
  },
  indicator: {
    color: "red",
    margin: 10,
  },
});
