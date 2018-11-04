import React,{Component} from 'react';
import {
    View,Text,FlatList
} from 'react-native';

export class ExerciseList extends Component{
    // static defaultProps={
    //     exercises = []
    // }
    constructor(){
        super();
        const dataSourceX=new FlatList.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        this.state={
            dataSource:dataSourceX.cloneWithRows(this.props.exercises)
        }
    }
    render(){
        // const dataSource=this.state.c
        return(
            <FlatList
            dataSource={this.state.dataSource}
            renderItem={
                (exercise)=>(
                    <View>
                        <Text>
                            {exercise.name}
                        </Text>
                    </View>
                )
            }
            />
        )
    }

}