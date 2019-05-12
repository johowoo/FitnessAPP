import {Button, Modal, Text, View, StyleSheet, Dimensions, TextInput} from "react-native";
// import ModalDropdown from "react-native-modal-dropdown";
import React, {Component} from 'react';

const {width, height} = Dimensions.get('window');


export class AddWeightToExercise extends Component {
    state = {
        weightText: 0,
        repsText: 0
    }

    render() {
        return (
            <Modal
                visible={this.props.showAddWeightModal}
                transparent={true}
                onRequestClose={() => this.props.handleCloseWeightModal(false)}
            >
                <View
                    style={styles.modalOuterContainer}>
                    <View style={styles.modalInnerContainer}>
                        <Text style={{color: '#66666f', fontSize: 16, marginLeft: 10, marginBottom: 15}}
                        >Please input the weight and reps of this exercise:
                        </Text>
                        <TextInput style={styles.weightTextInput}
                                   value={this.state.weightText}
                                   placeholder={"Weight: 0-300 (KG)"}
                                   onChange={text => {
                                       this.setState({weightText: text})
                                   }}/>
                        <TextInput style={styles.weightTextInput}
                                   value={this.state.repsText}
                                   placeholder={"Reps: 0-50"}
                                   onChange={text => {
                                       this.setState({weightText: text})
                                   }}/>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={styles.modalButtonContainer}>
                                <Button style={styles.modalButton}
                                        color={"#00cccc"}
                                        title='Confirm' onPress={async () => {
                                    this.props.handleCloseWeightModal(false)
                                    // if (Platform.OS === 'android') {
                                    //     this.props.closeModal();
                                    // }
                                }}/>
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    color={"#00cccc"}
                                    style={styles.modalButton}
                                    title='Cancel' onPress={() => {
                                    this.props.handleCloseWeightModal(false)
                                }}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )

    }

}

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 8
    },
    modalInnerContainer: {
        height: 250,
        width: width * 0.7,
        backgroundColor: 'white',
        paddingTop: 20,
        padding: 10,
        borderRadius: 8
    },
    modalButtonContainer: {
        width: 0.25 * width
    },
    weightTextInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        backgroundColor: "rgba(255,140,0,0.1)",
        height: 50,
        color: '#666'
    },
})