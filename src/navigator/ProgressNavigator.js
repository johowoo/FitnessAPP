import React from 'react';
import {createStackNavigator} from "react-navigation";
import Progress from "../page/Progress";
import {DisplayPicture} from "../page/DisplayPicture";
import {formatYYYY_MM_DD_HHMMFromParams} from "../utils/formatMonthandDay";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {LinearGradient} from "expo";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
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

