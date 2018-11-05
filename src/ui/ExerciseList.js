import React, {Component} from 'react';
import {
    View, Text, FlatList, TouchableWithoutFeedback, StyleSheet
} from 'react-native';
import {TopBar} from "./TopBar";
import LinearGradient from "react-native-linear-gradient";
import {SearchBar} from "./SearchBar";
import {fuzzySearch} from "../services/fuzzySearch";
import Button from "apsl-react-native-button";
import Icon from 'react-native-vector-icons/MaterialIcons';

export class ExerciseList extends Component {
    constructor() {
        super();
        // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            foundExercises: []
        };
    }

    closeModal = () => {
        // this.setState({matchingExercises: this.state.matchingExercises.cloneWithRows([])});
        this.props.closeModal();
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.handlePress.call(this, item)}>
            <View style={styles.listItem}>
                <Text style={styles.listText}>{item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )

    handleSearch = (text) => {
        this.setState({
            foundExercises: fuzzySearch(text, this.props.exercises, 'name')
        })
    }
    handlePress = (item) => {
        this.props.addExercise(item);
        this.props.closeModal();
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#c69'}}>
                <TopBar style={{padding: 0, backgroundColor: '#999'}}>
                    <LinearGradient
                        colors={['#87FC70', '#0BD318']}
                        start={{x: 0.0, y: 0.5}}
                        end={{x: 1.0, y: 0.5}}
                        locations={[0.0, 1.0]}
                        style={styles.topBar}
                    >
                        <SearchBar
                            placeholder={'search for exercises'}
                            autoFocus
                            containerStyle={styles.searchBar}
                            style={styles.input}
                            onTextChange={this.handleSearch.bind(this)}
                        />
                        <View style={{flex: 0.1}}>
                            <Button
                                onPress={this.closeModal}
                                textStyle={styles.close}
                                style={styles.closeButton}
                                children={<Icon name="cancel" size={34} key="cancel"/>}
                            />
                        </View>
                    </LinearGradient>
                </TopBar>
                <FlatList data={[{title: 'Title Text', key: 'item1'}]} renderItem={this._renderItem}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: 'white',
        flex: 0.9,
        borderColor: 'grey',
        // borderRadius: 1,
        borderWidth: 1,
        height: 35,
        padding: 5,
        justifyContent: 'center',
        borderRadius: 20
    },
    topBar: {
        flexDirection: 'row',
        flex: 1,
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        color: 'black',
        fontSize: 20
    },
    close: {
        fontSize: 34
    },
    closeButton: {
        borderWidth: 0
    },
    row: {
        borderWidth: 1,
        borderColor: 'grey'
    },
    rowName: {
        fontSize: 30
    }
})