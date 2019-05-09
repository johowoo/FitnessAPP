import React,{Component} from 'react';
import {TouchableOpacity,View,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export class CustomBar extends Component {
    icons = [];
    render() {
        return <View style={[styles.tabs, this.props.style ]}>
            {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                    <Icon
                        name={tab}
                        size={30}
                        color={this.props.activeTab === i ? 'rgb(59,89,152)' : 'rgb(204,204,204)'}
                        ref={(icon) => { this.icons[i] = icon; }}
                    />
                </TouchableOpacity>;
            })}
        </View>;
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    tabs: {
        height: 45,
        flexDirection: 'row',
        paddingTop: 5,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});