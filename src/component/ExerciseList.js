import React, {PureComponent} from "react";
import {
    View,
    Text,
    SectionList,
    TouchableHighlight,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Dimensions,
    Button,
    Modal,
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
import {addExerciseAction, updateEmptyAction, addExerciseToSectionListAction} from "../store/actions";
import {ReminderModal} from "./ReminderModal";

const {width, height} = Dimensions.get("window");
const isNotchScreen = height / width >= 18.5 / 9;
const ITEM_HEIGHT = 40;

export class _ExerciseList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isAddingExercise: false,
            foundExercises: [],
            addHintText: "add more exercises",
            setsModalVisible: false,
            selectedSets: 4,
            selectedExercise: "",
            showReminderModal: false,
        };
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
                this.setState({setsModalVisible: true, selectedExercise: item})
            }
            }>
            <View style={styles.listItem}>
                <Text style={styles.listText}>{item}</Text>
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
    handlePress = () => {
        this.props.updateEmpty(false);
        this.props.addExercise({
            exercise: this.state.selectedExercise,
            sets: this.state.selectedSets,
            time: new Date().getTime(),
        });
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
                addHintText: "add more exercises",
            });
        }
    };

    changeDisplayExercises = async ({category, item}) => {
        if (!item) {
            this.setState({
                showReminderModal: true,
                reminderTitle: "Empty",
                reminderContent: "Please enter an exercise!"
            });
            return;
        }
        let errorFlag = false;
        await this.props.sectionExercises.map((i, index) => {
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
        console.warn(this.props.sectionExercises);
        return (
            <View style={{flex: 1, backgroundColor: "#eee"}}>
                <LinearGradient
                    colors={["#00FFFF", "#00CCCC"]}
                    start={{x: 0.0, y: 0.5}}
                    end={{x: 1.0, y: 0.5}}
                    locations={[0.0, 1.0]}
                    style={styles.linearGradientContainer}>
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
                                children={<Icon name="cancel" size={34} key="cancel"/>}
                            />
                        </View>
                    </TopBar>
                </LinearGradient>
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
                            <Text style={{color: "#66666f", fontSize: 16, marginLeft: 10}}>
                                Please select the number of sets:
                            </Text>
                            <ModalDropdown
                                style={styles.dropdownMenu}
                                textStyle={styles.dropdownMenuText}
                                dropdownStyle={styles.dropdownList}
                                dropdownTextStyle={styles.dropdownListText}
                                dropdownTextHighlightStyle={styles.dropdownSelection}
                                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                                defaultValue="4"
                                onSelect={(index, value) => {
                                    this.setState({selectedSets: value});
                                }}
                            />
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
                                            await this.setState({setsModalVisible: false});
                                            await this.props.closeModal();
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
                </Modal>
                <View>
                    {this.state.isAddingExercise ? (
                        <AddDropdown
                            handleConfirm={this.changeDisplayExercises.bind(this)}
                            styles={dropdownStyles}
                            options={[
                                "Chest",
                                "Shoulder",
                                "Back",
                                "Arms",
                                "Legs",
                                "Core",
                                "Cardio",
                            ]}
                            placeholder="  Please enter an exercise"
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
                    <SectionList
                        sections={this.props.sectionExercises}
                        renderItem={data => this._renderItem(data)}
                        renderSectionHeader={data => this._renderSectionHeader(data)}
                        ListFooterComponent={() => this._renderListFooter()}
                        // onEndReached={this.loadData}
                        keyExtractor={(item, index) => item + index}
                        extraData={this.props.sectionExercises}
                    />
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
                    hideConfirmButton={true}
                />}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    isExerciseListEmpty: state.exerciseCompleted.isExerciseListEmpty,
    sectionExercises: state.exercises.sectionExercises
});
const mapActionToProps = dispatch => ({
        addExercise: exercise => dispatch(addExerciseAction(exercise)),
        updateEmpty: bool => dispatch(updateEmptyAction(bool)),
        addExerciseToSectionList: data => dispatch(addExerciseToSectionListAction(data))
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
        backgroundColor: "#00CCCC",
        justifyContent: "center",
        height: 45,
    },
    sectionHeaderText: {
        fontSize: 24,
        marginLeft: 20,
    },
    listItem: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#aaa",
        height: 60,
        justifyContent: "center",
    },
    listText: {
        fontSize: 20,
        marginLeft: 24,
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
        color: "#FF8c00",
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
        borderColor: "#FF8c00",
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
        backgroundColor: "#FF8c00",
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
});
const dropdownStyles = StyleSheet.create({
    dropdownInput: {
        backgroundColor: "rgba(255,140,0,0.1)",
    },
    dropdownMenu: {
        backgroundColor: "#EEE",
    },
});
