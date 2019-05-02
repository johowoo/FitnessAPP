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
import ImagePicker from 'react-native-image-picker';
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

const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export class _Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddingWeight: false,
            isAddingBFR: false,
        }
    }

    render() {
        return (
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Progress</Text>
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
                                              onPress={() => ImagePicker.showImagePicker(options, (response) => {
                                                  console.log('Response = ', response);

                                                  if (response.didCancel) {
                                                      console.log('User cancelled image picker');
                                                  } else if (response.error) {
                                                      console.log('ImagePicker Error: ', response.error);
                                                  } else if (response.customButton) {
                                                      console.log('User tapped custom button: ', response.customButton);
                                                  } else {
                                                      const source = {uri: response.uri};

                                                      // You can also display the image using data:
                                                      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                                                      this.setState({
                                                          avatarSource: source,
                                                      });
                                                  }
                                              })}
                                              style={styles.plusButton}
                                              textStyle={styles.plus}
                                              title='+'
                            ><Icon name={this.state.isAddingWeight ? "remove" : "add"} size={25} color="white"
                                   key="add"/></TouchableOpacity>
                        </View>
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

export const Progress = connect(mapStateToProps, mapActionToProps)(_Progress);
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