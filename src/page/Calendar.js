import React,{Component} from'react';
import {View,Text,StyleSheet} from'react-native';
import { CalendarList } from 'react-native-calendars';
import {TopBar} from "../component";
import {Fonts} from "../utils/Fonts";
import {connect} from 'react-redux';


export class _Calendar extends Component{
    render(){
        return(
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Calendar</Text>
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
                    markedDates={this.props.markedDates}
                    onDayPress={(day)=>{console.warn(day.dateString)}}
                />
            </View>
        )
    }
}
const mapStateToProps=state=>({
    markedDates:state.calendar.markedDates,
})

export const Calendar=connect(mapStateToProps,null)(_Calendar)
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