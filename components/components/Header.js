import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
  BackgroundImage,
  Dimensions,
} from "react-native";
import {
  Entypo,
  AntDesign,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from "@expo/vector-icons";
import { text_color_secondary } from "../theme/colors";
import NavList from "./NavlList";

export default function Header({
  backAction,
  menuAction,
  title,
  height,
  icon,
}) {
  const icon_size = 18;
  const font_color = text_color_secondary;

  return (
    <View
      style={{
        paddingTop: 28,
        flexDirection: "row",
        paddingHorizontal: 30,

        height: height ? height : 80,
        backgroundColor: "transparent",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          backAction();
        }}
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 10,
          width: 50,
        }}
      >
        {icon ? (
          icon
        ) : (
          <Feather name="chevron-left" size={20} color={font_color} />
        )}
      </TouchableOpacity>
      <View
        style={{
          paddingTop: 15,
          flex: 1,
          //backgroundColor: 'blue',

          // width: '70%',
          //  paddingLeft: 10,
          //alignItems: 'center',
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            //            fontWeight: 'bold',
            color: font_color,
            fontSize: 14,
            textAlign: "center",
            fontFamily: "Poppins-400",
          }}
        >
          {title ? title : "No Title Prop"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          //  menuAction();
        }}
        style={{
          width: 50,
          //flexDirection: 'row',
          alignItems: "flex-end",
          justifyContent: "center",

          paddingRight: 0,
          paddingTop: 15,
        }}
      >
        {/*      <Entypo name="dots-three-vertical" size={15} color={font_color} /> */}
      </TouchableOpacity>
    </View>
  );
}
