import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Fonts} from '../utils/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePicker from 'react-native-image-picker';
import {TopBar} from "../component";
import {connect} from 'react-redux'
import {updateBfrAction, updateWeightAction} from "../store/actions";
import {addProgressPhoto} from '../store/actions';

const {width, height} = Dimensions.get('window');


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
            photo: null
        }
    }

    render() {

        const {addProgressPhotoDispatch, progress} = this.props;
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
                                                  if (response.uri) {
                                                      this.setState({photo: response});

                                                  }
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
                                                      addProgressPhotoDispatch({
                                                          photoURI: response.uri,
                                                          id: 1,
                                                          weight: 80,
                                                          BFR: 20,
                                                      })
                                                  }
                                              })}
                                              style={styles.plusButton}
                                              textStyle={styles.plus}
                                              title='+'
                            ><Icon name={this.state.isAddingWeight ? "remove" : "add"} size={25} color="white"
                                   key="add"/></TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {progress.map((photo, index) => photo?.photoURI &&
                            <Image key={index} style={styles.image} source={{uri: photo.photoURI}}/>)}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

// {this.state.photo && <Image style={styles.image} source={{uri: this.state.photo.uri}}/>}
const mapStateToProps = (state) => ({
    progress: state.progress

})
const mapActionToProps = (dispatch) => ({
    addProgressPhotoDispatch(data) {
        dispatch(addProgressPhoto(data))
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
    },
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        height: height * 0.6
    }
});
