import React, {Component} from "react";
import {Modal} from "react-native";
import {ExerciseList} from "../component";

export class ExerciseModal extends Component {
    render() {
        // console.warn("sectionExercises", this.props.sectionExercises);
        return (
            <Modal
                style={{flex: 1}}
                animationType="slide"
                visible={this.props.visible}
                onRequestClose={this.props.closeModal}>
                <ExerciseList {...this.props} />
            </Modal>
        );
    }
}
