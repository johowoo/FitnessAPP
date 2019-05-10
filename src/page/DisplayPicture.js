import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView, Image} from 'react-native';

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
                        <Image style={styles.image} source={{uri: navProps?.photoURI}}/>
                    </View>

                    <View style={styles.textContainer}>
                        <View style={styles.textInnerContainer}>
                            <Text style={styles.text}>Weight:{navProps.weight}</Text>
                        </View>
                        <View style={styles.textInnerContainer}>
                            <Text style={styles.text}>BFR: {navProps.BFR}</Text>
                        </View>
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
        width: width * 0.85,
        height: height * 0.6
    },
    imageContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    textInnerContainer: {
        alignItems: "center",
        justifyContent: 'center',
        height: 50,
        width: width * 0.8,
        margin: 5,
        backgroundColor: "rgba(0,100,100,0.2)"
    },
    text: {
        color: "#eee",
        fontFamily:'PattayaRegular'
    }
})
