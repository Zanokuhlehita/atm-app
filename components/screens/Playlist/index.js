import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  ImageBackground,
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
import { MainContext } from "../../contexts/MainContext";
import { primary_color, secondary_color } from "../../theme/colors";
import { EventRegister } from "react-native-event-listeners";
import { Portal } from "react-native-portalize";
import Header2 from "../../components/Header2";
import AlbumArt from "../../assets/images/cover_arts/love_life_loyalty.jpg";

export default function Playlist() {
  const {
    allSongs,
    setallSongs_context,
    currentIndex_context_ref,
    skipTo,
    getLikeStatus,
    unLike,
    likeSong,
  } = useContext(MainContext);
  const font_color = "white";
  const { width, height } = Dimensions.get("window");
  const grad_color = "0,0,0"; // '29, 29, 29'
  const image_size = 45;
  return (
    <Portal>
      <ImageBackground
        source={AlbumArt}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "center",
        }}
        style={{
          backgroundColor: "grey",
          //paddingRght: 20,
          width: "100%",
          height: "100%",
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          locations={[0, 0.25, 0.9, 0.85]}
          colors={[
            `rgba(${grad_color},1)`,
            `rgba(${grad_color},0.9)`,
            `rgba(${grad_color},0.8)`,
            `rgba(${grad_color},1)`,
          ]}
          style={{
            position: "absolute",
            width: "100%",
            opacity: 1,
            height: "100%",
            zIndex: 0,
          }}
        />
        <Header2 title="Playlist" />
        <View style={{}}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 20,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "bold",
                color: secondary_color,
              }}
            >
              Up Next
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={
              {
                //  paddingBottom: 150,
              }
            }
            style={{
              //backgroundColor: 'pink',
              height: "100%",
              width: "100%",
            }}
          >
            <View
              style={{
                //    marginTop: 10,
                paddingHorizontal: 15,
                paddingBottom: 180,
              }}
            >
              {allSongs.map((item, i) => {
                return (
                  <View style={{}} key={i.toString()}>
                    {i == 0 ? (
                      <View
                        style={{
                          height: 1,
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
                    ) : null}

                    <TouchableOpacity
                      onPress={() => {
                        skipTo(item.code, playlist);
                      }}
                      style={{
                        height: 50,
                        width: "100%",
                        backgroundColor:
                          i == currentIndex_context_ref.current
                            ? "rgba(15, 55, 62, 1)"
                            : null,
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
                              color: font_color,
                              opacity: 0.7,
                            }}
                          >
                            {item.artists}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          height: "100%",
                          //  backgroundColor: "red",
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            if (!getLikeStatus(item)) likeSong(item.code);
                            else unLike(item.code);
                          }}
                          style={{
                            height: "100%",
                            width: 30,
                            // backgroundColor: "blue",

                            alignItems: "center",
                            flexDirection: "row",

                            justifyContent: "center",
                          }}
                        >
                          {getLikeStatus(item) ? (
                            <AntDesign
                              style={{ paddingLeft: 5 }}
                              name="heart"
                              size={11}
                              color="rgba(197, 15, 31,0.6)"
                            />
                          ) : (
                            <AntDesign
                              style={{ paddingLeft: 5 }}
                              name="hearto"
                              size={11}
                              color={"white"}
                            />
                          )}
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {}}
                          style={{
                            height: "100%",
                            width: 30,
                            // backgroundColor: "orange",

                            alignItems: "center",
                            flexDirection: "row",

                            justifyContent: "center",
                          }}
                        >
                          <Entypo
                            name="dots-three-vertical"
                            size={12}
                            color="white"
                            style={{
                              paddingRight: 10,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>

                    <View
                      style={{
                        height: 1,
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
          </ScrollView>
          <View
            style={{
              position: "absolute",

              backgroundColor: "blue",

              //   backgroundColor: 'rgba(29, 29, 29,0.8)',
            }}
          ></View>
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
              bottom: -110,

              height: 160,
              width: width,
              zIndex: -5,
            }}
          />
        </View>
      </ImageBackground>
    </Portal>
  );
}
