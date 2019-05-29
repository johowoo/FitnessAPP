import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {LineChart} from "react-native-chart-kit";
import Icon from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {AddDropdown} from "../component/AddDropdown";
import {PeriodAnalysis} from "../component/PeriodAnalysis";
import {updateBfrAction, updateWeightAction} from "../store/actions";
import LoadingUtil from '../utils/LoadingUtil';

import {TopBar} from "../component";

const {width, height} = Dimensions.get("window");
//automatic generated ->change
const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const labels1 = [
    {1: "Jan"},
    {2: "Feb"},
    {3: "Mar"},
    {4: "Apr"},
    {5: "May"},
    {6: "Jun"},
    {7: "Jul"},
    {8: "Aug"},
    {9: "Sep"},
    {10: "Oct"},
    {11: "Nov"},
    {12: "Dec"},
];

const chartConfig = {
    backgroundGradientFrom: "#1b98d9",
    backgroundGradientTo: "#666",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16,
    },
};

export class _Health extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddingWeight: false,
            isAddingBFR: false,
        };
    }

    handleAddDropdown = async (type) => {
        await LoadingUtil.showLoading();
        await this.setState({
            [type]: !this.state[type],
        });
        await LoadingUtil.dismissLoading();
    };

    handleAddWeightConfirm = async data => {
        await LoadingUtil.showLoading();
        await this.props.updateWeightData(data);
        await this.forceUpdate();
        await LoadingUtil.dismissLoading();
    };

    handleAddBFRConfirm = async data => {
        await LoadingUtil.showLoading();
        this.props.updateBfrData(data);
        this.forceUpdate();
        await LoadingUtil.dismissLoading();
    };

    scrollToEnd = () => {
        this.forceUpdate();
        this.scrollView.scrollToEnd();
    };

    render() {
        // console.warn(this.props.weightData);
        return (
            <View>
                <TopBar style={styles.topBar}>
                    {this.props.fontLoaded ? (
                        <Text style={styles.textBar}>Statistics</Text>
                    ) : null}
                </TopBar>
                {/*<PeriodAnalysis/>*/}
                <ScrollView ref={ref => (this.scrollView = ref)}>
                    <View style={{marginTop: 20}}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}>
                            <Text style={styles.chartTitle}>Weight</Text>
                            <TouchableOpacity
                                style={{
                                    height: 25,
                                    width: 25,
                                    backgroundColor: "transparent",
                                }}
                                onPress={() => this.handleAddDropdown("isAddingWeight")}
                                style={styles.plusButton}
                                textStyle={styles.plus}
                                title="+">
                                <Icon
                                    name={this.state.isAddingWeight ? "remove" : "add"}
                                    size={25}
                                    color="white"
                                    key="add"
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {this.state.isAddingWeight && (
                                <View>
                                    <AddDropdown
                                        styles={dropdownStyles}
                                        placeholderTextColor="#bbb"
                                        placeholder="  Please enter the weight number (KG)"
                                        keyboardType="numeric"
                                        options={labels}
                                        handleConfirm={this.handleAddWeightConfirm.bind(this)}
                                    />
                                </View>
                            )}
                        </View>
                        <LineChart
                            data={{
                                labels,
                                datasets: [
                                    {
                                        data: this.props.weightData,
                                    },
                                ],
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>

                    <View style={{marginTop: 10}}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                            }}>
                            <Text style={styles.chartTitle}>Body Fat Rate</Text>
                            <TouchableOpacity
                                style={{
                                    height: 25,
                                    width: 25,
                                    backgroundColor: "transparent",
                                }}
                                onPress={() => {
                                    this.handleAddDropdown("isAddingBFR");
                                }}
                                style={styles.plusButton}
                                textStyle={styles.plus}>
                                <Icon
                                    name={this.state.isAddingBFR ? "remove" : "add"}
                                    size={25}
                                    color="white"
                                    key="add"
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            {this.state.isAddingBFR && (
                                <View>
                                    <AddDropdown
                                        styles={dropdownStyles}
                                        placeholderTextColor="#bbb"
                                        placeholder={"  Please enter the Body Fat Rate (<0.50)"}
                                        keyboardType="numeric"
                                        options={labels}
                                        handleConfirm={this.handleAddBFRConfirm.bind(this)}
                                        adjustScreen={this.scrollToEnd.bind(this)}
                                    />
                                </View>
                            )}
                        </View>
                        <LineChart
                            data={{
                                labels,
                                datasets: [
                                    {
                                        data: this.props.bfrData,
                                    },
                                ],
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            chartConfig={Object.assign(chartConfig, {
                                backgroundGradientFrom: "#666",
                                backgroundGradientTo: "#1b98d9",
                            })}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>
                    <View style={{height: height * 0.53}}/>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    bfrData: state.health.bfrData,
    weightData: state.health.weightData,
});
const mapActionToProps = dispatch => ({
    updateWeightData(data) {
        dispatch(updateWeightAction(data));
    },
    updateBfrData(data) {
        dispatch(updateBfrAction(data));
    },
});

export const Statistics = connect(
    mapStateToProps,
    mapActionToProps
)(_Health);
const styles = StyleSheet.create({
    topBar: {
        backgroundColor: "transparent",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#b0b0b0",
    },
    textBar: {
        textAlign: "center",
        color: "#ddd",
        fontSize: 25,
        fontFamily: "PattayaRegular",
    },
    chartTitle: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
    },
});

const dropdownStyles = StyleSheet.create({
    container: {
        height: 80,
        marginBottom: 10,
        marginTop: 10,
    },
    dropdownInput: {
        backgroundColor: "transparent",
        height: 40,
        borderColor: "rgba(255,140,0,0.8)",
        borderWidth: 1,
        borderRadius: 10,
        color: "#ddd",
    },
    dropdownContainer: {
        padding: width * 0.03,
        paddingTop: width * 0.02,
    },
    dropdownMenu: {
        height: 35,
        borderColor: "rgba(255,140,0,0.8)",
    },
    dropdownMenuText: {
        fontSize: 18,
        color: "#FF8c00",
    },
    dropdownList: {
        marginTop: 10,
    },
    dropdownListText: {
        fontSize: 18,
        color: "#FF8c00",
    },
    dropdownSelection: {
        color: "#00cccc",
    },
    confirmButton: {
        height: 35,
        borderColor: "rgba(255,140,0,0.8)",
    },
});
