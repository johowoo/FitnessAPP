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
import {Font} from 'expo';

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

type
Props = {};

export default class App extends Component<Props> {
    state = {
        fontLoaded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            // 'SCRATCHMYBACK': require('./assets/fonts/SCRATCHMYBACK.TTF'),
            'PacificoRegular': require('./assets/fonts/Pacifico-Regular.ttf'),
            'PattayaRegular': require('./assets/fonts/Pattaya-Regular.ttf'),
        });
        this.setState({fontLoaded: true});
    }

    render() {
        // if (this.state.fontLoaded) {
            return (
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        {/*<View style={{paddingTop: 40}}>*/}
                        <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'}
                        />
                        <Root fontLoaded={this.state.fontLoaded}/>
                        {/*</View>*/}
                    </PersistGate>
                </Provider>
            );
        // }
    }
}


// const styles=StyleSheet.create({
//     statusBar: {
//         height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,
//     }
// })