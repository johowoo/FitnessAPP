import React,{Component} from 'react';
import { View, StyleSheet ,Text,TextInput,Dimensions} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
const data=["Chest","Shoulder","Back","Arms","Legs","Core","Cardio"];
import ApslButton from 'apsl-react-native-button';

const {width}=Dimensions.get('window');

export  class AddExerciseDropdown extends Component {
    state={
        category:'Cardio',
        inputText:''
    }
    handlePress=()=>{
        this.props.changeDisplayExercises({
            exercise:this.state.inputText,
            category:this.state.category
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor='#666'
                    placeholder={"Please enter an exercise"}
                    value={this.state.inputText}
                    onChangeText={text=>this.setState({inputText:text})}
                />
                <View style={styles.dropdownContainer} >
                    <ModalDropdown
                        style={styles.dropdownMenu}
                        textStyle={styles.dropdownMenuText}
                        dropdownStyle={styles.dropdownList}
                        dropdownTextStyle={styles.dropdownListText}
                        dropdownTextHighlightStyle={styles.dropdownSelection}
                        options={data}
                        defaultValue={"Cardio"}
                        onSelect={(index,value)=>{this.setState({category:value})}}
                    />
                    <ApslButton
                        style={styles.confirmButton}
                        onPress={this.handlePress}
                        children={<Text key={"confirm"} style={{color:'#FF8c00'}}>Confirm</Text>}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        marginBottom: 20,
        zIndex: 999
    },
    input:{
        marginLeft:width*0.03,
        marginRight:width*0.03,
        backgroundColor: "rgba(255,140,0,0.1)",

        height:50,
    },
    dropdownContainer:{
       padding:width*0.03,
        paddingTop:width*0.02,
        flexDirection:'row',
    },
    dropdownMenu:{
        width:width*0.62,
        height:50,
        borderRadius:6,
        marginRight:width*0.02,
        borderWidth:1,
        borderColor:'#FF8c00',
        // flex:1,
        backgroundColor:'#EEE',
        justifyContent: 'center'
    },
    dropdownMenuText:{
        marginLeft:10,
        fontSize:18,
        color:'#FF8c00',
    },
    dropdownList:{
        width:width*0.62,
       marginTop: 15
    },
    dropdownListText:{
        fontSize: 18,
        marginLeft:10,
        color:'#FF8c00',
    },
    dropdownSelection:{
        color:"#00cccc"
    },
    confirmButton:{
        height:50,
        width:width*0.30,
        borderColor:"#787"
    }
});