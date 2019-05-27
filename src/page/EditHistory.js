import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

class _EditHistory extends Component {
    render() {
        return (
            <View>
                <Text>Edit History</Text>
            </View>
        )
    }
}

export const EditHistory = connect(null, null)(_EditHistory);
