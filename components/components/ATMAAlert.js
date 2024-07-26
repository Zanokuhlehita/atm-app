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
import ATMATextInput from "./ATMATextInput";

export default function ATMAAlert({ alert }) {
  const border_color = "#ACACAC";
  const [input, setinput] = useState("");
  useEffect(() => {
    if (!alert) setinput("");
    else {
      if (alert.inputField) setinput(alert.inputField.defaultValue);
    }
    return () => {};
  }, [alert]);
  return alert ? (
    <View
      style={{
        backgroundColor: "rgba(32, 32, 32, 0.85)",
        height: "100%",
        width: "100%",

        position: "absolute",
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          marginBottom: 60,
          //height: 100,

          width: "80%",
          backgroundColor: "#E3E3E3",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            // flex: 1,
            paddingHorizontal: 20,

            paddingVertical: 40,
            minHeight: 125,
            paddingBottom: alert.subMsg ? 25 : null,
            paddingBottom: alert.inputField ? 15 : null,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
          >
            {alert.msg}
          </Text>

          <Text
            style={{
              //   fontWeight: "bold",
              marginTop: 10,

              fontSize: 15,
              textAlign: "center",
              display: alert.subMsg ? "flex" : "none",
            }}
          >
            {alert.subMsg}
          </Text>
          {alert.inputField ? (
            <View
              style={{
                width: "100%",
                marginTop: 10,
                display: alert.inputField ? "flex" : "none",
              }}
            >
              <ATMATextInput
                borderColor="black"
                label={
                  alert.inputField.title
                    ? alert.inputField.title
                    : "alert.inutField.title"
                }
                height={42}
                color="black"
                value={input}
                autoCapitalize={alert.inputField.autoCapitalize}
                onChangeText={(v) => {
                  setinput(v);
                }}
              />
            </View>
          ) : null}
        </View>
        <View
          style={{
            height: 50,
            flexDirection: "row",
            borderTopWidth: 1,
            borderColor: border_color,
          }}
        >
          {alert.onNo || alert.onNoTitle ? (
            <TouchableOpacity
              onPress={() => {
                alert.onNo();
              }}
              style={{
                flex: 1,

                borderRightWidth: 1,
                borderColor: border_color,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                {alert.onNoTitle ? alert.onNoTitle : "Cancel"}
              </Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              alert.onYes(input);
            }}
            style={{
              flex: 1,

              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {alert.onYesTitle ? alert.onYesTitle : "OK"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) : null;
}
