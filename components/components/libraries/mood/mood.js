import React, { useContext, useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Flatlist,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import Songcard from "../../ui_elements/songcard";
import Songs from "../../../assets/songs/Songs";
import { ThemeContext } from "../../../contexts/ThemeContext";
import Minimizedplayer from "../../player/minimizedplayer";
import Header from "../../libraries/header2";
import { MainContext } from "../../../contexts/MainContext";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  FontAwesome,
  SimpleLineIcons,
  Entypo,
} from "@expo/vector-icons";

import playlists from "../../../contexts/data/playlists.js";

import { moods } from "../../../contexts/data/moods";
import { useNavigationState } from "@react-navigation/native";
import { DataContext } from "../../../contexts/DataContext";
import { EventRegister } from "react-native-event-listeners";
export default function Mood() {
  const state = useNavigationState((state) => state);

  const btn_bg_color = "rgba(50, 55, 61,1)";
  const { disable_player_maximize, playlist_number_ref } =
    useContext(MainContext);
  const { /* playlists, */ love_vibes, soul_trap } = useContext(DataContext);
  const { width, height } = Dimensions.get("window");
  const listener1 = useRef();
  const playlist_swiper = useRef();
  const [update, setupdate] = useState();
  const [songs, setsongs] = useState([]);
  useEffect(() => {
    setsongs(moods[playlist_number_ref.current].data);
    setplaylist_name(moods[playlist_number_ref.current].name);
    setplayist_last_update(moods[playlist_number_ref.current].last_update);
    setplaylist_song_number(moods[playlist_number_ref.current].songs_num);
    setvar_name(moods[playlist_number_ref.current].var_name);
    return () => {
      //  EventRegister.removeEventListener(listener1.current)
    };
  }, []);

  const sliderY = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const scrollX = useRef(new Animated.Value(0)).current;
  const [playlist_name, setplaylist_name] = useState("Tracks");
  const [playist_last_update, setplayist_last_update] = useState("01 Jan 21");
  const [playlist_song_number, setplaylist_song_number] = useState("n/a");
  const sliderPan = useRef(
    PanResponder.create({
      //onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        return dx > 2 || dx < -2 || dy > 2 || dy < -2;
      },
      onPanResponderGrant: () => {
        /*  sliderY.setOffset({
                 x: sliderY.x._value,
 
                 y: sliderY.y._value
 
             }) */
        // console.log('yipi')
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: sliderY.x,
            dy: sliderY.y,
          },
        ],
        { useNativeDriver: false }
      ),
      // (e, { dy }) => {
      //sliderPan.x.setValue(gesture.dx)
      //sliderPan.setValue({ y: 550 })
      // console.log('g_dy', dy)
      // }

      onPanResponderRelease: () => {
        const x = sliderY.y.__getValue();
        console.log("x", x);
        if (x < -100) {
          sliderY.y.setValue(-350);
          descriptionY.setValue(-40);
        } else {
          sliderY.y.setValue(0);
          descriptionY.setValue(0);
        }
        //sliderY.flattenOffset()

        /*  Animated.spring(sliderY, {
                 toValue: { x: 0, y: 570 },
                 useNativeDriver: true
             }).start() */
      },
    })
  ).current;

  const descriptionY = useRef(new Animated.Value(0)).current;

  ////////////////////////////////////////////////////////////////////////////////////////////
  const [activity_indicator, setactivity_indicator] = useState(false);
  const onViewChangeRef = useRef(({ viewableItems }) => {
    setactivity_indicator(true);
    setTimeout(() => {
      setactivity_indicator(false);
    }, 60);
    // console.log('in change playlistreffffff', , 'indexxxx', viewableItems[0].index)
    if (playlist_number_ref.current == 0) return;
    try {
      //if (viewableItems[0].index != playlist_number_ref.current) {
      console.log(
        "insiddddddddddddddddddddddddddddddddddddddddddddddddddddddde"
      );
      playlist_number_ref.current = viewableItems[0].index + 1;

      setsongs(moods[playlist_number_ref.current].data);
      setplaylist_name(moods[playlist_number_ref.current].name);
      setplayist_last_update(moods[playlist_number_ref.current].last_update);
      setplaylist_song_number(moods[playlist_number_ref.current].songs_num);
      setvar_name(moods[playlist_number_ref.current].var_name);

      // console.log('update trackssssssssssssssssssssssssssssssssssssssssssss', playlists[viewableItems[0].index + 1].name)
      // EventRegister.emit('update_playlist', playlists[viewableItems[0].index + 1].name)
      //    }
    } catch (error) {
      console.log(error);
    }
  });

  const [var_name, setvar_name] = useState();

  useEffect(() => {
    /*      const routeName = (state.routeNames[state.index]);
             console.log(routeName);
             console.log(state) */
    disable_player_maximize.current = true;

    return () => {
      disable_player_maximize.current = false;
    };
  }, []);
  const image_size = 80;
  const bg_image_size = "100%";
  return (
    <View
      style={{
        width: width,
        height: "100%",

        alignContent: "center",
      }}
    >
      <View
        style={{
          // height: 60,
          // position: 'absolute',
          top: 40,
          zIndex: 1,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Moods
        </Text>
        {/* <Header></Header> */}
      </View>
      {moods.map((item, index) => {
        const inputRange = [
          (index - 1) * width * 0.65,
          index * width * 0.65,
          (index + 1) * width * 0.65,
        ];
        const opacity2 = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
        });

        return (
          <Animated.View
            key={index.toString()}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              // alignContent: 'center',
              // justifyContent: 'center',
              zIndex: 0,
              // top: -80
              opacity: opacity2,
            }}
          >
            <Image
              style={{
                height: bg_image_size,
                width: bg_image_size,
                borderRadius: 10,
                borderColor: "rgba(239,239,239,0.2)",
                borderWidth: 2,
                resizeMode: "contain",
                alignSelf: "center",
                top: -200,
              }}
              source={item.image}
            ></Image>
          </Animated.View>
        );
      })}

      <LinearGradient
        // Background Linear Gradient
        locations={[0, 0.45]}
        colors={["rgba(23, 22, 23,0.2)", "rgb(23, 22, 23)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 0,
          height: height,
        }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          /*    justifyContent: 'center',
                   alignContent: 'center' */
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: true,
                listener: (e) => {
                  //  console.log(e.nativeEvent.contentOffset.x, width * 0.65)
                  if (e.nativeEvent.contentOffset.x == 0) {
                    setactivity_indicator(true);
                    setTimeout(() => {
                      setactivity_indicator(false);
                    }, 60);

                    playlist_number_ref.current = 0;
                    setsongs(moods[playlist_number_ref.current].data);
                    setplaylist_name(moods[playlist_number_ref.current].name);
                    setplayist_last_update(
                      moods[playlist_number_ref.current].last_update
                    );
                    setplaylist_song_number(
                      moods[playlist_number_ref.current].songs_num
                    );
                    setvar_name(moods[playlist_number_ref.current].var_name);
                  }
                  if (e.nativeEvent.contentOffset.x == width * 0.65) {
                    setactivity_indicator(true);
                    setTimeout(() => {
                      setactivity_indicator(false);
                    }, 60);

                    playlist_number_ref.current = 1;
                    setsongs(moods[playlist_number_ref.current].data);
                    setplaylist_name(moods[playlist_number_ref.current].name);
                    setplayist_last_update(
                      moods[playlist_number_ref.current].last_update
                    );
                    setplaylist_song_number(
                      moods[playlist_number_ref.current].songs_num
                    );
                    setvar_name(moods[playlist_number_ref.current].var_name);
                  }
                },
              }
            )}
            onViewableItemsChanged={onViewChangeRef.current}
            decelerationRate={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.65}
            data={moods}
            horizontal
            ref={playlist_swiper}
            onLayout={() => {
              playlist_swiper.current.scrollToIndex({
                index: playlist_number_ref.current,
                animated: true,
                viewOffset: width * 0.175,
              });
              setupdate(Math.random());
            }}
            // initialScrollIndex={playlist_number_ref.current}
            nestedScrollEnabled={true}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              justifyContent: "center",
              alignContent: "center",
              paddingHorizontal: "17.5%",
            }}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * width * 0.65,
                index * width * 0.65,
                (index + 1) * width * 0.65,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.85, 0.95, 0.85],
              });
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [0, 30, 0],
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
              });

              return (
                <View
                  style={{
                    height: height * 0.53,
                    width: width * 0.65,

                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",

                    marginTop: -10,
                  }}
                >
                  <Animated.View
                    style={{
                      height: "100%",
                      width: width,
                      //backgroundColor: item.color,
                      // overflow: 'hidden',
                      transform: [{ scale }, { translateY }],
                      zIndex: 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        console.log(
                          songs,
                          playlist_number_ref.current,
                          "xxxx",
                          moods[playlist_number_ref.current].data
                        );
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 10,
                          borderColor: "rgba(239,239,239,0.2)",
                          borderWidth: 2,
                          height: 200,
                          width: 180,
                          alignSelf: "center",
                          marginVertical: 40,
                          justifyContent: "center",
                          alignContent: "center",
                          backgroundColor: item.color_fade,

                          overflow: "hidden",
                        }}
                      >
                        <Image
                          style={{
                            borderRadius: 10,

                            height: image_size,
                            width: image_size,
                            alignSelf: "center",
                          }}
                          source={item.image}
                        ></Image>
                      </View>
                    </TouchableOpacity>

                    <Animated.View
                      style={{
                        position: "absolute",
                        bottom: 70,
                        alignContent: "center",
                        width: "100%",
                        justifyContent: "center",
                        opacity,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 17,
                        }}
                      >
                        {" "}
                        {item.name}
                      </Text>

                      <Text
                        style={{
                          color: "white",
                          //  fontWeight: 'bold',
                          textAlign: "center",
                          fontSize: 12,
                        }}
                      >
                        {" "}
                        {item.songs_num} Songs{" "}
                      </Text>

                      <View
                        style={{
                          position: "absolute",
                          zIndex: 1000,
                          height: 200,
                          width: width,
                          paddingHorizontal: 20,
                          top: 70,
                          alignContent: "center",
                          justifyContent: "center",
                          // backgroundColor: 'green'
                        }}
                      >
                        <ScrollView showsVerticalScrollIndicator={false}>
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontSize: 18,

                              //backgroundColor: 'blue'
                            }}
                          >
                            {item.description}
                          </Text>
                        </ScrollView>
                      </View>
                      <View
                        style={{
                          height: 50,
                          width: "100%",
                          //backgroundColor: 'orange',

                          position: "absolute",
                          alignSelf: "center",
                          opacity: 0.5,
                          paddingHorizontal: 20,
                          top: 215,
                          //transform: [{ translateY: 100 }],
                          zIndex: 51,
                        }}
                      >
                        <LinearGradient
                          // Background Linear Gradient
                          locations={[0, 1]}
                          colors={["rgba(23, 22, 23,0)", "rgb(23, 22, 23)"]}
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            zIndex: 0,
                            height: 50,
                          }}
                        />
                      </View>
                    </Animated.View>
                  </Animated.View>
                </View>
              );
            }}
          />
        </View>

        {/* //////////////////////////////////////////////////////////////////////// */}

        <Animated.View
          {...sliderPan.panHandlers}
          style={{
            height: "70%",
            marginTop: "142%",
            transform: [{ translateY: sliderY.y }],
            backgroundColor: "rgba(34, 38, 43,1)",

            paddingVertical: 10,

            borderRadius: 10,
          }}
        >
          <View
            style={{
              /*    height: 3, width: 50,
                           backgroundColor: 'white', */
              alignSelf: "center",
              marginVertical: 3,
              position: "absolute",
              opacity: 1,
            }}
          >
            <Entypo
              style={{
                alignSelf: "center",
              }}
              name="chevron-thin-up"
              size={10}
              color="white"
            />
          </View>
          <View
            style={{
              height: 40,
              alignContent: "center",
              paddingHorizontal: 30,
              marginTop: 8,
              flexDirection: "row",
              marginVertical: 20,
              overflow: "hidden",
              // backgroundColor: 'blue'
            }}
          >
            <Animated.View
              style={{
                color: "white",
                width: "40%",
                //backgroundColor: 'orange',
                // overflow: 'hidden',

                //fontWeight: 'bold',
                // textAlign: 'center',
                transform: [{ translateY: descriptionY }],
              }}
            >
              <View
                style={{
                  height: 40,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",

                    // textAlign: 'center'
                  }}
                >
                  Tracks
                </Text>
                <Text
                  style={{
                    color: "white",
                    //fontWeight: 'bold',
                    // textAlign: 'center',
                    fontSize: 10,
                  }}
                >
                  last Update: {playist_last_update}
                </Text>
              </View>
              <View
                style={{
                  paddingVertical: 5,
                  // backgroundColor: 'pink',
                  height: 40,
                  justifyContent: "center",
                  width: 150,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    // textAlign: 'center'
                  }}
                >
                  {playlist_name} Mood
                </Text>
                <Text
                  style={{
                    color: "white",
                    //fontWeight: 'bold',
                    // textAlign: 'center',
                    fontSize: 10,
                  }}
                >
                  {playlist_song_number} Songs
                </Text>
              </View>
            </Animated.View>

            <View
              style={{
                width: "60%",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setshuffle_on(!shuffle_on);
                }}
              >
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: btn_bg_color,
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    justifyContent: "center",
                  }}
                >
                  <SimpleLineIcons
                    style={{
                      alignSelf: "center",
                    }}
                    name="shuffle"
                    size={22}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  EventRegister.emit("minimize_player", false);
                  EventRegister.emit("player_splash_screen", true);

                  EventRegister.emit("slideTo", 0);

                  setTimeout(() => {
                    EventRegister.emit("songs", var_name);
                  }, 0);
                }}
              >
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: btn_bg_color,
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    style={{
                      marginLeft: "10%",
                      marginTop: "0%",
                      alignSelf: "center",
                    }}
                    name="ios-play"
                    size={30}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setshuffle_on(!shuffle_on);
                }}
              >
                <View
                  style={{
                    marginHorizontal: 5,
                    backgroundColor: btn_bg_color,
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    justifyContent: "center",
                  }}
                >
                  <Feather
                    style={{
                      marginLeft: "10%",
                      marginTop: "0%",
                      alignSelf: "center",
                    }}
                    name="more-vertical"
                    size={18}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              zIndex: 20,
              position: "absolute",
              width: width,
              top: 100,
            }}
          >
            <ActivityIndicator
              style={{ alignSelf: "center" }}
              size={40}
              color="rgb(185, 150, 46)"
              animating={activity_indicator}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom: 300,
              paddingHorizontal: 20,
            }}
            data={songs}
            renderItem={({ item }) => {
              return (
                <View style={{}}>
                  <Songcard
                    song_name={item.song_name}
                    artists={item.artists}
                    featuring_artists={item.featuring_artists}
                    cover_image={item.cover_image}
                  />
                </View>
              );
            }}
          />
        </Animated.View>
      </View>
      <Minimizedplayer />
    </View>
  );
}
