import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {IconFont} from '@expo/vector-icons';
import {LinearGradient} from "expo";
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export class CongratsPage extends Component {
    render() {
        return (
            <LinearGradient colors={["#1b98d9", "#51c0bb"]} style={{flex: 1}}>
                <View>
                    <TouchableOpacity
                        style={{
                            margin: 30,
                            marginTop: 45,
                        }}
                        onPress={() => this.props.navigation.navigate("CurrentWorkout")}
                    >
                        <IconFontAwesome name="arrow-circle-left" size={40} color="#c69"
                                         key="delete"/>
                    </TouchableOpacity>
                </View>
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    marginTop: -50
                }}>
                    <Text style={{fontFamily: "PattayaRegular", fontSize: 40, color: "#eee"}}>Good Job!</Text>
                    <IconFont name={"Awards2"} size={200} color={"#c69"}/>
                </View>
            </LinearGradient>)
    }
}
