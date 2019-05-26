import React, {Component} from "react";
import {View, Text, Modal, Button} from 'react-native';

export class AddCategoryModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.showAddCategoryModal}>
                <Text>AddCategoryModal</Text>
                <Button title={"close"} onPress={()=>this.props.setAddCategoryModalForLibraryVisibility(false)}/>
            </Modal>
        )
    }
}
