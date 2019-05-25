import React from 'react';
import {createStackNavigator} from "react-navigation";
import {CurrentWorkout} from "../page/CurrentWorkout";
import {CustomWorkout} from "../page/CustomWorkout";
import {LinearGradient} from "expo";
import {Text, TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import {EditLibraryStackNavigator} from "./EditLibraryStackNavigator";
import {EditLibrary} from "../page/EditLibrary";
import {EditExercisesForLibrary} from "../component/EditExercisesForLibrary";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import {InnerCurrentWorkoutStackNavigator} from "./InnerCurrentWorkoutStackNavigator";

let fontLoaded = true;

export const CurrentWorkoutStackNavigator = createStackNavigator({
    CurrentWorkout: {
        screen: props => <CurrentWorkout fontLoaded={fontLoaded} {...props} />,
        navigationOptions: {
            header: null,
        },
    },
    InnerCurrentWorkoutStackNavigator: {
        screen: InnerCurrentWorkoutStackNavigator,
        navigationOptions: {
            header: null,
        },
    }
}, {
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
});
