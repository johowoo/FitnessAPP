import React from 'react';
import {createStackNavigator} from "react-navigation";
import {CurrentWorkout} from "../page/CurrentWorkout";
import {InnerCurrentWorkoutStackNavigator} from "./InnerCurrentWorkoutStackNavigator";
import {CongratsPage} from "../page/CongratsPage";

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
    },
    CongratsPage: {
        screen: CongratsPage,
        navigationOptions: {
            header: null
        }
    }
}, {
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
});
