import React, {Component} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity, ScrollView, StyleSheet, FlatList} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {ImagePicker, Permissions} from 'expo';
import {TopBar} from "../component";
import {connect} from 'react-redux'
import {updateBfrAction} from "../store/actions";
import {addProgressPhoto, showProgressModal, showProgressPicker} from '../store/actions';
import {PhotoModal} from "../component/PhotoModal";
import {PickerCamera} from '../component/PickerCamera';

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
    async componentDidMount() {
        const permission1 = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        const permission2 = await Permissions.getAsync(Permissions.CAMERA);
        if (permission1.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        } else {
        }
        if (permission2.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA);
        } else {
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            showPicker: false,
            isAddingWeight: false,
            isAddingBFR: false,
            photo: null,
            showModal: false,
        }
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => {
                    console.log('Work!')
                }}>
                    <Image style={styles.image} source={{uri: item.photoURI}}/>
                </TouchableOpacity>
            </View>
        )
    };
    handleModal = (changedState) => {
        this.setState(changedState)
    };

    // _pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //     });
    //
    //     console.log(result);
    //
    //     if (!result.cancelled) {
    //         this.setState({
    //             avatarSource: result.uri,
    //             showPicker: true,
    //             // showModal: true,
    //         });
    //         this.props.addProgressPhotoDispatch({
    //             photoURI: result.uri,
    //             id: 1,
    //             weight: 80,
    //             BFR: 20,
    //         });
    //     }
    // };

    render() {
        const {
            progress, addProgressPhotoDispatch, showProgressPickerDispatch, showProgressModalDispatch, showPicker,
            showModal
        } = this.props;
        console.log(progress);
        return (
            <View>
                <TopBar style={styles.topBar}>
                    {this.props.fontLoaded ? <Text style={styles.textBar}>Progress</Text> : null}
                    <View style={{position: 'absolute', right: 15}}>
                        <TouchableOpacity style={{height: 25, width: 25, backgroundColor: 'transparent'}}
                            // onPress={() => this.handleModal({showPicker: true})}
                                          onPress={() => showProgressPickerDispatch(true)}
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
                    {showPicker &&
                    <PickerCamera addProgressPhotoDispatch={addProgressPhotoDispatch}
                                  showProgressPickerDispatch={showProgressPickerDispatch}
                                  showProgressModalDispatch={showProgressModalDispatch}
                                  showPicker={showPicker}
                                  showModal={showModal}
                    />
                    }
                    {/*{this.state.showModal &&*/}
                    {/*<PhotoModal handleModal={this.handleModal({showModal: false})}/>}*/}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    progress: state.progress,
    showPicker: state.progressModal.showPicker,
    showModal: state.progressModal.showModal
});
const mapActionToProps = (dispatch) => ({
    addProgressPhotoDispatch(data) {
        dispatch(addProgressPhoto(data))
    },
    updateBfrData(data) {
        dispatch(updateBfrAction(data))
    },
    showProgressPickerDispatch(bool) {
        dispatch(showProgressPicker({showPicker: bool}))
    },
    showProgressModalDispatch(bool) {
        dispatch(showProgressModal({showModal: bool}))
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
        // fontFamily: Fonts.PattayaRegular
        fontFamily: "PattayaRegular"
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


