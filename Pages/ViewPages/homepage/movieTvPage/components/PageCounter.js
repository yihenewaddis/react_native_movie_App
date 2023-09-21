import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
export default function PageCouter({ page, setPage }) {
  return (
    <View style={tw`flex-row  mt-10 mb-4 items-center`}>
      <View>
        {page > 1 ? (
          <TouchableOpacity
            style={tw`text-white bg-yellow-500 px-4 mr-4 py-2 rounded-lg`}
            onPress={() => setPage(page - 1)}
          >
            <Text>previous</Text>
          </TouchableOpacity>
        ) : (
          <MaterialIcons
            name="dangerous"
            size={30}
            color="#f7af05"
            style={tw`mr-4`}
          />
        )}
      </View>
      <Text style={tw`text-white`}>{page}</Text>
      <View>
        {page < 11 ? (
          <TouchableOpacity
            style={tw`text-white bg-yellow-500 ml-4 px-4 py-2 rounded-lg`}
            onPress={() => setPage(page + 1)}
          >
            <Text>Next</Text>
          </TouchableOpacity>
        ) : (
          <MaterialIcons
            name="dangerous"
            size={35}
            color="#f7af05"
            style={tw`ml-4`}
          />
        )}
      </View>
    </View>
  );
}
