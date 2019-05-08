import React, {Component} from 'react';
import {
    StyleSheet, View, Text, Dimensions, ScrollView
} from 'react-native';
import {LinearGradient} from 'expo';
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
                            <CurrentWorkout fontLoaded={this.props.fontLoaded}/>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-calendar">
                        <View>
                            <Calendar fontLoaded={this.props.fontLoaded} />
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-trending-up">
                        <View>
                            <Health fontLoaded={this.props.fontLoaded}/>
                        </View>
                    </ScrollView>
                    <ScrollView tabLabel="ios-images">
                        <View>
                            <Progress fontLoaded={this.props.fontLoaded}/>
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