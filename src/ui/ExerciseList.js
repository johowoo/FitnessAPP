import React, {Component} from 'react';
import {
    View, Text, SectionList, TouchableWithoutFeedback, StyleSheet, ActivityIndicator, FlatList
} from 'react-native';
import {connect} from'react-redux';
import {TopBar} from "./TopBar";
import LinearGradient from "react-native-linear-gradient";
import {SearchBar} from "./SearchBar";
import {fuzzySearch} from "../services/fuzzySearch";
import ApslButton from "apsl-react-native-button";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AddExerciseDropdown} from "./AddExerciseDropdown";
import {addExerciseAction} from '../store/actions';
import {updateEmptyAction}from '../store/actions';

export class _ExerciseList extends Component {
    constructor() {
        super();
        this.state = {
            isAddingExercise: false,
            foundExercises: [],
            displayExercises: [],
            addHintText:'add more exercises'
        };
    }

    componentDidMount() {
        this.setState({
            displayExercises: this.props.sectionExercises
        })
    }

    closeModal = () => {
        this.props.closeModal();
    }

    _renderItem = ({item}) => (
        <TouchableWithoutFeedback onPress={() => this.handlePress.call(this, item)}>
            <View style={styles.listItem}>
                <Text style={styles.listText}>{item}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
    _renderSectionHeader = ({section}) => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{section.category}</Text>
            </View>
        )
    }
    _renderListFooter = () => (
        <View style={styles.indicatorContainer}>
            <ActivityIndicator
                style={styles.indicator}
                size={"large"}
                animating={true}
                color={'#c69'}
            />
            <Text>Loading...</Text>
        </View>
    )

    handleSearch = (text) => {
        this.setState({
            foundExercises: fuzzySearch(text, this.state.displayExercises, 'data')
        })
    }
    handleBlur = () => {
        this.setState({
            foundExercises: []
        })
    }
    handlePress = (item) => {
        this.props.updateEmpty(true);
        this.props.addExercise(item);
        this.props.closeModal();
    }
    handlePressAddExercise = () => {
        if(!this.state.isAddingExercise){
            this.setState({
                isAddingExercise: true,
                addHintText:'Done & Close'
            })
        }else{
            this.setState({
                isAddingExercise: false,
                addHintText:'add more exercises'
            })
        }
    }

    changeDisplayExercises=({category,exercise})=>{
        const cacheExercises=this.state.displayExercises;
        cacheExercises.map(value=>{
            if(value.category ===category){
                value.data.push(exercise)
            }
        })
        this.setState({
            displayExercises:cacheExercises
        })

    }
    loadData = () => {
        const newDisplayExercises = this.state.displayExercises.concat(this.props.extraSectionExercises)
        setTimeout(() => {
            this.setState({
                displayExercises: newDisplayExercises
            })
        }, 2000)
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                <TopBar style={{padding: 0, backgroundColor: '#999'}}>
                    <LinearGradient
                        // colors={['#87FC70', '#0BD318']}
                        colors={['#00FFFF', '#00CCCC']}
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
                            onBlur={this.handleBlur.bind(this)}
                        />
                        <View style={{flex: 0.1}}>
                            <ApslButton
                                onPress={this.closeModal}
                                textStyle={styles.close}
                                style={styles.closeButton}
                                children={<Icon name="cancel" size={34} key="cancel"/>}
                            />
                        </View>
                    </LinearGradient>
                </TopBar>
                <View>
                    <ApslButton style={styles.addButton}
                                onPress={this.handlePressAddExercise}
                                children={<Text style={styles.addText} key={"addText"}>{this.state.addHintText}</Text>}
                    />
                </View>
                <View>
                    {
                        this.state.isAddingExercise ?
                            <AddExerciseDropdown
                                changeDisplayExercises={this.changeDisplayExercises.bind(this)}
                            /> :null
                    }
                </View>
                {
                    this.state.foundExercises.length ?
                        <FlatList
                            data={this.state.foundExercises}
                            renderItem={data => this._renderItem(data)}
                            keyExtractor={(item, index) => item + index}
                        />
                        :
                        <SectionList
                            sections={this.state.displayExercises}
                            renderItem={data => this._renderItem(data)}
                            renderSectionHeader={data => this._renderSectionHeader(data)}
                            ListFooterComponent={() => this._renderListFooter()}
                            onEndReached={this.loadData}
                            keyExtractor={(item, index) => item + index}
                        />
                }
            </View>
        )
    }
}
const mapStateToProps = state => ({
    isExerciseListEmpty: state.exerciseCompleted.isExerciseListEmpty,

})
const mapActionToProps=(dispatch)=>({
    addExercise: (exercise)=>dispatch(addExerciseAction(exercise)),
    updateEmpty:(bool)=>dispatch(updateEmptyAction(bool)),
})

export const ExerciseList=connect(mapStateToProps,mapActionToProps)(_ExerciseList);
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
    },
    sectionHeader: {
        backgroundColor: '#00CCCC',
        justifyContent: 'center',
        height: 45,
    },
    sectionHeaderText: {
        fontSize: 24,
        marginLeft: 20
    },
    listItem: {
        height: 40,
        // alignItems: 'center'
        justifyContent: 'center'
    },
    listText: {
        fontSize: 20,
        marginLeft: 24

    },
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        color: 'red',
        margin: 10
    },
    addButton: {
        borderColor: 'transparent',
        height: 40,
        // marginTop: 10
    },
    addText: {
        color: '#FF8c00',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 5
    }
})