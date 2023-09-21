import React, { Component, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import { setLanguage } from "../../../../../Redux/slice/userSlice";
import { useDispatch } from "react-redux";
export default function Language({ item, isActiv, setSelected }) {
  const dispatch = useDispatch();
  return (
    <View style={isActiv ? tw`pb-4 bg-yellow-500` : tw` bg-gray-500`}>
      <Text
        style={isActiv ? tw`text-white p-2` : tw`text-black p-2`}
        onPress={() => setSelected(item.id)}
      >
        {item.language}
      </Text>
    </View>
  );
}
