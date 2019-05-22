import {
    Button,
    Modal,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    Keyboard,
    ScrollView,
} from "react-native";
import React, {Component} from "react";
// import {AddDropdown} from "./AddDropdown";
import ModalDropdown from "react-native-modal-dropdown";

const {width, height} = Dimensions.get("window");

export class EditWeightReps extends Component {
    constructor(props) {
        super(props);
    }

    keyboardDidShowHandler = () => {
        this.setState({
            top: height * 0.15,
        });
    };

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            this.keyboardDidShowHandler.bind(this)
        );
    }

    state = {
        weightText: {},
        repsText: {},
        selectedSets: 0,
        top: height * 0.3
    };


    componentWillMount() {
        const weightTextTmp = {};
        const repsTextTmp = {};
        for (let i = 0; i < this.props.weightRepsDataArr.length; i++) {
            weightTextTmp[i] = this.props.weightRepsDataArr[i] ? this.props.weightRepsDataArr[i].weight : 0;
            repsTextTmp[i] = this.props.weightRepsDataArr[i] ? this.props.weightRepsDataArr[i].reps : 0;
        }
        this.setState({
            weightText: weightTextTmp,
            repsText: repsTextTmp
        });
    }

    render() {
        const newWeightRepsDataArr = JSON.parse(JSON.stringify(this.props.weightRepsDataArr));
        for (let i = newWeightRepsDataArr.length; i < this.props.sets; i++) {
            newWeightRepsDataArr.push({weight: 0, reps: 0});
        }
        // let {keyboardAvoidingViewKey} = this.state;
        handleSelect = (index, value) => {
            this.setState({selectedSets: value, selectedIndex: index});
        };
        return (
            <Modal
                visible={this.props.showEditWeightReps}
                transparent
                onRequestClose={() => this.props.handleCloseWeightModal("showEditWeightReps", false)}>
                <View style={{...styles.modalOuterContainer, top: this.state.top}}>

                    <View style={styles.modalInnerContainer}>
                        <Text
                            style={{
                                color: "#66666f",
                                fontSize: 16,
                                marginLeft: 10,
                                marginBottom: 15,
                            }}>
                            Please edit the sets , weight and rep numbers of this exercise:
                        </Text>

                        <View style={styles.dropdownModalContainerLine}>
                            <ModalDropdown
                                style={[styles.dropdownMenu]}
                                textStyle={[
                                    styles.dropdownMenuText,
                                ]}
                                dropdownStyle={[
                                    styles.dropdownList,
                                ]}
                                dropdownTextStyle={[
                                    styles.dropdownListText,
                                ]}
                                dropdownTextHighlightStyle={[
                                    styles.dropdownSelection,
                                ]}
                                options={[
                                    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "15", "20", "25", "30"
                                ]}
                                defaultValue={"4"}
                                onSelect={this.handleSelect}
                            /><Text style={{color: "#666", fontSize: 16}}>sets</Text>
                        </View>
                        <ScrollView style={{height: 160}} keyboardShouldPersistTaps={'always'}>
                            <Text
                                style={{
                                    color: "#66666f",
                                    fontSize: 14,
                                    marginLeft: 10,
                                    marginBottom: 15,
                                }}>
                                weight(0-100KG) reps(0-50)
                            </Text>
                            {newWeightRepsDataArr.map((item, index) => {
                                // if (item.weight && item.reps) {
                                return (
                                    <View style={styles.dataContainer}
                                        // ****key can not includes math.random(). or it will rerender many times
                                          key={index + item.weight + index}>
                                        <Text style={{
                                            alignItems: "center",
                                            marginTop: width * 0.02,
                                            marginLeft: width * 0.02,
                                            marginBottom: width * 0.02, height: 25,
                                            color: "#777"
                                        }}>{index + 1}:</Text>
                                        <TextInput
                                            style={{...styles.weightTextInput, flex: 0.5}}
                                            value={this.state.weightText[index]}
                                            placeholder="0-300 (KG)"
                                            defaultValue={item.weight || ""}
                                            onChangeText={//阻止主动重新渲染
                                                text => {
                                                    const weightText = JSON.parse(JSON.stringify(this.state.weightText));
                                                    weightText[index] = text;
                                                    this.setState({
                                                        weightText
                                                    })
                                                }
                                            }
                                        />
                                        <TextInput
                                            style={{...styles.weightTextInput, flex: 0.4}}
                                            value={this.state.repsText[index]}
                                            defaultValue={item.reps || ""}
                                            placeholder="0-50 reps"
                                            onChangeText={
                                                text => {
                                                    const repsText = JSON.parse(JSON.stringify(this.state.repsText));
                                                    repsText[index] = text;
                                                    this.setState({
                                                        repsText
                                                    })
                                                }
                                            }
                                        />
                                    </View>)
                                // }
                            })}
                        </ScrollView>
                        <View
                            style={{flexDirection: "row", justifyContent: "space-around"}}>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    style={styles.modalButton}
                                    color="#00cccc"
                                    title="Confirm"
                                    onPress={async () => {
                                        await this.props.editWeightRepsInWorkout({
                                            time: this.props.time,
                                            weightText: this.state.weightText,
                                            repsText: this.state.repsText,
                                            sets: this.state.selectedSets
                                        });
                                        await this.props.handleCloseWeightModal("showEditWeightReps", false);
                                    }}
                                />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    color="#00cccc"
                                    style={styles.modalButton}
                                    title="Cancel"
                                    onPress={() => {
                                        this.props.handleCloseWeightModal("showEditWeightReps", false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        position: "absolute",
        left: width * 0.148,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 8,
    },
    modalInnerContainer: {
        flex: 1,
        width: width * 0.7,
        backgroundColor: "white",
        paddingTop: 20,
        padding: 10,
        borderRadius: 8,
    },
    modalButtonContainer: {
        width: 0.25 * width,
    },
    weightTextInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        backgroundColor: "rgba(204,152,153,0.1)",
        height: 25,
        alignItems: 'center',
        color: "#666",
    },
    dataContainer: {
        flex: 1,
        flexDirection: "row",
    },
    dropdownContainer: {
        height: 110,
        padding: width * 0.03,
        paddingTop: width * 0.02,
        flexDirection: "row",
    },
    dropdownMenu: {
        width: width * 0.5,
        height: 30,
        borderRadius: 6,
        marginLeft: 10,
        marginRight: width * 0.02,
        borderWidth: 1,
        borderColor: "#FF8c00",
        // backgroundColor:'#EEE',
        justifyContent: "center",
    },
    dropdownMenuText: {
        marginLeft: 10,
        fontSize: 18,
        color: "#FF8c00",
    },
    dropdownList: {
        width: width * 0.5,
        // marginTop: 15,
    },
    dropdownListText: {
        fontSize: 18,
        marginLeft: 10,
        color: "#FF8c00",
    },
    dropdownSelection: {
        color: "#00cccc",
    },
    dropdownModalContainerLine: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    }
});
