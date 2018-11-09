import React,{Component} from'react';
import {View,Text,StyleSheet} from'react-native';
import {TopBar} from "../ui";
import {Fonts} from "../utils/Fonts";


export class Weight extends Component{
    render(){
        return(
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Weight</Text>
                </TopBar>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    topBar: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#ddd'
    },
    textBar: {
        textAlign: 'center',
        color: '#ddd',
        fontSize: 30,
        fontFamily: Fonts.PattayaRegular
    }
})