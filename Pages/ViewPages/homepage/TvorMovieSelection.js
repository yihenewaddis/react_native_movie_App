import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { setType } from "../../../Redux/slice/userSlice";
export default function Selection() {
  const dispatch = useDispatch()
  const { navigate } = useNavigation();
  const navigation = useNavigation();

  return (
    <ScrollView style={{ backgroundColor: "#011129", flex: 1 }}>
      <StatusBar style={"light"} />
      <View style={styles.topView}>
        <ImageBackground
          source={require("../../../assets/netflix.png")}
          style={tw`w-full h-full rounded-lg`}
        >
      
        </ImageBackground>
      </View>

      <View
        style={{
          position: "absolute",
          top: 560,
          flex: 1,
          alignItems: "center",
          width: 360,
        }}
      >
        <View style={tw`w-full  items-center`}>
          <TouchableOpacity  activeOpacity={0.7}
            style={{
              backgroundColor: "#050b26",
              width: 280,
              flex: 1,
              alignItems: "center",
              borderRadius: 10,
              padding: 10,
            }}
            onPress={() => {dispatch(setType("movie")),navigate("Movie")}}
          >
            <Text style={{fontSize:35,fontWeight:"bold",color:'#eb0c05',}}>
              Movie        {<Ionicons name="ios-arrow-forward-circle-outline" size={35} color="#eb0c05" style={tw`mt-8 font-bold`} />}
            </Text>
          </TouchableOpacity>
          <View style={tw`w-full items-center mt-3`}>
        <TouchableOpacity   activeOpacity={0.7}
       style={{
        backgroundColor: "#050b26",
        width: 280,
        flex: 1,
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
      }}
          onPress={() =>{dispatch(setType("tv")), navigate("tv")}}
        >
        
          <Text style={{fontSize:35,fontWeight:"bold",color:'#eb0c05',}}>Tv series   {<Ionicons name="ios-arrow-forward-circle-outline" size={35} color="#eb0c05" style={tw`mt-8`} />}</Text>
        </TouchableOpacity>
      </View>
        </View>
      </View>

      <View style={tw`flex-row justify-between items-center absolute w-full `}>
        <TouchableOpacity style={tw` w-14 mx-5 mt-10 mb-2 `}>
          <Entypo
            name="menu"
            size={33}
            color="white"
            onPress={() => navigation.openDrawer()}
            style={tw`bg-black m-auto p-2 font-bold rounded-3xl`}
          />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/logo.png")}
          style={tw`w-36 h-10 mr-5 mt-14 mb-2  `}
        />
      </View>
      <View>
          <View style={tw`flex-1 flex-row mx-3 mt-4`}>
            <View style={tw`w-3/5 bg-black m-2 rounded-lg items-center p-2`}>
              <Text style={tw`text-yellow-600 text-3xl font-bold`}>1855</Text>
              <Text style={tw`text-white font-bold`}>Now Playing Movie</Text>
            </View>
            <View style={tw`w-2/5 bg-black rounded-lg mx-2 items-center`}>
              <Text style={tw`text-yellow-600 text-3xl font-bold`}>798360</Text>
              <Text style={tw`text-white font-bold`}>Popular movie</Text>
            </View>
          </View>

          <View style={tw`flex-1 flex-row mx-3 `}>
            <View style={tw`w-2/5 bg-black mx-2 rounded-lg items-center p-2`}>
              <Text style={tw`text-yellow-600 text-3xl font-bold`}>1145</Text>
              <Text style={tw`text-white font-bold`}>Top Rated Movie</Text>
            </View>
            <View style={tw`w-3/5 bg-black rounded-lg m-2 items-center`}>
              <Text style={tw`text-yellow-600 text-3xl font-bold`}>544</Text>
              <Text style={tw`text-white font-bold`}>Up coming Movie</Text>
            </View>
          </View>

          <View style={tw`flex-1 flex-row mx-3 mt-1`}>
            <View style={tw`w-3/5 bg-black m-2 rounded-lg items-center p-2`}>
              <Text style={tw`text-yellow-600 text-3xl font-bold`}>315</Text>
              <Text style={tw`text-white font-bold`}>Airing Today tv Series</Text>
            </View>
            <View style={tw`w-2/5 bg-black rounded-lg mx-2 items-center`}>
              <Text style={tw`text-yellow-600 text-3xl font-bold`}>1095</Text>
              <Text style={tw`text-white font-bold`}>On The Air Tv</Text>
              <Text style={tw`text-white font-bold`}>series</Text>
            </View>
          </View>

          <View style={tw`flex-1 flex-row mx-3 `}>
            <View style={tw`w-2/5 bg-black mx-2 rounded-lg items-center p-2`}>
              <Text style={tw`text-yellow-600 text-3xl font-bold`}>154923</Text>
              <Text style={tw`text-white font-bold`}>Popular Tv Series</Text>
            </View>
            <View style={tw`w-3/5 bg-black rounded-lg m-2 items-center`}>
              <Text style={tw`text-yellow-600 text-3xl font-bold`}>2996</Text>
              <Text style={tw`text-white font-bold`}>Top Rated Tv Series</Text>
            </View>
          </View>
      </View>
  
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  topView: {
    width: "full",
    height: 750,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  welcometext: {
    alignItems: "center",
    marginTop: 150,
  },
  flatlistcontainer: {
    backgroundColor: "black",
    margin: 5,
    textAlign: "center",
    borderRadius: 10,
    marginTop: 20,
    marginBottom:30
  },
});
