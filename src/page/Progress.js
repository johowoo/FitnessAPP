import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient, Permissions } from "expo";
import { connect } from "react-redux";
import { TopBar } from "../component";
import {
  updateBfrAction,
  addProgressPhoto,
  showProgressModal,
  showProgressPicker,
  changeTmpUriAction,
  deletePicsFromProgressAction,
  deleteOnePicFromProgressAction,
  changeCurrentDisplayPicAction,
  showDeleteConfirmModalInDisplayPictureAction,
} from "../store/actions";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import { PickerCamera } from "../component/PickerCamera";
import ApslButton from "apsl-react-native-button";
import LoadingUtil from "../utils/LoadingUtil";

const { width, height } = Dimensions.get("window");

const numColumns = 3;

export class _Progress extends Component {
  async componentDidMount() {
    this.props.showProgressPickerDispatch(false);
    this.props.showProgressModalDispatch(false);
    const permission1 = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    const permission2 = await Permissions.getAsync(Permissions.CAMERA);
    if (permission1.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    if (permission2.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA);
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
      selectTobeDeleted: [],
    };
  }

  renderItem = props => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={async () => {
            if (this.state.showDeleteButton) {
              if (this.state.selectTobeDeleted.includes(props.item.date)) {
                const newSelectTobeDeleted = [];
                await this.state.selectTobeDeleted.map((item, index) => {
                  if (item !== props.item.date) {
                    newSelectTobeDeleted.push(item);
                  }
                });
                await this.setState({
                  selectTobeDeleted: newSelectTobeDeleted,
                });
              } else {
                await this.setState({
                  selectTobeDeleted: [
                    ...this.state.selectTobeDeleted,
                    props.item.date,
                  ],
                });
              }
            } else {
              // console.warn("props.index", props.index);
              // console.warn("props.item.date", props.item.date);
              await this.props.changeCurrentDisplayPic({
                index: props.index,
                date: props.item.date,
              });
              // await props.navigation.navigate("DisplayPicture");
              await props.navigation.navigate("DisplayPicture", {
                ...props.item,
                index: props.index,
                // deleteOnePicFromProgress: this.props.deleteOnePicFromProgress,
                showDeleteConfirmModalInDisplayPicture: this.props
                  .showDeleteConfirmModalInDisplayPicture,
              });
            }
          }}>
          <Image style={styles.image} source={{ uri: props.item.photoURI }} />
          {this.state.showDeleteButton &&
            this.state.selectTobeDeleted.includes(props.item.date) && (
              <ApslButton
                onPress={this.closeModal}
                textStyle={{ fontSize: 34, color: "#c69" }}
                style={{
                  position: "absolute",
                  right: 0,
                  top: -6,
                  borderWidth: 0,
                  borderRadius: 16,
                }}
                children={
                  <Icon
                    name="check-circle"
                    size={34}
                    color={"#c69"}
                    key="cancel"
                  />
                }
              />
            )}
        </TouchableOpacity>
      </View>
    );
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
    const {
      progressPics,
      addProgressPhotoDispatch,
      showProgressPickerDispatch,
      showProgressModalDispatch,
      deletePicsFromProgress,
      showPicker,
      showModal,
      navigation,
      changeTmpUri,
    } = this.props;

    return (
      <LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{ flex: 1 }}>
        <TopBar style={styles.topBar}>
          {/* {this.props.fontLoaded ? <Text style={styles.textBar}>Progress</Text> : null} */}
          <Text style={styles.textBar}>Progress</Text>
          <View style={{ position: "absolute", left: 20 }}>
            <TouchableOpacity
              style={{ height: 25, width: 25, backgroundColor: "transparent" }}
              // onPress={() => this.handleModal({showPicker: true})}
              onPress={async () => {
                if (
                  this.state.showDeleteButton &&
                  this.state.selectTobeDeleted.length
                ) {
                  await LoadingUtil.showLoading();
                  await deletePicsFromProgress(this.state.selectTobeDeleted);
                  await LoadingUtil.dismissLoading();
                }
                await this.setState({
                  showDeleteButton: !this.state.showDeleteButton,
                  selectTobeDeleted: [],
                });
              }}
              style={styles.plusButton}
              textStyle={styles.plus}
              title="+">
              {!this.state.showDeleteButton ? (
                <Icon name={"remove"} size={25} color="white" key="remove" />
              ) : (
                <IconFontAwesome
                  name="trash-o"
                  size={24}
                  color="#eee"
                  key="delete"
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ position: "absolute", right: 15 }}>
            <TouchableOpacity
              style={{ height: 25, width: 25, backgroundColor: "transparent" }}
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
          <View />
          {progressPics.length > 0 ? (
            <FlatList
              data={progressPics}
              style={styles.container}
              renderItem={props => this.renderItem({ ...props, navigation })}
              numColumns={numColumns}
              keyExtractor={(item, index) => index.toString()}
              // onEndReached={this.loadData}
              // ListFooterComponent={() => <FooterComponent/>}
              onEndReachedThreshol={0.2}
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
              extraData={
                this.state.showDeleteButton + this.state.selectTobeDeleted
              }
            />
          ) : (
            <View
              style={{
                flex: 1,
                height: height * 0.66,
                textAlign: "center",
                justifyContent: "center",
                // backgroundColor: "#ccc"
              }}>
              <Text style={{ textAlign: "center" }}>
                <IconFontAwesome
                  name="camera-retro"
                  size={110}
                  color="#c69"
                  key="delete"
                />
              </Text>
              <Text
                style={{
                  color: "#eee",
                  fontSize: 24,
                  fontFamily: "PattayaRegular",
                  margin: 20,
                  marginLeft: 40,
                }}>
                Please Click the + button to add your first progress photo{" "}
              </Text>
            </View>
          )}
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
  progressPics: state.progress.pics,
  showPicker: state.progressModal.showPicker,
  showModal: state.progressModal.showModal,
  tmpURI: state.progressModal.tmpURI,
});
const mapActionToProps = dispatch => ({
  changeCurrentDisplayPic(data) {
    dispatch(changeCurrentDisplayPicAction(data));
  },
  deleteOnePicFromProgress(data) {
    dispatch(deleteOnePicFromProgressAction(data));
  },
  deletePicsFromProgress(data) {
    dispatch(deletePicsFromProgressAction(data));
  },
  addProgressPhotoDispatch(data) {
    dispatch(addProgressPhoto(data));
  },
  updateBfrData(data) {
    dispatch(updateBfrAction(data));
  },
  showProgressPickerDispatch(bool) {
    dispatch(showProgressPicker({ showPicker: bool }));
  },
  showProgressModalDispatch(bool) {
    dispatch(showProgressModal({ showModal: bool }));
  },
  changeTmpUri(uri) {
    dispatch(changeTmpUriAction(uri));
  },
  showDeleteConfirmModalInDisplayPicture(data) {
    dispatch(showDeleteConfirmModalInDisplayPictureAction(data));
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
    fontSize: 25,
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
