import React, { useState, useContext, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Image, Animated } from "react-native";

import { EventRegister } from "react-native-event-listeners";
import firebase from "firebase";
import { logo } from "../plugins/assets";
import ATMAButton from "./ATMAButton";
// import { MainContext } from "../contexts/MainContext";
import { Portal } from "react-native-portalize";

export default function LoadingScreenMain({ navigation, show }) {
  const {
    mainLoadingScreen,
    setmainLoadingScreen,
    setplayerModalVisible,
    loadingIndicator,
    setloadingIndicator,
    loadingSlider,
    opacity_animation,
  } = useState([]);
  const slider_width = 150;

  const logo_size = 120;
  return mainLoadingScreen ? (
    <Portal>
      <Animated.View
        style={{
          opacity: opacity_animation,
          height: "100%",
          width: "100%",
          //   backgroundColor: "rgba(203, 191, 63,0.6)",
          backgroundColor: "#181B1F",
          // zIndex: 200
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 2000,
          paddingBottom: 160,
        }}
      >
        <View
          style={{
            marginBottom: 50,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              marginLeft: -27,
              marginRight: 5,
              height: logo_size,
              width: logo_size,
            }}
            source={logo}
          ></Image>
        </View>
        <View
          style={{
            height: 6,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(69, 69, 69, 1)",
              height: "100%",
              width: slider_width,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            <Animated.View
              style={{
                width: "100%",
                backgroundColor: "rgba(224, 160, 56, 1)",
                height: "100%",
                width: slider_width,
                borderRadius: 5,
                transform: [{ translateX: loadingSlider }],
              }}
            ></Animated.View>
          </View>
        </View>
        {/*   <View
        style={{
          height: "50%",
        }}
      >
        <ActivityIndicator
          animating={true}
          size={50}
          color={"grey"}
        ></ActivityIndicator>
      </View> */}
        {/*    <View
        style={{
          position: "absolute",
          bottom: 0,
          //opacity: 0,
        }}
      >
        <ATMAButton
          title="start"
          style={{
            marginVertical: 30,
          }}
          onPress={() => {
            setmainLoadingScreen(true)
          // /  startLoadScreen();
          }}
        />
        <ATMAButton
          title="reset"
          style={{
            marginVertical: 30,
          }}
          onPress={() => {
            resetLoad();
          }}
        />
      </View>
    */}
      </Animated.View>
    </Portal>
  ) : null;
}
