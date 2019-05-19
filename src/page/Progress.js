import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback, SectionList, ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {LinearGradient, Permissions} from "expo";
import {connect} from "react-redux";
import {TopBar} from "../component";
import {
    updateBfrAction,
    addProgressPhoto,
    showProgressModal,
    showProgressPicker,
    changeTmpUriAction,
} from "../store/actions";
// import {FooterComponent} from "../component/FooterComponent";
import {PickerCamera} from "../component/PickerCamera";
import ApslButton from "apsl-react-native-button";

// import {createStackNavigator, createAppContainer} from "react-navigation";

const {width, height} = Dimensions.get("window");

const numColumns = 3;

export class _Progress extends Component {
    async componentDidMount() {
        const permission1 = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        const permission2 = await Permissions.getAsync(Permissions.CAMERA);
        if (permission1.status !== "granted") {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        } else {
        }
        if (permission2.status !== "granted") {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA);
        } else {
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            showPicker: false,
            isAddingWeight: false,
            isAddingBFR: false,
            photo: null,
            showModal: false,
            showDeleteButton: false,
        };
    }

    renderItem = props => {
        // console.warn(props.index);
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate("DisplayPicture", {
                            ...props.item,
                            index: props.index,
                        })
                    }}>
                    <Image style={styles.image} source={{uri: props.item.photoURI}}/>
                    {!this.state.showDeleteButton && <ApslButton
                        onPress={this.closeModal}
                        textStyle={{fontSize: 34, color: "#c69"}}
                        style={{position: "absolute", right: 0, top: -6, borderWidth: 0, borderRadius: 16}}
                        children={<Icon name="check-circle" size={34} color={"rgba(204,51,51,0.9)"} key="cancel"/>}
                    />}
                </TouchableOpacity>
            </View>
        );
    };
    loadData = () => {
        const newDisplayExercises = this.state.displayExercises.concat(
            this.props.extraSectionExercises
        );
        // timer =setTimeout(() => {
        this.setState({
            displayExercises: newDisplayExercises,
        });
        // }, 2000)
    };

    render() {
        const {
            progress,
            addProgressPhotoDispatch,
            showProgressPickerDispatch,
            showProgressModalDispatch,
            showPicker,
            showModal,
            navigation,
            changeTmpUri,
        } = this.props;
        return (
            <LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{flex: 1}}>
                <TopBar style={styles.topBar}>
                    {/* {this.props.fontLoaded ? <Text style={styles.textBar}>Progress</Text> : null} */}
                    <Text style={styles.textBar}>Progress</Text>
                    <View style={{position: "absolute", left: 15}}>
                        <TouchableOpacity
                            style={{height: 25, width: 25, backgroundColor: "transparent"}}
                            // onPress={() => this.handleModal({showPicker: true})}
                            onPress={() => this.setState({showDeleteButton:!this.state.showDeleteButton})}
                            style={styles.plusButton}
                            textStyle={styles.plus}
                            title="+">
                            {!this.state.showDeleteButton ? <Icon
                                name={"remove"}
                                size={25}
                                color="white"
                                key="add"
                            /> : <Text style={{color: "#eee"}}>delete</Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{position: "absolute", right: 15}}>
                        <TouchableOpacity
                            style={{height: 25, width: 25, backgroundColor: "transparent"}}
                            // onPress={() => this.handleModal({showPicker: true})}
                            onPress={() => showProgressPickerDispatch(true)}
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
                </TopBar>
                <ScrollView ref={ref => (this.scrollView = ref)}>
                    <View style={{marginTop: 5}}/>
                    <FlatList
                        data={progress.reverse()}
                        style={styles.container}
                        renderItem={props => this.renderItem({...props, navigation})}
                        numColumns={numColumns}
                        keyExtractor={(item, index) => index.toString()}
                        // onEndReached={this.loadData}
                        // ListFooterComponent={() => <FooterComponent/>}
                        onEndReachedThreshol={0.2}
                        onRefresh={this.onRefresh}
                        refreshing={this.state.refreshing}
                    />
                    {showPicker && (
                        <PickerCamera
                            addProgressPhotoDispatch={addProgressPhotoDispatch}
                            showProgressPickerDispatch={showProgressPickerDispatch}
                            showProgressModalDispatch={showProgressModalDispatch}
                            showPicker={showPicker}
                            showModal={showModal}
                            changeTmpUri={changeTmpUri}
                        />
                    )}
                </ScrollView>
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    progress: state.progress,
    showPicker: state.progressModal.showPicker,
    showModal: state.progressModal.showModal,
    tmpURI: state.progressModal.tmpURI,
});
const mapActionToProps = dispatch => ({
    addProgressPhotoDispatch(data) {
        dispatch(addProgressPhoto(data));
    },
    updateBfrData(data) {
        dispatch(updateBfrAction(data));
    },
    showProgressPickerDispatch(bool) {
        dispatch(showProgressPicker({showPicker: bool}));
    },
    showProgressModalDispatch(bool) {
        dispatch(showProgressModal({showModal: bool}));
    },
    changeTmpUri(uri) {
        dispatch(changeTmpUriAction(uri));
    },
});

const Progress = connect(
    mapStateToProps,
    mapActionToProps
)(_Progress);

export default Progress;


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
        fontSize: 28,
        // fontFamily: Fonts.PattayaRegular
        fontFamily: "PattayaRegular",
    },
    chartTitle: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
    },
    image: {
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.3,
        height: height * 0.2,
    },
    container: {
        flex: 1,
        marginVertical: 20,
    },
    item: {
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        width: width / 3,
        height: height / 5,
        marginTop: 2,
    },
});

// export default createAppContainer(StackNavigator);
