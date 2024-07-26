import React, { useState, useContext, useRef, useEffect } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { EventRegister } from "react-native-event-listeners";
// import Welcome from "./Welcome/index";
// import Home from "./Home/index";
// import Splashscreen from "./splashscreen";
// import DownloadSongs from "../components/DownloadSongs";
import PlayGround from "./Playground/Index";
// import LocalContext from "./LocalContext";
// import Lyrics from "./Lyrics";
// import Settings from "./Settings.js";
// import Info from "./Info/Index";
// import Playlist from "./Playlist";
// import Stories from "./Stories";
// import ViewPlaylist from "./ViewPlaylist";
// import CompleteProfile from "./Welcome/screens/CompleteProfile";
// import LoadingScreen from "./LoadingScreen";
// import LoadingIndicator from "../components/LoadingIndicator";
// import PlaysStats from "./PlaysStats";
// import Search from "./Search";
// import Profile from "./Profile";
// import BuyPlays from "./BuyPlays";
// import Support from "./Support";
// import SupportUs from "./SupportUs";
// import ATMALoadingIndicatorSongs from "../components/ATMALoadingIndicatorSongs";
export default function Index() {
  // const { width, height } = Dimensions.get("window");

  // const listener = useRef();
  // const listener2 = useRef();

  // useEffect(() => {
  //   listener.current = EventRegister.addEventListener("songfinished", () => { });
  //   listener2.current = EventRegister.addEventListener(
  //     "showactivityindicator",
  //     (v) => {
  //       // console.log('heard that', v)
  //       setshowActivityIndicator(v);
  //     }
  //   );

  //   return () => {
  //     EventRegister.removeEventListener(listener.current);
  //     EventRegister.removeEventListener(listener2.current);
  //   };
  // }, []);

  // const [showActivityIndicator, setshowActivityIndicator] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splashscreen">
          <Stack.Screen
            name="playground"
            component={PlayGround}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="splashscreen"
            component={Splashscreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="welcome"
            component={Welcome}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="lyrics"
            component={Lyrics}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="settings"
            component={Settings}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="info"
            component={Info}
            options={{ headerShown: false }}
          /> */}

          {/* <Stack.Screen
            name="playlist"
            component={Playlist}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="stories"
            component={Stories}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="viewplaylist"
            component={ViewPlaylist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="completeprofile"
            component={CompleteProfile}
            options={{ headerShown: false }}
          /> */}
          {/*
           */}
          {/* <Stack.Screen
            name="playsstats"
            component={PlaysStats}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="search"
            component={Search}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="buyplays"
            component={BuyPlays}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="support"
            component={Support}
            options={{ headerShown: false }}
          /> */}

          {/* <Stack.Screen
            name="supportus"
            component={SupportUs}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
      {/* <LocalContext /> */}
      {/* <DownloadSongs /> */}
      {/*     <LoadingScreen/> */}
      {/* <LoadingIndicator /> */}
      {/* <ATMALoadingIndicatorSongs /> */}
    </View>
  );
}
const Stack = createStackNavigator();
