import React, { useState, useRef, useEffect } from "react";
import {
  Flatlist,
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { EventRegister } from "react-native-event-listeners";

export default function Stats({ song, stats_scrollable }) {
  const [stats, setStats] = useState([
    { title: "Song Name", key: "1", data: song.song_name },
    { title: "Producer", key: "2", data: song.producers },
    { title: "Artist", key: "3", data: song.artists },
    { title: "Featuring Artist", key: "10", data: song.featuring_artists },
    { title: "Written By", key: "4", data: song.writers },
    { title: "Genre", key: "5", data: song.genres },
    { title: "Album", key: "6", data: song.album_ep },
    { title: "Release Date", key: "7", data: song.release_date },
    { title: "Published By", key: "8", data: "Adler Tempo Music" },
    { title: "Other Stores", key: "9", data: "Spotify \nItunes \nApple Music" },
  ]);
  const { width, height } = Dimensions.get("window");
  const scrollY = useRef();
  const [scroll_pos, setscroll_pos] = useState(0);

  const [scroll_up_disabled, setscroll_up_disabled] = useState(false);
  const [scroll_down_disabled, setscroll_down_disabled] = useState(false);
  const [scroll_enabled, setscroll_enabled] = useState(true);
  const [listener, setlistener] = useState();
  useEffect(() => {
    setlistener(
      EventRegister.addEventListener("disable_scroll", (status) => {
        setscroll_enabled(status);
        console.log(scroll_enabled);
      })
    );
    return () => {};
  }, []);
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        marginTop: "25%",
        height: "65%",
        width: "90%",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 0,
        }}
      >
        <ScrollView
          onScroll={() => {
            if (!stats_scrollable.current) {
            }
          }}
          // scrollEnabled={stats_scrollable.current}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          ref={scrollY}
        >
          {stats.map((stats, i) => {
            if (stats.data) {
              return (
                <View key={i.toString()} style={{ marginTop: 8 }}>
                  <View
                    style={{
                      paddingLeft: 30,
                      paddingVertical: 20,
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        flex: 0.4,
                        color: "rgba(238,238,238,0.8)",
                        //  lineHeight: 35
                      }}
                    >
                      {stats.title}
                    </Text>

                    <Text
                      style={{
                        flex: 0.6,
                        color: "rgba(238,238,238,0.8)",
                        fontSize: 17,
                        fontWeight: "bold",
                        marginTop: -8.5,
                        lineHeight: 35,
                      }}
                    >
                      {stats.data}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 30,
                      borderBottomWidth: 0.7,
                      borderBottomColor: "rgba(238,238,238,0.2)",
                    }}
                  ></View>
                </View>
              );
            }
          })}
        </ScrollView>
      </View>
      <View
        style={{
          position: "absolute",
          // bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          /// height: 60,
        }}
      >
        {/*   <TouchableOpacity
                    disabled={scroll_up_disabled}
                    onPress={() => {
                        var y = scroll_pos - 50
                        scrollY.current.scrollTo({ x: 0, y: y, animated: true })

                        if (scroll_pos > 0) { setscroll_pos(y) }

                        if (y <= 0) { setscroll_up_disabled(true) }
                        console.log(scroll_up_disabled)

                    }}
                    style={{
                        width: '100%'
                    }}>
                    <View style={{
                        height: 43,
                        width: width,
                        backgroundColor: scroll_up_disabled ? 'rgba(65, 68, 71,0.6)' : 'rgba(65, 68, 71,0.9)',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <AntDesign name="caretup" size={18} color="white" />

                    </View>
                </TouchableOpacity> */}
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          /// height: 60,
        }}
      >
        {/*            <TouchableOpacity onPress={() => {

                    scrollY.current.scrollTo({ x: 0, y: scroll_pos + 50, animated: true })
                    setscroll_up_disabled(false)

                    setscroll_pos(scroll_pos + 50)

                    console.log(scroll_pos)
                }}
                    style={{
                        width: '100%'
                    }}>
                    <View style={{
                        height: 45,
                        width: width,
                        backgroundColor: 'rgba(65, 68, 71,0.9)',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <AntDesign name="caretdown" size={20} color="white" />

                    </View>
                </TouchableOpacity> */}
      </View>
    </View>
  );
}
