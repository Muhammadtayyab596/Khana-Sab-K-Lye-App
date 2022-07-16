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

import {
    FormControl,
    Select,
    Container,
    CheckIcon,
    WarningOutlineIcon,
    Center,
    NativeBaseProvider,


} from "native-base"

import { RadioButton } from 'react-native-paper';

import InputForm from '../../Components/InputForm/InputForm';
import ButtonForm from '../../Components/Button/Button';
import { FontAwesome, AntDesign } from "react-native-vector-icons"
import * as ImagePicker from 'expo-image-picker';


import { auth } from '../../Firebase/Config';
import { db } from "../../Firebase/Config"
import { storage } from "../../Firebase/Config"

import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";




function NeedyForm({ navigation }) {   

    let [category, setCategory] = React.useState("")
    const [image, setImage] = useState(null);

    const [name, setname] = useState("");
    const [fname, setfname] = useState("");
    const [cnic, setcnic] = useState("");
    const [dob, setdob] = useState("");
    const [income, setincome] = useState("");

    // const [urlimage, seturlimage] = useState("")

    var userId;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid);
            userId = user.uid;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });





    


    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.3,
            base64: true,
        });


        if (!result.cancelled) {
            setImage(result.uri);
            console.log(image);
            //    this.sumbit(result.uri)
            const response = await fetch(result.uri);
            const blob = await response.blob();
            console.log(blob.data.name);

            // const spaceRef = ref(Storage, 'images/' + blob.data.name );
            const storageRef = ref(storage, 'images/' + blob.data.name);
            // const storageRef = ref(Storage, blob);

            uploadBytes(storageRef, blob)
                .then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    console.log(snapshot);

                    getDownloadURL(ref(storage, 'images/' + blob.data.name))
                        .then((url) => {
                            // seturlimage(url)
                            addDoc(collection(db, "NeedyFormData"), {
                                name,
                                fname,
                                cnic,
                                dob,
                                category,
                                income,
                                userId,
                                img: url
                                // seturlimage
                            }).then(() => {
                                Alert.alert(
                                    "Well-Done",
                                    "You Sccessfully Submit the form ",
                                    [
                                      { text: "Next", onPress: () => navigation.navigate("PendingScr") }
                                    ]
                                  )
                            }).catch((error) => {
                                console.error("Error adding document: ", error);
                            });

                        })
                        .then(() => {
                            // Alert.alert("Your Form is Filled sucessfully")
                        }).catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                });



        }
    }
    return (
        <NativeBaseProvider>
            <ScrollView contentContainerStyle={styles.container} >


                <Image
                    source={require('../../Images/LogoKhanaSabkliye-01.png')}
                    style={styles.logo}
                />

                <Text style={styles.text}>Registration Form</Text>





                <InputForm
                    label="Full Name"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(e) => setname(e)}
                />

                <InputForm
                    label="Father Name"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(e) => setfname(e)}
                />


                <InputForm
                    label="CNIC"
                    // labelValue={email}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(e) => setcnic(e)}
                />

                <InputForm
                    label="Date Of Birth"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(e) => setdob(e)}
                />
                <InputForm
                    label="Monthly Incom"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    onChangeText={(e) => setincome(e)}
                />

                <FormControl style={{ width: '90%' }}>
                    <FormControl.Label>Choose service</FormControl.Label>
                    <Select

                        minWidth="200"
                        accessibilityLabel="Choose Service"
                        placeholder="Choose Service"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />,
                        }}
                        mt="1"
                        onValueChange={e => setCategory(e)}
                    >
                        <Select.Item label="Monthly Ration" value="Monthly Ration" />
                        <Select.Item label="Daily 1 Time Food" value="Daily 1 Time Food" />
                        <Select.Item label="Daily 2 Time Food" value="Daily 2 Time Food" />
                        <Select.Item label="Daily 3 Time Food" value="Daily 3 Time Food" />

                    </Select>

                </FormControl>

                <View style={{ marginBottom: 50, width: '100%', alignItems: 'center' }} >

                    <ButtonForm

                        buttonTitle="Upload your image and Submit"
                        onPress={openImagePickerAsync}

                    />


                </View>




            </ScrollView>
        </NativeBaseProvider>
    )
}

export default NeedyForm

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

        marginTop: StatusBar.currentHeight
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'cover',
    },
    text: {

        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
        // marginTop: 15,
        fontWeight: 'bold'
    }


})