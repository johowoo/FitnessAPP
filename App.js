/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StatusBar, StyleSheet, SafeAreaView, View} from 'react-native';
import {Root} from "./src/Root";
import {Provider} from 'react-redux';
import getStore from "./src/store/index";
import {PersistGate} from 'redux-persist/integration/react'


const NAV_BAR_HEIGHT_IOS = 44;
// const NAV_BAR_HEIGHT_IOS = 40;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 30;


let {store, persistor} = getStore();
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {/*<View style={{paddingTop: 40}}>*/}
                    <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'}
                    />
                    <Root/>
                    {/*</View>*/}
                </PersistGate>
            </Provider>
        );
    }
}


// const styles=StyleSheet.create({
//     statusBar: {
//         height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,
//     }
// })