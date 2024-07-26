import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EventRegister } from "react-native-event-listeners";
import { DataContext } from "../../../contexts/DataContext";

import suggested_plays from "../../../contexts/data/suggestedplays";
import new_releases from "../../../contexts/data/newreleases";
import { MainContext } from "../../../contexts/MainContext";
import { love_vibes } from "../../../contexts/data/playlists/love_vibes";
import { soul_trap } from "../../../contexts/data/playlists/soul_trap";
import { hustlers_mind } from "../../../contexts/data/playlists/huslters_mind";
import { loyalty } from "../../../contexts/data/playlists/loyalty";
import { album_intros } from "../../../contexts/data/playlists/album_intros";
import { happy } from "../../../contexts/data/moods/happy";
import { love } from "../../../contexts/data/moods/love";
import { heart_broken } from "../../../contexts/data/moods/heart_broken";
import { grateful } from "../../../contexts/data/moods/grateful";
import { overwhelmed } from "../../../contexts/data/moods/overwhelmed";
import { flattery } from "../../../contexts/data/moods/flattery";
import { afro_beat } from "../../../contexts/data/moods/afro_beat";

export default function Backgroundimage() {
  const { all_tracks_ref, new_tracks_ref, hot_tracks_ref } =
    useContext(DataContext);
  const { song_init_render, bg_moveX, mainview_bg } = useContext(MainContext);
  const [bg_image_link, setbg_image_link] = useState(
    require("../../../assets/images/covers/love_life_loyalty_ep_bg.jpg")
  );
  const listener = useRef();
  const [playlist, setplaylist] = useState([
    {
      color: "yellow",
      bg_image_link: require("../../../assets/images/covers/love_life_loyalty_ep_bg.jpg"),
    },
    {
      color: "green",
      bg_image_link: require("../../../assets/images/covers/ms_california.jpg"),
    },
    {
      color: "orange",
      bg_image_link: require("../../../assets/images/covers/love_life_loyalty_ep_bg.jpg"),
    },
  ]);
  // const mainview_bg = useRef()
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    setTimeout(() => {
      setplaylist(all_tracks_ref.current);
    }, 0);

    listener.current = EventRegister.addEventListener("songs", (playlist) => {
      if (playlist == "all_tracks") setplaylist(all_tracks_ref.current);
      if (playlist == "new_tracks") setplaylist(new_tracks_ref.current);
      if (playlist == "hot_tracks") setplaylist(hot_tracks_ref.current);
      if (playlist == "reset") setplaylist([]);

      if (playlist == "suggested_plays") setplaylist(suggested_plays);
      if (playlist == "recent_plays") setplaylist(recent_play_ref.current);
      //if (playlist == 'favorites') setplaylist(hot_tracks_ref.current)
      if (playlist == "new_releases") setplaylist(new_releases);
      if (playlist == "suggested_single_play") {
        setplaylist([suggested_plays[song_init_render.current]]);
      }
      if (playlist == "new_releases_single_play") {
        setplaylist([new_releases[song_init_render.current]]);
      }
      ///////// playlists //////////////
      if (playlist == "love_vibes") {
        setplaylist(love_vibes);
      }
      if (playlist == "soul_trap") {
        setplaylist(soul_trap);
      }
      if (playlist == "hustlers_mind") {
        setplaylist(hustlers_mind);
      }
      if (playlist == "loyalty") {
        setplaylist(loyalty);
      }
      if (playlist == "album_intros") {
        setplaylist(album_intros);
      }
      ///////// moods //////////
      if (playlist == "happy") {
        setplaylist(happy);
      }
      if (playlist == "love") {
        setplaylist(love);
      }
      if (playlist == "heart_broken") {
        setplaylist(heart_broken);
      }
      if (playlist == "grateful") {
        setplaylist(grateful);
      }
      if (playlist == "overwhelmed") {
        setplaylist(overwhelmed);
      }
      if (playlist == "flattery") {
        setplaylist(flattery);
      }
      if (playlist == "Afro Beat") {
        setplaylist(afro_beat);
      }
    });

    return () => {
      EventRegister.removeEventListener(listener.current);
    };
  }, []);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        backgroundColor: "pink",
      }}
    >
      {playlist.map((item, index) => {
        const opacity = bg_moveX.interpolate({
          inputRange: [(index - 1) * width, index * width, (index + 1) * width],
          outputRange: [0, 1, 0],
        });

        return (
          <Animated.View
            key={index.toString()}
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: width,
              height: height,
              flexDirection: "row",
              backgroundColor: "rgba(19, 19, 19,0.2)",
              position: "absolute",
            }}
          >
            <Animated.View
              style={{
                alignSelf: "center",

                opacity: 1,
                width: "100%",
                height: "100%",
                backgroundColor: item.color,
                opacity,
              }}
            >
              <Image
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  opacity: 1,

                  width: "100%",
                  height: "100%",
                }}
                source={item.cover_bg_image}
              ></Image>
            </Animated.View>
          </Animated.View>
        );
      })}

      <View
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          locations={[0.1, 0.8]}
          colors={["transparent", "#181B1F"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            opacity: 0.7,
            height: "100%",
          }}
        />
      </View>
    </View>
  );
}
