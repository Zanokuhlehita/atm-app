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
import ATMAAlert from "../../../components/ATMAAlert";
import ATMAButton from "../../../components/ATMAButton";
import Header from "../../../components/Header";
import { secondary_color } from "../../../theme/colors";
import Background from "./Background";

export default function TextFieldForm({ title, navigation, onPressContinue, onContinue }) {
  const [activityIndicator, setactivityIndicator] = useState(false);
  const [loginStatus, setloginStatus] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <Header
        title=" "
        backAction={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1 }}>
        <ScrollView
          scrollEnabled={false}
          style={{
            flex: 1,

            height: "100%",
            width: "100%",
            zIndex: 40,
          }}
        >
          {/*           <ATMAAlert alert={passwordRessetAlert} />
          <ATMAAlert alert={errorAlert} /> */}
          {activityIndicator ? (
            <View
              style={{
                position: "absolute",
                zIndex: 10,
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba( 0,0,0, 0.5)",
              }}
            >
              <ActivityIndicator animating={true} color="#525252" size={50} />
            </View>
          ) : null}

          <View
            style={{
              paddingHorizontal: 30,
            }}
          >
            <View style={{ marginTop: 33 }}>
              <Text style={{ color: "red", marginBottom: 2 }}>
                {loginStatus}
              </Text>
            </View>
            <View style={{ marginTop: 0, marginBottom: 20 }}>
              <View style={{}}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 27,
                    color: "white",
                    lineHeight: 32,
                  }}
                >
                  {title ? title : "No Titl Prop"}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                marginTop: 12,
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  alignItems: "center",
                  height: 50,
                }}
              >
                <TextInput
                  placeholderTextColor="'rgba(0,0,0, 1)'"
                  placeholder=""
                  autoCapitalize="none"
                  autoFocus
                  style={{
                    paddingHorizontal: 10,
                    flex: 1,
                  }}
                  onChangeText={(email) => {
                  //  setemail(email);
                  }}
                ></TextInput>
              </View>
            </View>
            <ATMAButton
              onPress={onContinue}
              title="Continue"
              color={secondary_color}
              fontStyle={{
                fontWeight: "bold",
                //textTransform: "uppercase",
                color: "black",
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
