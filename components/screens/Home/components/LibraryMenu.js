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
export default function LibraryMenu({ navigation }) {
  const { showSongs, setshowSongs } = useContext(MainContext);

  const menuItems = [
    {
      name: "All Songs",
      action: () => {
        setshowSongs("allsongs");
        navigation.navigate("viewplaylist");
      },
    },
    {
      name: "Your Favourites",
      action: () => {
        setshowSongs("favourites");

        navigation.navigate("viewplaylist");
      },
    },

    {
      name: "Recently Played",
      action: () => {
        setshowSongs("recentlyplayed");

        navigation.navigate("viewplaylist");
      },
    },
  ];

  return (
    <View
      style={{
        //   backgroundColor: 'white',
        //  paddingHorizontal: 13,
        height: 200,

        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          marginBottom: 10,
          fontWeight: "bold",
          color: "#FF9C52",
          paddingHorizontal: 13,
        }}
      >
        Library
      </Text>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            {
              //   paddingBottom: 120,
            }
          }
          keyExtractor={(item, index) => index.toString()}
          data={menuItems}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  paddingHorizontal: 13,
                }}
              >
                {index == 0 ? (
                  <View
                    style={{
                      height: 0.5,
                      width: "100%",

                      backgroundColor: "rgba(255,255,255, 0.3)",
                    }}
                  ></View>
                ) : null}

                <TouchableOpacity
                  onPress={() => {
                    item.action();
                  }}
                  style={{
                    height: 45,

                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "white",
                      fontWeight: "100",
                    }}
                  >
                    {item.name}
                  </Text>

                  <View style={{}}>
                    <Entypo
                      name="chevron-small-right"
                      size={18}
                      color="rgba(255,255,255, 0.5)"
                    />
                  </View>
                </TouchableOpacity>

                <View
                  style={{
                    height: 0.5,
                    width: "100%",

                    backgroundColor: "rgba(255,255,255, 0.3)",
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
