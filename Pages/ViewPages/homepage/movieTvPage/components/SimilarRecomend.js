import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import useSimilarRecomend from "../../../viewPagecustomehook/useGetSimRecomApi";
import Popular from "./PopularMovieList";
export default function SimilarRecomend({ id, language }) {
  const [selected, setSelected] = useState(0);
  const movieSimilar = [
    { id: 0, type: "Similar" },
    { id: 1, type: "Recomendation" },
  ];
  const movieSimilarlist = [
    { id: 0, type: "similar" },
    { id: 1, type: "recommendations" },
  ];
  const type = movieSimilarlist[selected].type;
  const { errorMessage, isPending, data } = useSimilarRecomend({
    id,
    language,
    type,
  });
  const endPoint = 1;
  return (
    <View>
      <View style={tw`w-full justify-around  my-4 items-center`}>
        <FlatList
          data={movieSimilar}
          containerCustomStyle={{ overflow: "visible" }}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            let isActive = item.id == selected;
            return (
              <View>
                {data && (
                  <TouchableOpacity
                    style={
                      isActive
                        ? tw`bg-yellow-600 rounded-lg mx-2`
                        : tw`bg-gray-800 rounded-lg`
                    }
                    onPress={() => setSelected(item.id)}
                  >
                    <Text
                      style={
                        isActive
                          ? tw`text-black font-bold px-8 py-2`
                          : tw`text-yellow-500 font-bold px-8 py-2`
                      }
                    >
                      {item.type}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
        />
      </View>
      {!isPending && data ? (
        <FlatList
          data={data.results}
          scrollEnabled={false}
          containerCustomStyle={{ overflow: "visible" }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <Popular item={item} endPoint={endPoint} />
              <Text
                style={tw`border-b border-gray-500 rounded-lg mx-2 my-0`}
              ></Text>
            </>
          )}
        />
      ) : (
        <ActivityIndicator size="2xl" color="yellow" style={tw`m-40`} />
      )}

      {errorMessage && (
        <Text style={tw`text-white font-bold text-3xl`}>{errorMessage}</Text>
      )}
    </View>
  );
}
