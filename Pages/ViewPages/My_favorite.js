import { StatusBar } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useGetCommentFavorite from "./viewPagecustomehook/useGetCommentFavorite";
import { ScrollView } from "react-native-gesture-handler";
import useDeleteFavoriteWatch from "./viewPagecustomehook/useDeleteFavoriteWatch";
import Constant from "../../constant";
export default function My_favorite() {
  const navigation = useNavigation();

  const VideoType= [
    {id:1,type:"favorite" },
    {id:2,type:"watchlater"}
  ]
  const [selected, setSelected] = useState(1);
  const [selectedType, setSelectedType] = useState("favorite");
  const [deleted,setDeleted]=useState(null)
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const request = { url: `${Constant.url}/${selectedType}/addCreate/` };
  const {  data, isLoading } = useGetCommentFavorite(request);


  const requestconfig = {
    url: `${Constant.url}/${selectedType}/updateDelete/${deleted}/`,
  };

  const { isPending, removed, deleteFvorite } = useDeleteFavoriteWatch(requestconfig);
  const handlepress = (id) => {
    setDeleted(id);
    setTimeout(() => {
      deleteFvorite();
    }, 1000);
  };
  return (
    <ScrollView style={{ backgroundColor: "#011129", flex: 1 }}>
      <SafeAreaView>
        <StatusBar style={"light"} />
      <View style={tw`flex-row justify-between items-center w-full`}>
      <Pressable style={tw` w-14 mx-5 my-2 `}>
          <AntDesign
            name="menuunfold"
            size={30}
            color="white"
            onPress={() => navigation.openDrawer()}
            style={tw`bg-yellow-500 m-auto p-2 rounded-3xl`}
          />
        </Pressable>

        <View>
        <FlatList
          data={VideoType}
          containerCustomStyle={{ overflow: "visible" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            let isActive = item.id == selected;
            return (
              <View
                style={
                  isActive
                    ? tw` mx-1 mb-2 bg-red-500 border-gray-400 mt-3  rounded-3xl `
                    : tw` border-gray-400 mt-3   mx-1 mb-2 border-gray-400  rounded-3xl bg-gray-200`
                }
              >
                <Text
                  style={
                    isActive
                      ? tw`font-bold text-white px-4 py-2`
                      : tw`font-bold text-gray-500 px-4 py-2`
                  }
                  onPress={() => {
                    setSelected(item.id),setSelectedType(item.type);
                  }}
                >
                  {item.type}
                </Text>
              </View>
            );
          }}
        />
        </View>
      </View>

        <View>
          {data && (
            <FlatList
              data={data}
              scrollEnabled={false}
              containerCustomStyle={{ overflow: "visible" }}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={tw`w-full flex-row  bg-gray-800 p-1  mt-2 mx-2 rounded-lg`}
                >
                  <View style={tw`w-2/5 `}>
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/original/${
                          item.backdrop_path
                            ? item.backdrop_path
                            : item.poster_path
                        }`,
                      }}
                      style={styles.image}
                    />
                  </View>

                  <View style={tw`mx-2 w-3/5`}>
                    <View style={tw`flex-row justify-between mr-4`}>
                      <Text style={tw`text-yellow-500 text-lg h-8 py-1`}>
                        {truncate(`${item.title}`, 40)}
                      </Text>
                    </View>
                    <View style={tw`flex-row justify-between mt-14 mr-5`}>
                      <TouchableOpacity
                        style={tw`bg-red-500 w-20 items-center rounded`}
                        onPress={() =>
                          navigation.navigate("PlayMovie", {
                            title: item.title,
                            MovieId: item.MovieId,
                            poster_path: item.poster_path,
                            backdrop_path: item.backdrop_path,
                          })
                        }
                      >
                        <Text style={tw`text-gray-300 py-2 font-bold`}>
                          P L A Y
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={tw`bg-red-500 w-20 items-center rounded`}
                        onPress={() => handlepress(item.id)}
                      >
                        <Text style={tw`text-gray-300 py-2 font-bold`}>
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
          {isLoading && (
            <ActivityIndicator size="2xl" color="yellow" style={tw`m-20`} />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    backgroundColor: "#101f38",
    borderRadius: 10,
    position: "relative",
    marginHorizontal: 10,
  },
  image: {
    width: "auto",
    height: 130,
    alignItems: "center",
    marginHorizontal: "auto",
    paddingVertical: 2,
    borderRadius: 10,
  },
});
