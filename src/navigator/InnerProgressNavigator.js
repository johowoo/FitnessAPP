import React from 'react';
import {DisplayPicture} from "../page/DisplayPicture";
import {formatYYYY_MM_DD_HHMMFromParams} from "../utils/formatMonthandDay";
import {Text, TouchableOpacity, View} from "react-native";

import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import {LinearGradient} from "expo";
import {createStackNavigator} from "react-navigation";

let fontLoaded = true;
export const InnerProgressStackNavigator = createStackNavigator({
    DisplayPicture: {
        screen: props => <DisplayPicture fontLoaded={fontLoaded} {...props}  />,
        navigationOptions: ({navigation}) => ({
            // header: null,
            headerMode: "float",
            gesturesEnabled: false,
            //     // headerTitle: navigation?.state?.params?.date.toString()
            headerTitle: formatYYYY_MM_DD_HHMMFromParams(navigation?.state?.params),
            //     // `${navigation?.state?.params?.year.toString()}-${navigation?.state?.params?.month.toString()}-${navigation?.state?.params?.day.toString()} ${navigation?.state?.params?.hour.toString()}:${navigation?.state?.params?.minute.toString()}`,
            //     // header: null
            //     headerBackTitle: "Progress Page",
            // headerRight: () => (
            //     <View>
            //         <TouchableOpacity style={{marginRight: 30}}
            //                           onPress={() => {
            //                               navigation?.state?.params?.showDeleteConfirmModalInDisplayPicture({
            //                                   showReminder: true,
            //                                   reminderTitle: 'Delete',
            //                                   reminderContent: "Do you want to delete this photo？",
            //                                   hideConfirmButton: false
            //                               });
            //                           }
            //                           }>
            //             <View>
            //                 <Icon name="trash-o" size={24} color="#c69" key="delete"/>
            //             </View>
            //         </TouchableOpacity>
            //     </View>
            // ),
            headerLeft: <TouchableOpacity onPress={() => {
                navigation.navigate("Progress");
            }}>
                <Text style={{color: "#c69", fontSize: 20}}>
                    &nbsp; &nbsp;
                    <IconFontAwesome name="chevron-left" size={20} color="#c69"
                                     key="delete"/>
                    &nbsp;&nbsp;Back</Text>
            </TouchableOpacity>,
            headerRight: (
                <TouchableOpacity style={{marginRight: 30}}
                                  onPress={() => {
                                      navigation?.state?.params?.showDeleteConfirmModalInDisplayPicture({
                                          showReminder: true,
                                          reminderTitle: 'Delete',
                                          reminderContent: "Do you want to delete this photo？",
                                          hideConfirmButton: false
                                      });
                                      // console.warn("add");
                                  }}>
                    <View>
                        <IconFontAwesome name="trash-o" size={24} color="#c69" key="delete"/>
                    </View>
                </TouchableOpacity>
            ),
            // headerLeftContainerStyle: {color: "#fff"},
            // headerTintColor: {color: "#FFF"},
            headerBackground: (
                <LinearGradient colors={["#1b98d9", "#219dd5"]} style={{flex: 1}}/>
            ),
            headerTintColor: "#c69",
            // headerTitleStyle: {
            //     color: "#eee",
            // },
            // headerBackTitleStyle: {
            //     color: "#eee",
            //     fontWeight: "bold"
            //
            // }
        }),
    },
});
