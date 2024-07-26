import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import Header from './components/Header'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import Playlist from './components/Playlist';
import { LinearGradient } from 'expo-linear-gradient';
import MiniPlayer from '../../components/MiniPlayer';
import BlurView from './components/BlurView'
import Menu from './components/BlurView';
import { text_color_primary, text_color_secondary } from '../../theme/colors';
import { EventRegister } from 'react-native-event-listeners'
import { MainContext } from '../../contexts/MainContext';
import { getData } from '../../plugins/asyncLocalStorage';
import format from "date-fns/format";
export default function ViewPlaylist({ navigation }) {
    const {
      allSongs,
      setallSongs_context,
      showSongs,
      userLikes,
      user_context,
      recentlyPlayed,
      nowPlayingIndex_ref,
    } = useContext(MainContext);

const [songs, setsongs] = useState([])
    useEffect(() => {

      if (showSongs == "allsongs") setsongs(allSongs);
      if (showSongs == "recentlyplayed") {
        var sortedrecentlyPlayed = recentlyPlayed.sort(function (x, y) {
          return y.timestamp - x.timestamp;
        });

        var filteredRecentlyPlayed = sortedrecentlyPlayed.filter(
          (item, i, a) =>
            a.findIndex((item2) => item2.songId === item.songId) === i
        );
        var result = allSongs.filter((o1) => {
          return filteredRecentlyPlayed.some((o2) => {
            return o1.code === o2.songId; // assumes unique id
          });
        });
       setsongs(result);
      }
      if (showSongs == "favourites") {
        var result = allSongs.filter((o1) => {
          return user_context.likes.some((o2) => {
            return o1.id === o2; // assumes unique id
          });
        });
        setsongs(result)
      }

      return () => {};
    }, [user_context])
    const grad_color = '222, 255, 255'
    const font_color = 'rgba(0,0,0, 1)'
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(29, 29, 29,1)",
          // paddingBottom: 80,
        }}
      >
        <View style={{}}>
          <View style={{}}>
            <Header navigation={navigation} />
          </View>
          <View
            style={{
              marginTop: 15,

              flexDirection: "row",
              paddingHorizontal: 10,
              marginLeft: 5,

              borderColor: "rgba(255,255,255, 0.2)",
              borderBottomWidth: 1,
              paddingBottom: 15,
            }}
          >
            <TouchableOpacity
          //    disabled={showSongs == "allsongs" ? false : true}
              onPress={() => {
                 

           //   console.log(result);
                return;
              const sortedRecentlyPlayed = recentlyPlayed.sort(function (a, b) {
                var aa = a.date.split("/").reverse().join(),
                  bb = b.date.split("/").reverse().join();
                return aa > bb ? -1 : aa < bb ? 1 : 0;
              });
                EventRegister.emit("playsonghome", 0);
                navigation.navigate("player");
                EventRegister.emit("showactivityindicator", true);
              }}
              style={{
                // width: 100,
                height: 30,
                borderRadius: 3,
                flexDirection: "row",
                backgroundColor:
                  showSongs != "allsongs" ? "rgba(127, 133, 133,1)" : "#7BB7BC",
                alignItems: "center",
                paddingHorizontal: 5,
                marginRight: 10,
                paddingRight: 10,
              }}
            >
              <Entypo
                name="controller-play"
                size={24}
                color={
                  showSongs != "allsongs" ? "rgba(239,239,239,0.8)" : font_color
                }
              />
              <Text
                style={{
                  color:
                    showSongs != "allsongs"
                      ? "rgba(239,239,239,0.8)"
                      : font_color,
                }}
              >
                Play All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={showSongs == "allsongs" ? false : true}
              onPress={() => {
                const index = Math.floor(
                  Math.random() * allSongs.length
                );
                // console.log(index)
                EventRegister.emit("playsonghome", index);
                navigation.navigate("player");
                EventRegister.emit("showactivityindicator", true);
              }}
              style={{
                // width: '100%',
                height: 30,
                borderRadius: 3,
                flexDirection: "row",
                backgroundColor:
                  showSongs != "allsongs" ? "rgba(127, 133, 133,1)" : "#7BB7BC",

                alignItems: "center",
                paddingHorizontal: 5,
                paddingRight: 10,
              }}
            >
              <Entypo
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                }}
                name="shuffle"
                size={17}
                color={
                  showSongs != "allsongs" ? "rgba(239,239,239,0.8)" : font_color
                }
              />
              <Text
                style={{
                  color:
                    showSongs != "allsongs"
                      ? "rgba(239,239,239,0.8)"
                      : font_color,
                }}
              >
                Shuffle
              </Text>
            </TouchableOpacity>
          </View>

          {/*  <LinearGradient
                    // Background Linear Gradient
                    locations={[0, 0.4, 0.7, 1]}

                    colors={[
                        `rgba(${grad_color},1)`,
                        `rgba(${grad_color},1)`,
                        `rgba(${grad_color},0.5)`,
                        `rgba(${grad_color},0)`,

                    ]}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        opacity: 1,
                        height: '100%',
                        zIndex: -5
                    }}
                /> */}
        </View>

        {/* <View>
                <Image style={{
                    height: 150,
                    width: 150,

                }} source={{ uri }} />
                

        <BlurView intensity={100} style={[StyleSheet.absoluteFill, {}]}>
          <Text>Hello! I am bluring contents underneath</Text>
        </BlurView>
      </View> */}

        <View
          style={{
            paddingHorizontal: 12,
            marginTop: 10,
          }}
        >
          <Playlist songs={songs}/>
        </View>
      </View>
    );
}
