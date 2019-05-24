import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {LinearGradient} from "expo";
import {BottomTabContainer} from '../navigator/BottomTabContainer';

class Main extends Component {
    render() {
        fontLoaded = this.props.fontLoaded;
        return (
            <LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{flex: 1}}>
                <BottomTabContainer fontLoaded={this.props.fontLoaded}/>
                {/*    <TabView */}
                {/*        tabBarTextStyle={{fontSize: 25}} */}
                {/*        tabBarPosition="bottom" */}
                {/*        tabBarUnderlineStyle={{backgroundColor: "#787"}} */}
                {/*        tabBarActiveTextColor="#787" */}
                {/*        tabBarInactiveTextColor="#cdcdcd" */}
                {/*        renderTabBar={() => <CustomBar/>} */}
                {/*        style={{marginBottom: 15}} */}
                {/*    > */}
                {/*        <ScrollView tabLabel="ios-fitness"> */}
                {/*            <View> */}
                {/*                <CurrentWorkout fontLoaded={this.props.fontLoaded}/> */}
                {/*            </View> */}
                {/*        </ScrollView> */}
                {/*        <ScrollView tabLabel="ios-calendar"> */}
                {/*            <View> */}
                {/*                <Calendar fontLoaded={this.props.fontLoaded}/> */}
                {/*            </View> */}
                {/*        </ScrollView> */}
                {/*        <ScrollView tabLabel="ios-trending-up"> */}
                {/*            <View> */}
                {/*                <Health fontLoaded={this.props.fontLoaded}/> */}
                {/*            </View> */}
                {/*        </ScrollView> */}
                {/*        <ScrollView tabLabel="ios-images"> */}
                {/*            <View> */}
                {/*                <Progress fontLoaded={this.props.fontLoaded}/> */}
                {/*            </View> */}
                {/*        </ScrollView> */}
                {/*    </TabView> */}
            </LinearGradient>
        );
    }
}

export default Main;

const styles = StyleSheet.create({});
