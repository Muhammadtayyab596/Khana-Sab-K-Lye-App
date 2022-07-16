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
import { db } from "../../Firebase/Config"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";



function SignUp({ navigation }) {


  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [username, setUsername] = useState();





  const creatAccount = () => {


    if (email && password && phoneNumber && username) {


      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          const user = userCredential.user;
          console.log(user.uid);

          
          setDoc(doc(db, 'user', user.uid), { 
            email,
            phoneNumber,
            username,
            userId : user.uid
          });
          // ...
        })
        .then(() => {
          Alert.alert(
            "Well-Done",
            "You Sccessfully Create account ",
            [
              { text: "Next", onPress: () => navigation.navigate("Login") }
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


    } else {
      Alert.alert(
        "Bad-Job",
        "Please fill all input fields",
      )

    }
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        
        source={require('../../Images/LogoKhanaSabkliye-01.png')}
        style={styles.logo}
      />
      



      <InputForm
        label="Username"
        autoCapitalize="none"
        onChangeText={(e) => setUsername(e)}


      />


      <InputForm
        label="Email"
        labelValue={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(e) => setEmail(e)}

      />

      <InputForm
        label="Phone number"
        autoCapitalize="none"
        keyboardType="numeric"
        onChangeText={(e) => setPhoneNumber(e)}


      />

      <InputForm
        label="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={(e) => setPassword(e)}

      />


      <ButtonForm
        buttonTitle="Create Account"
        onPress={creatAccount}

      />


      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>
          If alreday an account? Login
        </Text>
      </TouchableOpacity>


    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
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



export default SignUp
