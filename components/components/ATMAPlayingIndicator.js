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

export default function ATMAPlayingIndicator() {
  const low_value = 28;
  const max_time = 1000;
  const bar1 = useRef(new Animated.Value(low_value)).current;
  const bar2 = useRef(new Animated.Value(low_value)).current;
  const bar3 = useRef(new Animated.Value(low_value)).current;

  const bar_bg_color = "transparent";
  const bar_foreground_color = "orange";

  const bars = [
    { name: "bar1", value: bar1 },
    { name: "bar2", value: bar2 },
    { name: "bar3", value: bar3 },
  ];
  useEffect(() => {
    const toValue = Math.floor(Math.random() * low_value + 1);
    const duration = Math.floor(Math.random() * max_time);
    start1(toValue, duration);
    start2(toValue, duration);
    start3(toValue, duration);

    return () => {};
  }, []);
  const duration_global = 1000;
  function start1(toValue, duration) {
    Animated.timing(bar1, {
      toValue: toValue,
      duration: duration_global,
      useNativeDriver: true,
    }).start(() => {
      const toValue = Math.floor(Math.random() * low_value + 1);
      const duration = Math.floor(Math.random() * max_time);
      start1(toValue, duration);
    });
  }
  function start2(toValue, duration) {
    Animated.timing(bar2, {
      toValue: toValue,
      duration: duration_global,
      useNativeDriver: true,
    }).start(() => {
      const toValue = Math.floor(Math.random() * low_value + 1);
      const duration = Math.floor(Math.random() * max_time);
      start2(toValue, duration);
    });
  }
  function start3(toValue, duration) {
    Animated.timing(bar3, {
      toValue: toValue,
      duration: duration_global,
      useNativeDriver: true,
    }).start(() => {
      const toValue = Math.floor(Math.random() * low_value + 1);
      const duration = Math.floor(Math.random() * max_time);
      start3(toValue, duration);
    });
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-end",
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          height: 30,
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-around",
        }}
      >
        {bars.map((item, i) => {
          return (
            <View
              key={i.toString()}
              style={{
                width: 5,
                height: "100%",
                backgroundColor: bar_bg_color,
                overflow: "hidden",
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: bar_foreground_color,
                  height: "100%",
                  width: "100%",
                  transform: [{ translateY: item.value }],
                }}
              ></Animated.View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
