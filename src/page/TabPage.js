import React, {Component} from 'react';
import {
    StyleSheet, View, Text, Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import TabView from 'react-native-scrollable-tab-view';
import {CurrentWorkout} from '../ui';

class TabPage extends Component {
    render() {
        return (
            <LinearGradient
                // colors={["#0077fe", "#00fe81"]}
                colors={["#1b98d9", "#57c5b8"]}
                style={{flex: 1}}
            >
                <TabView
                    tabBarTextStyle={{fontSize: 25}}
                    tabBarPosition="overlayBottom"
                    tabBarUnderlineStyle={{backgroundColor:"#787"}}
                    tabBarActiveTextColor="#787"
                    tabBarInactiveTextColor="#ddd"
                >
                    <CurrentWorkout tabLabel="+"></CurrentWorkout>
                    <View tabLabel="ok"></View>
                    <View tabLabel="def"></View>
                    <View tabLabel="efg"></View>
                </TabView>

            </LinearGradient>
        )
    }
}

export default TabPage;