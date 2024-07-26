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
import { Audio } from "expo-av";
import { EventRegister } from "react-native-event-listeners";
import Toast from "react-native-root-toast";

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
  primary_color,
  secondary_color,
  text_color_secondary,
} from "../../../../theme/colors";
import { MainContext } from "../../../../contexts/MainContext";
import songs from "../../../../assets/songs/songs";
import ProgressSlider from "./components/ProgressSlider";
import { getAllRecordsLevel2 } from "../../../../plugins/firebase";
import firebase from "firebase";

export default function PlayerControls({ style }) {
  const {
    soundAll_ref,
    isPlaying_context_ref,
    allSongs,
    setallSongs_context,
    currentIndex_context_ref,
    nowPlayingDuration_context_ref,
    OnPlaybackStatusUpdate,
    current_position_context_ref,
    shuffle,
    repeat,
    setshuffle,
    setrepeat,
    setnowPlayingLyrics_context,
    playSong,
    playTrack,
    pauseTrack,
    isPlaying,
    skipTo,
    nowPlayingSong,
    nowPlayingPlaylist,
    sound_ref,
    stopTrack,
  } = useContext(MainContext);

  const repeat_ref = useRef(false);
  const shuffle_ref = useRef(false);
  const listener = useRef();
  const nowPlayingPlaylist_ref = useRef({
    name: "All Songs",
    songs: allSongs,
  });
  useEffect(() => {
    nowPlayingPlaylist_ref.current = nowPlayingPlaylist;
    return () => {};
  }, [nowPlayingPlaylist]);
  useEffect(() => {
    listener.current = EventRegister.addEventListener(
      "songjustfinished",
      () => {
        console.log("heard that", repeat_ref.current, shuffle_ref.current);
        if (repeat_ref.current && !shuffle_ref.current) {
          //take function to play update does not work on next button
          sound_ref.current.replayAsync();
        }
        if (shuffle_ref.current) {
          shuffleSongsForSongEnd();
          console.log("entered shuffle");
        }
        if (!repeat_ref.current && !shuffle_ref.current) {
          stopTrack();
        }
      }
    );

    return () => {
      EventRegister.removeEventListener(listener.current);
    };
  }, []);

  const playsTracker_ref = useRef([]);

  function shuffleSongsForSongEnd(forceNoRepeat) {
    //Generate random number

    let random = (
      Math.random() * nowPlayingPlaylist_ref.current.songs.length
    ).toFixed();
    random = Number(random);

    if (!playsTracker_ref.current.includes(random)) {
      if (random >= nowPlayingPlaylist_ref.current.songs.length)
        return shuffleSongsForSongEnd();

      playsTracker_ref.current.push(random);
      console.log(
        "Play this",
        random,
        nowPlayingPlaylist_ref.current.songs,
        playsTracker_ref.current
      );

      skipTo(nowPlayingPlaylist_ref.current.songs[random].code);
      return random;
    } else {
      if (
        playsTracker_ref.current.length <
        nowPlayingPlaylist_ref.current.songs.length
      ) {
        //Recursively generate number
        return shuffleSongsForSongEnd();
      } else {
        if (repeat_ref.current) {
          playsTracker_ref.current = [];
          shuffleSongsForSongEnd();
        } else {
          console.log("No more numbers available.");
          stopTrack();
        }

        return false;
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  async function skip(direction) {
    /*        if (direction == "prev") {

    } */

    if (direction == "next") {
      if (shuffle) {
        shuffleSongs();
        return;
      }
      const index = nowPlayingPlaylist.songs.findIndex(
        (el) => el.code == nowPlayingSong.code
      );

      if (index == nowPlayingPlaylist.songs.length - 1) {
        if (repeat) {
          var code = nowPlayingPlaylist.songs[0].code;
          console.log("object", code);
          skipTo(code);
        } else {
          Toast.show("NoI will next track found in current playlist.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
      } else {
        var code = nowPlayingPlaylist.songs[index + 1].code;
        console.log("object2", nowPlayingPlaylist, index);

        skipTo(code);
      }
    }
    if (direction == "prev") {
      if (shuffle) {
        if (playsTracker_ref.current.length > 1) {
          console.log(
            "object3",
            playsTracker_ref.current.length,
            playsTracker_ref.current
          );

          playsTracker_ref.current.pop();

          var code =
            nowPlayingPlaylist.songs[
              playsTracker_ref.current[playsTracker_ref.current.length - 1]
            ].code;
          console.log("object4", playsTracker_ref.current, code);
          skipTo(code);
          return;
        }
      }
      const index = nowPlayingPlaylist.songs.findIndex(
        (el) => el.code == nowPlayingSong.code
      );
      if (index == 0) {
        Toast.show("No previous track found in current playlist.", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        console.log("prev1");
      } else {
        console.log("prev2");

        var code = nowPlayingPlaylist.songs[index - 1].code;
        console.log("object3", code);

        skipTo(code);
      }
    }
  }

  function shuffleSongs() {
    //Generate random number

    let random = (
      Math.random() * nowPlayingPlaylist_ref.current.songs.length
    ).toFixed();
    random = Number(random);

    if (!playsTracker_ref.current.includes(random)) {
      if (random >= nowPlayingPlaylist_ref.current.songs.length)
        return shuffleSongsForSongEnd();

      playsTracker_ref.current.push(random);
      console.log(
        "Play this",
        random,
        nowPlayingPlaylist_ref.current.songs,
        playsTracker_ref.current
      );

      skipTo(nowPlayingPlaylist_ref.current.songs[random].code);
      return random;
    } else {
      if (
        playsTracker_ref.current.length <
        nowPlayingPlaylist_ref.current.songs.length
      ) {
        //Recursively generate number
        return shuffleSongsForSongEnd();
      } else {
        playsTracker_ref.current = [];
        shuffleSongsForSongEnd();

        return false;
      }
    }
  }

  const icon_size = 20;
  const icon_size_center = 80;

  const icon_color = text_color_secondary;
  const icon_active_color = primary_color;

  return (
    <View
      style={[
        {
          width: "100%",
          height: "100%",
          //marginTop: 10,
          //  backgroundColor: 'orange',
          //  alignItems: "flex-end",
        },
        style,
      ]}
    >
      <View style={{ height: 30, marginTop: 10, paddingHorizontal: 1 }}>
        <ProgressSlider />
      </View>
      <View
        style={{
          flex: 1,

          width: "100%",
          // backgroundColor: 'blue'
        }}
      >
        <View
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            //   backgroundColor: "green",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              shuffle_ref.current = !shuffle;
              setshuffle(!shuffle);
            }}
            style={{
              // backgroundColor: 'white',
              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="ios-shuffle"
              size={icon_size}
              color={!shuffle ? icon_color : icon_active_color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /*  EventRegister.emit("showactivityindicator", true);
               */
              skip("prev");
            }}
            style={{
              // backgroundColor: 'white',
              height: 50,
              width: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo
              name="controller-jump-to-start"
              size={icon_size}
              color={icon_color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (isPlaying) pauseTrack();
              else playTrack();
            }}
            style={{
              // backgroundColor: 'white',
              alignItems: "center",
              justifyContent: "center",
              height: 70,
              width: 70,
            }}
          >
            {isPlaying ? (
              <MaterialIcons
                style={{
                  //color: text_color_secondary,
                  elevation: 24,
                }}
                name="pause-circle-filled"
                size={icon_size_center - 20}
                color="white"
              />
            ) : (
              <MaterialIcons
                name="play-circle-filled"
                size={icon_size_center - 20}
                color="white"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /*   EventRegister.emit("showactivityindicator", true);
               */
              skip("next");
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 60,
              width: 50,

              // backgroundColor: 'white',
            }}
          >
            <Entypo
              name="controller-next"
              size={icon_size}
              color={icon_color}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              repeat_ref.current = !repeat;
              setrepeat(!repeat);
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 60,
              width: 50,
              // backgroundColor: 'white',
            }}
          >
            <Ionicons
              name="ios-repeat"
              size={icon_size}
              color={!repeat ? icon_color : icon_active_color}
            />
          </TouchableOpacity>
        </View>
        {/*       <View style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    //   backgroundColor: 'purple',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            const x = current_position_context_ref.current * 1000 - 10000

                            seek(x)
                        }}

                        style={{
                            //   backgroundColor: 'white',
                            height: 60,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <MaterialCommunityIcons name="rewind-10" size={seek_icon_size - 10} color={icon_color} />
                    </TouchableOpacity>
                    <TouchableOpacity

                        onPress={() => {
                            const x = current_position_context_ref.current * 1000 + 10000

                            seek(x)
                        }}

                        style={{
                            //    backgroundColor: 'black',

                            height: 70,
                            width: 70,
                            flexDirection: 'row',
                            top: 0,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>



                        <MaterialCommunityIcons name="fast-forward-10" size={seek_icon_size + 12} color={icon_color} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {


                            const x = current_position_context_ref.current * 1000 + 30000

                            seek(x)
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 60,
                            width: 50,
                            //    backgroundColor: 'white',
                        }}>
                        <MaterialCommunityIcons name="fast-forward-30" size={seek_icon_size - 10} color={icon_color} />
                    </TouchableOpacity>
                </View>
            */}
      </View>
    </View>
  );
}
