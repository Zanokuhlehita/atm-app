import React, { useState, useContext, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,

  Image,
Animated
} from "react-native";

import { EventRegister } from "react-native-event-listeners";
import firebase from "firebase";
import { logo } from "../plugins/assets";
import ATMAButton from "../components/ATMAButton";
import { MainContext } from "../contexts/MainContext";
import { Portal } from "react-native-portalize";

export default function LoadingScreen({ navigation,  close }) {
  const [visible, setvisible] = useState(true);
  const { loadingScreen, setloadingScreen, setplayerModalVisible } =
    useContext(MainContext);

  /*  const listener = useRef();

   useEffect(() => {
    listener.current = EventRegister.addEventListener(
      "reset_navigation",
      () => {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "welcome",
            },
          ],
        });
      }
    );
    return () => {
      EventRegister.removeEventListener(listener.current);
    };
  }, []); */



  useEffect(() => {
    if (loadingScreen) {
      setvisible(true);
      resetLoad();
      startLoadScreen();
    } else {
      completeLoad();
    }
    return () => {};
  }, [loadingScreen]);
  const slider_width = 150;
  const loadingSlider = useRef(new Animated.Value(-slider_width)).current;
  const opacity_animation = useRef(new Animated.Value(1)).current;

  function startLoadScreen(duration) {
    Animated.timing(loadingSlider, {
      toValue: 0,
      duration: loadingScreen.duration ? loadingScreen.duration : 5000,
      useNativeDriver: true,
    }).start(() => {
        console.log(loadingScreen.autoClose);

      if(loadingScreen.autoClose){
        completeLoad() 
      }
    });
  }
  function completeLoad() {
    Animated.spring(opacity_animation, {
      toValue: 0,
      duration: 1002,
      useNativeDriver: true,
    }).start(() => {
      setvisible(false);
      setloadingScreen(false);
      resetLoad();
    });
  }
  function resetLoad() {
    opacity_animation.setValue(1);
    loadingSlider.setValue(-150);
  }
  const logo_size = 120;
  return visible ? (
    <Portal>
      <Animated.View
        style={{
          opacity: opacity_animation,
          height: "100%",
          width: "100%",
          // backgroundColor: "#181B1F",
          backgroundColor: "rgba(114, 67, 41,1)",
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
            setloadingScreen(true)
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

