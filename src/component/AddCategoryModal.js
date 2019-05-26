import React, {Component} from "react";
import {View, Text, Modal, Button, TextInput, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window");

export class AddCategoryModal extends Component {
    state = {top: height * 0.3};

    render() {
        return (
            <Modal
                transparent={true}
                style={{flex: 1}}
                visible={this.props.showAddCategoryModal}>
                <View style={{...styles.modalOuterContainer, top: this.state.top}}>
                    <View style={styles.modalInnerContainer}>
                        <Text
                            style={{
                                color: "#00ffcc",
                                fontSize: 16,
                                marginLeft: 10,
                                marginBottom: 15,
                            }}>
                            Please input the name of the category that you want to add:
                        </Text>
                        <TextInput
                            placeholderTextColor={"#cc6699"}
                            style={styles.TextInput}
                            value={this.state.categoryText}
                            placeholder="Category name"
                            onChangeText={text => {
                                this.setState({categoryText: text});
                            }}
                        />
                        <View
                            style={{flexDirection: "row", justifyContent: "space-around"}}>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    style={styles.modalButton}
                                    color="#00ffcc"
                                    title="Confirm"
                                    onPress={async () => {
                                        await this.props.handleAddCategoryModalConfirm(this.state.categoryText);
                                        // await this.props.addWeightRepsToExercise({
                                        //     time: this.props.time,
                                        //     weight: this.state.categoryText,
                                        //     reps: this.state.repsText,
                                        // });
                                        await this.props.handleCloseModal(false);
                                    }}
                                />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    color="#00ffcc"
                                    style={styles.modalButton}
                                    title="Cancel"
                                    onPress={() => {
                                        this.props.handleCloseModal(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <Button title={"close"} onPress={() => this.props.setAddCategoryModalForLibraryVisibility(false)}/>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        position: "absolute",
        left: width * 0.148,
        // top: this.state.top,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 8,
    },
    modalInnerContainer: {
        height: 200,
        width: width * 0.7,
        backgroundColor: "rgba(102,51,204,0.9)",
        paddingTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    modalButtonContainer: {
        width: 0.25 * width,
    },
    TextInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        backgroundColor: "rgba(255,140,0,0.1)",
        height: 50,
        color: "#00ffcc",
    },
});

