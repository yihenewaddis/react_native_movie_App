import React, { Component, useState } from "react";
import {
  Pressable,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import useFavoriteWatch from "../../../viewPagecustomehook/useFavoriteWatch";
import useGetCommentFavorite from "../../../viewPagecustomehook/useGetCommentFavorite";
import { TextInput } from "react-native-gesture-handler";
import constant from "../../../../../constant";
export default function Coments({ title, MovieId }) {
  const [content, setContent] = useState("");
  const requestConfig = {
    url: `${constant.url}/comment/addCreate/`,
    body: JSON.stringify({
      title: title,
      movie_id: MovieId,
      movie_comment: content,
      replay: "",
    }),
  };

  const request = {
    url: `${constant.url}/comment/list/${MovieId}/`,
  };
  const handleTextChange = (text) => {
    setContent(text);
  };
  const { isPending, Add, added } = useFavoriteWatch(requestConfig);
  const { isLoading, addedcoment, data } = useGetCommentFavorite(request);
  const handlePress = () => {
    Add();
  };
  return (
    <View style={tw`ml-2 mb-10  bg-gray-900 rounded p-2`}>
      <Text style={tw`text-gray-400 text-xl  font-bold`}> coments </Text>
      <View style={tw`flex-row items-center mb-3`}>
        <TextInput
          multiline={true}
          placeholder="whrite your coment "
          value={content}
          style={{
            backgroundColor: "gray",
            color: "black",
            borderRadius: 5,
            marginTop: 5,
            borderColor: "black",
            borderWidth: 1,
            padding: 4,
            width: 250,
          }}
          onChangeText={handleTextChange}
        />
        <Pressable>
          {isPending ? (
            <Text
              style={tw`text-white bg-yellow-500 mx-2 mt-1 px-3 py-2 rounded`}
            >
              Sending...
            </Text>
          ) : (
            <Text
              style={tw`text-white bg-yellow-500 mx-2 mt-1 px-3 py-2 rounded`}
              onPress={handlePress}
            >
              Send
            </Text>
          )}
        </Pressable>
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
              <View>
                <Text
                  style={tw`text-white ml-1 mt-2 bg-gray-700 w-64 rounded py-1 px-2`}
                >
                  {item.movie_comment} at {item.date_posted}
                </Text>
                {item.replay == "None" ? (
                  ""
                ) : (
                  <Text
                    style={tw`text-white ml-32 bg-gray-800 mb-2 mt-1 w-52 rounded py-1 px-2`}
                  >
                    {item.replay}
                  </Text>
                )}
              </View>
            )}
          />
        )}
        {isLoading&&<ActivityIndicator size="2xl" color="yellow" style={tw`m-20`} />}
        {added ? (
          <Text
            style={tw`text-white ml-1 mt-2 bg-gray-600 w-52 rounded py-1 px-2`}
          >
            {content}
          </Text>
        ) : (
          ""
        )}
      </View>
    </View>
  );
}
