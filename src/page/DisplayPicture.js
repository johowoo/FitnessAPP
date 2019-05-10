import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView} from 'react-native';
import {TopBar} from "../component";

const {width, height} = Dimensions.get('window');
import {LinearGradient} from 'expo';

import {connect} from 'react-redux'


export class _DisplayPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
                <LinearGradient
                    colors={["#219dd5", "#51c0bb"]}
                    style={{flex: 1}}
                >
                    <ScrollView
                        ref={(ref) => this.scrollView = ref}
                    >
                        <View>
                            <Text>Picture view</Text>
                        </View>
                    </ScrollView>
                </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => ({
    bfrData: state.health.bfrData,
    weightData: state.health.weightData
})
const mapActionToProps = (dispatch) => ({
    updateWeightData(data) {
    },
    updateBfrData(data) {
    }
})

export const DisplayPicture = connect(mapStateToProps, mapActionToProps)(_DisplayPicture);
const styles = StyleSheet.create({
    topBar: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b0b0b0'
    },
})
