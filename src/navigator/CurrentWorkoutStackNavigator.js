import React from 'react';
import {createStackNavigator} from "react-navigation";
import {CurrentWorkout} from "../page/CurrentWorkout";
import {CustomWorkout} from "../page/CustomWorkout";
import {LinearGradient} from "expo";
import {EditLibrary} from "../page/EditLibrary";
import {TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {EditLibraryStackNavigator} from "./EditLibraryStackNavigator";

let fontLoaded = true;

export const CurrentWorkoutStackNavigator = createStackNavigator({
    CurrentWorkout: {
        screen: props => <CurrentWorkout fontLoaded={fontLoaded} {...props} />,
        navigationOptions: {
            header: null,
        },
    },
    CustomWorkout: {
        screen: props => <CustomWorkout {...props}  />,
        screenProps: "",
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: true,
            headerTitle: "Custom Workout",
            // `${navigation?.state?.params?.year.toString()}-${navigation?.state?.params?.month.toString()}-${navigation?.state?.params?.day.toString()} ${navigation?.state?.params?.hour.toString()}:${navigation?.state?.params?.minute.toString()}`,
            // header: null
            // headerBackTitle: "Progress Page",
            // headerLeftContainerStyle: {color: "#fff"},
            // headerTintColor: {color: "#FFF"},
            headerBackground: (
                <LinearGradient colors={["#1b98d9", "#219dd5"]} style={{flex: 1}}/>
            ),
            // headerRight: (
            //     <TouchableOpacity style={{marginRight: 30}}
            //                       onPress={() => {
            //                           // console.warn("add");
            //                       }}>
            //         <View>
            //             <MaterialIcons name={"add"}
            //                            size={25}
            //                            color="#c69"
            //                            key="remove"
            //             />
            //         </View>
            //     </TouchableOpacity>
            // ),
            headerTintColor: "#c69",
            headerTitleStyle: {
                marginLeft: 20,
                color: "rgba(204,102,153,0.85)",
                fontSize: 25,
                fontFamily: "PattayaRegular"
            },
            // headerBackTitleStyle: {
            //     color: "#d0d0d0",
            fontSize: 22,
            //     fontWeight: "bold"
            //
            // }
        }),
    },
    EditLibrary: {
        screen: EditLibraryStackNavigator,
        screenProps: "",
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: true,
            // headerTitle: navigation?.state?.params?.date.toString()
            // headerTitle: formatYYYY_MM_DD_HHMMFromParams(navigation?.state?.params),
            headerTitle: "Edit Library",
            // `${navigation?.state?.params?.year.toString()}-${navigation?.state?.params?.month.toString()}-${navigation?.state?.params?.day.toString()} ${navigation?.state?.params?.hour.toString()}:${navigation?.state?.params?.minute.toString()}`,
            // header: null
            // headerBackTitle: "Progress Page",
            // headerLeftContainerStyle: {color: "#fff"},
            // headerTintColor: {color: "#FFF"},
            headerBackground: (
                <LinearGradient colors={["#1b98d9", "#219dd5"]} style={{flex: 1}}/>
            ),
            headerTintColor: "#c69",
            headerTitleStyle: {
                marginLeft: 20,
                color: "rgba(204,102,153,0.85)",
                fontSize: 25,
                fontFamily: "PattayaRegular"
            },
            // headerRight: (
            //     <TouchableOpacity style={{marginRight: 30}}
            //                       onPress={() => {
            //                           console.warn("add");
            //                       }
            //                       }>
            //         <View>
            //             <Icon name="add" size={24} color="#c69" key="delete"/>
            //         </View>
            //     </TouchableOpacity>
            // ),
            headerRight: (
                <TouchableOpacity style={{marginRight: 30}}
                                  onPress={() => {
                                      // console.warn("add");
                                  }}>
                    <View>
                        <MaterialIcons name={"add"}
                                       size={25}
                                       color="#c69"
                                       key="remove"
                        />
                    </View>
                </TouchableOpacity>
            ),
            // headerBackTitleStyle: {
            //     color: "#eee",
            //     fontWeight: "bold"
            //
            // }
        }),
    },
}, {
    headerMode: "float",
});
