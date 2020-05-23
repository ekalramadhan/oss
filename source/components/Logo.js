import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends Component {
    render () {
        return (
                
                <View style = {styles.container}>
                    <Image style={{width:197},{height:177},{marginTop:60}}
                    source = {require('../images/Logo2_resize.png')}/>
                    <Text style = {styles.textlogo}> Operations Supporting System </Text>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems:'center',
        justifyContent: 'center',
    },
    textlogo: {
        fontSize : 18,
        fontStyle: "italic",
        alignItems: 'center',
        justifyContent: 'center',
        color :'#87cefa',
        marginVertical:2,
    }
});