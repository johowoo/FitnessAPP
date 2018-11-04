import {Dimensions, StyleSheet} from "react-native";

const {height,width}=Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        backgroundColor: '#c69',
        height
    },
    box: {
        // flex:1,
        padding:50,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: 'yellow'
    }
})