import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Button,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { changeheading, sound_position } from "../../../plugins/store/actions";
import Axios from "axios";
import { EventRegister } from "react-native-event-listeners";
import { LinearGradient } from "expo-linear-gradient";

import MaskedView from "@react-native-community/masked-view";
import { MainContext } from "../../../contexts/MainContext";
//import { lyrics_import } from '../../../assets/lyrics/A002_tomorrow'

export default function Lyrics({ song, id }) {
  const { now_playing_ref } = useContext(MainContext);

  const text = React.createRef();
  const lyricsHeightOffsetRef = React.useRef([]);
  const itemsRef = React.useRef([]);

  const [update, setupdate] = useState(true);

  const listener1 = useRef();
  const listener2 = useRef();
  const index_ref = useRef(new Animated.Value(0)).current;
  const translateY = index_ref.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -115],
  });
  const [unloader, setunloader] = useState(false);
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
      "sound_position",
      (pos) => {
        if (pos) {
          var past = song.lyrics.filter((lyrics) => {
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
  return (
    <View
      style={{
        marginTop: "25%",
        height: "65%",
        width: "90%",
        backgroundColor: "rgba(239, 239, 239,0.25)",

        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/*    <Button title='the press' onPress={() => {
                setupdate(!update)
            }} /> */}

      <View
        ref={text}
        name="lyrics view port"
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // backgroundColor: 'yellow'
          }}
        >
          {now_playing_ref.current == id ? (
            <Animated.View
              style={{
                top: 100,
                transform: [{ translateY }],
              }}
              ref={(el) => (lyricsHeightOffsetRef.current = el)}
              name="All lyrics Body"
            >
              <View
                style={{
                  height: 115,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontWeight: "bold",
                    lineHeight: 35,
                    marginVertical: 25,
                    fontSize: 25,
                    paddingHorizontal: 25,
                    color: "white",
                  }}
                >
                  .
                </Text>
              </View>

              {song.lyrics.map((item, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={{
                      height: 115,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      ref={(el) => (itemsRef.current[index] = el)}
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "bold",
                        lineHeight: 35,
                        marginVertical: 25,
                        fontSize: 25,
                        paddingHorizontal: 25,
                        color: "white",
                      }}
                    >
                      {item.line}
                    </Text>
                  </View>
                );
              })}
            </Animated.View>
          ) : (
            <View
              style={{
                flex: 1,
                // backgroundColor: 'green',
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                animating={true}
                color="rgb(51, 51, 51)"
                size={50}
              />
            </View>
          )}
          <View
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
            }}
          >
            <LinearGradient
              // Background Linear Gradient
              locations={[0, 0.18, 0.27, 0.45, 0.6, 0.95]}
              colors={[
                "rgba(49, 49, 49,1)",
                "rgba(49, 49, 49,0.45)",
                "rgba(49, 49, 49,0)",
                "rgba(49, 49, 49,0)",
                "rgba(49, 49, 49,0.5)",
                "rgba(49, 49, 49,1)",
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

        <View
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            zIndex: 10,

            //  backgroundColor: 'rgba(239, 239, 239,0.1)'
          }}
        ></View>
      </View>
    </View>
  );
}
