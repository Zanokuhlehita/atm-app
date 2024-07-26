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

import ATMAButton from "../../../components/ATMAButton";
import ATMATextInput from "../../../components/ATMATextInput";

import Header from "../../../components/Header";
import { secondary_color } from "../../../theme/colors";
import Background from "../components/Background";

export default function TextFieldForm({ title, navigation, onPressContinue }) {
  const [activityIndicator, setactivityIndicator] = useState(false);
  const [loginStatus, setloginStatus] = useState("");
const [gender, setgender] = useState('male')
const [ageRange, setageRange] = useState("<13");
const ages = [
  { name: "<13", onPress: () => setageRange("<13") },
  { name: "13-17", onPress: () => setageRange("13-17") },
  { name: "18-22", onPress: () => setageRange("18-22") },
  { name: "23-27", onPress: () => setageRange("23-27") },
  { name: "28-35", onPress: () => setageRange("28-35") },
  { name: ">35", onPress: () => setageRange(">35") },
];
 const { width, height } = Dimensions.get("window");
  return (
    <View style={{ flex: 1 }}>
      <Background />
      <Header
        title=" "
        backAction={() => {
          navigation.goBack();
        }}
      />
      {activityIndicator ? (
        <View
          style={{
            position: "absolute",
            zIndex: 1000,
            height: height,
            width: width,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba( 0,0,0, 0.5)",
          }}
        >
          <ActivityIndicator animating={true} color="#525252" size={50} />
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,

            height: "100%",
            width: "100%",
            zIndex: 40,
          }}
        >
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
            <View style={{ marginTop: 0, marginBottom: 55 }}>
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
                  Complete Profile
                </Text>
              </View>
            </View>
            <ATMATextInput title="User Name" />

            <View style={{ marginTop: 10, height: 50, marginBottom: 50 }}>
              <Text style={{ color: "white" }}>Gender</Text>
              <View
                style={{
                  height: "100%",

                  flexDirection: "row",
                  backgroundColor: "#CCCCCC",
                  borderRadius: 5,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setgender("male");
                  }}
                  style={{
                    flexDirection: "row",
                    width: "49.5%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <View style={{}}>
                    <Ionicons
                      style={{ marginRight: 10 }}
                      name="ios-male"
                      size={24}
                      color={gender == "male" ? secondary_color : "white"}
                    />
                  </View>

                  <Text
                    style={{
                      color: gender == "male" ? secondary_color : "white",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                <View
                  style={{ height: "100%", width: 1, backgroundColor: "white" }}
                ></View>
                <TouchableOpacity
                  onPress={() => {
                    setgender("female");
                  }}
                  style={{
                    flexDirection: "row",
                    width: "49.5%",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <View style={{}}>
                    <Ionicons
                      style={{ marginRight: 10 }}
                      name="ios-female"
                      size={24}
                      color={gender == "female" ? secondary_color : "white"}
                    />
                  </View>

                  <Text
                    style={{
                      color: gender == "female" ? secondary_color : "white",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{}}>
              <Text style={{ color: "white", marginBottom: 10 }}>
                Age Range
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                {ages.map((item, i) => {
                  return (
                    <View
                      style={{ width: "31%", marginBottom: 10 }}
                      key={i.toString()}
                    >
                      <TouchableOpacity
                        onPress={item.onPress}
                        style={{
                          backgroundColor:
                            ageRange == item.name ? secondary_color : "#CCCCCC",
                          height: 50,
                          borderRadius: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
            <View style={{ bottom: 0, marginTop: 20 }}>
              <ATMAButton
                //onPress={onContinue}
                title="Start Listening"
                color={secondary_color}
                fontStyle={{
                  fontWeight: "bold",
                  //textTransform: "uppercase",
                  color: "black",
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
