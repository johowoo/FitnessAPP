import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Calendar } from './Calendar';
import { Health } from './Health';
import { CurrentWorkout } from '../component';
import Progress from './Progress';
import { TabBarIcon } from '../component/TabBarIcon';
import TabBarComponent from '../component/TabBarComponent';
import { DisplayPicture } from './DisplayPicture';

let fontLoaded = true;

const StackNavigator = createStackNavigator({
  Progress: {
    screen: props => <Progress fontLoaded={fontLoaded} {...props} />,
    navigationOptions: {
      header: null,
    },
  },
  DisplayPicture: {
    screen: props => <DisplayPicture {...props} />,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation?.state?.params?.date.toString(),
      // header: null
      headerBackTitle: 'Progress Page',
      // headerLeftContainerStyle: {color: "#fff"},
      // headerTintColor: {color: "#FFF"},
      headerBackground: <LinearGradient
        colors={['#1b98d9', '#219dd5']}
        style={{ flex: 1 }}
      />,
      headerTintColor: '#c69',
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

const BottomTabNavigator = createBottomTabNavigator({
  CurrentWorkout: {
    screen: props => <CurrentWorkout fontLoaded={fontLoaded} {...props} />,
    navigationOptions: () => ({
      tabBarIcon: props => <TabBarIcon name="ios-fitness" {...props} />,
      tabBarLabel: 'fitness',
    }),
  },
  Calendar: {
    screen: props => <Calendar fontLoaded={fontLoaded} {...props} />,
    navigationOptions: () => ({
      tabBarIcon: props => <TabBarIcon name="ios-calendar" {...props} />,
      tabBarLabel: 'calendar',
    }),
  },
  Health: {
    screen: props => <Health fontLoaded={fontLoaded} {...props} />,
    navigationOptions: () => ({
      tabBarIcon: props => <TabBarIcon name="ios-trending-up" {...props} />,
      tabBarLabel: 'health',
    }),
  },
  Progress: {
    screen: StackNavigator,
    header: null,
    navigationOptions: () => ({
      tabBarIcon: props => <TabBarIcon name="ios-images" {...props} />,
      tabBarLabel: 'progress',
    }),
  },
}, {
  tabBarOptions: {
    activeTintColor: '#eee',
    inactiveTintColor: '#c69',
    inactiveBackgroundColor: '#57c5b8',
    // style: {
    //     backgroundColor: "#57c5b8"
    // }
  },
  tabBarComponent: props => <TabBarComponent {...props} />,
});
const BottomTabContainer = createAppContainer(BottomTabNavigator);

class TabPage extends Component {
  render() {
    fontLoaded = this.props.fontLoaded;
    return (

      <LinearGradient
        colors={['#1b98d9', '#57c5b8']}
        style={{ flex: 1 }}
      >
        <BottomTabContainer fontLoaded={this.props.fontLoaded} />
      </LinearGradient>

    );
  }
}

export default TabPage;
