import React from 'react';
import {View, StyleSheet, Dimensions, Modal, Text, TextInput} from 'react-native';
import ApslButton from "apsl-react-native-button";

// export const TopBar = (props) => (
//     <View style={[styles.container, props.style]}>
//         {props.children}
//     </View>
// );

const {width, height} = Dimensions.get('window');


const marginTop = (height / width >= 18.5 / 9) ? 40 : 0;

export class PhotoModal extends React.Component {
    state = {inputTextWeight: "", inputTextBFR: ""}
    handlePress = () => {
        this.props.handleCloseModal(false)
    }

    render() {
        return (
            <Modal transparent={true}>
                {/*{this.props.children}*/}
                <View style={styles.container}>
                    <View style={styles.modalInnerContainer}>
                        <Text>Please enter your weight and BFR?</Text>
                        <TextInput
                            style={[styles.dropdownInput, this.props.styles?.dropdownInput]}
                            placeholderTextColor={this.props.placeholderTextColor || "#ccc"}
                            placeholder={"Please enter your weight"}
                            value={this.state.inputTextWeight}
                            onChangeText={text => this.setState({inputTextWeight: text})}
                            keyboardType={"number-pad"}
                            // onFocus={this.props.adjustScreen}
                        />
                        <TextInput
                            style={[styles.dropdownInput, this.props.styles?.dropdownInput]}
                            placeholderTextColor={this.props.placeholderTextColor || "#ccc"}
                            placeholder={"Please enter your BFR"}
                            value={this.state.inputTextBFR}
                            onChangeText={text => this.setState({inputTextBFR: text})}
                            keyboardType={"number-pad"}
                            // onFocus={this.props.adjustScreen}
                        />
                        <ApslButton
                            style={[styles.confirmButton, this.props.styles?.confirmButton]}
                            onPress={this.handlePress}
                            children={<Text key={"confirm"} style={{color: '#FF8c00'}}>Confirm</Text>}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8
    },

    modalInnerContainer: {
        height: 190,
        width: width * 0.7,
        backgroundColor: 'white',
        paddingTop: 20,
        padding: 10,
    },
    dropdownInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        // backgroundColor: "rgba(255,140,0,0.1)",
        height: 50,
    },
    dropdownContainer: {
        padding: width * 0.03,
        paddingTop: width * 0.02,
        flexDirection: 'row',
    },
    confirmButton: {
        height: 50,
        width: width * 0.30,
        borderColor: "#787"
    }
});