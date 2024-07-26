import React, { useState, useContext, useRef, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Image, Animated } from "react-native";

import { EventRegister } from "react-native-event-listeners";
import firebase from "firebase";
import { logo } from "../plugins/assets";
import ATMAButton from "../components/ATMAButton";
import { MainContext } from "../contexts/MainContext";
import { Portal } from "react-native-portalize";

export default function LoadingIndicator({ navigation, show }) {
  const [visible, setvisible] = useState(true);
  const {
    loadingScreen,
    setloadingScreen,
    setplayerModalVisible,
    loadingIndicator,
    setloadingIndicator,
  } = useContext(MainContext);
useEffect(() => {

  return () => {};
}, []);
 useEffect(() => {
   if (loadingScreen) {
       setvisible(true)
    // resetLoad();
     startLoadScreen();
     startLoading();
   } else {
    // completeLoad();
       setvisible(false);
   }
   return () => {};
 }, [loadingIndicator]);

  const slider_width = 150;
  const loadingSlider = useRef(new Animated.Value(-30)).current;
  const loadingSlider2 = useRef(new Animated.Value(-30)).current;
  const loadingSlider3 = useRef(new Animated.Value(-30)).current;
  const loadingSlider4 = useRef(new Animated.Value(-30)).current;
  const loadingSlider5 = useRef(new Animated.Value(-30)).current;
  const loadingSlider6 = useRef(new Animated.Value(-30)).current;
  const loadingSliderLast = useRef(new Animated.Value(-30)).current;

  const data = [
    { animation: loadingSlider, color: "red" },
    { animation: loadingSlider2, color: "purple" },
    { animation: loadingSlider3, color: "yellow" },
    { animation: loadingSlider4, color: "orange" },
    { animation: loadingSlider5, color: "Brown" },
    { animation: loadingSlider6, color: "green" },
  ];

  const opacity_animation = useRef(new Animated.Value(1)).current;
  const duration = 600;

  function startLoading(params) {
      Animated.timing(opacity_animation, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(opacity_animation, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
        }).start(() => {
          startLoading();
        });
      });
    }

  function startLoadScreen() {

  Animated.timing(loadingSlider, {
    toValue: 160,
    duration: duration,
    useNativeDriver: true,
  }).start(() => {
    loadingSlider.setValue(-30);
  });
  Animated.timing(loadingSlider2, {
    toValue: 160,
    duration: duration,
    delay:1100,
    useNativeDriver: true,
  }).start(() => {
    loadingSlider2.setValue(-30);

  });
    Animated.timing(loadingSlider3, {
      toValue: 160,
      duration: duration,
      delay: 1400,
      useNativeDriver: true,
    }).start(() => {
      loadingSlider3.setValue(-30);
  startLoadScreen();

    });
  /*   loadingSlider2.setValue(-30);
    loadingSlider3.setValue(-30);
    loadingSlider4.setValue(-30);
    loadingSlider5.setValue(-30); */

    /*    loadingSlider6.setValue(-30);
       loadingSlider7.setValue(-30);
      loadingSlider8.setValue(-30);
      loadingSlider9.setValue(-30);
      loadingSlider10.setValue(-30);
      loadingSlider11.setValue(-30);
      loadingSlider12.setValue(-30); */
    //   loadingSliderLast.setValue(-30);
    /*      animate(loadingSlider, duration, 0);
      animate(loadingSlider2, duration, 1200);
     animate(loadingSlider3, duration, 1200 + 350 * 1);
      animate(loadingSlider4, duration, 1200 + 350 * 2);
      animate(loadingSlider5, duration, 1200 + 350 * 3);
      animate(loadingSlider6, duration, 1200 + 350 * 4);
      animate(loadingSlider7, duration, 1200 + 350 * 5);
      animate(loadingSlider8, duration, 1200 + 350 * 6);
      animate(loadingSlider9, duration, 1200 + 350 * 7);
      animate(loadingSlider10, duration, 1200 + 350 * 8);
      animate(loadingSlider11, duration, 1200 + 350 * 9); */

  
/*     Animated.timing(loadingSlider2, {
      toValue: 160,
      duration: duration,
      delay: 1200 + 350 * 0,
      useNativeDriver: true,
    }).start(() => {
    loadingSlider2.setValue(-30);

    });
    Animated.timing(loadingSlider3, {
      toValue: 160,
      duration: duration,
      delay: 1200 + 350 * 1,
      useNativeDriver: true,
    }).start(() => {
    loadingSlider3.setValue(-30);

    });
    Animated.timing(loadingSlider4, {
      toValue: 160,
      duration: duration,
      delay: 1200 + 350 * 2,
      useNativeDriver: true,
    }).start(() => {
    loadingSlider4.setValue(-30);

    });
    Animated.timing(loadingSlider5, {
      toValue: 160,
      duration: duration,
      delay: 1200 + 350 * 3,
      useNativeDriver: true,
    }).start(() => {
    loadingSlider5.setValue(-30);

    });
    Animated.timing(loadingSlider6, {
      toValue: 160,
      duration: duration,
      delay: 1200 + 350 * 4,
      useNativeDriver: true,
    }).start(() => {
      loadingSlider6.setValue(-30);
    });
    Animated.timing(loadingSliderLast, {
      toValue: 160,
      duration: 400,
      delay: 1200 + 350 * 4,
      useNativeDriver: true,
    }).start(() => {
    loadingSliderLast.setValue(-30);

      startLoadScreen();
    }); */
    //animate(loadingSlider12, duration, 1200 + 350 * 10);
  }
  function animate(item, duration, delay) {
    Animated.timing(item, {
      toValue: 160,
      duration: duration,
      delay: delay,
      useNativeDriver: true,
    }).start(() => {
      item.setValue(-30);
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
    // opacity_animation.setValue(1);
 //loadingSlider.setValue(-150);
  }
  const logo_size = 120;
  return visible ? (
      <Portal>
            <Animated.View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(24, 27, 31,1)",
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
          <Animated.Image
            style={{
              opacity: opacity_animation,

              marginLeft: -27,
              marginRight: 5,
              height: logo_size,
              width: logo_size,
            }}
            source={logo}
          ></Animated.Image>
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
              justifyContent: "center",
            }}
          >
            {data.map((item, i) => {
              return (
                <Animated.View
                  key={i.toString()}
                  style={{
                    width: "100%",
                    backgroundColor:
                      /*  item.color,// */ "rgba(224, 160, 56, 1)",
                    height: 22,
                    width: 25,
                    borderRadius: 5,
                    position: "absolute",

                    transform: [
                      { translateX: item.animation },
                      { rotate: "30deg" },
                    ],
                  }}
                ></Animated.View>
              );
            })}
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
        {/*     <View
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
              //  setloadingScreen(true);
        
            }}
          />
          <ATMAButton
            title="reset"
            style={{
              marginVertical: 30,
            }}
            onPress={() => {
              // loadingSlider.stopAnimation();
              Animated.timing(loadingSlider, {
                toValue: 160,
                duration: 1000,
                useNativeDriver: true,
              }).stop();
              Animated.timing(loadingSlider2, {
                toValue: 160,
                duration: 1000,
                useNativeDriver: true,
              }).stop();
              //  console.log(loadingSlider)
              //         resetLoad();
            }}
          />
        </View>
     */}
      </Animated.View>
 
      </Portal>
   
) : null;
}
