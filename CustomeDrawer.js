import React from "react";
import {
  Text,
  View,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch} from "react-redux";
import { Logout } from "./Redux/slice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function CustomeDrawer(props) {
  const dispatch = useDispatch();
  const removeItemFromStorage = async () => {
    try {
      await AsyncStorage.removeItem("access");
      await AsyncStorage.removeItem("refresh");
      dispatch(Logout());
    } catch (error) {
      Alert.alert("Cant't be log out")
    }
  };
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor:"#0a3263"}}
      >
        <View>
          <Image
            source={require("./assets/avatar.png")}
            style={styles.images}
          />
        </View>
        <Text style={tw`mx-10 text-white text-2xl`}>yihenew addis</Text>
        <Text style={tw`mx-10 text-white`}>09-89025224</Text>
        <View style={{ backgroundColor:'#041014',flex:1}}>
          <DrawerItemList {...props} >

          </DrawerItemList>
        </View>
      </DrawerContentScrollView>
      <View>
        <TouchableOpacity
          style={tw`p-4 border-t rounded-t-xl border-purple-700 flex-row`}
          onPress={() => removeItemFromStorage()}
        >
          <MaterialCommunityIcons name="logout" size={24} color={"white"} />
          <Text style={{color:"white", paddingLeft: 10, fontSize: 15 }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flex:1,
    backgroundColor:'#041014'
  },
  images: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginLeft: 40,
    borderColor: "black",
  },
});
