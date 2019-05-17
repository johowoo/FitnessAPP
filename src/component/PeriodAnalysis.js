import React, {Component} from "react";
import {View, Text, StyleSheet,} from "react-native";
import {AddDropdown} from "./AddDropdown";

export class PeriodAnalysis extends Component {
    handleConfirm = () => {
    }

    render() {
        return (
            <View>
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
                        placeholder="  Please enter an exercise"
                    />
                </View>
                <Text>
                </Text>
            </View>
        )
    }
}

const dropdownStyles = StyleSheet.create({
    dropdownInput: {
        backgroundColor: "rgba(255,140,0,0.1)",
    },
    dropdownMenu: {
        backgroundColor: "#EEE",
    },
});
