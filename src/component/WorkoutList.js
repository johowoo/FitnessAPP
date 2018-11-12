import React, {Component} from 'react';
import {
    View,
    Text,
    SwipeableFlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

const {width, height} = Dimensions.get('window');

export class _WorkoutList extends Component {
    handlePress() {
        this.props.setModalVisibility(true)
    }

    genQuickActions=()=>{
        return <View style={styles.quickContainer}>
            <TouchableHighlight
                onPress={()=>{
                    alert("确认删除？")
                }}
            >
                <View style={styles.quick}>
                    {/*<Text style={styles.text}>删除</Text>*/}
                </View>
            </TouchableHighlight>

        </View>

    }
    _renderItem = ({item: {exercise, sets}}) => {
        // console.warn(exercise,sets);
        return (<TouchableWithoutFeedback
            // onPress={(item) => this.handlePress.call(this, item)}
        >
            <View style={styles.listItem}>
                <View style={{flex: 0.03}}/>
                <View style={{flex: 0.77}}>
                    <Text style={styles.exerciseText}>{'  ' + exercise}</Text>
                </View>
                <View style={{flex: 0.20}}>
                    <Text style={styles.exerciseText}>{sets} sets</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>)
    }

    render() {
        const listFooterComponent = (
            <View style={styles.addSomeExercises}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.handlePress.bind(this)} style={styles.plusButton} textStyle={styles.plus}
                        children={<Icon name="fitness-center" size={50} color="white" key="add"/>}
                    />

                </View>

                <Text style={styles.bigText}>add some{'\n'}exercises</Text>
            </View>
        )
        return (
            <SwipeableFlatList
                style={{marginTop: 2}}
                ListFooterComponent={listFooterComponent}
                data={this.props.currentWorkout} renderItem={this._renderItem}
                keyExtractor={(item, index) => item + index}
                renderQuickActions={() => this.genQuickActions()}
                maxSwipeDistance={100}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    currentWorkout: state.currentWorkout
});
export const WorkoutList = connect(mapStateToProps, null)(_WorkoutList)

const styles = StyleSheet.create({
    addSomeExercises: {
        height: 0.8 * height,
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    bigText: {
        lineHeight: 40,
        textAlign: 'center',
        fontSize: 36,
        color: '#eee'
    },
    plusButton: {
        marginTop: 20,
        // borderStyle: null,
        borderWidth: 1,
        borderColor: '#fff',
        height: 60,
        width: 60
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
    },
    listItem: {
        flexDirection: 'row',

        alignItems: 'center',
        height: 40,
        justifyContent: 'space-around',
        borderColor: '#ccc',
        borderWidth: 1
    },
    exerciseText: {
        fontSize: 20,
        color: '#eee'
    },
    setsText: {
        fontSize: 20,
    }
});