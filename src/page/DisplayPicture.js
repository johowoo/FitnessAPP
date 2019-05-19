import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import {LinearGradient} from "expo";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {connect} from "react-redux";

const {width, height} = Dimensions.get("window");

export class _DisplayPicture extends Component {
    constructor(props) {
        super(props);
        this.state = {myText: "", index: 0};
    }

    onSwipeLeft(gestureState) {
        if (this.state.index < this.props.progress.length-1) {
            this.setState({
                myText: 'left!',
                photoURI: this.props.progress[this.state.index + 1].photoURI,
                weight: this.props.progress[this.state.index + 1].weight,
                BFR: this.props.progress[this.state.index + 1].BFR,
                index: this.state.index + 1,
            });
        }
    }

    onSwipeRight(gestureState) {
        if (this.state.index > 0) {
            this.setState({
                myText: 'right!',
                photoURI: this.props.progress[this.state.index - 1].photoURI,
                weight: this.props.progress[this.state.index - 1].weight,
                BFR: this.props.progress[this.state.index - 1].BFR,
                index: this.state.index - 1,
            });
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

    render() {
        // const this.state.values = this.props?.navigation?.state?.params;
        return (
            <LinearGradient colors={["#219dd5", "#51c0bb"]} style={{flex: 1}}>
                <GestureRecognizer onSwipeLeft={(state) => this.onSwipeLeft(state)}
                                   onSwipeRight={(state) => this.onSwipeRight(state)}>
                    <ScrollView>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: this.state.photoURI}}/>
                        </View>
                        <View>
                            <Text>{this.state.myText}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <View style={styles.textInnerContainer}>
                                <Text style={styles.text}>
                                    Weight:
                                    {this.state.weight} <Text style={{fontSize: 13}}>KG</Text>
                                </Text>
                            </View>
                            <View style={styles.textInnerContainer}>
                                <Text style={styles.text}>
                                    Body Fat Rate:
                                    {this.state.BFR} %
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </GestureRecognizer>
            </LinearGradient>
        );
    }
}

const mapStateToProps = state => ({
    bfrData: state.health.bfrData,
    weightData: state.health.weightData,
    progress: state.progress,
});
const mapActionToProps = dispatch => ({
    updateWeightData(data) {
    },
    updateBfrData(data) {
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
