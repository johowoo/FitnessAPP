import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import { CurrentWorkoutStackNavigator } from "./CurrentWorkoutStackNavigator";
import { TabBarIcon } from "../component/TabBarIcon";
import { Calendar } from "../page/Calendar";
import { Statistics } from "../page/Statistics";
import { ProgressStackNavigator } from "./ProgressNavigator";
import TabBarComponent from "../component/TabBarComponent";
import { CalendarStackNavigator } from "./CalendarStackNavigator";

const BottomTabNavigator = createBottomTabNavigator(
  {
    CurrentWorkout: {
      screen: CurrentWorkoutStackNavigator,
      navigationOptions: () => ({
        tabBarIcon: props => <TabBarIcon name="ios-fitness" {...props} />,
        tabBarLabel: "fitness",
      }),
    },

    Calendar: {
      // screen: props => <Calendar fontLoaded={fontLoaded} {...props} />,
      screen: CalendarStackNavigator,
      header: null,
      navigationOptions: () => ({
        tabBarIcon: props => <TabBarIcon name="ios-calendar" {...props} />,
        tabBarLabel: "calendar",
      }),
    },
    Statistics: {
      screen: props => <Statistics fontLoaded={fontLoaded} {...props} />,
      navigationOptions: () => ({
        tabBarIcon: props => <TabBarIcon name="ios-trending-up" {...props} />,
        tabBarLabel: "statistics",
      }),
    },
    Progress: {
      screen: ProgressStackNavigator,
      header: null,
      navigationOptions: () => ({
        tabBarIcon: props => <TabBarIcon name="ios-images" {...props} />,
        tabBarLabel: "progress",
      }),
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#eee",
      inactiveTintColor: "#c69",
      inactiveBackgroundColor: "#57c5b8",
      // style: {
      //     backgroundColor: "#57c5b8"
      // }
    },
    tabBarComponent: props => <TabBarComponent {...props} />,
  }
);

export const BottomTabContainer = createAppContainer(BottomTabNavigator);
