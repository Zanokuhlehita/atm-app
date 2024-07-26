import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
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
import { LinearGradient } from "expo-linear-gradient";

import bg_image from "../../../assets/images/welcome_screen/1.jpg";
  const grad_color = "30, 30, 30";
 const { width, height } = Dimensions.get("window");
export default function Background() {
  return (
    <View
      style={{
        position: "absolute",
        height: height,
        width: width,

        backgroundColor: "blue",
      }}
    >
      <Image
        style={{
          height: "60%",
          width: "100%",
          position: "absolute",
        }}
        source={bg_image}
      ></Image>
      <View
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          backgroundColor: "rgba(14, 16, 27, 0.8)",
        }}
      ></View>
      <LinearGradient
        // Background Linear Gradient
        locations={[0.22, 0.4, 0.6, 1]}
        colors={[
          `rgba(${grad_color},0)`,
          `rgba(${grad_color},0.5)`,
          `rgba(${grad_color},1)`,
          `rgba(${grad_color},1)`,
        ]}
        style={{
          // borderRadius: 15,
          height: "100%",
          position: "absolute",
          width: "100%",
          opacity: 1,
          height: "100%",
          zIndex: 1,
        }}
      />
    </View>
  );
}
