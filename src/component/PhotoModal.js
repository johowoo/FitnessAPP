import React from 'react';
import {View, StyleSheet, Dimensions, Modal, Text, TextInput} from 'react-native';
import ApslButton from "apsl-react-native-button";

const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {addProgressPhoto, showProgressModal, showProgressPicker, updateBfrAction} from "../store/actions";

class _PhotoModal extends React.Component {
    state = {inputTextWeight: "", inputTextBFR: ""};
    handleSubmit = () => {
        this.props.showProgressModalDispatch(false);
        // this.props.showProgressPickerDispatch(false);
        this.props.addProgressPhotoDispatch({
            photoURI: this.props.tmpURI,
            BFR: this.state.inputTextBFR,
            weight: this.state.inputTextWeight
        })
    }

    render() {
        // console.warn("TMP", this.props.tmpURI);
        return (
            <Modal transparent={true} visible={this.props.showModal}>
                {/*{this.props.children}*/}
                <View style={styles.container}>
                    <View style={styles.modalInnerContainer}>
                        <Text style={{color: '#eee', fontSize: 16, marginLeft: 10}}>Please enter your weight and
                            BFR?</Text>
                        <TextInput
                            style={[styles.dropdownInput, this.props.styles?.dropdownInput]}
                            placeholderTextColor={this.props.placeholderTextColor || "#ccc"}
                            placeholder={"Please enter your weight:(KG)"}
                            value={this.state.inputTextWeight}
                            onChangeText={text => this.setState({inputTextWeight: text})}
                            keyboardType={"number-pad"}
                            // onFocus={this.props.adjustScreen}
                        />
                        <TextInput
                            style={[styles.dropdownInput, this.props.styles?.dropdownInput]}
                            placeholderTextColor={this.props.placeholderTextColor || "#ccc"}
                            placeholder={"Please enter your BFR(%)"}
                            value={this.state.inputTextBFR}
                            onChangeText={text => this.setState({inputTextBFR: text})}
                            keyboardType={"number-pad"}
                            // onFocus={this.props.adjustScreen}
                        />
                        <View style={{alignItems: "center", justifyContent: "center"}}>
                            <ApslButton
                                style={[styles.confirmButton, this.props.styles?.confirmButton]}
                                onPress={this.handleSubmit}
                                children={<Text key={"confirm"} style={{color: '#FF8c00'}}>Confirm</Text>}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    progress: state.progress,
    showPicker: state.progressModal.showPicker,
    showModal: state.progressModal.showModal,
    tmpURI: state.progressModal.tmpURI
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


export const PhotoModal = connect(mapStateToProps, mapActionToProps)(_PhotoModal);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 8
    },
    modalInnerContainer: {
        height: width * 0.66,
        width: width * 0.7,
        backgroundColor: 'rgba(165,15,180,0.29)',
        paddingTop: 20,
        padding: 10,
    },
    dropdownInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        backgroundColor: "rgba(255,140,0,0.1)",
        height: 50,
        color: '#eee'
    },
    dropdownContainer: {
        padding: width * 0.03,
        paddingTop: width * 0.02,
        flexDirection: 'row',
    },
    confirmButton: {
        height: 50,
        width: width * 0.30,
        borderColor: "#787",
        marginLeft: width * 0.165
    }
});