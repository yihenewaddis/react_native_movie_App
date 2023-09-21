import React, { useState } from "react";
import {
  Dimensions,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Alert,
  Share,
} from "react-native";
import useGetvideoApi from "../../viewPagecustomehook/useGetvideoApi";
import YoutubeIframe from "react-native-youtube-iframe";
import { ScrollView } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";
import Favorite from "./components/Favorite";
import WatchLater from "./components/WatchLater";
import Report from "./components/Report";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Coments from "./components/Coments";
export default function Play({ route }) {
  const { title, MovieId, poster_path, backdrop_path } = route.params;
  const type = "movie";
  const width = Dimensions.get("window").width;
  const { errorMessage, isPending, data } = useGetvideoApi(MovieId);
  const [visible, setVisible] = useState(true);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://www.youtube.com/watch?v=${data.results[0].key}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("shared with activity type of" + result.activityType);
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("dismissed");
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#011129",
      }}
    >
      <ActivityIndicator
        size="2xl"
        color="yellow"
        style={tw`top-20 right-40 absolute `}
      />
      {data && (
        <YoutubeIframe
          width={width}
          height={width * 0.58}
          play={true}
          videoId={data.results[1]?.key ? data.results[0].key : "h2IKoonFHJc"}
        />
      )}
      {errorMessage && (
        <Text style={tw`text-white text-xl font-bold`}>{errorMessage}</Text>
      )}

      {data&&<View style={tw`flex-row items-center justify-center mx-5 `}>
        <Favorite
          title={title}
          MovieId={MovieId}
          poster_path={poster_path}
          backdrop_path={backdrop_path}
        />
        <WatchLater
          title={title}
          MovieId={MovieId}
          poster_path={poster_path}
          backdrop_path={backdrop_path}
        />
        <Pressable
          style={tw`flex-row bg-gray-800 justify-center items-center  rounded-lg px-2 py-1 `}
          onPress={() => setVisible(!visible)}
        >
          <MaterialIcons name="report" size={24} color="#fc9803" />
          <Text style={tw`text-gray-300 pl-1 text-sm`}>Report</Text>
        </Pressable>
        <Pressable
          style={tw`flex-row bg-gray-800 justify-center ml-1 items-center  rounded-lg px-2 py-1 `}
          onPress={() => onShare()}
        >
          <FontAwesome name="share" size={25} color="#fc9803" />
          <Text style={tw`text-gray-300 pl-1 text-sm`}>Share</Text>
        </Pressable>
      </View>}
      <View style={tw`bg-gray-800 mx-2 mt-2 rounded-lg`}>
        <Report
          title={title}
          MovieId={MovieId}
          visible={visible}
          setVisible={setVisible}
        />
      </View>
      {data&&<Coments title={title} MovieId={MovieId} />}
    </ScrollView>
  );
}
