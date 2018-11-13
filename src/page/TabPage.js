import React, {Component} from 'react';
import {
    StyleSheet, View, Text, Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import TabView from 'react-native-scrollable-tab-view';
import {Calendar} from './Calendar';
import {CurrentWorkout} from '../component';
import {Health} from "./Health";

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
                    tabBarPosition="bottom"
                    tabBarUnderlineStyle={{backgroundColor:"#787"}}
                    tabBarActiveTextColor="#787"
                    tabBarInactiveTextColor="#ddd"
                >
                    <CurrentWorkout tabLabel="+"></CurrentWorkout>

                    <View tabLabel="Calendar">
                        <Calendar/>
                    </View>

                    <View tabLabel="Health">
                        <Health/>
                    </View>
                </TabView>

            </LinearGradient>
        )
    }
}

export default TabPage;