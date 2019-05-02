import React, {Component} from 'react';
import {
    StyleSheet, View, Text, Dimensions, ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TabView from 'react-native-scrollable-tab-view';
import {Calendar} from './Calendar';
import {Health} from './Health';
import {CurrentWorkout} from '../component';
import {CustomBar} from '../component/CustomBar';

import {Progress} from "./Progress";

class TabPage extends Component {
    render() {
        return (
            <LinearGradient
                colors={["#1b98d9", "#57c5b8"]}
                style={{flex: 1}}
            >
                <TabView
                    tabBarTextStyle={{fontSize: 25}}
                    tabBarPosition="bottom"
                    tabBarUnderlineStyle={{backgroundColor: "#787"}}
                    tabBarActiveTextColor="#787"
                    tabBarInactiveTextColor="#ddd"
                    renderTabBar={() => <CustomBar/>}
                >
                    <ScrollView tabLabel="ios-fitness">
                        <View>
                            <CurrentWorkout/>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-paper">
                        <View>
                            <Calendar />
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-trending-up">
                        <View>
                            <Health/>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-trending-up">
                        <View>
                            <Progress/>
                        </View>
                    </ScrollView>
                </TabView>
            </LinearGradient>
        )
    }
}

export default TabPage;

const styles = StyleSheet.create({

});