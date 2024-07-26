import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Image,
  BackgroundImage,
  Dimensions,
  Share,
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
import { MainContext } from "../../../contexts/MainContext";
import firebase from "firebase";

export default function Header({ navigation }) {
  const icon_size = 18;

  const { user_context, allSongs, playsSettings, connctionStatus } =
    useContext(MainContext);
  const notification_indicator_size = 13;

  return (
    <View
      style={{
        paddingTop: 15,
        flexDirection: "row",

        height: 80,
        //backgroundColor :  'white',
      }}
    >
      <View
        onPress={() => {
          /*          function shareText() {
            Share.share(
              {
                message: "A framework for building native apps using React",
                url: "http://facebook.github.io/react-native/",
                title: "React Native",
              },
              {
                dialogTitle: "Share React Native website",
                tintColor: "green",
              }
            )
              .then(showResult)
              .catch((error) => {
                console.log("share error", error.message);
                Alert.alert("You have a share error check in your console");
              });
          }
          function showResult(result) {
            if (result.action === Share.sharedAction) {
              if (result.activityType) {
                var res = {
                  result: "shared with an activityType: " + result.activityType,
                };
                console.log("Share resauts", res);
              } else {
                var res = { result: "shared" };
                console.log("Share resauts", res);
              }
            } else if (result.action === Share.dismissedAction) {
              var res = { result: "dismissed" };
              console.log("Share resauts", res);
            }
          }
          shareText(); */
        }}
        style={{
          paddingTop: 10,

          width: "80%",
          paddingLeft: 30,
          //alignItems: 'center',
          justifyContent: "center",
        }}
      >
        <View
          style={{
            //fontWeight: 'bold',
            color: "black",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flexDirection: "row", fontSize: 14 }}>
              <Text style={{ color: "black" }}>Hello</Text>
              <Text style={{ fontWeight: "700" }}>
                {" "}
                {user_context.firstName}
              </Text>
            </Text>

            {connctionStatus == "offline" ? (
              <View
                style={{
                  marginLeft: 10,

                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 7,
                    fontWeight: "bold",
                    color: "rgba( 0,0,0, 0.5)",
                  }}
                >
                  |
                </Text>
                <View
                  style={{
                    marginLeft: 5,
                    height: 6.5,
                    width: 6.5,
                    borderRadius: 5,
                    backgroundColor: "rgba( 219, 63, 50, 0.9)",
                    marginRight: 3,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 7,
                    fontWeight: "500",
                    textTransform: "uppercase",
                  }}
                >
                  Offline
                </Text>
              </View>
            ) : (
              <View
                style={{
                  marginLeft: 5,

                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginLeft: 0,
                    height: 2,
                    width: 2,
                    borderRadius: 5,
                    backgroundColor: "rgba(52, 168, 83, 0.9)",
                    marginRight: 3,
                  }}
                ></View>
              </View>
            )}
          </View>

          <Text
            style={{
              fontSize: 12,
            }}
          >
            Enjoy Your Music!!
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "20%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",

          paddingRight: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("search"); // 'search'
          }}
          style={{}}
        >
          <Feather
            style={{
              paddingRight: 10,
            }}
            name="search"
            size={icon_size}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("settings");
          }}
          style={{}}
        >
          <Feather name="settings" size={icon_size} color="black" />
          {/*    <View
            style={{
              position: "absolute",
              right: -10,

              top: -5,

              backgroundColor: "red",
              height: notification_indicator_size,
              width: notification_indicator_size,
              borderRadius: notification_indicator_size,
              marginRight: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 7,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              1
            </Text> 
          </View>*/}
        </TouchableOpacity>
      </View>
    </View>
  );
}
