import {
NavigationContainer, useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Pages/Register/Login";
import Signup from "./Pages/Register/Signup";
import Forgot_password from "./Pages/Register/Forgot_password";
import { useSelector, useDispatch } from "react-redux";
import { useLayoutEffect } from "react";
import { Login_ok } from "./Redux/slice/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App_feedback from "./Pages/ViewPages/App_feedback";
import My_favorite from "./Pages/ViewPages/My_favorite";
import Payment from "./Pages/ViewPages/Payment";
import CustomeDrawer from "./CustomeDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Selection from "./Pages/ViewPages/homepage/TvorMovieSelection";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Detail from "./Pages/ViewPages/homepage/movieTvPage/Detail";
import Search from './Pages/ViewPages/homepage/movieTvPage/Search';
import Nowplayingmovie from "./Pages/ViewPages/homepage/movieTvPage/Nowplaying";
import Play from './Pages/ViewPages/homepage/movieTvPage//Play'
import PopularMovie from './Pages/ViewPages/homepage/movieTvPage/Popular'
import Topratedmovie from './Pages/ViewPages/homepage/movieTvPage/Toprated'
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NestedDetail from "./Pages/ViewPages/homepage/movieTvPage/NestedDetail"; 
import AiringToday from "./Pages/ViewPages/homepage/tvPage/AiringToday";
import OnTheAir from "./Pages/ViewPages/homepage/tvPage/OnTheAir";
import Populartv from "./Pages/ViewPages/homepage/tvPage/Popular";
import TopRated from './Pages/ViewPages/homepage/tvPage/TopRated'
      // bottom tab for the movie page
      const BottomTabMovie = createBottomTabNavigator();
    function MyTabs() {
      const navigation = useNavigation()
      const {navigate} = useNavigation()

      return (
      <BottomTabMovie.Navigator screenOptions={{
      headerLeft:()=>(
      <AntDesign name="back" size={30} color="white" 
      onPress={()=>navigation.goBack()} style={{marginLeft:15}}/>),

      headerRight:()=>(
      <FontAwesome name="search-plus" size={27} color="white" style={{
      marginRight:15
      }} onPress={()=>navigation.navigate('Sarchmovie',{type:"movie"})}/>
      ),
      headerTitleAlign:'center',
      headerTintColor:'#f7a705',
      headerStyle:{
      backgroundColor:'#011129',
      },
      tabBarActiveTintColor:'#f7a705',
      tabBarInactiveTintColor:'white',
      tabBarStyle:{
          backgroundColor:'#011129',
          padding:5
      }
      }}>
      <BottomTabMovie.Screen name="Popular" component={PopularMovie} options={{
        tabBarIcon:({color})=>(
      <MaterialCommunityIcons name="flower-poppy" size={30} color={color} />
        )
      }}/>
      <BottomTabMovie.Screen name="Top_Rated" component={Topratedmovie}  options={{
        tabBarIcon:({color})=>(
          <AntDesign name="totop" size={30} color={color} />
        )
      }}/>
      <BottomTabMovie.Screen name="Now_Playing" component={Nowplayingmovie} options={{
        tabBarIcon:({color})=>(
          <Entypo name="laptop" size={30} color={color} />
        )
      }}/>
      </BottomTabMovie.Navigator>
      );
      }

     


      // for the click here to watch movie
      const movieStack = createNativeStackNavigator();
      function MovieStack() {
      return (
      <movieStack.Navigator>
      <movieStack.Screen name="Home" component={MyTabs} options={{
        headerShown:false
      }}/>
      <movieStack.Screen name="MovieDetail" component={Detail} options={{
        headerShown:false
      }} 
      />
      <movieStack.Screen name="NestedMovieDetail" component={NestedDetail} options={{
        headerShown:false
      }} 
      />
      <movieStack.Screen name="Sarchmovie" component={Search} options={{
        headerShown:false
      }} />
      <movieStack.Screen name="PlayMovie" component={Play} options={{
        headerTintColor:'white',
        headerStyle:{
          backgroundColor:'#011129'
        },
        headerTitleAlign:'center'
      }}/>
      </movieStack.Navigator>
      );
      }
      const BottomTabTv = createBottomTabNavigator();
      function MyTvTabs() {
        const navigation = useNavigation()
        const {navigate} = useNavigation()
  
        return (
        <BottomTabTv.Navigator screenOptions={{
        headerLeft:()=>(
        <AntDesign name="back" size={30} color="white" 
        onPress={()=>navigation.goBack()} style={{marginLeft:15}}/>),
  
        headerRight:()=>(
        <FontAwesome name="search-plus" size={27} color="white" style={{
        marginRight:15
        }} onPress={()=>navigation.navigate('Sarchmovie',{type:"movie"})}/>
        ),
        headerTitleAlign:'center',
        headerTintColor:'#f7a705',
        headerStyle:{
        backgroundColor:'#011129',
        },
        tabBarActiveTintColor:'#f7a705',
        tabBarInactiveTintColor:'white',
        tabBarStyle:{
            backgroundColor:'#011129',
            padding:5
        }
        }}>
        <BottomTabTv.Screen name="Popular" component={Populartv} options={{
          tabBarIcon:({color})=>(
        <MaterialCommunityIcons name="flower-poppy" size={30} color={color} />
          )
        }}/>
        <BottomTabTv.Screen name="Top rated" component={TopRated}  options={{
          tabBarIcon:({color})=>(
            <AntDesign name="totop" size={30} color={color} />
          )
        }}/>
        <BottomTabTv.Screen name="Airing Today" component={AiringToday} options={{
          tabBarIcon:({color})=>(
            <Ionicons name="today" size={30} color={color} />
          )
        }}/>
        <BottomTabTv.Screen name="On The Air" component={OnTheAir} options={{
          tabBarIcon:({color})=>(
            <Entypo name="air" size={30}  color={color} />
          )
        }}/>
        </BottomTabTv.Navigator>
        );
        }

        const TvStack = createNativeStackNavigator();
        function MyTvStack() {
        return (
        <TvStack.Navigator>
        <TvStack.Screen name="Home" component={MyTvTabs} options={{
          headerShown:false
        }}/>
        <TvStack.Screen name="MovieDetail" component={Detail} options={{
          headerShown:false
        }} 
        />
        <TvStack.Screen name="NestedMovieDetail" component={NestedDetail} options={{
        headerShown:false
      }} 
      />
        <TvStack.Screen name="Sarchmovie" component={Search} options={{
          headerShown:false
        }} />
        <TvStack.Screen name="PlayMovie" component={Play} options={{
          headerTintColor:'white',
          headerStyle:{
            backgroundColor:'#011129'
          },
          headerTitleAlign:'center'
        }}/>
        </TvStack.Navigator>
        );
        }
      // for the home page
      const HomeStackNavigation = createNativeStackNavigator();
      function MyMovieStack() {
      return (
      <HomeStackNavigation.Navigator>
      <HomeStackNavigation.Screen
      name="Selection_one"
      component={Selection}
      options={{
        headerShown: false,
      }}
      />
      <HomeStackNavigation.Screen name="Movie" component={MovieStack}  options={{
      headerTitleAlign:'center',
      headerTintColor:'white',
      headerStyle:{
        backgroundColor:'#011129'
      },
      headerShown:false
      }}/>

      <HomeStackNavigation.Screen name="tv" component={MyTvStack} options={{
      headerTitleAlign:'center',
      headerTintColor:'white',
      headerShown:false,
      headerStyle:{
        backgroundColor:'#011129'
      }
      }}/>
      </HomeStackNavigation.Navigator>
      );
      }

      const movieFavoriteStack = createNativeStackNavigator();
      function MovieFavoriteStack() {
      return (
      <movieFavoriteStack.Navigator>
      <movieFavoriteStack.Screen name="Home" component={My_favorite} options={{
         headerShown:false
      }}/>
      <movieFavoriteStack.Screen name="PlayMovie" component={Play} options={{
        headerTintColor:'white',
        headerStyle:{
          backgroundColor:'#011129'
        },
        headerTitleAlign:'center'
      }}/>
      </movieFavoriteStack.Navigator>
      );
      }



      const Drawer = createDrawerNavigator();
      function MyDrawer() {
      return (
      <Drawer.Navigator
      drawerContent={(props) => <CustomeDrawer {...props} />}
      screenOptions={{
      drawerActiveBackgroundColor: "#aa18ea",
      drawerActiveTintColor: "white",
      drawerInactiveTintColor: "#ebb30e" ,
      drawerLabelStyle: {
        marginLeft: -20,
        fontSize: 15,
      },
      headerShown: false,
      }}
      >
      <Drawer.Screen
      name="Home page"
      component={MyMovieStack}
      options={{
        drawerIcon: ({ color }) => (
          <AntDesign name="home" size={22} color={color} />
        ),}}/>
      <Drawer.Screen
      name="My Videos"
      component={MovieFavoriteStack}
      options={{
        drawerIcon: ({ color }) => (
          <Fontisto name="favorite" size={24} color={color} style={{
            marginLeft:3
          }}/>
        ),
      }}/>
      {/* <Drawer.Screen
      name="Payment action"
      component={Payment}
      options={{
        drawerIcon: ({ color }) => (
          <MaterialIcons name="payment" size={24} color={color} />
        ),}}/> */}
      <Drawer.Screen
      name="App feedback"
      component={App_feedback}
      options={{
        drawerIcon: ({ color }) => (
          <MaterialIcons name="feedback" size={24} color={color} />
        ),}}/>
      </Drawer.Navigator>
      );
      }

      // for the register page
      const StackRegisterNavigation = createNativeStackNavigator();
      function RegisterStack() {
      return (
      <StackRegisterNavigation.Navigator
      screenOptions={{
      headerShown: false,
      }}
      >
      <StackRegisterNavigation.Screen name="Loginpage" component={Login} />
      <StackRegisterNavigation.Screen name="Signuppage" component={Signup} />
      <StackRegisterNavigation.Screen
      name="Forgotpassword"
      component={Forgot_password}
      />
      </StackRegisterNavigation.Navigator>
      );
      }

      export default function Navigation() {
      const dispatch = useDispatch();
      useLayoutEffect(() => {
      const retrieveData = async () => {
      try {
      const value = await AsyncStorage.getItem("access");
      if (value !== null) {
        dispatch(Login_ok());
      }
      } catch (error) {
      console.log(error);
      }
      };

      retrieveData();
      }, []);

      const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
      return (
      <NavigationContainer>
      {!isAuthenticated?<RegisterStack/>:<MyDrawer/>}
      </NavigationContainer>
      );
      }
