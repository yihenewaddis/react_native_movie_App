import React, { useState } from "react";
import { Text, View, SafeAreaView, ImageBackground, Image,Pressable } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from 'yup'
import constant from '../../constant'
import useRegisterHook from "./RegisterCustomeHook/useRegisterHook";
const LoginSchema=yup.object({
  email:yup.string()
            .email('invalid email')
            .required('required field'),
  password:yup.string()
              .min(8,'password should above 8 character')
              .max(16,'password should below 16 character')
              .required('required field')
})
export default function Login() {
  const { navigate } = useNavigation();
  const [LoginData,setLogindata]=useState(null)
  const requestConfig = {
    url: `${constant.url}/auth/jwt/create/`,
    body: LoginData,
    config: {headers: { "Content-Type": "application/json",}, }
  };

  const {errorMessage,isPending,Register}=useRegisterHook(requestConfig)
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

      <View style={tw`w-80 rounded-2xl mx-4 h-72 opacity-90 bg-black absolute bottom-16`}>
        <Formik
        initialValues={{email:'',password:''}}
        validationSchema={LoginSchema}
        onSubmit={(values)=>{
          setLogindata(JSON.stringify(values))
          Register()
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

              <TextInput
              type="password"
              placeholder="password"
              style={tw`text-black bg-white rounded-2xl p-2 mx-10`}
              value={values.password}
              secureTextEntry={false}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              />
            
              <Text style={tw`text-red-600 mx-12`}>
                {touched.password&&errors.password}
              </Text>

              <Pressable style={tw`text-white bg-blue-500 rounded-xl p-2 mx-10`}>
                <Text style={tw`text-white text-center font-bold`} onPress={handleSubmit}>
                {isPending?"Logading":"Log in"}
                </Text>
              </Pressable>
              <Text style={tw`text-red-600 mx-10`}>{errorMessage}</Text>
          </View>
          )}
        </Formik>

        <View style={tw`flex-row m-2 text-center justify-center`}>

          <TouchableOpacity style={tw`m-2 m-2 bg-pink-700 p-2 rounded-xl  p-2 rounded-xl`}
            onPress={() => navigate("Signuppage")}>
            <Text style={tw`text-white`}>Create new account</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={tw`m-2 m-2 bg-pink-700 p-2 rounded-xl  p-2 rounded-xl`} onPress={()=>navigate("Forgotpassword")}>
            <Text style={tw`text-white`}>forgot Password</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}
