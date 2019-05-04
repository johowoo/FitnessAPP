import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity, ScrollView, StyleSheet, FlatList} from 'react-native';
import {Fonts} from '../utils/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import ImagePicker from 'react-native-image-picker';
import {TopBar} from "../component";
import {connect} from 'react-redux'
import {updateBfrAction} from "../store/actions";
import {addProgressPhoto} from '../store/actions';
import {PhotoModal} from "../component/PhotoModal";

const {width, height} = Dimensions.get('window');


const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const numColumns = 3;

export class _Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddingWeight: false,
            isAddingBFR: false,
            photo: null,
            showModal: false
        }
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={()=>{console.log('Work!')}}>
                    <Image style={styles.image} source={{uri: item.photoURI}}/>
                </TouchableOpacity>
            </View>
        )
    };
    handleCloseModal = (showModal) => {
        this.setState({showModal})
    };

    render() {
        const {addProgressPhotoDispatch, progress} = this.props;
        console.log(progress);
        return (
            <View>
                <TopBar style={styles.topBar}>
                    <Text style={styles.textBar}>Progress</Text>
                    <View style={{position: 'absolute', right: 5}}>
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
                                                  addProgressPhotoDispatch({
                                                      photoURI: response.uri,
                                                      id: 1,
                                                      weight: 80,
                                                      BFR: 20,
                                                  });
                                                  this.setState({
                                                      avatarSource: source,
                                                      showModal: true,
                                                  });

                                              }
                                          })}
                                          style={styles.plusButton}
                                          textStyle={styles.plus}
                                          title='+'
                        ><Icon name={this.state.isAddingWeight ? "remove" : "add"} size={25} color="white"
                               key="add"/></TouchableOpacity>
                    </View>
                </TopBar>
                <ScrollView ref={(ref) => this.scrollView = ref}>
                    <View style={{marginTop: 5}}/>
                    <FlatList
                        data={progress}
                        style={styles.container}
                        renderItem={this.renderItem}
                        numColumns={numColumns}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    {this.state.showModal && <PhotoModal handleCloseModal={this.handleCloseModal}/>}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    progress: state.progress

});
const mapActionToProps = (dispatch) => ({
    addProgressPhotoDispatch(data) {
        dispatch(addProgressPhoto(data))
    },
    updateBfrData(data) {
        dispatch(updateBfrAction(data))
    }
});

export const Progress = connect(mapStateToProps, mapActionToProps)(_Progress);
const styles = StyleSheet.create({
    topBar: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b0b0b0'
    },
    textBar: {
        textAlign: 'center',
        color: '#ddd',
        fontSize: 28,
        fontFamily: Fonts.PattayaRegular
    },
    chartTitle: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.3,
        height: height * 0.2,
    },
    container: {
        flex: 1,
        marginVertical: 20
    },
    item: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 3,
        height: height / 5,
        marginTop: 2
    }
});


