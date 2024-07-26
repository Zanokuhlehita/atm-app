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

import Header from "./components/Header";
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
import ProfileBreif from "./components/ProfileBreif";
import MenuItems from "./components/MenuItems";
import { Avatar, Studio } from "../../plugins/assets";
import { Portal } from "react-native-portalize";

export default function Settings({ navigation }) {
  return (
    <Portal>
      <View
        style={{
          backgroundColor: "rgb(29,29,29)",
          paddingHorizontal: 30,
        }}
      >
        <View style={{}}>
          <Header navigation={navigation} />
        </View>
        <View
          style={{
            marginTop: 10,
          }}
        >
          <ProfileBreif navigation={navigation} />
          <View
            style={{
              marginTop: 10,
              borderRadius: 5,
              overflow: "hidden",
              backgroundColor: "rgb(107, 93, 21)",
            }}
          >
            {/*     <ImageBackground
              source={require("../../assets/images/mic_bg.jpg")}
              imageStyle={{
                top: -200,
                resizeMode: "cover",
                // transform:[{scale:5}]
              }}
              style={{}}
            > */}
            {/*             <TouchableOpacity
              onPress={() => {
                navigation.navigate("buyplays");
              }}
              style={{
                //   backgroundColor: 'orange',
                width: "100%",
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",

                padding: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Buy Plays
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Entypo name="chevron-small-right" size={24} color="white" />
              </View>
            </TouchableOpacity> */}
            {/*         </ImageBackground> */}
          </View>
        </View>
        <View style={{}}>
          <MenuItems navigation={navigation} />
        </View>
      </View>
    </Portal>
  );
}
