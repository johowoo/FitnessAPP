import React from 'react';
import { View, StyleSheet,Dimensions } from 'react-native';

const {width,height} =Dimensions.get('window');


const marginTop=(height/width >=1)? 40:0;

export class TopBar extends React.Component{
    render(){
        return(
            <View style={[styles.container, this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        padding: 10,
        marginTop: marginTop,
    }
});