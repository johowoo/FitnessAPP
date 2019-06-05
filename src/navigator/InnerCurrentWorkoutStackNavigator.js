import React from "react";
import { CustomWorkout } from "../page/CustomWorkout";
import { LinearGradient } from "expo";
import { EditLibrary } from "../page/EditLibrary";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { EditExercisesForLibrary } from "../component/EditExercisesForLibrary";
import { createStackNavigator } from "react-navigation";

export const InnerCurrentWorkoutStackNavigator = createStackNavigator({
  CustomWorkout: {
    screen: props => <CustomWorkout {...props} />,
    screenProps: "",
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: true,
      headerTitle: "Custom Workout",
      // `${navigation?.state?.params?.year.toString()}-${navigation?.state?.params?.month.toString()}-${navigation?.state?.params?.day.toString()} ${navigation?.state?.params?.hour.toString()}:${navigation?.state?.params?.minute.toString()}`,
      // header: null
      // headerBackTitle: "Progress Page",
      // headerLeftContainerStyle: {color: "#fff"},
      // headerTintColor: {color: "#FFF"},
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CurrentWorkout");
          }}>
          <Text style={{ color: "#c69", fontSize: 20 }}>
            &nbsp; &nbsp;
            <IconFontAwesome
              name="chevron-left"
              size={20}
              color="#c69"
              key="delete"
            />
            &nbsp;&nbsp;Back
          </Text>
        </TouchableOpacity>
      ),
      headerBackground: (
        <LinearGradient colors={["#1b98d9", "#219dd5"]} style={{ flex: 1 }} />
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
        marginLeft: Platform.OS === "android" ? 80 : 10,

        color: "rgba(204,102,153,0.85)",
        fontSize: 25,
        fontFamily: "PattayaRegular",
        fontWeight: "200",
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
    screen: props => <EditLibrary {...props} />,
    screenProps: "",
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: true,
      // headerTitle: navigation?.state?.params?.date.toString()
      // headerTitle: formatYYYY_MM_DD_HHMMFromParams(navigation?.state?.params),
      headerTitle: "Edit Library",
      // headerBackTitle: null,
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CurrentWorkout");
          }}>
          <Text style={{ color: "#c69", fontSize: 20 }}>
            &nbsp; &nbsp;
            <IconFontAwesome
              name="chevron-left"
              size={20}
              color="#c69"
              key="delete"
            />
            &nbsp;&nbsp;Back
          </Text>
        </TouchableOpacity>
      ),
      // `${navigation?.state?.params?.year.toString()}-${navigation?.state?.params?.month.toString()}-${navigation?.state?.params?.day.toString()} ${navigation?.state?.params?.hour.toString()}:${navigation?.state?.params?.minute.toString()}`,
      // header: null
      // headerBackTitle: "Progress Page",
      // headerLeftContainerStyle: {color: "#fff"},
      // headerTintColor: {color: "#FFF"},
      headerBackground: (
        <LinearGradient colors={["#1b98d9", "#219dd5"]} style={{ flex: 1 }} />
      ),
      headerTintColor: "#c69",
      headerTitleStyle: {
        marginLeft: Platform.OS === "android" ? 80 : 10,

        color: "rgba(204,102,153,0.85)",
        fontSize: 25,
        fontFamily: "PattayaRegular",
        fontWeight: "200",
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
        <TouchableOpacity
          style={{ marginRight: 30 }}
          onPress={() => {
            navigation?.state?.params.setAddCategoryModalForLibraryVisibility(
              true
            );
          }}>
          <View>
            <MaterialIcons name={"add"} size={25} color="#c69" key="remove" />
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
  EditExercisesForLibrary: {
    screen: props => <EditExercisesForLibrary {...props} />,
    screenProps: "",
    navigationOptions: ({ navigation }) => ({
      gesturesEnabled: true,
      // headerTitle: navigation?.state?.params?.date.toString()
      // headerTitle: formatYYYY_MM_DD_HHMMFromParams(navigation?.state?.params),
      headerTitle: "Edit Exercises",
      // headerBackTitle: null,
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EditLibrary");
          }}>
          <Text style={{ color: "#c69", fontSize: 20 }}>
            &nbsp; &nbsp;
            <IconFontAwesome
              name="chevron-left"
              size={20}
              color="#c69"
              key="delete"
            />
            &nbsp;&nbsp;Back
          </Text>
        </TouchableOpacity>
      ),
      // `${navigation?.state?.params?.year.toString()}-${navigation?.state?.params?.month.toString()}-${navigation?.state?.params?.day.toString()} ${navigation?.state?.params?.hour.toString()}:${navigation?.state?.params?.minute.toString()}`,
      // header: null
      // headerBackTitle: "Progress Page",
      // headerLeftContainerStyle: {color: "#fff"},
      // headerTintColor: {color: "#FFF"},
      headerBackground: (
        <LinearGradient colors={["#1b98d9", "#219dd5"]} style={{ flex: 1 }} />
      ),
      headerTintColor: "#c69",
      headerTitleStyle: {
        marginLeft: Platform.OS === "android" ? 80 : 10,
        color: "rgba(204,102,153,0.85)",
        fontSize: 25,
        fontFamily: "PattayaRegular",
        fontWeight: "200",
      },
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 30 }}
          onPress={() => {
            navigation.state.params.setEditLibraryExerciseModalVisibility(true);
          }}>
          <View>
            <MaterialIcons name={"add"} size={25} color="#c69" key="remove" />
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
});
