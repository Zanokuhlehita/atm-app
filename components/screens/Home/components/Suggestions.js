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
} from "react-native";
import coverArt from "../../../assets/images/cover_arts/ms_california.jpg";
import coverArt2 from "../../../assets/images/cover_arts/everything_sthandwa_sami.jpg";
import coverArt3 from "../../../assets/images/cover_arts/love_life_loyalty.jpg";
import { MainContext } from "../../../contexts/MainContext";
import { EventRegister } from "react-native-event-listeners";
export default function Suggestions({}) {
  const { allSongs, skipTo, setallSongs_context, trackSettings } =
    useContext(MainContext);

  const suggestedSongs = [
    { code: "A0001" },
    { code: "A0007" },
    { code: "A0006" },
    { code: "A0005" },
  ];
  const { width, height } = Dimensions.get("window");
  const carousel = useRef();
  const image_size = 60;
  const font_color = "white";
  function getAlbumArt(code) {
    var song = allSongs.filter((item, i) => {
      if (item.code == code) return item;
    });
    if (song[0]) return { uri: song[0].coverArt };
    else {
      return;
    }
  }
  function getArtistNames(code) {
    if (allSongs.length < 2) return;
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
    if (allSongs.length < 2) return;

    var song = allSongs.filter((item, i) => {
      if (item.code == code) return item;
    });
    return song[0].name;
  }
  return (
    <>
      <View
        style={{
          marginTop: 0,
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: "white",
            color: "#FF9C52",

            paddingHorizontal: 5,
          }}
        >
          Suggestions
        </Text>
      </View>
      <View
        style={{
          //  flex: 1,
          // backgroundColor: '#fff',
          marginTop: 0,
        }}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{
            //height: 100,
            marginLeft: 5,

            marginTop: 5,
          }}
          keyExtractor={(item, i) => i.toString()}
          horizontal
          data={trackSettings.suggestedTracks}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  var suggestedSongsFiltered = suggestedSongs.filter((el) => {
                    if (item.code != el.code) return el;
                  });
                  /* reorder array to put first song selected */
                  var songs = [{ code: item.code }, ...suggestedSongsFiltered];

                  var playlist = { name: "Suggested Tracks", songs: songs };

                  skipTo(item.code, playlist);
                }}
                style={{
                  flexDirection: "row",
                  width: width * 0.5,
                  // backgroundColor: 'rgba(222, 255, 255,1)',

                  height: 60,
                  // marginHorizontal: 5,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    // backgroundColor: 'green',
                    width: 50,
                    height: "100%",
                    paddingHorizontal: 10,

                    alignItems: "center",
                    justifyContent: "center",

                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    style={{
                      borderRadius: 3,
                      height: 40,
                      width: 40,
                    }}
                    source={getAlbumArt(item.code)}
                  />
                </View>

                <View
                  style={{
                    //  backgroundColor: 'purple',
                    width: "70%",
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      height: "50%",
                      justifyContent: "center",
                      paddingRight: 15,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        color: font_color,
                        marginTop: 15,
                      }}
                    >
                      {getSongName(item.code)}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "50%",
                      //  justifyContent: 'center',
                      paddingRight: 15,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 12,
                        color: font_color,
                      }}
                    >
                      {getArtistNames(item.code)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              /*          <View style={{
                             
                               // backgroundColor: item.color,
                                alignItems: 'center',
                                justifyContent: 'center',
                              width:width/4


                            }}>
                                <View style={{

                                }}>
                                    <Image
                                        style={{
                                            height: image_size,
                                            width: image_size,
                                            borderRadius: 50,

                                        }}
                                        source={item.albumArt}
                                    >

                                    </Image>
                                </View>
                                <View style={{
                                    paddingHorizontal: 0,
                                    width: image_size,

                                }}>
                                    <Text
                                      numberOfLines={1}

                                        style={{
                                    color: 'white',
                                            textAlign: 'center',

                                    }}>{item.name}</Text>
                         
                                    
                                </View>
                                
                               
                            </View>
                    */
            );
          }}
        />
      </View>
    </>
  );
}
