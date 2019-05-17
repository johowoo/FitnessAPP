import React, {Component} from "react";
import {View, Text, StyleSheet, Dimensions,} from "react-native";
import {AddDropdown} from "./AddDropdown";
import ModalDropdown from "react-native-modal-dropdown";

const {width} = Dimensions.get("window");

export class PeriodAnalysis extends Component {
    state = {
        selectedCategory: "7days",
    };

    handleConfirm = () => {

    };

    handleSelect = (index, value) => {
        this.setState({selectedCategory: value});
    };

    render() {
        return (
            <View style={styles.wholeContainer}>
                <Text style={styles.analysisTitle}>
                    {`${this.state.selectedCategory} analysis`}
                </Text>
                <View>
                    <AddDropdown
                        handleConfirm={this.handleConfirm.bind(this)}
                        styles={dropdownStyles}
                        options={[
                            "7 days",
                            "Week",
                            "month",
                            "6 month",
                            "year"
                        ]}
                        hideTextInput={true}
                        handleSelect={this.handleSelect.bind(this)}
                    />
                </View>
                <View style={{marginTop: -40}}>
                    <View style={styles.textLine}>
                        <Text style={styles.textTerm}>Sets:{}</Text>
                        <Text style={styles.textTerm}>Reps:{}</Text>
                    </View>
                    <View style={styles.textLine}>
                        <Text style={styles.textTerm}>Workouts:{}</Text>
                        <Text style={styles.textTerm}>Volume:{}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wholeContainer: {
        borderRadius:20,
        borderWidth: 1,
        borderColor:"#ccc",
        margin:10
    },
    analysisTitle: {
        color: "#ddd",
        fontSize: 22,
        height: 40,
        // textAlign: "center",
        margin: 20,
        marginBottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    textLine: {
        flexDirection: "row",
        height: 30
    },
    textTerm: {
        fontSize: 18,
        color: "#ddd",
        width: width * 0.4,
        marginLeft: width * 0.1
    },
});

const dropdownStyles = StyleSheet.create({
    dropdownInput: {
        backgroundColor: "rgba(255,140,0,0.1)",
    },
    dropdownMenu: {
        backgroundColor: "#EEE",
    },
});
