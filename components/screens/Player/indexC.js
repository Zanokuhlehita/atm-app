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
import Header from "../../components/Header";
import BlankSpace from "./components/BlankSpace";
import MainView from "./components/MainView/index";
import PlayerControls from "./components/PlayerControls";
import ProgressSlider from "./components/PlayerControls/components/ProgressSlider";
import NavIcons from "./components/NavIcons";
import MiniMenu from "../../components/MiniMenu";
import { EventRegister } from "react-native-event-listeners";
import BottonNavigation from "./components/BottomNavigation";
import CoverArt from "./components/CoverArt";
import { MainContext } from "../../contexts/MainContext";
import SongDetails from "./components/SongDetails";
import { LinearGradient } from "expo-linear-gradient";
import Drawer from "./components/Drawer";
import NavlList from "../../components/NavlList";
import ATMAButton from "../../components/ATMAButton";

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
}) {
  const {
    allSongs,
    nowPlayingLyrics_context,
    setallSongs_context,
    currentIndex_context_ref,
    screenHeight
  } = useContext(MainContext);

  const listener = useRef();
  const [songName, setsongName] = useState();
  const [songArtist, setsongArtist] = useState();
  const [songCoverArt, setsongCoverArt] = useState();
  useEffect(() => {
    setsongName(
      allSongs[currentIndex_context_ref.current].name
    );
    setsongArtist(
      allSongs[currentIndex_context_ref.current].artists
    );
    setsongCoverArt(
      allSongs[currentIndex_context_ref.current].coverArt
    );

    listener.current = EventRegister.addEventListener(
      "updatenowplaying",
      (v) => {
        setsongName(allSongs[v].name);
        setsongArtist(allSongs[v].artists);
        setsongCoverArt(allSongs[v].coverArt);
      }
    );
    return () => {
      EventRegister.removeEventListener(listener.current);
    };
  }, []);

  const [drawerOpen, setdrawerOpen] = useState(false);
  const [drawerStyles, setdrawerStyles] = useState({ bottom: 0 });
  useEffect(() => {
    /*   if (drawerOpen) setdrawerStyles({ top: 0 })
        if (!drawerOpen) setdrawerStyles({ bottom: 0 }) */
    console.log(drawerOpen, drawerStyles);

    /*   // setdrawerStyles({ top: 0 }) */
    return () => {};
  }, []);
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [top, settop] = useState(null);
  const [topInitValue, settopInitValue] = useState(0);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          y: pan.y._value,
        });
      },
      onPanResponderMove: (_, gesture) => {
        pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        console.log(gesture.dy);

        if (gesture.dy < 0) {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
          }).start(() => {
            pan.flattenOffset();
          });
          //

          setdrawerOpen(false);
        }
        if (gesture.dy > 0) {
          Animated.spring(pan, {
            toValue: height - 65,
            useNativeDriver: false,
          }).start(() => {
            pan.flattenOffset();
          });
          //

          setdrawerOpen(true);
        }
      },
    })
  ).current;

  const [lyricsActive, setlyricsActive] = useState(false);
  const [storiesActive, setstoriesActive] = useState(false);
  const [playlistActive, setplaylistActive] = useState(false);
  const [infoActive, setinfoActive] = useState(false);
  const drawerEL = useRef();
  const conatiner_padding = 25;
  const grad_color = "223, 32, 58";
  const grad_color_2 = "29, 29, 29";
  const { width, height } = Dimensions.get("window");
  const [drawerOffset, setdrawerOffset] = useState(450);
  const [update, setupdate] = useState(0);
  const [showNavList, setshowNavList] = useState(false);

  const [showLyrics, setshowLyrics] = useState(false);
  const [showStories, setshowStories] = useState(false);
  const [showInfo, setshowInfo] = useState(false);
  const [showPlaylist, setshowPlaylist] = useState(false);
  const [showNothing, setshowNothing] = useState(false);
  const [openDrawer, setopenDrawer] = useState(false);

  useEffect(() => {
    if (showLyrics || showInfo || showPlaylist || showStories || showNothing)
      setopenDrawer(true);
    else setopenDrawer(false);

    return () => {};
  }, [showLyrics, showInfo, showPlaylist, showStories, showNothing]);

  useEffect(() => {
    setshowLyrics(false);
    return () => {};
  }, [nowPlayingLyrics_context]);
  const font_color = "black";
  const icon_size = 20
  const icon_color = 'white';

  const [isPlaying, setisPlaying] = useState(false);
  return (
    <Animated.View
      style={{
        // flex: 1,
        paddingHorizontal: 0,
        // backgroundColor: "rgba(0, 252, 231, 0.8)",
        backgroundColor: playerBg_color,
        height: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: "hidden",
      }}
      onLayout={() => {
        /*    drawerEL.current.measure((fx, fy, width, local_height, px, py) => {
          if (py > 29) {
            setdrawerOffset(local_height - height);
            //  console.log('looking for 30', (local_height - height) )
          }
          if (py < 29) {
            setdrawerOffset(0);
            //   console.log('looking for 0', ((height - local_height)))
          }
          setupdate(Math.random());
        }); */
      }}
    >
      <Animated.View
        onLayout={() => {
          setupdate(Math.random());
        }}
        onPress={() => {
          //navigation.navigate("player");
        }}
        style={{
          position: "absolute",
          height: "100%",
          justifyContent: "flex-start",
          zIndex: 10,
          width: "100%",
          //  backgroundColor: "rgba(222, 255, 255, 1)",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingVertical: 0,
          overflow: "hidden",
          opacity: miniPlayer_opacity,
        }}
      >
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
        <View
          style={{
            flexDirection: "row",
            height: 80,
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
            {/*  <Image
              onLoad={() => {}}
              style={{
                borderRadius: 3,
                height: 40,
                width: 40,
              }}
              source={{ uri: songCoverArt }}
            /> */}
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
                {songName}
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
                {songArtist}
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
              // onPress={handlePlayPause}
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
            backgroundColor: "blue",
            height: screenHeight.current,
          }}
        >
          <Header
            title={`${screenHeight.current}Now Playing`}
            menuAction={() => {
              setshowNavList(true);
            }}
            backAction={() => {
              navigation.navigate("home");
            }}
          />
        </Animated.View>
        <View
          style={{
            paddingVertical: 10,
            paddingTop: 8,
            paddingHorizontal: conatiner_padding,
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
                bottom: coverArtTop,
                right: lyricsTanslation,

                //  transform: [{ translateY: player_opacity }, { scale: 0.5 }],
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
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",

                      //  resizeMode: 'contain'
                    }}
                    source={{ uri: songCoverArt }}
                  />
                </Animated.View>
              </View>
            </Animated.View>
          </Animated.View>
        </View>

        <View
          style={{
            //backgroundColor: 'blue',

            paddingTop: 15,
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
            songName={songName}
            songArtist={songArtist}
          />
        </View>
        <View
          style={{
            paddingHorizontal: conatiner_padding,
          }}
        >
          <PlayerControls
            style={
              {
                //  height: `${100 - halfHeight}%`
              }
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            backgroundColor: "transparent",
          }}
        >
          <View
            style={{
              flex: 1,
              height: "100%",
            }}
          >
            <Ionicons
              name="ios-information-circle-outline"
              size={icon_size}
              color={icon_color}
            />
          </View>
          <View style={{ flex: 1, height: "100%", alignItems: "center" }}>
            <Ionicons
              name="earth-outline"
              size={icon_size}
              color={icon_color}
            />
          </View>

          <View style={{ flex: 1, alignItems: "flex-end", height: "100%" }}>
            <MaterialIcons
              name="playlist-play"
              size={icon_size}
              color={icon_color}
            />
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

      {/*       <Animated.View
        // {...panResponder.panHandlers}

        style={[
          {
          },
          {
            position: "absolute",
            width: "100%",
            zIndex: 0,
            height: "100%",
          },
        ]}
        ref={(ref) => {
          drawerEL.current = ref;
        }}
      >
        <Drawer
          openDrawer={openDrawer}
          setopenDrawer={setopenDrawer}
          songName={songName}
          songArtist={songArtist}
          songCoverArt={songCoverArt}
          showLyrics={showLyrics}
          setshowLyrics={setshowLyrics}
          showStories={showStories}
          setshowStories={setshowStories}
          showInfo={showInfo}
          setshowInfo={setshowInfo}
          showPlaylist={showPlaylist}
          setshowPlaylist={setshowPlaylist}
          showNothing={showNothing}
          setshowNothing={setshowNothing}
        />
      </Animated.View>

      <Animated.View
   
        style={[
          {
          },
          {
            position: "absolute",
            width: "100%",
            zIndex: 10,
            bottom: 0,
          },
        ]}
        ref={(ref) => {
          drawerEL.current = ref;
        }}
      >
        <BottonNavigation
          openDrawer={openDrawer}
          setopenDrawer={setopenDrawer}
          showLyrics={showLyrics}
          setshowLyrics={setshowLyrics}
          showStories={showStories}
          setshowStories={setshowStories}
          showInfo={showInfo}
          setshowInfo={setshowInfo}
          showPlaylist={showPlaylist}
          setshowPlaylist={setshowPlaylist}
          showNothing={showNothing}
          setshowNothing={setshowNothing}
        />
      </Animated.View>
      <NavlList showNavList={showNavList} setshowNavList={setshowNavList} /> */}
    </Animated.View>
  );
}
