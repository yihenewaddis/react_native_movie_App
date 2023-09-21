import React from "react";
import { Text, View, useRef, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import useGetDetailApi from "../../viewPagecustomehook/useGetDetail";
import DetailMovieCard from "./components/DetailMovieCard";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import SimilarRecomend from "./components/SimilarRecomend";
export default function Detail({ route }) {
  const language = useSelector((state) => state.user.language);
  const item = route.params.selectedObject;
 
  const id = item.id;
  const { errorMessage, isPending, data } = useGetDetailApi({ id, language });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#011129" }}>
      <StatusBar style={"light"} />
      {data ? (
        <DetailMovieCard data={data} />
      ) : (
        <ActivityIndicator size="2xl" color="yellow" style={tw`m-40`} />
      )}
      <SimilarRecomend id={id} language={language} />
    </ScrollView>
  );
}
