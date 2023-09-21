import React, { Component, useState } from "react";
import { Image, Text, View, StyleSheet, Linking, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
export default function DetailMovieCard({ data }) {
  const navigation = useNavigation();
  const handleButtonPress = async () => {
    const url = `${data.homepage}`;
    const isSupported = await Linking.canOpenURL(url);
    if (isSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Cannot open the website");
    }
  };
  return (
    <View style={tw`flex-1`}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${
            data.backdrop_path ? data.backdrop_path : data.poster_path
          }`,
        }}
        style={tw`w-full h-96`}
      ></Image>
      <View>
        <View style={styles.titleover}>
          <AntDesign
            name="play"
            size={55}
            color="#fcf003"
            style={{ position: "absolute", top: -30 }}
            onPress={() =>
              navigation.navigate("PlayMovie", {
                title: data.title,
                MovieId: data.id,
                poster_path: data.poster_path,
                backdrop_path: data.backdrop_path,
              })
            }
          />

          <Ionicons
            name="ios-arrow-back"
            size={40}
            color="#fc9803"
            style={{
              position: "absolute",
              top: -320,
              left: 20,
              backgroundColor: "black",
              padding: 4,
              borderRadius: 40,
            }}
            onPress={() => navigation.goBack()}
          />

          <View style={{ position: "absolute", top: -15, right: 8 }}>
            {data.genres && (
              <Text style={tw`bg-yellow-500 px-2 py-1 rounded-lg  font-bold`}>
                {data.genres[0].name}
              </Text>
            )}
          </View>
          <Text style={tw`text-yellow-500 items-center text-xl font-bold`}>
            {data.title}
          </Text>
          <Text style={tw`text-gray-300 font-bold px-2`}>{data.overview}</Text>
          <View>
            {data.production_countries[0]?.name && (
              <Text style={tw`text-yellow-500 font-bold px-2`}>
                - at {data.release_date} in {data.production_countries[0].name}
              </Text>
            )}
            <Text style={tw`text-white font-bold text-yellow-500 px-2 `}>
              - they used {data.budget}$ budget and Got around {data.revenue}{" "}
              revenue
            </Text>
            <Text style={tw`text-white text-yellow-500 px-2 `}>
              - this movie have around {data.vote_count} vote count and{" "}
              {data.vote_average} vote average
            </Text>

            <TouchableOpacity
              style={tw`bg-yellow-400  mx-2 rounded-lg my-2 items-center`}
              onPress={() => handleButtonPress()}
            >
              <Text style={tw` px-4 py-2 font-bold `}>
                Visit company website
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  titleover: {
    textAlign: "center",
    alignItems: "center",
    marginTop: -30,
    backgroundColor: "#011129",
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingTop: 30,
  },
});
