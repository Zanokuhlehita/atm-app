import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  FlatList,
  Image,
  BackgroundImage,
  Dimensions,
} from "react-native";
import { Portal } from "react-native-portalize";
import { MainContext } from "../contexts/MainContext";
import { logo } from "../plugins/assets";
import { bg_color_primary, bg_color_secondary } from "../theme/colors";

export default function ATMALoadingIndicatorSongs() {
  const {
    startLoadingIndicatorSongs,
    showloadingIndicatorSongs,
    setshowloadingIndicatorSongs,
  } = useContext(MainContext);

  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    start();
    return () => {};
  }, []);
  const start = () => {
    Animated.loop(
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          start();
        });
      })
    );
  };
  const stop = () => {};
  return showloadingIndicatorSongs ? (
    <Portal>
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0, 0.1)",
        }}
      >
        <View style={{}}></View>
        <Animated.Image
          style={{
            height: 190,
            marginBottom: "50%",
            resizeMode: "contain",
            right: 5,
            opacity: opacity,
          }}
          source={logo}
        ></Animated.Image>
      </View>
    </Portal>
  ) : null;
}
