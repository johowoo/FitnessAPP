import React from "react";
import { createStackNavigator } from "react-navigation";
import { Calendar } from "../page/Calendar";
import { EditHistory } from "../page/EditHistory";
import { CurrentWorkout } from "../page/CurrentWorkout";
import { Text, TouchableOpacity } from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo";
import { CalendarEditHistoryStackNavigator } from "./CalendarEditHistoryStackNavigator";

export const CalendarStackNavigator = createStackNavigator({
  Calendar: {
    screen: props => <Calendar fontLoaded={fontLoaded} {...props} />,
    navigationOptions: {
      header: null,
    },
  },
  EditHistory: {
    screen: CalendarEditHistoryStackNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
});
