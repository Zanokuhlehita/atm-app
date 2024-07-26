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
import { MainContext } from "../../../contexts/MainContext";
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
import { LinearGradient } from "expo-linear-gradient";
import { EventRegister } from "react-native-event-listeners";
import firebase from "firebase";

export default function Playlist({ songs }) {
  const {
    user_context,
    nowPlayingIndex_ref,
    nowPlayingCode,
    allSongs,
    setallSongs_context,
    currentIndex_context_ref,
    showSongs,
    nowPlayingSong,
    skipTo,
    getLikeStatus,
    unLike,
    likeSong,
  } = useContext(MainContext);
  const font_color = "white";
  const { width, height } = Dimensions.get("window");
  const grad_color = "29, 29, 29";
  const image_size = 45;

  useEffect(() => {
    /*     var result = user_context.likes.filter((item, i) => {
            console.log("Item", item);
            if (nowPlayingCode == item) {
              return item;
            }
          });
          if (result != "") setlike(true);
          else setlike(false); */
    return () => {};
  }, [nowPlayingCode, user_context]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{}}
        style={{
          //backgroundColor: 'pink',
          height: "100%",
          width: "100%",
        }}
      >
        {songs.map((item, i) => {
          return (
            <View style={{}} key={i.toString()}>
              <TouchableOpacity
                onPress={() => {
                  /*   const songIndex = (el) => el.code == item.songCode;
                              const index = allSongs.findIndex(songIndex) */
                  /*   EventRegister.emit("playsonghome", i);
                  EventRegister.emit("showactivityindicator", true); */
                  console.log(showSongs);
                  var playlist = {
                    name: "All Songs",
                    songs: allSongs,
                  };
                  if (showSongs == "allongs") {
                    playlist = {
                      name: "All Songs",
                      songs: allSongs,
                    };
                  }
                  if (showSongs == "favourites") {
                    playlist = {
                      name: "Favourites",
                      songs: allSongs,
                    };
                  }
                  if (showSongs == "recentlyplayed") {
                    playlist = {
                      name: "Recently Played",
                      songs: allSongs,
                    };
                  }

                  skipTo(item.code, playlist);
                }}
                style={{
                  height: 50,
                  width: "100%",
                  // backgroundColor: '#383636',
                  backgroundColor:
                    item.code == nowPlayingSong.code
                      ? "rgba(15, 55, 62, 1)"
                      : null,

                  marginVertical: 3,
                  flexDirection: "row",
                  alignItems: "center",
                  // justifyContent: 'center',
                  borderRadius: 3,
                  //elevation:5,
                  paddingLeft: 1.5,
                }}
              >
                <View
                  style={{
                    width: image_size,
                    height: image_size,
                    // backgroundColor: 'green',
                    padding: 5,
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 2,

                      height: "100%",
                      width: "100%",
                    }}
                    source={{ uri: item.coverArt }}
                  />
                </View>
                <View
                  style={{
                    height: "100%",
                    flex: 1,

                    //backgroundColor: 'yellow'
                    paddingHorizontal: 5,
                  }}
                >
                  <View
                    style={{
                      //height: '50%',
                      justifyContent: "center",
                      marginTop: 3,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        color: font_color,
                        marginTop: 5,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={
                      {
                        //height: '50%',
                        //  justifyContent: 'center',
                      }
                    }
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 10,
                        color: font_color,
                        opacity: 0.7,
                      }}
                    >
                      {item.artists}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    height: "100%",
                    //  backgroundColor: "red",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (!getLikeStatus(item)) likeSong(item.code);
                      else unLike(item.code);
                    }}
                    style={{
                      height: "100%",
                      width: 30,
                      // backgroundColor: "blue",

                      alignItems: "center",
                      flexDirection: "row",

                      justifyContent: "center",
                    }}
                  >
                    {getLikeStatus(item) ? (
                      <AntDesign
                        style={{ paddingLeft: 5 }}
                        name="heart"
                        size={11}
                        color="rgba(197, 15, 31,0.6)"
                      />
                    ) : (
                      <AntDesign
                        style={{ paddingLeft: 5 }}
                        name="hearto"
                        size={11}
                        color={"white"}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      height: "100%",
                      width: 30,
                      // backgroundColor: "orange",

                      alignItems: "center",
                      flexDirection: "row",

                      justifyContent: "center",
                    }}
                  >
                    <Entypo
                      name="dots-three-vertical"
                      size={12}
                      color="white"
                      style={{
                        paddingRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  height: 1,
                  width: "100%",

                  //  backgroundColor: 'rgba(255,255,255, 0.2)',
                  alignItems: "flex-end",
                  paddingRight: 3,
                }}
              >
                <View
                  style={{
                    height: 1,
                    width: "100%",

                    backgroundColor: "rgba(255,255,255, 0.1)",
                  }}
                ></View>
              </View>
            </View>
          );
        })}

        {showSongs == "favourites" && songs == "" ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
              }}
            >
              No Favourite Songs Found.
            </Text>
          </View>
        ) : null}

        {showSongs == "recentlyplayed" && songs == "" ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
              }}
            >
              No Recents Found.
            </Text>
          </View>
        ) : null}

        <View
          style={{
            height: 250,

            //   backgroundColor: 'rgba(29, 29, 29,0.8)',
          }}
        ></View>
      </ScrollView>

      {/*   <LinearGradient
                // Background Linear Gradient
                locations={[0, 0.54, 0.55, 1]}

                colors={[
                    `rgba(${grad_color},0)`,
                    `rgba(${grad_color},0.6)`,
                    `rgba(${grad_color},1)`,
                    `rgba(${grad_color},1)`,

                ]}
                style={{
                    position: 'absolute',
                   
                    opacity: 1,
                    bottom: 140,

                    height: 160,
                    width: width,
                   // zIndex: -5
                }}
            /> */}
    </>
  );
}
