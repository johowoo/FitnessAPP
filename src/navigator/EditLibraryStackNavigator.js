import React from 'react';
import {createStackNavigator, NavigationActions} from "react-navigation";
import {EditLibrary} from "../page/EditLibrary";
import {LinearGradient} from "expo";
import {TouchableOpacity, View, Text} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {EditExercisesForLibrary} from '../component/EditExercisesForLibrary';

export const EditLibraryStackNavigator = createStackNavigator({
        EditLibrary: {
            screen: props => <EditLibrary {...props}  />,
            screenProps: "",
            navigationOptions: ({navigation}) => ({
                gesturesEnabled: true,
                header: null,
                headerMode: "float",
            }),
            // headerBackTitleStyle: {
            //     color: "#eee",
            //     fontWeight: "bold"
            // }
        },
    }, {
        // headerBackTitleVisible: false,
        // headerTransitionPreset: "fade-in-place",
        // headerMode: "none",
    })
;
