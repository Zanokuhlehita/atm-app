import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  textInput,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Image,
  BackgroundImage,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { text_color_primary } from "../theme/colors";

export default function ATMAButton({
  variant,
  fontStyle,
  color,
  height,
  width,
  text,
  onPress,
  textColor,
  border_radius,
  bold,
  fontSize,
  style,
  title,
  icon,
  loading,
  disabled
}) {
  return (
    <View
      style={[
        {
          width: "100%",
          borderRadius: 5,
          marginVertical: 5,
        },
        style,
      ]}
    >
      <TouchableOpacity
        disabled={loading || disabled}
        style={{
          height: height ? height : 48,
          width: width ? width : "100%",

          borderRadius: border_radius ? border_radius : 5,
          backgroundColor:
            variant == "outlined" ? "transparent" : color ? color : "black",
          justifyContent: "center",
          alignItems: "center",
          /*     marginVertical: 5,
                        marginHorizontal: 5, */
          alignSelf: "center",
          borderWidth: variant == "outlined" ? 0.5 : null,
          borderColor:
            variant == "outlined" ? (color ? color : text_color_primary) : null,
          flexDirection: "row",
        }}
        onPress={onPress ? onPress : null}
      >
        {icon ? <View style={{ marginRight: 10 }}>{icon}</View> : null}
        {loading ? (
          <ActivityIndicator animating={true} color="white" size={"60%"} />
        ) : (
          <Text
            style={[
              {
                textAlign: "center",
                color: textColor ? textColor : "white",
                fontWeight: bold ? "bold" : "normal",
                fontSize: fontSize ? fontSize : 15,
              },
              fontStyle,
            ]}
          >
            {text || title ? text || title : "PLC Text"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});
