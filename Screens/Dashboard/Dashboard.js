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

import MapViewComp from '../../Components/MapView/MapView';
import { FontAwesome, AntDesign } from "react-native-vector-icons"




function Dashboard({ navigation }) {
    return (
        <View style={styles.container} >
            <View style={{
                backgroundColor: 'green',
                flexDirection: "row",
                justifyContent: 'space-between',
                padding: 15
            }} >
                <TouchableOpacity style={{ flexDirection: "row" }}  onPress={() => navigation.replace('Login')} >
                    <FontAwesome name="sign-out" size={20} color="#fff" />
                    <Text style={{ color: 'white', marginLeft: 5, fontSize: 15 }}  >Sign Out</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate('NeedyForm')}  >
                    <AntDesign name="form" size={20} color="#fff" />
                    <Text style={{ color: 'white', marginLeft: 5, fontSize: 15 }}  >Form</Text>
                </TouchableOpacity>

            </View>
            <MapViewComp />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
})

export default Dashboard
