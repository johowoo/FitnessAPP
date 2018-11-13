import React, {Component} from 'react';
import {
    StyleSheet, View, Text, Dimensions,Platform,StatusBar
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'
import {Fonts} from "../utils/Fonts";
import Button from 'apsl-react-native-button'

const STATUS_BAR_HEIGHT = 30;
const {height}=Dimensions.get('window');

class Welcome extends Component {
    handlePress(){
        this.props.changeShowWelcome(false);
    }
    render() {
        // console.warn(this.props.showWelcome);
        return (
                <LinearGradient
                    colors={["#4a168c","#880e4f"]} style={styles.container}>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>Joe's Fitness</Text>
                    </View >
                    <View style={styles.middle}>
                        <Text style={styles.logText}>Log your fitness</Text>
                    </View>
                    <View style={styles.bottom}>
                        <Button onPress={this.handlePress.bind(this)} style={{borderColor:'#ddd'}}><Text style={styles.buttonText}>Start Workout</Text></Button>
                    </View>
                </LinearGradient>
        )
    }
}

export default Welcome;

const styles=StyleSheet.create({
     statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT:0,
         backgroundColor:'red'
    },
    container:{
        flex:1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    logText:{
        fontSize:32,
        color:'#ddd',
        textAlign: 'center',
        fontFamily:Fonts.PacificoRegular
    },
    header:{
        height:0.45*height,
        justifyContent: 'center',
        // alignContent: 'center'
    },
    middle:{
        marginTop:50,
        height:0.35*height,
    },
    bottom:{
        height:0.20*height,
        alignItems: 'center',
        marginTop:0,
        marginLeft:90,
        marginRight:90,
    },
    headerText:{
      fontSize:50,
        color:'#ddd',
        textAlign: 'center',
        fontFamily:Fonts.PacificoRegular
    },
    buttonText:{
        color:"#ddd",

    }
})