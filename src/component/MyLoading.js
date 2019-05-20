import React from "react";
import {ActivityIndicator, StyleSheet, Text, View, Dimensions} from "react-native";

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class MyLoading extends React.Component {
    constructor(props) {
        super(props);
        this.minShowingTime = 300;
        this.state = {
            isLoading: false,
            setIsLoading: (isLoading) => {
                if (isLoading !== this.state.isLoading) {
                    let curTimeLong = new Date().getTime();
                    if (isLoading) {
                        this.startTime = curTimeLong;
                        this.setState({
                            isLoading
                        });
                    } else {
                        let hasShowingTimeLong = curTimeLong - this.startTime;
                        if (hasShowingTimeLong < this.minShowingTime) {
                            setTimeout(() => {
                                this.setState({
                                    isLoading
                                });
                            }, this.minShowingTime - hasShowingTimeLong);
                        } else {
                            this.setState({
                                isLoading
                            });
                        }
                    }

                }
            },
        };
    }

    showLoading = () => {
        this.state.setIsLoading(true);
    };
    dismissLoading = () => {
        this.state.setIsLoading(false);

    };

    render() {
        if (!this.state.isLoading) {
            return null;
        }
        return (
            <View style={{
                flex: 1,
                width: width,
                height: height,
                position: 'absolute',
                // backgroundColor:'red',
                backgroundColor: '#10101099',
            }}>
                <View style={styles.loading}>
                    <ActivityIndicator color="#c69"/>
                    <Text style={styles.loadingTitle}>Loading...</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: 'rgba(50,50,50,0.2)',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: (height - 80) / 2,
        left: (width - 100) / 2,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: '#c69'
    }
});
