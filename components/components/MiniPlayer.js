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
import { text_color_secondary } from "../theme/colors";
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
import { MainContext } from "../contexts/MainContext";
import { EventRegister } from "react-native-event-listeners";
import { Audio } from "expo-av";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import LoadingIndicator from "./LoadingIndicator";
import { LinearGradient } from "expo-linear-gradient";

import PlayerBG from "../assets/images/mini_player_bg.png";
import { getAllRecordsLevel2 } from "../plugins/firebase";

export default function MiniPlayer({ navigation }) {
  const {
    isPlaying_context_ref,
    soundAll_ref,
    currentIndex_context_ref,
    setnowPlayingLyrics_context,
    allSongs,
    setallSongs_context,
    playTrack,
    pauseTrack,
  } = useContext(MainContext);

  const [isPlaying, setisPlaying] = useState(false);
  const [songName, setsongName] = useState();
  const [songArtist, setsongArtist] = useState();
  const [songCoverArt, setsongCoverArt] = useState();
  const [update, setupdate] = useState();
  const listener = useRef();
  const listener2 = useRef();
  useEffect(() => {
    setisPlaying(isPlaying_context_ref.current);
    listener.current = EventRegister.addEventListener(
      "updateplaypause",
      (v) => {
        setisPlaying(v);
      }
    );

    listener2.current = EventRegister.addEventListener(
      "updatenowplaying",
      (v) => {
        setsongName(allSongs[v].name);
        setsongArtist(allSongs[v].artists);
        setsongCoverArt(allSongs[v].coverArt);
      }
    );
    return () => {
      EventRegister.removeEventListener(listener.current);
      EventRegister.removeEventListener(listener2.current);
    };
  }, []);
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

    return () => {};
  }, [allSongs]);

  const handlePlayPause = async () => {
    if (soundAll_ref.current) {
      try {
        if (isPlaying) {
          pauseTrack();
          setisPlaying(false);
        } else {
          playTrack();
          setisPlaying(true);
        }
      } catch (e) {
        console.log("playpause error", e);
        // loadAudio(0)
        navigation.navigate("player");
      }
    } else {
      setisPlaying(true);
      navigation.navigate("player");

      //  loadAudio(0)
    }
  };
  const grad_color = "222, 255, 255";

  const font_color = "black";
  return (
    <TouchableOpacity
      onLayout={() => {
        // console.log('vvvvvvv',);
        setupdate(Math.random());
      }}
      onPress={() => {
        navigation.navigate("player");
      }}
      style={{
      
        height: 65,
  //      position: "absolute",
        // borderTopLeftRadius: 15,
        // borderTopRightRadius: 15,
     //   borderRadius: 15,

        zIndex: 10,
        width: "100%",
        flexDirection: "row",
        //  borderTopWidth:1,
        // borderColor: 'rgba(222, 255, 255, 1)',
        paddingVertical: 0,
        overflow: "hidden",
      }}
    >
      {/* fixed */}
      <View
        style={{
          // backgroundColor: 'green',
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
          }}
          source={{ uri: songCoverArt }}
        />
      </View>
      <View
        style={{
          //  backgroundColor: 'purple',
          width: "62%",
          height: "100%",
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
              marginTop: 15,
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
          onPress={handlePlayPause}
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
    </TouchableOpacity>
  );
}
