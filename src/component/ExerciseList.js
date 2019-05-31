import React, {PureComponent} from "react";
import {
    View,
    Text,
    SectionList,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Dimensions,
    Button,
    Modal,
    Alert,
    TextInput
} from "react-native";
import {connect} from "react-redux";
import {LinearGradient} from "expo";
import ApslButton from "apsl-react-native-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import ModalDropdown from "react-native-modal-dropdown";
import {TopBar} from "./TopBar";
import {SearchBar} from "./SearchBar";
import {fuzzySearch} from "../utils/fuzzySearch";
import {AddDropdown} from "./AddDropdown";
import {
    addExerciseAction,
    updateEmptyAction,
    addExerciseToSectionListAction,
    deleteExerciseFromSectionListAction
} from "../store/actions";
import {ReminderModal} from "./ReminderModal";
import InputScrollView from "react-native-input-scroll-view";

const {width, height} = Dimensions.get("window");
const isNotchScreen = height / width >= 18.5 / 9;
const ITEM_HEIGHT = 40;

export class _ExerciseList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isAddingExercise: false,
            foundExercises: [],
            addHintText: "Add more exercises",
            setsModalVisible: false,
            selectedSets: 4,
            selectedExercise: "",
            showReminderModal: false,
            hideConfirmButton: true,
            tobeDeletedItem: "",
            showSelectSets: true
        };
    };

    componentDidMount() {
        let cardioExercisesCopy = [];
        this.props.sectionExercises.forEach((item, index) => {
            if (item.category === 'Cardio') {
                cardioExercisesCopy = item.data;
            }
        });
        this.setState({
            cardioExercisesCopy,
            cardioMinutes: 0
        })
    }

    handleCloseReminderDuplicated = (bool) => {
        this.setState({
            showReminderModalDuplicated: bool
        })
    };
    handleCloseReminder = (bool) => {
        this.setState({
            showReminderModal: bool
        })
    };
    closeModal = () => {
        this.props.closeModal();
    };
    _renderItem = ({item}) => (
        <TouchableHighlight
            // onPress={() => this.handlePress.call(this, item)}
            onPress={() => {
                if (this.state.cardioExercisesCopy.includes(item)) {
                    this.setState({showSelectSets: false, selectedCardio: item})
                } else {
                    this.setState({showSelectSets: true})
                }
                this.setState({setsModalVisible: true, selectedExercise: item})
            }
            }>
            <View style={styles.listItem}>
                <View style={{flex: 0.9}}>
                    <Text style={styles.listText}>{item}</Text>
                </View>
                <View style={styles.deleteButtonView}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                showReminderModal: true,
                                reminderTitle: "Delete",
                                reminderContent: `Do you want to delete this exercise: ${item}?`,
                                hideConfirmButton: false,
                                tobeDeletedItem: item
                            });
                            // this.props.deleteExerciseFromSectionList(item)
                        }
                        }>
                        <Icon name="delete" size={24} color="#c69" key="delete"/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableHighlight>
    );
    _renderSectionHeader = ({section}) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.category}</Text>
        </View>
    );
    _renderListFooter = () => (
        <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size="large"
                animating
                color="#c69"
            />
            <Text>Loading...</Text>
        </View>
    );
    handleSearch = text => {
        this.setState({
            foundExercises: fuzzySearch(text, this.props.sectionExercises, "data"),
        });
    };
    handleBlur = () => {
        this.setState({
            foundExercises: [],
        });
    };
    onRefresh = () => {
    };
    handlePress = async () => {
        if (this.state.cardioMinutes && this.state.cardioMinutes !== "0") {
            const re = /^[0-9\b]+$/;
            let result = re.test(this.state.cardioMinutes);
            if (!result) {
                this.setState({
                    showReminderModalDuplicated: true,
                    reminderTitleDuplicated: "Not a number",
                    reminderContentDuplicated: "Please enter valid number (Minutes) ",
                    hideConfirmButtonDuplicated: true
                })
            }
            // submit
        }
        let isThisExerciseNotDuplicated = true;
        this.props.workoutSetsData && this.props.workoutSetsData.forEach(async item => {
            if (item.exercise === this.state.selectedExercise) {
                isThisExerciseNotDuplicated = false;
                // ReminderModal
                await this.setState({
                    showReminderModalDuplicated: true,
                    reminderTitleDuplicated: "Duplicated",
                    reminderContentDuplicated: "This exercise has been already added to today's workout",
                    hideConfirmButtonDuplicated: true,
                });
                // Alert.alert("error", "can not add same exercise twice");
            }
        });
        if (isThisExerciseNotDuplicated) {
            await this.props.updateEmpty && this.props.updateEmpty(false);
            if (this.state.cardioMinutes) {
                await this.props.addExercise({
                    exercise: this.state.selectedExercise,
                    sets: 0,
                    time: new Date().getTime(),
                    minutes: parseInt(this.state.cardioMinutes, 10)
                });
            } else {
                await this.props.addExercise({
                    exercise: this.state.selectedExercise,
                    sets: this.state.selectedSets,
                    time: new Date().getTime(),
                });
            }
            await this.setState({setsModalVisible: false, cardioMinutes: 0});
            await this.props.closeModal();
        }


    };

    handleConfirm = () => {
        this.props.deleteExerciseFromSectionList(this.state.tobeDeletedItem);
        this.setState({showReminderModal: false});
    };
    handelCancelDuplicated = async () => {
        await this.setState({setsModalVisible: false});

    };
    handlePressAddExercise = () => {
        if (!this.state.isAddingExercise) {
            this.setState({
                isAddingExercise: true,
                addHintText: "Done & Close",
            });
        } else {
            this.setState({
                isAddingExercise: false,
                addHintText: "Add more exercises",
            });
        }
    };

    changeDisplayExercises = async ({category, item}) => {
        if (!item) {
            this.setState({
                showReminderModal: true,
                reminderTitle: "Empty",
                reminderContent: "Please enter an exercise!",
                hideConfirmButton: true
            });
            return;
        }
        let errorFlag = false;
        this.props.sectionExercises.map((i, index) => {
            if (i.data.includes(item)) {
                errorFlag = true;
                this.setState({
                    showReminderModal: true,
                    reminderTitle: "Exist",
                    reminderContent: "Please enter another exercise!"
                });
            }
        });
        if (!errorFlag) {
            await this.props.addExerciseToSectionList({category, item});
            await this.forceUpdate();
        }

    };

    // loadData = () => {
    //     const newDisplayExercises = this.state.displayExercises.concat(
    //         this.props.extraSectionExercises
    //     );
    //     // timer =setTimeout(() => {
    //     this.setState({
    //         displayExercises: newDisplayExercises,
    //     });
    //     // }, 2000)
    // };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#eee",
                marginTop: height / width >= 18.5 / 9 ? 0 : -25,
                marginBottom: 10
            }}>
                <LinearGradient
                    // colors={["#00FFFF", "#00CCCC"]}
                    colors={["#1b98d9", "#219dd5"]}
                    // start={{x: 0.0, y: 0.5}}
                    // end={{x: 1.0, y: 0.5}}
                    // locations={[0.0, 1.0]}
                    style={styles.linearGradientContainer}>
                    {/*<LinearGradient colors={["#1b98d9", "#219dd5"]} style={{flex: 1}}>*/}
                    <TopBar style={{flex: 1, flexDirection: "row"}}>
                        <SearchBar
                            placeholder="search for exercises"
                            autoFocus
                            containerStyle={styles.searchBar}
                            style={styles.input}
                            onTextChange={this.handleSearch.bind(this)}
                            // onBlur={this.handleBlur.bind(this)}
                        />
                        <View style={{flex: 0.1}}>
                            <ApslButton
                                onPress={this.closeModal}
                                textStyle={styles.close}
                                style={styles.closeButton}
                                children={<Icon name="cancel" size={34} key="cancel" color={"#c69"}/>}
                            />
                        </View>
                    </TopBar>
                </LinearGradient>
                <LinearGradient colors={["#219dd5", "#51c0bb"]} style={{flex: 1}}>
                    <View>
                        <ApslButton
                            style={styles.addButton}
                            onPress={this.handlePressAddExercise}
                            children={
                                <Text style={styles.addText} key="addText">
                                    {this.state.addHintText}
                                </Text>
                            }
                        />
                    </View>
                    <Modal
                        visible={this.state.setsModalVisible}
                        transparent
                        onRequestClose={() => this.setState({setsModalVisible: false})}>
                        <View style={styles.modalOuterContainer}>
                            <View style={styles.modalInnerContainer}>
                                {
                                    this.state.showSelectSets ? (
                                        <View>
                                            <Text style={{color: "#66666f", fontSize: 16, marginLeft: 10}}>
                                                Please select the number of sets:
                                            </Text>
                                            <ModalDropdown
                                                style={styles.dropdownMenu}
                                                textStyle={styles.dropdownMenuText}
                                                dropdownStyle={styles.dropdownList}
                                                dropdownTextStyle={styles.dropdownListText}
                                                dropdownTextHighlightStyle={styles.dropdownSelection}
                                                options={[
                                                    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "15", "20", "25", "30"
                                                ]}
                                                defaultValue="4"
                                                onSelect={(index, value) => {
                                                    this.setState({selectedSets: value});
                                                }}
                                            />
                                        </View>) : (
                                        <View>
                                            <Text style={{
                                                color: "#66666f",
                                                fontSize: 16,
                                                marginLeft: 10,
                                                marginBottom: 10
                                            }}>
                                                Please input the duration for
                                                <Text style={{color: "#00cccc"}}> {this.state.selectedCardio}</Text>
                                                ?
                                            </Text>
                                            <TextInput
                                                placeholderTextColor={"#aaa"}
                                                style={styles.TextInput}
                                                value={this.state.cardioMinutes}
                                                placeholder="minutes"
                                                onChangeText={text => {
                                                    this.setState({cardioMinutes: text});
                                                }}
                                            />
                                        </View>
                                    )
                                }

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                    }}>
                                    <View style={styles.modalButtonContainer}>
                                        <Button
                                            style={styles.modalButton}
                                            color="#00cccc"
                                            title="Confirm"
                                            onPress={async () => {
                                                await this.handlePress.call(this);
                                            }}
                                        />
                                    </View>
                                    <View style={styles.modalButtonContainer}>
                                        <Button
                                            color="#00cccc"
                                            style={styles.modalButton}
                                            title="Cancel"
                                            onPress={() => {
                                                this.setState({setsModalVisible: false});
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        {this.state.showReminderModalDuplicated && <ReminderModal
                            showReminderModal={this.state.showReminderModalDuplicated}
                            handleCloseReminder={this.handleCloseReminderDuplicated}
                            reminderTitle={this.state.reminderTitleDuplicated}
                            reminderContent={this.state.reminderContentDuplicated}
                            hideConfirmButton={this.state.hideConfirmButtonDuplicated}
                            handelCancel={this.handelCancelDuplicated}
                        />}
                    </Modal>
                    <View>
                        {this.state.isAddingExercise ? (
                            <AddDropdown
                                handleConfirm={this.changeDisplayExercises.bind(this)}
                                styles={dropdownStyles}
                                options={[
                                    "Chest", "Shoulder", "Back", "Arms", "Legs", "Core", "Cardio",
                                ]}
                                placeholder="  Please enter an exercise"
                                placeholderTextColor={"#aaa"}
                            />
                        ) : null}
                    </View>
                    {this.state.foundExercises.length ? (
                        <TouchableHighlight onPress={this.handleBlur.bind(this)}>
                            <FlatList
                                data={this.state.foundExercises}
                                renderItem={data => this._renderItem(data)}
                                keyExtractor={(item, index) => item + index}
                                getItemLayout={(data, index) => (
                                    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                                )}
                            />
                        </TouchableHighlight>
                    ) : (
                        <View style={{marginTop: -10}}>
                            <SectionList
                                sections={this.props.sectionExercises}
                                renderItem={data => this._renderItem(data)}
                                renderSectionHeader={data => this._renderSectionHeader(data)}
                                ListFooterComponent={() => this._renderListFooter()}
                                // onEndReached={this.loadData}
                                keyExtractor={(item, index) => item + index}
                                extraData={this.props.sectionExercises}
                            />
                        </View>
                    )}
                    <TouchableHighlight style={{flex: 1}} onPress={this.handleBlur.bind(this)}>
                        <View style={{flex: 1}}>
                        </View>
                    </TouchableHighlight>
                    {this.state.showReminderModal && <ReminderModal
                        showReminderModal={this.state.showReminderModal}
                        handleCloseReminder={this.handleCloseReminder}
                        reminderTitle={this.state.reminderTitle}
                        reminderContent={this.state.reminderContent}
                        hideConfirmButton={this.state.hideConfirmButton}
                        handleConfirm={this.handleConfirm}
                    />}
                </LinearGradient>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    // currentWorkout: state.currentWorkout,
    isExerciseListEmpty: state.exerciseCompleted.isExerciseListEmpty,
    // sectionExercises: state.exercises.sectionExercises,
});
const mapActionToProps = dispatch => ({
        addExerciseToSectionList: data => dispatch(addExerciseToSectionListAction(data)),
        deleteExerciseFromSectionList: data => dispatch(deleteExerciseFromSectionListAction(data))
    })
