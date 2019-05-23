import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList
} from "react-native";
import {
    changeCurrentDisplayPicAction,
    deleteOnePicFromProgressAction,
    showDeleteConfirmModalInDisplayPictureAction
} from "../store/actions";
import {LinearGradient} from "expo";
import {connect} from "react-redux";
import {ReminderModal} from "../component/ReminderModal";
import LoadingUtil from "../utils/LoadingUtil";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

const {width, height} = Dimensions.get("window");

export class _CustomWorkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            reminderTitle: "",
            reminderContent: "",
            showReminder: false
        };
    }

    async onSwipeLeft(gestureState) {
    }

    async onSwipeRight(gestureState) {
    }

    //delete pic from progress
    handleConfirm = async () => {
        await LoadingUtil.showLoading();
        await this.props.deleteOnePicFromProgress({});
        await this.props.showDeleteConfirmModalInDisplayPicture({
            showReminder: false
        });
        await LoadingUtil.dismissLoading();
    };
    handleCloseReminder = (bool = false) => {
        this.props.showDeleteConfirmModalInDisplayPicture({
            showReminder: false
        })
    };

    render() {
        return (
            <LinearGradient colors={["#219dd5", "#51c0bb"]} style={{flex: 1}}>
                <ScrollView>
                    <View>
                        {this.props.customWorkoutSets.length > 0 ?
                            <FlatList
                                data={this.props.customWorkoutSets}
                                style={styles.container}
                                renderItem={props => this.renderItem({...props, navigation})}
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
                    {this.props.customWorkout.showReminder && <ReminderModal
                        // reminderTitle={this.props.displayPicture.reminderTitle}
                        // reminderContent={this.props.displayPicture.reminderContent}
                        // handleCloseReminder={this.handleCloseReminder}
                        // handleConfirm={this.handleConfirm}
                        // hideConfirmButton={this.props.displayPicture.hideConfirmButton}
                        />
                    }
                </ScrollView>
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    customWorkout: state.customWorkout,
    customWorkoutSets: state.customWorkout.customWorkoutSets
});

const mapActionToProps = dispatch => ({
    changeCurrentDisplayPic(data) {
        dispatch(changeCurrentDisplayPicAction(data));
    },
    showDeleteConfirmModalInDisplayPicture(data) {
        dispatch(showDeleteConfirmModalInDisplayPictureAction(data))
    },
    deleteOnePicFromProgress(data) {
        dispatch(deleteOnePicFromProgressAction(data));
    },
});

export const CustomWorkout = connect(
    mapStateToProps,
    mapActionToProps
)(_CustomWorkout);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 20,
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
});
