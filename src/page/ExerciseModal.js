import React, {Component} from 'react';

import {Modal, View, Text, TextInput} from 'react-native';
import Button from 'apsl-react-native-button';
import {TopBar} from "../ui";
import LinearGradient from 'react-native-linear-gradient';
import {SearchBar} from "../ui";
import {ExerciseList} from "../ui";

export class ExerciseModal extends Component {
    handleTextChange(text) {

    }

    render() {
        return (
            <Modal
                style={{flex: 1}}
                animationType={'slide'}
                visible={this.props.visible}
                onRequestClose={this.props.closeModal}
            >
                <View>
                    <TopBar>
                        <LinearGradient
                            colors={['#87FC70', '#0BD318']}
                            start={{x: 0.0, y: 0.5}}
                            end={{x: 1.0, y: 0.5}}
                            locations={[0.0, 1.0]}
                        >
                            <SearchBar onTextChange/>
                        </LinearGradient>
                    </TopBar>
                    <ExerciseList/>

                    <Text>Modal</Text>
                    <Button onPress={this.props.closeModal}
                            children={'close'}/>
                </View>

            </Modal>
        );
    }

}