import React from "react";
import { Text, View, SafeAreaView, ImageBackground, Image, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from 'yup'
import { useState } from "react";
import axios from "axios";
axios
const LoginSchema=yup.object({
  email:yup.string()
            .email('invalid email')
            .required('required field')
})

export default function Forgot_password (){
  const [body,setbody]=useState(null)
    const change_password = () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      axios
        .post("http://192.168.137.200:8000/auth/users/reset_password/", body, config)
        .then((response) => {
          Alert.alert("go to your email and reset password");
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    };
    const { navigate } = useNavigation();
    return (
        <ImageBackground
        source={require("../../assets/netflix.png")} style={tw`w-full h-full`}>

      <Image
        source={require("../../assets/logo.png")}
        style={tw`w-36 m-5 h-10`}
      />

      <SafeAreaView style={tw`flex`}>
        <Text style={tw`text-white w-full h-2/3`}></Text>
        <Text style={tw`w-full opacity-90 h-1/3 bg-pink-700 rounded-t-2xl `}>
        </Text>
      </SafeAreaView>

      <View style={tw`w-80 rounded-2xl mx-4 h-60 opacity-90 bg-black absolute bottom-16`}>
        <Formik
        initialValues={{email:''}}
        validationSchema={LoginSchema}
        onSubmit={(values)=>{
          setbody(JSON.stringify(values))
          change_password()
        }}>
          {({values, handleChange,handleSubmit,errors,touched,handleBlur})=>(
          <View>
              <TextInput
              type="email"
              placeholder="email address"
              style={tw`text-black bg-white rounded-2xl mt-6 p-2 mx-10 `}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              />

              <Text style={tw`text-red-600 mx-12`}>
                {touched.email&&errors.email}
              </Text>

              <TouchableOpacity style={tw`text-white bg-blue-500  rounded-xl p-2 mx-10`}>
                <Text style={tw`text-white text-center font-bold`} onPress={handleSubmit}>
                  Reset Password
                </Text>
              </TouchableOpacity>

          </View>
          )}
        </Formik>

        <View style={tw`mx-10 my-12`}>

          <TouchableOpacity style={tw`bg-pink-700 p-2 rounded-xl  p-2 `}
            onPress={() => navigate("Loginpage")}>
            <Text style={tw`text-white  text-center`}>Go back</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
    )
}
