import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  FlatList,
  Image,
  BackgroundImage,
  Dimensions,
} from "react-native";

// import Image from 'react-native-scalable-image';
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { MainContext } from "../../../../../contexts/MainContext";

const Story = (props) => {
  const { nowPlayingStoryline_context } = useContext(MainContext);

  const { width, height } = Dimensions.get("window");
  const { story } = props;
  const { url, color, line } = story || {};
  useEffect(() => {
    console.log("llll", nowPlayingStoryline_context);

    return () => {};
  }, []);
  return (
    <View
      onLayout={props.onImageLoaded}
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: height,
          width: width,
          position: "absolute",
          opacity: 0.8,
        }}
      >
        <LinearGradient
          colors={["rgba(0, 114, 66,0)", color, "rgba(0, 114, 66,0)"]}
          locations={[0, 0.5, 1]}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </View>
      {/* <Image
        source={{ uri: url }}
        onLoadEnd={props.onImageLoaded}
        style={styles.content}
        resizeMode="stretch"
        // width={ScreenWidth}
      /> */}
      <View
        style={{
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12%",

          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            color: "white",
          }}
        >
          {line}
        </Text>
      </View>
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default Story;
