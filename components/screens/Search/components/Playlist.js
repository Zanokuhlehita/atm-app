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
import { MainContext } from "../../../contexts/MainContext";
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
import { LinearGradient } from "expo-linear-gradient";
import { EventRegister } from "react-native-event-listeners";

export default function Playlist({ footer, searchValue }) {
  const { allSongs, setallSongs_context, skipTo, currentIndex_context_ref } =
    useContext(MainContext);
  const font_color = "white";
  const grad_color = "29, 29, 29";
  const image_size = 45;
  const [resaults, setresaults] = useState([]);
  const { width, height } = Dimensions.get("window");
  const [noDataFlag, setnoDataFlag] = useState(false);
  const [songs, setsongs] = useState([]);
  useEffect(() => {
    searchText(searchValue);
    return () => {};
  }, [searchValue]);
  const searchText = (e) => {
    let text = e.toLowerCase();
    let trucks = allSongs;
    let filteredName = trucks.filter((item) => {
      return item.name.toLowerCase().match(text);
    });
    if (!text || text === "") {
      setsongs(allSongs);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setnoDataFlag(true);
    } else if (Array.isArray(filteredName)) {
      setsongs(filteredName);
    }
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 250,
        }}
        style={{
          //backgroundColor: 'pink',
          height: "100%",
          width: "100%",
        }}
      >
        {songs ? (
          <View style={{ height: "100%", width: "100%", paddingBottom: 0 }}>
            {songs.map((item, i) => {
              return (
                <View style={{}} key={i.toString()}>
                  <TouchableOpacity
                    onPress={() => {
                      skipTo(item.code);
                    }}
                    style={{
                      height: 50,
                      width: "100%",
                      /*      backgroundColor:
                      i == currentIndex_context_ref.current
                        ? "rgba(15, 55, 62, 1)"
                        : null, */
                      marginVertical: 3,
                      flexDirection: "row",
                      alignItems: "center",
                      // justifyContent: 'center',
                      borderRadius: 3,
                      //elevation:5,
                      paddingLeft: 1.5,
                    }}
                  >
                    <View
                      style={{
                        width: image_size,
                        height: image_size,
                        // backgroundColor: 'green',
                        padding: 5,
                      }}
                    >
                      <Image
                        style={{
                          borderRadius: 2,

                          height: "100%",
                          width: "100%",
                        }}
                        source={{ uri: item.coverArt }}
                      />
                    </View>
                    <View
                      style={{
                        height: "100%",
                        width: "72%",
                        //backgroundColor: 'yellow'
                        paddingHorizontal: 5,
                      }}
                    >
                      <View
                        style={{
                          //height: '50%',
                          justifyContent: "center",
                          marginTop: 3,
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 13,
                            fontWeight: "bold",
                            color: font_color,
                            marginTop: 5,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View
                        style={
                          {
                            //height: '50%',
                            //  justifyContent: 'center',
                          }
                        }
                      >
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 10,
                            color: "rgba(255,255,255, 0.8)",
                            //opacity: 0.7
                          }}
                        >
                          Song
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: "100%",
                        width: "10%",
                        //backgroundColor: 'red'
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {}}
                        style={{
                          height: "100%",
                          width: "100%",

                          alignItems: "center",
                          flexDirection: "row",

                          justifyContent: "center",
                        }}
                      >
                        <Entypo
                          name="chevron-right"
                          size={15}
                          color={font_color}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: "100%",

                      //  backgroundColor: 'rgba(255,255,255, 0.2)',
                      alignItems: "flex-end",
                      paddingRight: 3,
                    }}
                  >
                    <View
                      style={{
                        height: 1,
                        width: "100%",

                        backgroundColor: "rgba(255,255,255, 0.1)",
                      }}
                    ></View>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              /*    height: height,
                        width: width, */

              alignItems: "center",
              justifyContent: "center",

              marginTop: 145,
            }}
          >
            <Text
              style={{
                color: font_color,
                fontSize: 20,
                marginBottom: 10,
                textAlign: "center",

                fontWeight: "bold",
              }}
            >
              Can't find "uygyu yu"
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255, 0.4)",
                fontSize: 13,
                width: "80%",
                textAlign: "center",
              }}
            >
              Try searching again using a different spelling or keyword.
            </Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          position: "absolute",

          backgroundColor: "blue",

          //   backgroundColor: 'rgba(29, 29, 29,0.8)',
        }}
      ></View>
      {footer ? (
        <LinearGradient
          // Background Linear Gradient
          locations={[0, 0.54, 0.55, 1]}
          colors={[
            `rgba(${grad_color},0)`,
            `rgba(${grad_color},0.6)`,
            `rgba(${grad_color},1)`,
            `rgba(${grad_color},1)`,
          ]}
          style={{
            position: "absolute",

            opacity: 1,
            bottom: 140,

            height: 160,
            width: width,
            // zIndex: -5
          }}
        />
      ) : null}
    </>
  );
}
