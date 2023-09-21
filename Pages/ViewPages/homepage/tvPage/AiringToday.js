import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import useFetchApi from "../../viewPagecustomehook/usePopularApi";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Popular from "../movieTvPage/components/PopularMovieList";
import PageCouter from "../movieTvPage/components/PageCounter";

export default function AiringToday () {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const language = "en";
  const buttomSheetModelRef = useRef();
  const MovieType = "airing_today";
  const type = "tv"
  function handlePresenrModel() {
    buttomSheetModelRef.current?.present();
  }

  const { data: Popularist } = useFetchApi({type, language, page, MovieType });

  const [selected, setSelected] = useState(1);
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#011129" }}>
      <StatusBar style={"light"} />
      {Popularist ? (
        <FlatList
          data={Popularist.results}
          scrollEnabled={false}
          containerCustomStyle={{ overflow: "visible" }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <Popular
                item={item}
                handlePresenrModel={handlePresenrModel}
              />
              <Text
                style={tw`border-b border-gray-500 rounded-lg mx-2 my-0`}
              ></Text>
            </>
          )}
        />
      ) : (
        <ActivityIndicator size="2xl" color="yellow" style={tw`m-20`} />
      )}
      <View style={tw`justify-center items-center`}>
        {Popularist && <PageCouter page={page} setPage={setPage} />}
      </View>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#011129",
  },
  opacitys: {
    opacity: 70,
  },
  opacityss: {
    opacity: 100,
  },
});
