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
  Animated,
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
import { firebaseSignOut } from "../../../plugins/firebase";
import { MainContext } from "../../../contexts/MainContext";
import firebase from "firebase";
import LoadingScreenMain from "../../../components/LoadingScreenMain";
import { Portal } from "react-native-portalize";
export default function MenuItems({ navigation }) {
  const {
    soundAll_ref,
    loadingSlider,
    completeLoad,
    setmainLoadingScreen,
    appLoaded_ref,
  } = useContext(MainContext);
  async function unloadSong() {
    if (soundAll_ref.current) await soundAll_ref.current.unloadAsync();
  }
  const menuItems = [
    /*     {
      name: "Plays Stats",
      action: () => {
        navigation.navigate("playsstats");
      },
    }, */
    {
      name: "Sponsor Us",
      action: () => {
        navigation.navigate("supportus");
      },
    },
    {
      name: "Contact Support",
      action: () => {
        navigation.navigate("support");
      },
    },
    {
      name: "Sign Out",
      action: () => {
        Alert.alert(
          "Sign Out",
          "Are you sure you want to sign out",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                appLoaded_ref.current = false;
                setmainLoadingScreen(true);
                Animated.timing(loadingSlider, {
                  toValue: 0,
                  duration: 3000,
                  useNativeDriver: true,
                }).start(() => {});
                firebase
                  .auth()
                  .signOut()
                  .then((e) => {
                    completeLoad("welcome");
                  })
                  .catch((e) => {
                    alert("Sign out failed");
                    console.log("Firebase Sign Out Error", e);
                    return false;
                  });
              },
            },
          ],
          { cancelable: true }
        );
      },
    },
  ];

  return (
    <View
      style={{
        //   backgroundColor: 'white',
        // paddingHorizontal: 13,
        height: "100%",
        marginTop: 20,
      }}
    >
      <Portal>
        <LoadingScreenMain />
      </Portal>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={menuItems}
          renderItem={({ item, index }) => {
            return (
              <View style={{}}>
                {index == 0 ? (
                  <View
                    style={{
                      height: 1,
                      width: "100%",

                      backgroundColor: "rgba(255,255,255, 0.2)",
                    }}
                  ></View>
                ) : null}

                <TouchableOpacity
                  onPress={() => {
                    item.action();
                  }}
                  style={{
                    height: 55,

                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    {item.name}
                  </Text>

                  <View style={{}}>
                    <Entypo
                      name="chevron-small-right"
                      size={25}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    width: "100%",

                    backgroundColor: "rgba(255,255,255, 0.2)",
                  }}
                ></View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
