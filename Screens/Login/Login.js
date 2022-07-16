import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import InputForm from '../../Components/InputForm/InputForm';
import ButtonForm from '../../Components/Button/Button';

import { auth } from '../../Firebase/Config';
import { signInWithEmailAndPassword } from "firebase/auth";


function Login({ navigation }) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const loginBtn = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Login Sucessfully");

        Alert.alert(
          "Well-Done",
          "You Sccessfully Login ",
          [
            { text: "Next", onPress: () => navigation.navigate('Dashboard') }
          ]
        )

      })
      
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(
          "Server Error",
          errorMessage,

        )
      });



  }


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={require('../../Images/LogoKhanaSabkliye-01.png')}
        style={styles.logo}
      />
      

      <InputForm
        label="Email"
        labelValue={email}

        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(e) => setEmail(e)}


      />

      <InputForm
        label="Password"
        labelValue={password}
        onChangeText={(e) => setPassword(e)}
        autoCapitalize="none"
        secureTextEntry={true}

      />

      <ButtonForm
        buttonTitle="Log In"
        onPress={loginBtn}

      />


      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>



      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>


    </ScrollView >
  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
    marginTop: StatusBar.currentHeight
  },
  logo: {
    height: 200,
    width: 280,
    resizeMode: 'cover',
  },
  text: {

    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
    marginTop: 15,
    fontWeight: 'bold'
  },

  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});


export default Login
