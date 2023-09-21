import React, { Component } from "react";
import { Text, View, Pressable } from "react-native";
import useFavoriteWatch from "../../../viewPagecustomehook/useFavoriteWatch";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
export default function Favorite({
  title,
  MovieId,
  poster_path,
  backdrop_path,
}) {
  const requestConfig = {
    url: "http://192.168.43.26:8000/favorite/addCreate/",
    body: JSON.stringify({
      title: title,
      MovieId: MovieId,
      poster_path: poster_path,
      backdrop_path: backdrop_path,
    }),
  };

  const { added, isPending: pending, Add } = useFavoriteWatch(requestConfig);
  return (
    <Pressable
      style={tw`flex-row bg-gray-800 justify-center  items-center  rounded-lg px-1 py-1`}
      onPress={() => Add()}
    >
      {added ? (
        <MaterialIcons name="favorite" size={25} color="#fc9803" />
      ) : (
        <MaterialIcons name="favorite-border" size={25} color="#fc9803" />
      )}
    </Pressable>
  );
}
