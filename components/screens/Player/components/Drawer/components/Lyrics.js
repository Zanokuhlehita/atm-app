import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
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
  ImageBackground,
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
import { EventRegister } from "react-native-event-listeners";

import {
  secondary_color,
  text_color_secondary,
} from "../../../../../theme/colors";
import { MainContext } from "../../../../../contexts/MainContext";
import { LinearGradient } from "expo-linear-gradient";
import AlbumArt from "../../../../../assets/images/cover_arts/love_life_loyalty.jpg";
import {
  getAllRecords,
  getAllRecordsLevel2,
} from "../../../../../plugins/firebase";

export default function Lyrics({
  songName,
  songCoverArt,
  songArtist,
  showNothing,
  setshowNothing,
  setshowLyrics,
}) {
  const { width, height } = Dimensions.get("window");
  const {
    allSongs_context_ref,
    currentIndex_context_ref,
    nowPlayingLyrics_context,
    setnowPlayingLyrics_context,
  } = useContext(MainContext);
  const [lyrics, setlyrics] = useState([
    {
      line: "No Lyrics Found",
    },
  ]);

  const index_ref = useRef(new Animated.Value(0)).current;
  const translateY = index_ref.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -115],
  });

  const text = React.createRef();
  const lyricsHeightOffsetRef = React.useRef([]);
  const itemsRef = React.useRef([]);

  const [update, setupdate] = useState(true);

  const listener1 = useRef();
  const listener2 = useRef();

  useEffect(() => {
    listener1.current = EventRegister.addEventListener("update_lyrics", (x) => {
      setTimeout(() => {
        setupdate(Math.random());
        //  console.log(song.lyrics)
      }, 0);
      setTimeout(() => {
        setupdate(Math.random());
      }, 1500);
      setTimeout(() => {
        setupdate(Math.random());
      }, 3000);
    });

    listener2.current = EventRegister.addEventListener(
      "songposition",
      (pos) => {
        if (pos) {
          var past = nowPlayingLyrics_context.filter((lyrics) => {
            return lyrics.time < pos;
          });

          if (pos) {
            const index = past.length;

            try {
              Animated.timing(index_ref, {
                toValue: index,
                duration: 250,
                useNativeDriver: true,
              }).start();
            } catch (error) {}
          }
        }
      }
    );
    return () => {
      EventRegister.removeEventListener(listener1.current);
      EventRegister.removeEventListener(listener2.current);
    };
  }, []);
  function move(pos) {
    if (pos) {
      var past = nowPlayingLyrics_context.filter((lyrics) => {
        return lyrics.time < pos;
      });

      if (pos) {
        const index = past.length;

        try {
          Animated.timing(index_ref, {
            toValue: index,
            duration: 250,
            useNativeDriver: true,
          }).start();
        } catch (error) {}
      }
    }
  }
  const grad_color = "0,0,0";
  const text_align = "center";
  return (
    <TouchableOpacity
      onPress={() => {}}
      style={
        {
          // marginTop: 160,
        }
      }
    >
      <ImageBackground
        source={AlbumArt}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "center",
          top: "-10%",
        }}
        style={{
          backgroundColor: "grey",
          //paddingRght: 20,
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            // backgroundColor: '#B5A3E5',
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <View
          //  scrollEnabled={false}
          >
            <View
              style={{
                marginTop: "0%",
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(29, 29, 29,0.8)",
                //  borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <View
                /* ref={text} */ name="lyrics view port"
                style={{
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    //alignItems: 'center',
                    //backgroundColor: 'yellow'
                  }}
                >
                  {
                    /* now_playing_ref.current == id ? */
                    <Animated.View
                      style={{
                        top: 180,
                        transform: [{ translateY }],
                      }}
                      /*  ref={el => lyricsHeightOffsetRef.current = el} */
                      name="All lyrics Body"
                    >
                      <View
                        style={{
                          //  height: 100,
                          // backgroundColor: 'blue',
                          alignItems: "center",

                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            width: "100%",
                            textAlign: text_align,
                            fontWeight: "bold",
                            lineHeight: 35,
                            marginVertical: 25,
                            fontSize: 25,
                            paddingHorizontal: 25,
                            color: secondary_color,
                          }}
                        >
                          .
                        </Text>
                      </View>

                      {nowPlayingLyrics_context.map((item, index) => {
                        return (
                          <View
                            onLayout={() => {
                              //console.log('fffffffffffffffffffffffffff')
                            }}
                            key={index.toString()}
                            style={{
                              height: 115,
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              //ref={el => itemsRef.current[index] = el}
                              numberOfLines={2}
                              style={{
                                // width: width * 0.72,
                                textAlign: text_align,
                                fontWeight: "bold",
                                lineHeight: 35,
                                marginVertical: 25,
                                fontSize: 20,
                                paddingHorizontal: 22.5,
                                color: "white",
                                flex: 1,
                              }}
                            >
                              {item.line}
                              {item.translation ? (
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    width: width * 0.72,
                                    //textAlign: 'right',
                                    fontWeight: "bold",
                                    lineHeight: 35,
                                    marginVertical: 25,
                                    fontSize: 15,
                                    paddingHorizontal: 22.5,
                                    color: "rgba(255,255,255, 1)",
                                    flex: 1,
                                  }}
                                >
                                  {"\n"}
                                  {item.translation}
                                </Text>
                              ) : null}
                            </Text>
                            {/*   {item.repeat ?
                                                            <View style={{
                                                                width: 30,
                                                                height: 10,
                                                                // backgroundColor: 'blue',
                                                                position: 'absolute',
                                                                right: 0,
                                                                top: 38,


                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}>
                                                                <Text
                                                                    style={{
                                                                        fontSize: 8,

                                                                        color: 'rgba(255,255,255, 0.5)',


                                                                    }}
                                                                >x2</Text>
                                                            </View>

                                                            : null} */}
                          </View>
                        );
                      })}
                    </Animated.View> /* : <View
                                            style={{
                                                flex: 1,
                                                // backgroundColor: 'green',
                                                alignContent: 'center',
                                                justifyContent: 'center',

                                            }}
                                        >
                                            <ActivityIndicator animating={true} color='rgb(51, 51, 51)' size={50} /></View>
 */
                  }
                </View>

                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    zIndex: 10,
                    //bottom: 10,

                    // backgroundColor: 'rgba(36, 36, 42,0.9)',
                  }}
                >
                  <LinearGradient
                    // Background Linear Gradient
                    locations={[0, 0.3, 0.58, 0.85]}
                    colors={[
                      `rgba(${grad_color},1)`,
                      `rgba(${grad_color},0)`,
                      `rgba(${grad_color},0.7)`,
                      `rgba(${grad_color},1)`,
                    ]}
                    style={{
                      position: "absolute",
                      width: "100%",
                      opacity: 1,
                      height: "100%",
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
