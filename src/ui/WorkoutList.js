import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Dimensions, TouchableWithoutFeedback
} from 'react-native';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

export class WorkoutList extends Component {
    static defaultProps = {
        currentWorkout: []
    }

    handlePress() {
        this.props.setModalVisibility(true)
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={(item) => this.handlePress.call(this, item)}>
            <View style={styles.listItem}>
                <Text style={styles.listText}>{item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )

    render() {
        const listFooterComponent = (
            <View style={styles.addSomeExercises}><Text style={styles.bigText}>add some{'\n'}exercises</Text><Button
                onPress={this.handlePress.bind(this)} style={styles.plusButton} textStyle={styles.plus}
                children={<Icon name="fitness-center" size={50} color="white" key="add"/>}/></View>)
        return (
            <FlatList
                ListFooterComponent={listFooterComponent}
                data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem}
            >
            </FlatList>


        )
    }
}

const styles = StyleSheet.create({
    addSomeExercises: {
        height: 0.8 * height,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    bigText: {
        lineHeight: 40,
        textAlign: 'center',
        fontSize: 36,
        color: '#eee'
    },
    plusButton: {
        marginTop: 20,
        borderStyle: null,
        borderWidth: 0
    },
    plus: {
        color: 'black',
        fontSize: 60
    },
    workoutList: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        width: width * .80
    },
    workout: {
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        borderBottomWidth: 1,
        padding: 10
    },
    workoutText: {
        color: 'white',
        fontSize: 24
    }
});