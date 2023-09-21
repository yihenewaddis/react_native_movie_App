import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
export default function TvPage() {
    return (
      <SafeAreaView style={{backgroundColor:'#011129',flex:1}}>
        <StatusBar style={"light"}/>
        <Text style={tw`text-white`}> textInComponent </Text>
      </SafeAreaView>
    )
}
