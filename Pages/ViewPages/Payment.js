import React from 'react'
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function Payment (){
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor:'#011129',flex:1}}>
      <StatusBar style={"light"}/>
      <Pressable style={tw` w-14 mx-5 my-2 `}>
      <AntDesign name="menuunfold" size={30} color="white" onPress={()=>navigation.openDrawer()} style={tw`bg-yellow-500 m-auto p-2 rounded-3xl`} />
      </Pressable>
    </SafeAreaView>
);
}
