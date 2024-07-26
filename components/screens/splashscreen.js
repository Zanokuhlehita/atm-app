import React, { useState, useEffect, useContext, useRef } from "react";

import logo from "../assets/images/logos/at_logo.png";

import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
  Image,
  Alert,
  Easing,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// import { MainContext } from "../contexts/MainContext";

// import LoadingScreenMain from "../components/LoadingScreenMain";
export default function Splashscreen({ navigation }) {
  const {
    user_context,
    setuser_context,
    appLoaded_ref,
    userProfileComplete_ref,
    mainLoadingScreen,
    setmainLoadingScreen,
    appLoaded,
    setappLoaded,
    loadingSlider,
    opacity_animation,
    mainNavigation_context_ref,
  } = useState(false);

  useEffect(() => {
    // mainNavigation_context_ref.current = navigation;
    return () => { };
  }, []);

  useEffect(() => {
    resetLoad();
    startLoadScreen();

    return () => { };
  }, []);

  function startLoadScreen(duration) {
    Animated.timing(loadingSlider, {
      toValue: -5,
      duration: 6000,
      //  easing: Easing.out,
      useNativeDriver: true,
    }).start(() => { });
  }

  function resetLoad() {
    // setmainLoadingScreen(true);
    // opacity_animation.setValue(1);
    // loadingSlider.setValue(-150);
  }

  return <Text>Hi</Text>;
}
