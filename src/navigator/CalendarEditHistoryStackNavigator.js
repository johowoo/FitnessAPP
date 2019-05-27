import React from 'react';
import {createStackNavigator} from "react-navigation";
import {Calendar} from "../page/Calendar";
import {EditHistory} from "../page/EditHistory";
import {CurrentWorkout} from "../page/CurrentWorkout";
import {View, Text, TouchableOpacity} from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import {LinearGradient} from "expo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const CalendarEditHistoryStackNavigator = createStackNavigator({
    EditHistory: {
        screen: props => <EditHistory {...props} />,
        navigationOptions: ({navigation}) => ({
            gesturesEnabled: true,
            // headerTitle: navigation?.state?.params?.date.toString()
            // headerTitle: formatYYYY_MM_DD_HHMMFromParams(navigation?.state?.params),
            headerTitle: "Edit History",
            // headerBackTitle: null,
            headerLeft:
                <TouchableOpacity onPress={() => {
                    navigation.navigate("Calendar");
                }}>
                    <Text style={{color: "#c69", fontSize: 20}}>
                        &nbsp; &nbsp;
                        <IconFontAwesome name="chevron-left" size={20} color="#c69"
                                         key="delete"/>
                        &nbsp;&nbsp;Back</Text>
                </TouchableOpacity>
            ,
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
            headerRight: (
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity style={{marginRight: 20}}
                                      onPress={() => {
                                          // console.warn("add");
                                      }}>
                        <View>
                            <MaterialIcons name={"add-circle"}
                                           size={30}
                                           color="#c69"
                                           key="remove"
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight: 30}}
                                      onPress={() => {
                                          // console.warn("add");
                                      }}>
                        <View>
                            <MaterialIcons name={"check-circle"}
                                           size={30}
                                           color="#c69"
                                           key="remove"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            ),
        })
    }
});
