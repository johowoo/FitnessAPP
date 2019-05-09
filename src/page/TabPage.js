import React, {Component} from 'react';
import {
    StyleSheet, View, ScrollView, Text
} from 'react-native';

import {LinearGradient} from 'expo';
import TabView from 'react-native-scrollable-tab-view';
import {Calendar} from './Calendar';
import {Health} from './Health';
import {CurrentWorkout} from '../component';
import {CustomBar} from '../component/CustomBar';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation'
import Progress from "./Progress";
import {TabBarIcon} from '../component/TabBarIcon'
import TabBarComponent from "../component/TabBarComponent";

let fontLoaded = true;

const StackNavigator = createStackNavigator({
    Progress: {
        screen: () => <Progress fontLoaded={fontLoaded}/>,
        navigationOptions: {
            header: null
        }
    }
})

const BottomTabNavigator = createBottomTabNavigator({
    CurrentWorkout: {
        screen: () => {
            // console.warn(xxx);
            return <CurrentWorkout fontLoaded={fontLoaded}/>
        },
        navigationOptions: () => ({
            tabBarIcon: (props) => <TabBarIcon name={"ios-fitness"} {...props}/>,
            tabBarLabel: 'fitness'
        }),
    },
    Calendar: {
        screen: () => <Calendar fontLoaded={fontLoaded}/>,
        navigationOptions: () => ({
            tabBarIcon: (props) => <TabBarIcon name={"ios-calendar"} {...props}/>,
            tabBarLabel: 'calendar'
        }),
    },
    Health: {
        screen: () => <Health fontLoaded={fontLoaded}/>,
        navigationOptions: () => ({
            tabBarIcon: (props) => <TabBarIcon name={"ios-trending-up"} {...props}/>,
            tabBarLabel: "health"
        }),
    },
    Progress: {
        screen: StackNavigator,
        header: null,
        navigationOptions: () => ({
            tabBarIcon: (props) => <TabBarIcon name={"ios-images"} {...props}/>,
            tabBarLabel: "progress"
        }),
    }
}, {
    tabBarOptions: {
        activeTintColor: '#eee',
        inactiveTintColor: '#c69',
        inactiveBackgroundColor: "#57c5b8",
        // style: {
        //     backgroundColor: "#57c5b8"
        // }
    },
    tabBarComponent: (props) => <TabBarComponent {...props}/>

    // tabBarComponent: ({navigation: {state: {routes}}}) => <LinearGradient
    //     colors={["#1b98d9", "#57c5b8"]}
    //     style={{flex: 1}}
    // >
    //     {routes.map(this.renderItem)}
    // </LinearGradient>


})


const BottomTabContainer = createAppContainer(BottomTabNavigator);


class TabPage extends Component {
    render() {
        fontLoaded = this.props.fontLoaded;
        return (
            <LinearGradient
                colors={["#1b98d9", "#57c5b8"]}
                style={{flex: 1}}
            >
                <BottomTabContainer fontLoaded={this.props.fontLoaded}/>
                {/*    <TabView*/}
                {/*        tabBarTextStyle={{fontSize: 25}}*/}
                {/*        tabBarPosition="bottom"*/}
                {/*        tabBarUnderlineStyle={{backgroundColor: "#787"}}*/}
                {/*        tabBarActiveTextColor="#787"*/}
                {/*        tabBarInactiveTextColor="#ddd"*/}
                {/*        renderTabBar={() => <CustomBar/>}*/}
                {/*        style={{marginBottom: 15}}*/}
                {/*    >*/}
                {/*        <ScrollView tabLabel="ios-fitness">*/}
                {/*            <View>*/}
                {/*                <CurrentWorkout fontLoaded={this.props.fontLoaded}/>*/}
                {/*            </View>*/}
                {/*        </ScrollView>*/}
                {/*        <ScrollView tabLabel="ios-calendar">*/}
                {/*            <View>*/}
                {/*                <Calendar fontLoaded={this.props.fontLoaded}/>*/}
                {/*            </View>*/}
                {/*        </ScrollView>*/}
                {/*        <ScrollView tabLabel="ios-trending-up">*/}
                {/*            <View>*/}
                {/*                <Health fontLoaded={this.props.fontLoaded}/>*/}
                {/*            </View>*/}
                {/*        </ScrollView>*/}
                {/*        <ScrollView tabLabel="ios-images">*/}
                {/*            <View>*/}
                {/*                <Progress fontLoaded={this.props.fontLoaded}/>*/}
                {/*            </View>*/}
                {/*        </ScrollView>*/}
                {/*    </TabView>*/}
            </LinearGradient>
        )
    }
}

export default TabPage;

const styles = StyleSheet.create({});