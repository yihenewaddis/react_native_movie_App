import React, { Component } from "react";
import { Text, View, Pressable } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import useFavoriteWatch from "../../../viewPagecustomehook/useFavoriteWatch";
import constant from "../../../../../constant";
export default function WatchLater({
  title,
  MovieId,
  poster_path,
  backdrop_path,
}) {
  const requestConfig = {
    url: `${constant.url}/watchlater/addCreate/`,
    body: JSON.stringify({
      Movie_id: MovieId,
      title: title,
      description: backdrop_path,
      poster_path: poster_path,
    }),
  };
  const { added, isPending: pending, Add } = useFavoriteWatch(requestConfig);
  return (
    <Pressable
      style={tw`flex-row bg-gray-800 justify-center mx-1 items-center  rounded-lg px-2 py-1`}
      onPress={() => Add()}
    >
      {added ? (
        <MaterialIcons name="watch-later" size={25} color="#fc9803" />
      ) : (
        <MaterialIcons name="watch-later" size={25} color="white" />
      )}
      <Text style={tw`text-gray-300 pl-1 text-sm`}>Watch Later</Text>
    </Pressable>
  );
}
