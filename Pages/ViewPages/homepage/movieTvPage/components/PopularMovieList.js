import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const sliderWidth = Dimensions.get("window").width;
import tw from "tailwind-react-native-classnames";
export default function Popular({ item, endPoint }) {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={tw`w-full flex-row  bg-gray-800 p-1  mt-2 mx-2 rounded-lg`}
      onPress={() =>
        navigation.navigate(
          endPoint == 1 ? "MovieDetail" : "NestedMovieDetail",
          { selectedObject: item }
        )
      }
    >
      <View style={tw`w-2/5 `}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${
              item.backdrop_path ? item.backdrop_path : item.poster_path
            }`,
          }}
          style={styles.image}
        />
      </View>

      <View style={tw`mx-2 w-3/5`}>
        <View style={tw`flex-row justify-between mr-4`}>
          {item.title?<Text style={tw`text-yellow-500 text-lg h-8 py-1`}>
            {truncate(`${item.title}`, 20)}
          </Text>:<Text style={tw`text-yellow-500 text-lg h-8 py-1`}>
            {truncate(`${item.name}`, 20)}
          </Text>}
          <Text style={tw`bg-yellow-500 text-gray-200 rounded-3xl px-1 py-1`}>
            {item.original_language}
          </Text>
        </View>
        <Text style={tw`text-gray-400 h-8 flex pr-1`}>
          {truncate(`${item.overview}`, 30)}
        </Text>

        <Text style={tw`text-gray-300`}>Vote Avarage {item.vote_average}</Text>
        <Text style={tw`text-gray-300`}>vote count {item.vote_count}</Text>
        <Text style={tw`text-yellow-300`}>
          release date {item.release_date}
        </Text>
      </View>
    </TouchableOpacity>
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
