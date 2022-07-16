import React from 'react'
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    // TextInput

}
    from 'react-native';

import { TextInput } from 'react-native-paper';

import { AntDesign } from "react-native-vector-icons"




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



function InputForm({labelValue, label,keyboardType , ...rest }) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                value={labelValue}
                label={label}
                mode='outlined'
                activeOutlineColor="#2e64e5"
                style={styles.input}
                keyboardType={keyboardType}
                outlineColor = "lightgrey"
                {...rest}
            />
        </View>
    )
}

export default InputForm


const styles = StyleSheet.create({
    inputContainer: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    input: {
        width: '90%',
        color: 'red',
        marginVertical:9,
        borderColor:"grey"
        
        
    }


});