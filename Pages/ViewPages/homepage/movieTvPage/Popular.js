import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import useFetchApi from "../../viewPagecustomehook/usePopularApi";
import Cauresel from "./components/Cauresel";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import useUpcomingApi from "../../viewPagecustomehook/useUpcomingApi";
import { setLanguage } from "../../../../Redux/slice/userSlice";
import Popular from "./components/PopularMovieList";
import PageCouter from "./components/PageCounter";
import axios from "axios";
export default function PopularMovie() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.user.language);
  const buttomSheetModelRef = useRef();
  const [page, setPage] = useState(1);
  const [cliked,setClicked]=useState(false)
  const MovieType = "popular";
  function handlePresenrModel() {
    buttomSheetModelRef.current?.present();
  }
  const [upcomingPage, setUpcoming] = useState(1);
  const snapPoint = ["50%", "75%", "85%", "95%"];
  const {
    errorMessage,
    isPending,
    data: movieList,
  } = useUpcomingApi({ language, upcomingPage });
  const { data: Popularist } = useFetchApi({ language, page, MovieType });

  const [selected, setSelected] = useState(1);
  const languageList = [
    { id: 1, language: "english", short: "en" },
    { id: 2, language: "Japan", short: "ja" },
    { id: 3, language: "Spain", short: "es" },
    { id: 4, language: "Koria", short: "ko" },
    { id: 5, language: "Poland", short: "pl" },
    { id: 6, language: "Nether land", short: "nl" },
    { id: 7, language: "Italy", short: "it" },
    { id: 8, language: "France", short: "fr" },
    { id: 9, language: "United_Kingdom", short: "uk" },

  ];



  const type = "movie"
  return (
    <BottomSheetModalProvider>
      <ScrollView style={{ flex: 1, backgroundColor: "#011129" }}>
        <StatusBar style={"light"} />
        <FlatList
          data={languageList}
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
                    setSelected(item.id), dispatch(setLanguage(item.short));
                  }}
                >
                  {item.language}
                </Text>
              </View>
            );
          }}
        />

        {movieList ? (
          <FlatList
            data={movieList.results}
            containerCustomStyle={{ overflow: "visible" }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Cauresel
                item={item}
                handlePresenrModel={handlePresenrModel}
                isPending={isPending}
              />
            )}
          />
        ) : (
          <ActivityIndicator size="2xl" color="yellow" style={tw`m-20`} />
        )}

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
                  isPending={isPending}
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

        <BottomSheetModal
          ref={buttomSheetModelRef}
          index={0}
          snapPoints={snapPoint}
          backgroundStyle={{ borderRadius: 30, backgroundColor: "white" }}
        >
        <Pressable>
          <Text>button</Text>
        </Pressable>
        </BottomSheetModal>
      </ScrollView>
    </BottomSheetModalProvider>
  );
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
