import { LinearGradient } from "expo-linear-gradient";
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

import { MainContext } from "../../../../../contexts/MainContext";
import { secondary_color } from "../../../../../theme/colors";

export default function Info() {
  const {
    currentIndex_context_ref,
    infoViewIndex_context_ref,
    allSongs,
    setallSongs_context,
  } = useContext(MainContext);

  const [data, setdata] = useState([]);
  useEffect(() => {
    setdata(allSongs[currentIndex_context_ref.current]);
    return () => {};
  }, [currentIndex_context_ref.current]);

  const info = [
    { name: "Title", value: data.name },
    { name: "Peformer", value: data.artists },
    { name: "Featuring", value: data.featuringArtists },
    { name: "Producer", value: data.producers },
    { name: "Writer", value: data.writers },
    { name: "Album Name", value: data.albumEp },
    // { name: 'Release Date', value: data.releaseDate, },
    { name: "Genre", value: data.genres },
    { name: "Other Stores", value: data.otherStores },
    { name: "Label", value: "Adler Tempo Music" },
  ];
  const grad_color = "29, 29, 29";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 252, 231, 0.8)",
      }}
    >
      <View
        style={{
          flex: 1,
          //backgroundColor: 'red',
          // paddingLeft: 10,
          marginTop: 70,
        }}
      >
        {/* <View style={{
                    paddingHorizontal: 30,
                    paddingTop: 20,

                }}>
                  <Text style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: secondary_color,
                    }}>Credits</Text> 
                </View>*/}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 30,
          }}
        >
          {info.map((item, i) => {
            if (item.name == "Featuring") {
              if (!item.value) return;
            }

            return (
              <View key={i.toString()}>
                <View
                  style={{
                    height: 40,
                    width: "100%",
                    //backgroundColor: 'blue',
                    marginVertical: 15,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={i.toString()}
                >
                  <View
                    style={{
                      width: "40%",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "grey",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "60%",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "white",

                        fontSize: 15,
                        // fontWeight: 'bold',
                      }}
                    >
                      {item.value ? item.value : "N/A"}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <LinearGradient
        // Background Linear Gradient
        locations={[0, 1]}
        colors={[`rgba(${grad_color},0.8)`, `rgba(${grad_color},1)`]}
        style={{
          position: "absolute",
          width: "100%",
          opacity: 1,
          height: "100%",
          zIndex: -2,
        }}
      />
    </View>
  );
}
