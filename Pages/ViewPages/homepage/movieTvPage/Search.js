import React, { Component, useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import useSearch from "../../viewPagecustomehook/useSearch";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import Popular from "./components/PopularMovieList";
import { MaterialIcons } from "@expo/vector-icons";
export default function Search() {
  const [query, setQuery] = useState("");
  const [page,setPage]=useState(1)
  const { errorMessage, isPending, data, search } = useSearch({page,query});
  const handleTextChange = (text) => {
    setQuery(text);
  };
  
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: "#011129", flex: 1 }}>
      <ScrollView>
      <StatusBar style={"light"} />
      <View style={tw`flex-row items-center w-full mx-2 mt-2 mb-4`}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="white"
          style={tw`mr-1 bg-black p-1 rounded-xl`}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={tw`text-white border pl-2 border-yellow-500 h-10 rounded-lg w-4/6`}
          placeholder="serach..."
          placeholderTextColor="white"
          onChangeText={handleTextChange}
        />
        <TouchableOpacity onPress={() => search()}>
          <Text
            style={tw`text-white text-xl ml-2 bg-yellow-500 rounded-lg py-1 px-1`}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {data && (
        <FlatList
          data={data.results}
          scrollEnabled={false}
          containerCustomStyle={{ overflow: "visible" }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <Popular item={item} />
              <Text
                style={tw`border-b border-gray-500 rounded-lg mx-2 my-0`}
              ></Text>
            </>
          )}
        />
      )}

      {(!data&&isPending) && (
        <ActivityIndicator size="2xl" color="yellow" style={tw`m-20`} />
      )}
        {data&&<View style={tw`flex-row  mt-10 mb-4 items-center justify-center`}>
    <View>
      {page > 1 ? (
        <TouchableOpacity
          style={tw`text-white bg-yellow-500 px-4 mr-4 py-2 rounded-lg`}
          onPress={() => {setPage(page - 1),setTimeout(() => {
            search()
          }, 1000);}}
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
      {page+1 <= data.total_pages? (
        <TouchableOpacity
          style={tw`text-white bg-yellow-500 ml-4 px-4 py-2 rounded-lg`}
          onPress={() => {setPage(page + 1),setTimeout(() => {
            search()
          }, 1000)}}
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
  </View>}
      </ScrollView>
    </SafeAreaView>
  );
}
