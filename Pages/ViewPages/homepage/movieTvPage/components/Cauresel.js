import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const sliderWidth = Dimensions.get("window").width;
import tw from "tailwind-react-native-classnames";
export default function Cauresel({ item, handlePresenrModel, isPending }) {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageview}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${
              item.backdrop_path ? item.backdrop_path : item.poster_path
            }`,
          }}
          style={styles.image}
        />
      </View>
      <View style={tw`mx-2`}>
        <Text style={tw`text-yellow-500 text-lg h-8 pl-2 py-1`}>
          {truncate(`${item.title}`, 20)}
        </Text>
        <View style={tw`flex-row justify-between mx-2 `}>
          <View style={tw`bg-gray-900 px-2 rounded-lg`}>
            <Text style={tw`text-white px-1`}>release_date</Text>
            <Text style={tw`text-white`}> {item.release_date}</Text>
          </View>
          <View style={tw`bg-gray-900 px-2  items-center rounded-lg`}>
            <Text style={tw`text-white px-1`}>Vote count</Text>
            <Text style={tw`text-white flex`}>{item.vote_count}</Text>
          </View>
        </View>
        <View style={tw`w-full items-center`}>
          <Text
            style={tw`text-white text-lg font-bold bg-yellow-500 px-16 py-1 mt-2`}
            onPress={handlePresenrModel}
          >
            P L A Y
          </Text>
        </View>
      </View>
      <View
        style={tw`absolute bg-yellow-500 top-0 right-0 px-4 text-xl  font-bold py-2`}
      >
        <Text style={tw` text-white`}>
          <Text>premium</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 320,
    width: Dimensions.get("window").width * 0.6,
    backgroundColor: "#101f38",
    borderRadius: 10,
    position: "relative",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get("window").width * 0.58,
    height: 180,
    alignItems: "center",
    marginHorizontal: "auto",
    marginTop: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageview: {
    height: 180,
    width: Dimensions.get("window").width * 0.6,
    alignItems: "center",
  },
});
