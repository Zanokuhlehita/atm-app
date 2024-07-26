import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Animated,
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
  ImageBackgroundBase,
  ImageBackground,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import coverArt from "../../../assets/images/cover_arts/love_life_loyalty.jpg";
import studio_bg from "../../../assets/images/studio.jpg";

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
import {
  Mic_BG,
  Mic_BG1,
  Studio_BG,
  Concert_BG,
  albumArt1,
  albumArt3,
  albumArt2,
} from "../../../plugins/assets";
import { MainContext } from "../../../contexts/MainContext";
import { EventRegister } from "react-native-event-listeners";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function ScrollBanner({}) {
  const { allSongs, setallSongs_context, skipTo } = useContext(MainContext);
  const suggestedSongs = [
    { code: "A0001" },
    { code: "A0007" },
    { code: "A0006" },
    { code: "A0005" },
  ];
  /* function getAlbumArt(code) {
  var song = allSongs.filter((item, i) => {
    if (item.code == code) return item;
  });
  return { uri: song[0].coverArt };
}
function getArtistNames(code) {
  var song = allSongs.filter((item, i) => {
    if (item.code == code) return item;
  });
  var artists = "";
  song[0].artists.filter((item, i) => {
    if (i == 0) artists = artists + item;
    else artists = artists + " & " + item;
  });
  song[0].featuringArtists.filter((item, i) => {
    if (i == 0) artists = artists + " ft " + item;
    else artists = artists + ", " + item;
  });

  return artists;
}
function getSongName(code) {
  var song = allSongs.filter((item, i) => {
    if (item.code == code) return item;
  });
  return song[0].name;
}

 */

  const banners = [
    {
      name: "Latest Release",
      color: "red",
      action: true,
      image: Studio_BG,
      coverArt: albumArt3,
      description: "Everything (Sthandwa Sami) - Jaun & Jayceon Adler",
      description2: "Jaun",
      songCode: "A0007",
    },
    {
      name: "Coming Soon",
      color: "green",
      image: Mic_BG1,
      coverArt: Mic_BG1,
      description: "Girl Like You - Bray Atlas",
      description2: "Bray Atlas",
      songCode: "A0002",
    },
    {
      name: "Most Played",
      color: "orange",
      action: true,
      image: Concert_BG,
      coverArt: albumArt1,
      description: "Family - Jayceon Adler",
      description2: "Jayceon Adler",
      songCode: "A0005",
    },
  ];
  const { width, height } = Dimensions.get("window");
  const carousel = useRef();
  const [activeSlide, setactiveSlide] = useState(0);

  const image_size = 40;

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Carousel
        onSnapToItem={(index) => setactiveSlide(index)}
        ref={(c) => {
          carousel.current = c;
        }}
        data={banners}
        inaxt
        renderItem={({ item, index }) => {
          return (
            <View
              key={index.toString()}
              style={{
                height: 150,
                width: "100%",
                // backgroundColor: item.color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  borderRadius: 5,
                }}
                source={item.image}
              ></Image>

              <View
                style={{
                  height: "100%",
                  width: "100%",
                  padding: 5,

                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    height: "50%",
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(255, 156, 82, 0.95)",
                      fontSize: 13,
                      // color: "rgba(158, 158, 158, 1)",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "85%",
                    }}
                  >
                    <View style={{}}>
                      <Image
                        style={{
                          height: image_size,
                          width: image_size,
                        }}
                        source={item.coverArt}
                      ></Image>
                    </View>
                    <View
                      style={{
                        marginTop: 3,
                        paddingRight: 10,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "white",
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                      marginLeft: 0,
                    }}
                  >
                    {item.action ? (
                      <TouchableOpacity
                        onPress={() => {
                          /*   const songIndex = (el) => el.code == item.songCode;
                                                    const index = allSongs.findIndex(songIndex)
                                                    EventRegister.emit('showactivityindicator', true)
                                                   EventRegister.emit('playsonghome', index) */
                          //   console.log(index)
                          var suggestedSongsFiltered = suggestedSongs.filter(
                            (el) => {
                              if (item.songCode != el.code) return el;
                            }
                          );

                          var songs = [
                            item.songCode,
                            ...suggestedSongsFiltered,
                          ];

                          playlist = {
                            name: "Suggested Tracks",
                            songs: songs,
                          };

                          skipTo(item.songCode, playlist);
                        }}
                      >
                        <AntDesign name="play" size={35} color="white" />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        loop={true}
        sliderWidth={width}
        itemWidth={width - 50}
      />
      <View
        style={{
          height: 10,
        }}
      >
        <Pagination
          dotsLength={banners.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            position: "absolute",
            zIndex: -5,
            width: "100%",

            top: -10,

            //    backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }}
          dotStyle={{
            width: 15,
            height: 1,
            //borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "rgba(255, 255, 255, 0.92)",
          }}
          dotContainerStyle={{
            width: 15,
            padding: 0,

            margin: 0,
            //   backgroundColor: 'blue',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
        />
      </View>
    </View>
  );
}
