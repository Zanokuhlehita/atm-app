import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  PanResponder,
  Animated,
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
  ImageBackground,
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
import Header from "../../components/Header";

import PlayerControls from "./components/PlayerControls";

import { EventRegister } from "react-native-event-listeners";

import { MainContext } from "../../contexts/MainContext";
import SongDetails from "./components/SongDetails";
import { LinearGradient } from "expo-linear-gradient";

import ATMAButton from "../../components/ATMAButton";
import { albumArt1 } from "../../plugins/assets";
import Toast from "react-native-root-toast";
import { getAllRecordsLevel2 } from "../../plugins/firebase";
import { getData, storeData } from "../../plugins/asyncLocalStorage";

export default function Player({
  navigation,
  miniPlayer_opacity,
  player_opacity,
  coverArtWidth,
  coverArtHieght,
  coverArtTop,
  lyricsTanslation,
  coverArtBorderRadius,
  /* miniPlayerBg_color,*/
  playerBg_color,
  songDescriptionTop,
  songDescriptionLeft,
  songDescriptionSize,
  songDescriptionPadding,
  songDescriptionColor,
  songDescriptionColor2,
  songDescriptionSize2,
  miniPlayerZIndex,
  miniPlayerZIndex_ref,
  setminiPlayerZIndex,
  position_ref,
  position,
}) {
  const {
    screenHeight,
    getNowPlayingSongName,
    getNowPlayingArtistNames,
    getNowPlayingAlbumArt,
    playTrack,
    pauseTrack,
    isPlaying,
    playerModal,
    nowPlayingStoryline_context,
  } = useContext(MainContext);

  const conatiner_padding = 25;
  const grad_color = "223, 32, 58";
  const grad_color_2 = "29, 29, 29";
  const { width, height } = Dimensions.get("window");
  const [update, setupdate] = useState(0);
  const [showNavList, setshowNavList] = useState(false);

  const font_color = "black";
  const icon_size = 22;
  const icon_color = "white";
  const [loaded, setloaded] = useState(false);
  useEffect(() => {
    setupdate(Math.random());
    return () => {};
  }, [position]);
  function getZIndex() {
    if (position_ref.current == "top") {
      return -1;
    } else {
      return 10;
    }
  }
  return (
    <Animated.View
      style={{
        // flex: 1,
        paddingHorizontal: 0,
        //  backgroundColor: "rgba(0, 252, 231, 0.8)",
        ///backgroundColor: playerBg_color,
        height: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
      }}
    >
      <Animated.View
        onLayout={() => {
          setloaded(true);
        }}
        onPress={() => {
          //navigation.navigate("player");
        }}
        style={{
          zIndex: getZIndex(),
          position: "absolute",
          // height: "100%",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingVertical: 0,
          opacity: miniPlayer_opacity,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <View
            style={{
              position: "absolute",
              backgroundColor: "rgba(240, 255, 255, 1)",
              height: "100%",
              width: "100%",
            }}
          ></View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
              style={{
                marginTop: 10,
                marginBottom: -10,

                width: 30,
                height: 5,
                backgroundColor: "black",
                borderRadius: 5,
              }}
            ></View>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log("dd", getNowPlayingAlbumArt());
              if (position_ref.current == "top") {
                playerModal.current.close("alwaysOpen");
              } else {
                playerModal.current.open("top");
              }
            }}
            style={{
              flexDirection: "row",
              height: 90,
            }}
          >
            <View
              style={{
                width: "20%",
                height: "100%",
                paddingHorizontal: 10,

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                onLoad={() => {}}
                style={{
                  borderRadius: 3,
                  height: 40,
                  width: 40,
                  left: 5,
                }}
                source={getNowPlayingAlbumArt()}
              />
            </View>
            <View
              style={{
                //  backgroundColor: 'purple',
                width: "62%",
                height: "100%",
                marginTop: 1,
              }}
            >
              <View
                style={{
                  height: "50%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: font_color,
                    marginTop: 18,
                  }}
                >
                  {getNowPlayingSongName()}
                </Text>
              </View>
              <View
                style={{
                  height: "50%",
                  //  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: font_color,
                  }}
                >
                  {getNowPlayingArtistNames()}
                </Text>
              </View>
            </View>
            <View
              style={{
                //   backgroundColor: 'pink',
                width: "15%",
                height: "100%",
                paddingRight: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (position_ref.current == "top") {
                    playerModal.current.close("alwaysOpen");
                    return;
                  }
                  if (isPlaying) pauseTrack();
                  else playTrack();
                }}
                style={{
                  height: "100%",
                  width: "100%",

                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                {/*  <AntDesign
                        style={{
marginRight:10                    }}
                        name="hearto" size={22} color="black" /> */}
                {isPlaying ? (
                  <Entypo name="controller-paus" size={30} color={font_color} />
                ) : (
                  <Entypo name="controller-play" size={38} color={font_color} />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/*   <LinearGradient
                // Background Linear Gradient
                locations={[0, 0.2, 0.45, 1]}

                colors={[
                    `rgba(${grad_color},0.8)`,
                    `rgba(${grad_color},0.8)`,
                    `rgba(${grad_color},0.8)`,
                    `rgba(${grad_color},0.8)`,

                ]}
                style={{
                    borderRadius: 15,
height:'100%',
                    position: 'absolute',
                    width: '100%',
                    opacity: 1,
                    height: '100%',
                 zIndex: -5
                }}
            /> */}
        {/*        <ATMAButton
          onPress={() => {
            console.log(coverArtHieght, player_opacity);
          }}
        /> */}
      </Animated.View>

      {loaded ? (
        <Animated.View
          style={{
            flex: 1,
            paddingHorizontal: 0,
            // backgroundColor: "rgba(0, 252, 231, 0.8)",
            //   opacity: player_opacity,
          }}
        >
          <Animated.View
            style={{
              opacity: player_opacity,
            }}
          >
            <Header
              icon={<Feather name="chevron-down" size={20} color={"white"} />}
              height={screenHeight.current * 0.1}
              title={`Now Playing`}
              backAction={() => {
                playerModal.current.close("alwaysOpen");
              }}
            />
          </Animated.View>
          <View
            style={{
              paddingVertical: 10,
              paddingTop: 18,
              paddingHorizontal: conatiner_padding,
              height: screenHeight.current * 0.45,

              //  justifyContent: "center",
            }}
          >
            {/* Cover Art */}
            <Animated.View
              style={
                {
                  //  height: 250,
                  //  width: "100%",
                }
              }
            >
              <Animated.View
                style={{
                  height: coverArtHieght,
                  width: coverArtWidth,
                  // top: coverArtTop,
                  //  right: lyricsTanslation,

                  transform: [{ translateY: coverArtTop }],
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    zIndex: 100,

                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Animated.View
                    style={{
                      // backgroundColor: '#B5A3E5',
                      width: "100%",
                      height: "100%",

                      borderRadius: coverArtBorderRadius,
                      overflow: "hidden",
                    }}
                  >
                    <ImageBackground
                      style={{
                        height: "100%",
                        width: "100%",

                        //  resizeMode: 'contain'
                      }}
                      source={getNowPlayingAlbumArt()}
                    >
                      <View style={{ flex: 1 }}></View>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}></View>
                        <Animated.View
                          style={{
                            opacity: lyricsTanslation,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("lyrics");
                              // setplayerModalVisible(false)
                            }}
                            style={{
                              backgroundColor: "white",
                              borderRadius: 2,
                              flexDirection: "row",
                              alignItems: "center",
                              //position: 'relative',
                              marginRight: 16,
                              marginBottom: 16,
                              paddingHorizontal: 8,
                              paddingVertical: 2,
                            }}
                          >
                            <Ionicons
                              style={{ marginRight: 5 }}
                              name="mic"
                              size={15}
                              color="black"
                            />
                            <Text
                              style={{
                                fontFamily: "Nunito-600",
                              }}
                            >
                              Lyrics
                            </Text>
                          </TouchableOpacity>
                        </Animated.View>
                      </View>
                    </ImageBackground>
                  </Animated.View>
                </View>
              </Animated.View>
            </Animated.View>
          </View>
          <View
            style={{
              //  backgroundColor: "blue",
              height: screenHeight.current * 0.135,
              paddingTop: 5,
              paddingBottom: 0,

              paddingHorizontal: conatiner_padding,
            }}
          >
            <SongDetails
              songDescriptionPadding={songDescriptionPadding}
              songDescriptionTop={songDescriptionTop}
              songDescriptionLeft={songDescriptionLeft}
              songDescriptionSize={songDescriptionSize}
              songDescriptionColor={songDescriptionColor}
              songDescriptionSize2={songDescriptionSize2}
              songDescriptionColor2={songDescriptionColor2}
            />
          </View>
          <View
            style={{
              paddingHorizontal: conatiner_padding,
              //backgroundColor: "orange",
              //  height: screenHeight.current * 0.2,
              flex: 1,
            }}
          >
            <PlayerControls
              style={{
                height: screenHeight.current * 0.2,
              }}
            />
          </View>
          <View
            style={{
              height: screenHeight.current * 0.095,
              //    paddingTop: 10,

              flexDirection: "row",
              paddingHorizontal: 25,
              backgroundColor: "transparent",
            }}
          >
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("info");
                }}
                style={{}}
              >
                <Ionicons
                  name="ios-information-circle-outline"
                  size={icon_size}
                  color={icon_color}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("stories");
                }}
                style={{}}
              >
                <Ionicons
                  name="earth-outline"
                  size={icon_size}
                  color={icon_color}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("playlist");
                }}
                style={{}}
              >
                <MaterialIcons
                  name="playlist-play"
                  size={icon_size}
                  color={icon_color}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Animated.View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: player_opacity,
              zIndex: -2,
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0, 252, 231, 0.8)",
                width: "100%",
                height: "100%",
                position: "absolute",
              }}
            ></View>
            <LinearGradient
              // Background Linear Gradient
              locations={[0, 1]}
              colors={[`rgba(${grad_color_2},0.8)`, `rgba(${grad_color_2},1)`]}
              style={{
                //  position: "absolute",
                width: "100%",
                opacity: 1,
                height: "100%",
              }}
            />
          </Animated.View>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}
