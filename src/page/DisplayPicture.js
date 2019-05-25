import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
} from "react-native";
import {
    changeCurrentDisplayPicAction, deleteOnePicFromProgressAction, showDeleteConfirmModalInDisplayPictureAction
} from "../store/actions";
import {LinearGradient} from "expo";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {connect} from "react-redux";
import {ReminderModal} from "../component/ReminderModal";
import LoadingUtil from "../utils/LoadingUtil";

const {width, height} = Dimensions.get("window");

export class _DisplayPicture extends Component {
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
        // console.warn("curentPicIndex", this.props.currentPic.index);
        // console.warn("total length", this.props.progressPics.length - 1);
        if (this.props.currentPic.index < this.props.progressPics.length - 1) {
            await this.setState({
                // photoURI: this.props.progressPics[this.props.currentPic.index + 1].photoURI,
                // weight: this.props.progressPics[this.props.currentPic.index + 1].weight,
                // BFR: this.props.progressPics[this.props.currentPic.index + 1].BFR,
                date: this.props.progressPics[this.props.currentPic.index + 1].date,
                index: this.state.index + 1,
            });
            await this.props.changeCurrentDisplayPic({index: this.state.index, date: this.state.date})
        } else {

            this.props.showDeleteConfirmModalInDisplayPicture({
                showReminder: true,
                reminderTitle: "Last pic",
                reminderContent: "You have already reached the last pic",
                hideConfirmButton: true
            });
            // this.setState({
            //     showReminder: true,
            //     reminderTitle: "Last pic",
            //     reminderContent: "You have already reached the last pic"
            // })
        }
    }

    async onSwipeRight(gestureState) {
        if (this.props.currentPic.index > 0) {
            await this.setState({
                // photoURI: this.props.progressPics[this.props.currentPic.index - 1].photoURI,
                // weight: this.props.progressPics[this.props.currentPic.index - 1].weight,
                // BFR: this.props.progressPics[this.props.currentPic.index - 1].BFR,
                date: this.props.progressPics[this.props.currentPic.index - 1].date,
                index: this.state.index - 1,
            });
            await this.props.changeCurrentDisplayPic({index: this.state.index, date: this.state.date})
        } else {
            this.props.showDeleteConfirmModalInDisplayPicture({
                showReminder: true,
                reminderTitle: "First pic",
                reminderContent: "You have already reached the first pic",
                hideConfirmButton: true
            });
            // this.setState({
            //     showReminder: true,
            //     reminderTitle: "First pic",
            //     reminderContent: "You have already reached the first pic"
            // })
        }
    }

    componentWillMount() {
        const navProps = this.props?.navigation?.state?.params;
        this.setState({
            values: navProps,
            index: navProps.index,
            photoURI: navProps.photoURI,
            weight: navProps.weight,
            BFR: navProps.BFR
        })
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
        // this.setState({
        //     showReminder: bool
        // })
    };

    render() {
        // const this.state.values = this.props?.navigation?.state?.params;
        if (this.props.progressPics.length === 0) {
            this.props?.navigation.goBack();
            return <View><Text>NULL</Text></View>;
        }
        return (
            <LinearGradient colors={["#219dd5", "#51c0bb"]} style={{flex: 1}}>
                <GestureRecognizer onSwipeLeft={(state) => this.onSwipeLeft(state)}
                                   onSwipeRight={(state) => this.onSwipeRight(state)}>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: this.props.currentPic.photoURI}}/>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.textInnerContainer}>
                                <Text style={styles.text}>
                                    Weight:
                                    {this.props.currentPic.weight} <Text style={{fontSize: 13}}>KG</Text>
                                </Text>
                            </View>
                            <View style={styles.textInnerContainer}>
                                <Text style={styles.text}>
                                    Body Fat Rate:
                                    {this.props.currentPic.BFR} %
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </GestureRecognizer>
                {this.props.displayPicture.showReminder && <ReminderModal
                    reminderTitle={this.props.displayPicture.reminderTitle}
                    reminderContent={this.props.displayPicture.reminderContent}
                    handleCloseReminder={this.handleCloseReminder}
                    handleConfirm={this.handleConfirm}
                    hideConfirmButton={this.props.displayPicture.hideConfirmButton}/>
                }
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    bfrData: state.health.bfrData,
    weightData: state.health.weightData,
    progressPics: state.progress.pics,
    currentPic: state.progress.currentPic,
    displayPicture: state.displayPicture,
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

export const DisplayPicture = connect(
    mapStateToProps,
    mapActionToProps
)(_DisplayPicture);
const styles = StyleSheet.create({
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
