import React from 'react';
import {createStackNavigator} from "react-navigation";
import Progress from "../page/Progress";
import {InnerProgressStackNavigator} from "./InnerProgressNavigator";

let fontLoaded = true;

export const ProgressStackNavigator = createStackNavigator({
    Progress: {
        screen: props => <Progress fontLoaded={fontLoaded} {...props} />,
        navigationOptions: {
            header: null,
            headerMode: "float",
        },
    },
    InnerProgressStackNavigator: {
        screen: InnerProgressStackNavigator,
        navigationOptions: ({navigation}) => ({
            header: null
        }),
    },
}, {
    headerBackTitleVisible: false,
    headerMode: "float",
    headerTransitionPreset: "fade-in-place"
});

