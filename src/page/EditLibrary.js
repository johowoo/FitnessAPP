import React, {Component} from "react";
import {
    View, Text, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity
} from "react-native";
import {
    addExerciseSetToCustomWorkoutAction, updateEmptyAction
} from "../store/actions";
import {LinearGradient} from "expo";
import {connect} from "react-redux";
import {ReminderModal} from "../component/ReminderModal";
import LoadingUtil from "../utils/LoadingUtil";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import ApslButton from "apsl-react-native-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import {IconFont} from '@expo/vector-icons';
import {ExerciseModal} from "./ExerciseModal";

const {width, height} = Dimensions.get("window");

export class _EditLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            reminderTitle: "",
            reminderContent: "",
            showExerciseModal: false,
            showReminder: false,
            toBeEditedExerciseSets: {}
        };
    }

    // async onSwipeLeft(gestureState) {
    // }
    //
    // async onSwipeRight(gestureState) {
    // }
    //delete pic from progress
    handleConfirm = async () => {
        await LoadingUtil.showLoading();
        await this.props.updateEmpty(false);
        //add exercises to currentworkout
        await this.props.addExerciseSetToCustomWorkout(this.state.selectedExerciseCategory);
        await this.setState({
            showReminder: false
        });
        // console.warn("selectedCategory", this.state.selectedExerciseCategory);
        await this.props.navigation.navigate("CurrentWorkout");
        await LoadingUtil.dismissLoading();
    };
    handleCloseReminder = (bool = false) => {
        this.setState({
            showReminder: false
        })
    };
    renderItem = ({item, index}) => {
        return (<View
            style={{
                ...styles.item,
                // backgroundColor: this.props.customWorkoutAddable[item] ? "transparent" : "#ccc"
            }}>
            <TouchableOpacity
                // disabled={!this.props.customWorkoutAddable[item]}
                style={{marginTop: 10,}}
                onPress={async () => {
                    await this.setState({
                        selectedExerciseCategory: item,
                    });
                    await this.props.navigation.setParams({header: null});
                    await this.props.navigation.navigate("EditExercisesForLibrary");
                    // console.warn("selectedSets", this.props.customWorkoutSets[this.state.selectedExerciseCategory]);
                    // await this.setState({
                    //     toBeEditedExerciseSets: this.props.customWorkoutSets[this.state.selectedExerciseCategory]
                    // });
                    // await this.setState({showExerciseModal: true});
                }}>
                {/*<Image style={styles.image} source={{uri: props.item.photoURI}}/>*/}
                <View style={styles.alignVerAndHorCenter}>
                    <IconFont name={item} size={60} color={"#fff"}/>
                </View>
                <View style={styles.alignVerAndHorCenter}>
                    <Text style={{color: "#eee", fontSize: 30, fontFamily: "PattayaRegular"}}>{item}</Text>
                </View>
                {this.state.showDeleteButton && this.state.selectTobeDeleted.includes(props.item.date) &&
                <ApslButton
                    // onPress={this.closeModal}
                    textStyle={{fontSize: 34, color: "#c69"}}
                    style={{position: "absolute", right: 0, top: -6, borderWidth: 0, borderRadius: 16}}
                    children={<Icon name="check-circle" size={34} color={"#c69"} key="cancel"/>}
                />}
            </TouchableOpacity>
        </View>)
    };

    render() {
        // console.warn("customWorkout", this.props.customWorkout);
        return (
            <LinearGradient colors={["#219dd5", "#51c0bb"]} style={{flex: 1}}>
                <ScrollView>
                    <View>
                        {this.props.customWorkoutCategory.length > 0 ?
                            <FlatList
                                data={this.props.customWorkoutCategory}
                                style={styles.container}
                                renderItem={props => this.renderItem({...props})}
                                numColumns={2}
                                keyExtractor={(item, index) => index.toString()}
                                // onEndReached={this.loadData}
                                // ListFooterComponent={() => <FooterComponent/>}
                                onEndReachedThreshol={0.2}
                                // onRefresh={this.onRefresh}
                                // refreshing={this.state.refreshing}
                                // extraData={}
                            /> : (
                                <View style={{
                                    flex: 1,
                                    height: height * 0.66,
                                    textAlign: "center",
                                    justifyContent: "center",
                                    // backgroundColor: "#ccc"
                                }}>
                                    <Text style={{textAlign: 'center'}}>
                                        <IconFontAwesome name="camera-retro" size={110} color="#c69"
                                                         key="delete"/>
                                    </Text>
                                    <Text style={{
                                        color: "#eee",
                                        fontSize: 24,
                                        fontFamily: "PattayaRegular",
                                        margin: 20,
                                        marginLeft: 40
                                    }}>Please Click the + button to add your first progress photo </Text>
                                </View>)
                        }
                    </View>
                    {this.state.showReminder && <ReminderModal
                        showReminder={this.state.showReminder}
                        reminderTitle={this.state.reminderTitle}
                        reminderContent={this.state.reminderContent}
                        handleCloseReminder={this.handleCloseReminder}
                        handleConfirm={this.handleConfirm}
                        hideConfirmButton={this.state.hideConfirmButton}
                    />
                    }
                </ScrollView>
                <View>
                    {/*<ExerciseModal*/}
                    {/*    sectionExercises={this.state.toBeEditedExerciseSets}*/}
                    {/*    visible={this.state.showExerciseModal}*/}
                    {/*    closeModal={() => this.setModalVisibility(false)}*/}
                    {/*/>*/}
                </View>
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    customWorkout: state.customWorkout,
    customWorkoutCategory: state.customWorkout.customWorkoutCategory,
    customWorkoutSets: state.customWorkout.customWorkoutSets,
    customWorkoutAddable: state.customWorkout.customWorkoutAddable
});

const mapActionToProps = dispatch => ({
    addExerciseSetToCustomWorkout(data) {
        dispatch(addExerciseSetToCustomWorkoutAction(data));
    },
    updateEmpty(bool) {
        dispatch(updateEmptyAction(bool));
    }
});

export const EditLibrary = connect(
    mapStateToProps,
    mapActionToProps
)(_EditLibrary);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginVertical: 20,
    },
    topBar: {
        backgroundColor: "transparent",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#b0b0b0",
    },
    image: {
        width: width * 0.85,
        height: height * 0.6,
    },
    imageContainer: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    textContainer: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    textInnerContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: width * 0.8,
        margin: 5,
        backgroundColor: "rgba(0,100,100,0.2)",
    },
    text: {
        color: "#eee",
        fontFamily: "PattayaRegular",
        fontSize: 16,
    },
    item: {
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.4,
        height: width * 0.4,
        margin: width * 0.05,
        borderRadius: 10,
        borderColor: "#eee",
        borderWidth: 1,
    },
    alignVerAndHorCenter: {
        alignItems: "center",
        justifyContent: 'center'
    }
});
