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
import format from "date-fns/format";
import { primary_color } from "../../../theme/colors";
export default function ChatMessage({ message }) {
  function checkStatus() {
    if (message.sender == "Client") {
      if (message.seen) return "seen";

      if (!message.sent) return "sent";
      if (message.sent) return "delivered";
    } else {
      return "new";
    }
  }
  function getDate() {
    try {
      return format(message.createdAt.toDate(), "Pp");
    } catch (e) {
      return `${message.createdAt}`;
    }
  }
  return (
    <View
      style={{
        width: "100%",
        marginVertical: 10,
        flexDirection: "row",

        justifyContent:
          message.sender == "Client"
            ? "flex-end"
            : message.sender == "System"
            ? "center"
            : "flex-start",
      }}
    >
      <View
        style={{
          width: "90%",
          height: "100%",
          borderRadius: 5,
          padding: 10,
          backgroundColor:
            message.sender == "Client"
              ? primary_color
              : message.sender == "System"
              ? "rgba(245,237,193,1)"
              : "rgba(242, 242, 242, 1)",
        }}
      >
        <Text
          blurOnSubmit={false}
          style={{
            fontSize: message.sender == "System" ? 14 : 16,
          }}
        >
          {message.message}
        </Text>
        {message.sender !== "System" ? (
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <View
              style={{
                flexDirection: "row",

                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                }}
              >
                {getDate()}
              </Text>
            </View>

            {message.sender == "Client" ? (
              <View
                style={{
                  top: 5,
                  marginLeft: 3,

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {checkStatus() == "sent" ? (
                  <Ionicons name="checkmark" size={15} color="black" />
                ) : null}
                {checkStatus() == "delivered" ? (
                  <Ionicons name="checkmark-done" size={15} color="black" />
                ) : null}
                {checkStatus() == "seen" ? (
                  <Ionicons
                    name="checkmark-done"
                    size={15}
                    color="rgba(29, 180, 245, 1)"
                  />
                ) : null}
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}
