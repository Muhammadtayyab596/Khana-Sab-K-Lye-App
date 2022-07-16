import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';


function PendingScr() {
    return (
        <View style={{flex:1,justifyContent:'center', alignItems:"center"}} >
            <Button 
             title='Your request in pendind please wait'
             />
        </View>
    )
}

export default PendingScr
