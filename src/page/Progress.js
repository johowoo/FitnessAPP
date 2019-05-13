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
  TouchableWithoutFeedback,
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
} from "../store/actions";

import { PickerCamera } from "../component/PickerCamera";

// import {createStackNavigator, createAppContainer} from "react-navigation";

const { width, height } = Dimensions.get("window");

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
    };
  }

  renderItem = props => {
    console.log(props.navigation);
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("DisplayPicture", { ...props.item });
          }}>
          <Image style={styles.image} source={{ uri: props.item.photoURI }} />
        </TouchableOpacity>
      </View>
    );
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
    // console.warn(showModal);
    // showProgressModalDispatch(false);
    // console.log("allprops", this.props);
    return (
      <LinearGradient colors={["#1b98d9", "#57c5b8"]} style={{ flex: 1 }}>
        <TopBar style={styles.topBar}>
          {/* {this.props.fontLoaded ? <Text style={styles.textBar}>Progress</Text> : null} */}
          <Text style={styles.textBar}>Progress</Text>
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
          <View style={{ marginTop: 5 }} />
          <FlatList
            data={progress.reverse()}
            style={styles.container}
            renderItem={props => this.renderItem({ ...props, navigation })}
            numColumns={numColumns}
            keyExtractor={(item, index) => index.toString()}
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
    dispatch(showProgressPicker({ showPicker: bool }));
  },
  showProgressModalDispatch(bool) {
    dispatch(showProgressModal({ showModal: bool }));
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

// const StackNavigator = createStackNavigator({
//     Progress: {
//         screen: Progress,
//         header: null
//     },
// })

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
