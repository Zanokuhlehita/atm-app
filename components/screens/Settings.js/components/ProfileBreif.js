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
  ImageBackground,
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
import { logo, Avatar, Avatar_PLC } from "../../../plugins/assets";
import { MainContext } from "../../../contexts/MainContext";

export default function ProfileBreif({ navigation }) {
  const { user_context } = useContext(MainContext);
  const notification_indicator_size = 15;
  const fontColor = 'white'
  return (
    <View
      style={{
        borderRadius: 5,
        overflow: "hidden",
      }}
    >
      <ImageBackground
        // source={require("../../../assets/images/mic_bg.jpg")}
        imageStyle={{
          top: -200,
          resizeMode: "cover",

          // transform:[{scale:5}]
        }}
        style={{}}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("profile");
            // console.log(user_context)
          }}
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(171, 169, 159,0.2)",
            padding: 10,
          }}
        >
          <View style={{}}>
            <Image
              style={{
                height: 50,
                width: 50,
              }}
              source={
                user_context.profileImage
                  ? { uri: user_context.profileImage }
                  : Avatar_PLC
              }
            />
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,1)",
              }}
            >
              {user_context.firstName} {user_context.lastName}
            </Text>

            <Text style={{ color: "rgba(255,255,255,0.6)" }}>
              {user_context.subscriptions} Plan
            </Text>
          </View>
          {/*         <View
            style={{
              backgroundColor: "red",
              height: notification_indicator_size,
              width: notification_indicator_size,
              borderRadius: notification_indicator_size,
              marginRight: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 8, textAlign: "center" }}>
              1
            </Text>
          </View> */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo
              name="chevron-small-right"
              size={24}
              color="rgba(255,255,255,0.6)"
            />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
