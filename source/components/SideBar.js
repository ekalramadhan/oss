import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';


export default Sidebar = props => (
    <ScrollView>
        <ImageBackground 
            source = {require('../images/background_blue.png')} 
            style={{width: undefined, padding: 16, paddingTop: 48 }}
        >
            <Image 
                source={require('../images/Logo2_resize.png')}
                style = {styles.logo} />
        </ImageBackground>  

        <View style={styles.container}>
            <DrawerNavigatorItems {...props}/>
        </View>
    </ScrollView>
); 


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // backgroundColor: '#4e73df',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    logo: {
        width: 80,
        height:80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF",
        fontSize: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 15,
        flexDirection:'row'
    }
});