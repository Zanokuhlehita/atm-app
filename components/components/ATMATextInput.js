import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
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
import { secondary_color } from "../theme/colors";

export default function ATMATextInput({
  disabled,
  height,
  multiline,
  keyboardType,
  autoCapitalize,
  label,
  placeholder,
  required,
  value,
  onChangeText,
  onFocus,
  borderColor,
  color,
  title,
  style,
  onBlur,
  preText,
}) {
  return (
    <View
      style={[
        {
          borderRadius: 5,
          borderWidth: 1,
          borderColor: borderColor ? borderColor : "rgba(255,255,255, 0.2)",
          width: "100%",
          minHeight: height,
          paddingHorizontal: 10,
          marginVertical: 10,
        },
        style,
      ]}
    >
      <View style={{}}>
        <Text
          style={{
            color: color ? color : secondary_color,
            fontSize: 10,
            marginBottom: 5,
            marginTop: 2,
          }}
        >
          {label ? label : title ? title : "label"}
        </Text>

        {required ? (
          <Text
            style={{
              position: "absolute",
              right: 0,
              top: 10,
              color: "red",
            }}
          >
            *
          </Text>
        ) : null}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {preText ? (
          <Text
            style={{
              marginRight: 2,
              marginBottom: 3,

              color: disabled
                ? "#B8B8B8"
                : color
                ? color
                : "rgba( 255,255,255, 0.5)",
            }}
          >
            {preText}
          </Text>
        ) : null}

        <TextInput
          onBlur={onBlur}
          editable={!disabled}
          keyboardType={keyboardType}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          onFocus={onFocus}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"rgba(255,255,255, 0.4)"}
          style={{
            color: disabled ? "#B8B8B8" : color ? color : "white",
            flex: 1,
          }}
        />
      </View>
    </View>
  );
}
