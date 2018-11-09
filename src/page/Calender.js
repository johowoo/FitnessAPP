import React,{Component} from'react';
import {View,Text,StyleSheet} from'react-native';
import { CalendarList } from 'react-native-calendars';
import {TopBar} from "../ui";
import {Fonts} from "../utils/Fonts";


export class Calender extends Component{
    render(){
        return(
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Calender</Text>
                </TopBar>
                <CalendarList
                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    onVisibleMonthsChange={(months) => {console.log('now these months are visible', months)}}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={50}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={50}
                        // Enable or disable scrolling of calendar list
                        scrollEnabled={true}
                    markedDates={{
                        '2018-11-16': {selected: true, marked: true, selectedColor: '#1b98d9'},
                        '2018-11-17': {marked: true},
                        '2018-11-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                        '2018-11-19': {disabled: true, disableTouchEvent: true},
                        '2018-11-21': {selected: true,marked: true, selectedColor: 'orange'}
                    }}
                    onDayPress={(day)=>{console.warn(day.dateString)}}
                        />
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