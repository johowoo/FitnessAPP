import React, {Component} from "react";
import {View, Text, StyleSheet, Dimensions,} from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import {connect} from 'react-redux';
import ApslButton from "apsl-react-native-button";
import {formatYYYYMMDDFromDate} from "../utils/formatMonthandDay";
import {accumulateExercisesData} from "../utils/accumulateExercisesData";

const {width} = Dimensions.get("window");

const NumberOfDaysArr = [1, 7, 30, 180, 365];

class _PeriodAnalysis extends Component {
    state = {
        newAllExerciseList: {},
        selectedCategory: "",
        selectedIndex: 0,
        sets: 0,
        reps: 0,
        workouts: 0,
        volume: 0
    };

    componentDidMount() {
        this.state.list = JSON.parse(JSON.stringify(this.props.allExercisesList));
        const newAllExerciseList = {};
        for (let key in this.state.list) {
            if (this.state.list.hasOwnProperty(key)) {
                let tmpKey = key.replace(/-/g, '');
                newAllExerciseList[tmpKey] = this.state.list[key];
            }
        }
        this.setState({newAllExerciseList});
    }

    handleSelect = (index, value) => {
        this.setState({selectedCategory: value, selectedIndex: index});
    };
    handleSetData = (period) => {
        const todayDate = new Date();
        const todayDateYYYYMMDD = formatYYYYMMDDFromDate(todayDate);
        const {sets, reps, volume, workouts} = accumulateExercisesData({
            list: this.state.newAllExerciseList,
            todayNumber: parseInt(todayDateYYYYMMDD, 10),
            todayDate,
            period: period,
        });
        this.setState({
                sets, reps, volume, workouts
            }
        );
    };
    handleConfirmPressed = () => {
        // console.warn("enterConfirmPressed",this.state.selectedIndex);
        switch (parseInt(this.state.selectedIndex)) {
            case 0:
                this.handleSetData(1);
                break;
            case 1:
                this.handleSetData(7);
                break;
            case 2:
                this.handleSetData(30);
                break;
            case 3:
                this.handleSetData(180);
                break;
            case 4:
                this.handleSetData(365);
                break;
            default:
        }
    };

    render() {
        //convert date from 2019-05-19 to 20190519 and then convert to number
        // so that these dates can be compared easily
        return (
            <View style={styles.wholeContainer}>
                <View style={styles.dropdownContainer}>
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
                            "Today",
                            "7 Days",
                            "1 Month",
                            "6 Months",
                            "1 Year"
                        ]}
                        defaultValue={"Today"}
                        onSelect={this.handleSelect.bind(this)}
                    />
                    <Text style={styles.analysisTitle}>Analysis</Text>
                    <ApslButton
                        style={[styles.confirmButton]}
                        onPress={this.handleConfirmPressed.bind(this)}
                        children={
                            <Text key="confirm" style={{color: "#FF8c00", fontSize: 16}}>
                                Confirm
                            </Text>
                        }
                    />
                </View>
                <View style={{marginTop: -40}}>
                    <View style={styles.textLine}>
                        <Text style={styles.textTerm}>Sets:{this.state.sets}</Text>
                        <Text style={styles.textTerm}>Reps:{this.state.reps}</Text>
                    </View>
                    <View style={styles.textLine}>
                        <Text style={styles.textTerm}>Workouts:{this.state.workouts}</Text>
                        <Text style={styles.textTerm}>Volume:{this.state.volume} KG</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    markedDates: state.calendar.markedDates,
    allExercisesList: state.savedExerciseForEachDay.allExercisesList,
});

export const PeriodAnalysis = connect(mapStateToProps, null)(_PeriodAnalysis);

const styles = StyleSheet.create({
    wholeContainer: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        margin: 10
    },
    analysisTitle: {
        color: "#ddd",
        fontSize: 22,
        height: 30,
        // textAlign: "center",
        margin: 10,
        marginLeft: 0,
        // marginTop:5,
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
    dropdownContainer: {
        height: 110,
        padding: width * 0.03,
        paddingTop: width * 0.02,
        flexDirection: "row",
    },
    dropdownMenu: {
        width: width * 0.28,
        height: 40,
        borderRadius: 6,
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
        width: width * 0.28,
        marginTop: 15,
    },
    dropdownListText: {
        fontSize: 18,
        marginLeft: 10,
        color: "#FF8c00",
    },
    dropdownSelection: {
        color: "#00cccc",
    },
    confirmButton: {
        backgroundColor: "rgba(200,200,200,0.1)",
        marginLeft: 36,
        height: 40,
        width: width * 0.25,
        borderColor: "#FF8c00",
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
