import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    TouchableOpacity,
} from "react-native";
import {ImagePicker, Permissions} from "expo";
import {PhotoModal} from "./PhotoModal";
import LoadingUtil from '../utils/LoadingUtil';

const {width, height} = Dimensions.get("window");

export class PickerCamera extends React.Component {
    state = {
        uri: null,
    };

    async componentDidMount() {
        this.props.showProgressModalDispatch(false);
        // const permission1 = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        const permission2 = await Permissions.getAsync(Permissions.CAMERA);
        // if (permission1.status !== 'granted') {
        //     const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // } else {
        // }
        if (permission2.status !== "granted") {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA);
        } else {
        }
    }

    _pickImage = async launchType => {
        await LoadingUtil.showLoading();
        const result = await ImagePicker[launchType]({
            allowsEditing: true,
            aspect: [4, 3],
        });
        // this.props.showProgressPickerDispatch(false);
        if (!result.cancelled) {
            await this.setState({uri: result.uri});
            await this.props.changeTmpUri(result.uri);
            await this.props.showProgressModalDispatch(true);
        }
        await LoadingUtil.dismissLoading();
    };

    render() {
        return (
            <Modal transparent visible={this.props.showPicker}
                   onRequestClose={this.props.showProgressPickerDispatch}>

                <View style={{flex: 1, backgroundColor: "rgba(0,0,0,0.7)"}}>
                    {/* {this.props.children} */}
                    <TouchableOpacity
                        style={{flex: 1, backgroundColor: "transparent"}}
                        onPress={() => this.props.showProgressPickerDispatch(false)}>
                        <View style={styles.modalContainer}/>
                    </TouchableOpacity>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalInnerContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    // this.setState({showCamera: true})
                                    this._pickImage("launchCameraAsync").catch(err =>
                                        console.warn(err)
                                    );
                                }}>
                                <Text style={styles.buttonText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    this._pickImage("launchImageLibraryAsync").catch(err =>
                                        console.warn(err)
                                    );
                                }}>
                                <Text style={styles.buttonText}>Choose from library</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.props.showModal && <PhotoModal/>}
                </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute",
        bottom: 0,
        height: 180,
        width,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    modalInnerContainer: {
        marginBottom: 10,
    },
    button: {
        width: width * 0.92,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        backgroundColor: "#ededed",
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: "#636363",
    },
});
