import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from 'yup'
import axios from "axios";
const SignupSchema = yup.object({
      email:yup.string()
                .email('invalid email')
                .required('required field'),
      First_Name:yup.string()
                .min(2,'To short!')
                .max(20,'To long!')
                .required('required field'),
      Last_Name:yup.string()
                .min(2,'To short!')
                .max(20,'To long!')
                .required('required field'),
      Phone_No:yup.string()
                .min(10,'Invalid phone no') 
                .max(10,'Invalid phone no')  
                .test('phone', ' phone_no should start with 09 or 07', (value) => {
                  const phoneRegExp =new RegExp(/^(09|07)\d{8}$/);
                  return phoneRegExp.test(value);
                })
                .required('required field'),
      password:yup.string()
                .min(8,'min_characters are 8')
                .max(16,'To long!')
                .required('Required field'),
      re_password:yup.string()
                .oneOf([yup.ref('password'), null], 'Password must match')
                .required('Required field'),
})

export default function Signup() {
  const [isPending,setPending]=useState(false)
  
  const handle_register = (body) => {
    setPending(true)
    axios.post("http://192.168.43.171:8000/auth/users/",body,{
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      setPending(false)
      Alert.alert('go to your email and activate it')
    })
    .catch((error) => {
      setPending(false)
      Alert.alert(error.message);
    });
};

  const { navigate } = useNavigation();
  return (
    <ImageBackground
      source={require("../../assets/netflix.png")}
      style={tw`w-full h-full`}
    >
      <StatusBar />
      <Image
        source={require("../../assets/logo.png")}
        style={tw`w-36 m-5 h-10`}
      />

      <SafeAreaView style={tw`flex`}>
        <Text style={tw`text-white w-full h-2/3`}></Text>
        <Text
          style={tw`w-full opacity-90 h-1/3 bg-pink-700 rounded-t-3xl `}
        ></Text>
      </SafeAreaView>

      <View style={tw`w-80 rounded-2xl mx-4 h-96 opacity-90 bg-black absolute bottom-10 `}>

        <Formik
        initialValues={{email:'',First_Name:'',Last_Name:'',Phone_No:'',password:'',re_password:''}}
        validationSchema={SignupSchema}
        onSubmit={(values)=>{
        const body=JSON.stringify(values)
        handle_register(body)
        }}>
          
          {({values, handleChange,handleSubmit,errors,touched,handleBlur})=>(
            <View>
            <View style={tw`flex-row text-center justify-center mx-6 mt-4 `}>
                <TextInput
                  type="text"
                  placeholder="First_Name..."
                  style={tw`text-black w-1/2 bg-white rounded-2xl mx-2  mt-6 p-2 `}
                  value={values.First_Name}
                  onChangeText={handleChange('First_Name')}
                  onBlur={handleBlur('First_Name')}
                />
                
                <TextInput
                  type="text"
                  placeholder="Last_Name..."
                  style={tw`text-black w-1/2 bg-white rounded-2xl mx-2  mt-6 p-2 `}
                  value={values.Last_Name}
                  onChangeText={handleChange('Last_Name')}
                  onBlur={handleBlur('Last_Name')}
                />
                </View>

                <View style={tw`flex-row text-center justify-between mx-6`}>  
                    <Text style={tw`text-red-600`}>
                      {touched.First_Name&&errors.First_Name}
                    </Text>
                    <Text style={tw`text-red-600`}>
                      {touched.Last_Name&&errors.Last_Name}
                    </Text>
                </View>

                <View style={tw`flex-row text-center justify-center mx-6 `}>
                <TextInput
                  type="email"
                  placeholder="Email..."
                  style={tw`text-black w-1/2 bg-white h-12 rounded-2xl mx-2  p-2 `}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <TextInput
                  type="text"
                  placeholder="Phone_No.."
                  style={tw`text-black w-1/2 bg-white h-12 rounded-2xl mx-2  p-2 `}
                  value={values.Phone_No}
                  onChangeText={handleChange('Phone_No')}
                  onBlur={handleBlur('Phone_No')}
                  keyboardType="numeric"
                />
                </View>

                <View style={tw`flex-row text-center justify-between mx-6`}>  
                    <Text style={tw`text-red-600`}>
                      {touched.email&&errors.email}
                    </Text>
                    <Text style={tw`text-red-600`}>
                      {touched.Phone_No&&errors.Phone_No}
                    </Text>
                </View>

                <View style={tw`flex-row text-center justify-center mx-6 `}>
                <TextInput
                  type="password"
                  placeholder="password"
                  style={tw`text-black w-1/2 bg-white rounded-2xl mx-2 h-12  p-2 `}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                
                <TextInput
                  type="password"
                  placeholder="re_password"
                  style={tw`text-black w-1/2 bg-white rounded-2xl mx-2  h-12 p-2 `}
                  value={values.re_password}
                  onChangeText={handleChange('re_password')}
                  onBlur={handleBlur('re_password')}
                />
                </View>
  
                <View style={tw`flex-row text-center justify-between mx-6`}>  
                    <Text style={tw`text-red-600`}>
                      {touched.password&&errors.password}
                    </Text>
                    <Text style={tw`text-red-600`}>
                      {touched.re_password&&errors.re_password}
                    </Text>
                </View>

                <TouchableOpacity
                style={tw`text-white bg-blue-500 rounded-xl mt-2 p-2 mx-6`}
                >
                {isPending?<Text style={tw`text-white text-center font-bold`}>Registering...</Text>:<Text style={tw`text-white text-center font-bold`} onPress={handleSubmit}>SIgn up</Text>}
                </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={tw`flex-row m-2 text-center justify-center`}>
          <TouchableOpacity
            style={tw`m-2 m-2 bg-pink-700 p-2 rounded-xl  p-2 rounded-xl`}
            onPress={() => navigate("Loginpage")}
          >
            <Text style={tw`text-white`}>have an account log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

