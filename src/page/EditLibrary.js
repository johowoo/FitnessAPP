import React, {Component} from "react";
import {
    View, Text, StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity
} from "react-native";
import {
    addExerciseSetToCurrentWorkoutAction,
    updateEmptyAction,
    setEditLibraryExerciseModalVisibilityAction,
    setAddCategoryModalForLibraryVisibilityAction,
    addCategoryToEditLibraryAction,
    deleteCategoryFromEditLibraryAction
} from "../store/actions";
import {LinearGradient} from "expo";
import {connect} from "react-redux";
import {ReminderModal} from "../component/ReminderModal";
import LoadingUtil from "../utils/LoadingUtil";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import ApslButton from "apsl-react-native-button";
import Icon from "react-native-vector-icons/MaterialIcons";

import {IconFont} from '@expo/vector-icons';
// import {ExerciseModal} from "./ExerciseModal";
import {initialExerciseCategory} from "../initialExerciseSets";
import {AddCategoryModal} from "../component/AddCategoryModal";
import {createIcons} from "../utils/createIcons";


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
            toBeEditedExerciseSets: {},
            selectTobeDeleted: [],
            showDeleteButtons: false
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
        await this.props.deleteCategoryFromEditLibrary(this.state.selectedExerciseCategory);
        await this.setState({
            showReminder: false
        });
        await LoadingUtil.dismissLoading();
    };
    handleCloseReminder = (bool = false) => {
        this.setState({
            showReminder: false
        })
    };
    renderItem = ({item, index}) => {
        return (
            <View key={item + index}>
                {/*<LinearGradient colors={["#4a168c", "#880e4f"]} style={styles.container}>*/}
                <TouchableOpacity
                    // disabled={!this.props.customWorkoutAddable[item]}
                    style={{
                        ...styles.item,
                        // backgroundColor: "rgba(102,51,204,0.3)",
                        backgroundColor: "transparent",
                        borderColor: "#c69",
                        borderWidth: 1,
                        marginTop: 10
                    }}
                    onLongPress={async () => {
                        await this.setState({
                            showDeleteButton: !this.state.showDeleteButton
                        })
                    }}
                    onPress={async () => {
                        await this.setState({
                            selectedExerciseCategory: item,
                        });
                        await this.props.navigation.navigate("EditExercisesForLibrary", {
                            selectedExerciseCategory: item,
                            setEditLibraryExerciseModalVisibility: this.props.setEditLibraryExerciseModalVisibility
                        });
                    }}>
                    {/*<Image style={styles.image} source={{uri: props.item.photoURI}}/>*/}
                    <View style={styles.alignVerAndHorCenter}>
                        {createIcons(item, index, "#c69")}
                    </View>
                    <View style={styles.alignVerAndHorCenter}>
                        <Text style={{color: "#c69", fontSize: 30, fontFamily: "PattayaRegular"}}>{item}</Text>
                    </View>
                    {
                        this.state.showDeleteButton && <ApslButton
                            onPress={async () => {
                                await this.setState({
                                    selectedExerciseCategory: item,
                                });
                                await this.setState({
                                    showReminder: true,
                                    reminderTitle: "Delete",
                                    reminderContent: "Do you want to delete this category from library?"
                                });
                            }}
                            textStyle={{fontSize: 34, color: "#c69"}}
                            style={{position: "absolute", right: 0, top: -6, borderWidth: 0, borderRadius: 16}}
                            children={<Icon name="cancel" size={34} color={"#FF6600"} key="cancel"/>}
                        />
                    }
                </TouchableOpacity>
                {/*</LinearGradient>*/}
            </View>

        )
    };
    handleCloseAddCategoryModal = (bool = false) => {
        this.props.setAddCategoryModalForLibraryVisibility(bool);
    };
    handleAddCategoryModalConfirm = (newCategoryText) => {
        this.props.addCategoryToEditLibrary(newCategoryText);
    };

    render() {
        return (
            <LinearGradient colors={["#219dd5", "#51c0bb"]} style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.instructionTextContainer}>
                        <Text style={styles.instructionText}>click to edit exercises for specific category</Text>
                        <Text style={styles.instructionText}>press "+" to add new category</Text>
                        <Text style={styles.instructionText}>Hold to delete</Text>
                    </View>
                    <View>
                        {this.props.customWorkoutCategory.length > 0 ?
                            <FlatList
                                data={this.props.customWorkoutCategory}
                                style={styles.container}
                                renderItem={props => this.renderItem({...props})}
                                numColumns={2}
                                keyExtractor={(item, index) => item.toString()+index.toString()}
                                // onEndReached={this.loadData}
                                // ListFooterComponent={() => <FooterComponent/>}
                                onEndReachedThreshol={0.2}
                                // onRefresh={this.onRefresh}
                                // refreshing={this.state.refreshing}
                                extraData={this.state.showDeleteButton}
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
                        // hideConfirmButton={this.state.hideConfirmButton}
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
                <AddCategoryModal
                    showAddCategoryModal={this.props.showAddCategoryModal}
                    setAddCategoryModalForLibraryVisibility={this.props.setAddCategoryModalForLibraryVisibility}
                    handleCloseModal={this.handleCloseAddCategoryModal}
                    handleConfirm={this.handleAddCategoryModalConfirm}
                    customWorkoutCategory={this.props.customWorkoutCategory}
                />
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    customWorkout: state.customWorkout,
    customWorkoutCategory: state.customWorkout.customWorkoutCategory,
    customWorkoutSets: state.customWorkout.customWorkoutSets,
    customWorkoutAddable: state.customWorkout.customWorkoutAddable,
    showAddCategoryModal: state.editLibrary.showAddCategoryModal
});

const mapActionToProps = dispatch => ({
    addExerciseSetToCurrentWorkout(data) {
        dispatch(addExerciseSetToCurrentWorkoutAction(data));
    },
    updateEmpty(bool) {
        dispatch(updateEmptyAction(bool));
    },
    setEditLibraryExerciseModalVisibility(bool) {
        dispatch(setEditLibraryExerciseModalVisibilityAction(bool))
    },
    setAddCategoryModalForLibraryVisibility(bool) {
        dispatch(setAddCategoryModalForLibraryVisibilityAction(bool))
    },
    addCategoryToEditLibrary(bool) {
        dispatch(addCategoryToEditLibraryAction(bool))
    },
    deleteCategoryFromEditLibrary(data) {
        dispatch(deleteCategoryFromEditLibraryAction(data))
    },
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
        // borderColor: "#C69",
        // borderWidth: 1,
    },
    alignVerAndHorCenter: {
        alignItems: "center",
        justifyContent: 'center'
    },
    instructionText: {
        color: "#DDD",
        fontFamily: "PattayaRegular",
        fontSize: 20,
        marginLeft: 30,
    },
    instructionTextContainer: {
        marginTop: 20,
        marginBottom: 10
    }
});
