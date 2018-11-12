import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ScrollView} from 'react-native';
import {Fonts} from "../utils/Fonts";
import {
    LineChart,
} from 'react-native-chart-kit'
import Icon from "react-native-vector-icons/MaterialIcons";
import {AddDropdown} from '../component/AddDropdown';
import {connect} from 'react-redux';
import {updateBfrAction, updateWeightAction} from '../store/actions'

import {TopBar} from "../component";

const {width, height} = Dimensions.get('window');

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const chartConfig = {
    backgroundGradientFrom: '#1b98d9',
    backgroundGradientTo: '#666',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    }
}

export class _Health extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddingWeight: false,
            isAddingBFR: false,
        }
    }

    handleAddDropdown = (type) => {
        this.setState({
            [type]: !this.state[type]
        })
    }
    handleAddWeightConfirm = (data) => {
        this.props.updateWeightData(data);
        this.forceUpdate()
    };
    handleAddBFRConfirm = (data) => {
        this.props.updateBfrData(data);
        this.forceUpdate()
    }

    scrollToEnd = () => {
        this.forceUpdate();
        this.scrollView.scrollToEnd()
    }

    render() {
        return (
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Health</Text>
                </TopBar>

                <ScrollView
                    ref={(ref) => this.scrollView = ref}
                >
                    <View style={{marginTop: 5}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                            <Text style={styles.chartTitle}>
                                Weight
                            </Text>
                            <TouchableOpacity style={{height: 25, width: 25, backgroundColor: 'transparent'}}
                                              onPress={() => this.handleAddDropdown('isAddingWeight')}
                                              style={styles.plusButton}
                                              textStyle={styles.plus}
                                              title='+'
                            ><Icon name={this.state.isAddingWeight ? "remove" : "add"} size={25} color="white"
                                   key="add"/></TouchableOpacity>
                        </View>
                        <View>
                            {this.state.isAddingWeight ?
                                <View>
                                    <AddDropdown
                                        styles={dropdownStyles}
                                        placeholderTextColor={'#bbb'}
                                        placeholder={"  Please enter the weight number (KG)"}
                                        keyboardType={'numeric'}
                                        options={labels}
                                        handleConfirm={this.handleAddWeightConfirm.bind(this)}
                                    />
                                </View>
                                : <View></View>
                            }
                        </View>
                        <LineChart
                            data={{
                                labels,
                                datasets: [{
                                    data: this.props.weightData
                                }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>

                    <View style={{marginTop: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                            <Text style={styles.chartTitle}>
                                Body Fat Rate
                            </Text>
                            <TouchableOpacity style={{height: 25, width: 25, backgroundColor: 'transparent'}}
                                              onPress={() => this.handleAddDropdown('isAddingBFR')}
                                              style={styles.plusButton}
                                              textStyle={styles.plus}
                            ><Icon name={this.state.isAddingBFR ? "remove" : "add"} size={25} color="white"
                                   key="add"/></TouchableOpacity>
                        </View>

                        <View>
                            {
                                this.state.isAddingBFR ?
                                    <View>
                                        <AddDropdown
                                            styles={dropdownStyles}
                                            placeholderTextColor={'#bbb'}
                                            placeholder={"  Please enter the Body Fat Rate (<0.50)"}
                                            keyboardType={'numeric'}
                                            options={labels}
                                            handleConfirm={this.handleAddBFRConfirm.bind(this)}
                                            adjustScreen={this.scrollToEnd.bind(this)}
                                        />
                                    </View>
                                    : <View></View>
                            }
                        </View>
                        <LineChart
                            data={{
                                labels,
                                datasets: [{
                                    data: this.props.bfrData
                                }]
                            }}
                            width={Dimensions.get('window').width} // from react-native
                            height={220}
                            chartConfig={Object.assign(chartConfig, {
                                backgroundGradientFrom: '#666',
                                backgroundGradientTo: '#1b98d9',
                            })}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                    <View style={{height: height * 0.53}}></View>
                </ScrollView>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    bfrData: state.health.bfrData,
    weightData: state.health.weightData
})
const mapActionToProps = (dispatch) => ({
    updateWeightData(data) {
        dispatch(updateWeightAction(data))
    },
    updateBfrData(data) {
        dispatch(updateBfrAction(data))
    }
})

export const Health = connect(mapStateToProps, mapActionToProps)(_Health);
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
    },
    chartTitle: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        // marginLeft: 80

    }
})

const dropdownStyles = StyleSheet.create({
    container: {
        height: 80,
        marginBottom: 10,
        marginTop: 10,
    },
    dropdownInput: {
        backgroundColor: "transparent",
        height: 40,
        borderColor: 'rgba(255,140,0,0.8)',
        borderWidth: 1,
        borderRadius: 10,
        color: '#ddd'
    },
    dropdownContainer: {
        padding: width * 0.03,
        paddingTop: width * 0.02,
    },
    dropdownMenu: {
        height: 35,
        borderColor: 'rgba(255,140,0,0.8)',
    },
    dropdownMenuText: {
        fontSize: 18,
        color: '#FF8c00',
    },
    dropdownList: {
        marginTop: 10
    },
    dropdownListText: {
        fontSize: 18,
        color: '#FF8c00',
    },
    dropdownSelection: {
        color: "#00cccc"
    },
    confirmButton: {
        height: 35,
        borderColor: "rgba(255,140,0,0.8)"
    }
});