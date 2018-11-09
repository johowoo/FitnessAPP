import React, {Component} from 'react';

import {Modal, View, Text, TextInput} from 'react-native';
import Button from 'apsl-react-native-button';
import {TopBar} from "../ui";
import LinearGradient from 'react-native-linear-gradient';
import {SearchBar} from "../ui";
import {ExerciseList} from "../ui";
import {fuzzySearch} from "../services/fuzzySearch";

export class ExerciseModal extends Component {

    render() {
        return (
            <Modal
                style={{flex: 1}}
                animationType={'slide'}
                visible={this.props.visible}
                onRequestClose={this.props.closeModal}
            >
                    <ExerciseList {...this.props}/>
            </Modal>
        );
    }

}