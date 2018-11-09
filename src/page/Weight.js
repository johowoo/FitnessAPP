import React,{Component} from'react';
import {View,Text,StyleSheet,Dimensions} from'react-native';
import {TopBar} from "../ui";
import {Fonts} from "../utils/Fonts";
import {
    LineChart,
} from 'react-native-chart-kit'


export class Weight extends Component{
    render(){
        return(
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Weight</Text>
                </TopBar>
                <View>
                    <Text>
                        Bezier Line Chart
                    </Text>
                    <LineChart
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        chartConfig={{
                            // backgroundColor: '#e26a00',
                            backgroundGradientFrom: 'transparent',
                            backgroundGradientTo: 'transparent',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>
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