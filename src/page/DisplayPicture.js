import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView, Image} from 'react-native';
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
        const navProps = this.props?.navigation?.state?.params;
        return (
            <LinearGradient
                colors={["#219dd5", "#51c0bb"]}
                style={{flex: 1}}
            >
                <ScrollView
                    // ref={(ref) => this.scrollView = ref}
                >
                    <View style={styles.imageContainer}>
                        <Text>{navProps.weight}</Text>
                        <Image style={styles.image} source={{uri: navProps?.photoURI}}/>
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
    image: {
        width: width * 0.9,
        height: height * 0.6
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center"
    }
})