;
export const ExerciseList = connect(
    mapStateToProps,
    mapActionToProps
)(_ExerciseList);
const styles = StyleSheet.create({
    linearGradientContainer: {
        height: isNotchScreen ? 100 : 65,
    },
    searchBar: {
        backgroundColor: "white",
        flex: 0.9,
        borderColor: "grey",
        borderWidth: 1,
        height: 35,
        padding: 5,
        justifyContent: "center",
        borderRadius: 20,
    },
    input: {
        color: "black",
        fontSize: 20,
    },
    close: {
        fontSize: 34,
    },
    closeButton: {
        borderWidth: 0,
    },
    row: {
        borderWidth: 1,
        borderColor: "grey",
    },
    rowName: {
        fontSize: 30,
    },
    sectionHeader: {
        // backgroundColor: "#c69",
        borderColor: "#ccc",
        borderWidth: 1.5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderRadius: 2,
        justifyContent: "center",
        height: 45,
        marginTop: 15
    },
    sectionHeaderText: {
        fontSize: 28,
        marginLeft: 20,
        color: "#eee",
        fontFamily: "PattayaRegular"
    },
    listItem: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: "#aaa",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    listText: {
        fontSize: 20,
        marginLeft: 24,
        color: "#ddd",
        // fontFamily: "PattayaRegular"
    },
    indicatorContainer: {
        alignItems: "center",
    },
    indicator: {
        color: "red",
        margin: 10,
    },
    addButton: {
        borderColor: "transparent",
        height: 40,
        marginBottom: 5,
    },
    addText: {
        color: "#cc6699",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 5,
    },
    modalOuterContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: 8,
    },
    modalInnerContainer: {
        height: 190,
        width: width * 0.7,
        backgroundColor: "white",
        paddingTop: 20,
        padding: 10,
    },
    modalButtonContainer: {
        width: 0.25 * width,
    },
    modalButton: {
        backgroundColor: "#00cccc",
    },
    dropdownMenu: {
        width: width * 0.58,
        height: 45,
        borderRadius: 6,
        margin: 10,
        marginRight: width * 0.02,
        marginTop: 15,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#cc6699",
        justifyContent: "center",
    },
    dropdownMenuText: {
        color: "#00cccc",
        fontSize: 20,
        paddingLeft: 10,
    },
    dropdownList: {
        width: width * 0.58,
    },
    dropdownListText: {
        color: "#00cccc",
        fontSize: 20,
        paddingLeft: 10,
    },
    dropdownSelection: {
        backgroundColor: "#cc6699",
    },
    quick: {
        backgroundColor: "red",
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 10,
        width: 200,
    },
    quickContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 15,
        marginBottom: 15,
    },
    deleteButtonView:
        {
            flex: 0.1, height: 60,
            paddingLeft: 40, paddingRight: 10, justifyContent: "center"
        },
    TextInput: {
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        backgroundColor: "#ddd",
        height: 50,
        color: "#00ffcc",
    },
});
const dropdownStyles = StyleSheet.create({
    dropdownInput: {
        backgroundColor: "rgba(255,140,0,0.1)",
        color: "#eee"
    },
    dropdownMenu: {
        backgroundColor: "#EEE",
    },
});
