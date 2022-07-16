import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Button,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function ButtonForm({buttonTitle, ...rest}) {
    return (
        
            <TouchableOpacity style={styles.buttonContainer} {...rest}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        
    )
}


const styles = StyleSheet.create({
   
    buttonContainer: {
        marginTop: 10,
        width: '90%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',

      },



});


export default ButtonForm
