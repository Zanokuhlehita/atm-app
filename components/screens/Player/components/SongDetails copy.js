import React, { useState, useContext, useRef, useEffect } from 'react'
import { View,Animated, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { text_color_secondary } from '../../../theme/colors'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

export default function SongDetails({
  songName,
  songArtist,
  songDescriptionTop,
  songDescriptionLeft,
  songDescriptionSize,
  songDescriptionPadding,
  songDescriptionColor,
  songDescriptionColor2,
  songDescriptionSize2,
}) {
  const [like, setlike] = useState(false);
  return (
    <Animated.View
      style={{
        bottom: songDescriptionTop,
        left: songDescriptionLeft,
        // backgroundColor: 'grey',
        width: "100%",
        height: 50,
        flexDirection: "row",
        //   marginTop: '10%',
      }}
    >
      <View
        style={{
          // backgroundColor: 'white',
          width: "90%",
          height: "100%",
          //  paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            // height: '50%',
            width: "100%",

            flexDirection: "row",
          }}
        >
          <Animated.Text
            numberOfLines={1}
            style={{
              width: "110%",
              fontSize: songDescriptionSize,
              //fontWeight: 'bold',
              color: songDescriptionColor, // text_color_secondary,
            }}
          >
            {songName}
          </Animated.Text>
        </View>
        <View
          style={{
            //  height: '50%',
            width: "100%",
          }}
        >
          <Animated.Text
            style={{
              fontSize: 15,
              fontSize: songDescriptionSize2,
              color: songDescriptionColor2,
              //fontWeight: 'bold',what I
              //color: "white",
              // opacity: 0.5,
            }}
          >
            {songArtist}
          </Animated.Text>
        </View>
      </View>
      <View
        style={{
          // backgroundColor: 'yellow',
          width: "10%",
          height: "100%",
        }}
      ></View>
    </Animated.View>
  );
}
 /*    <TouchableOpacity
      onPress={() => {
        setlike(!like);
      }}
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        right: 36,
        width: 50,
      }}
    >
      {like ? (
        <AntDesign name="heart" size={15} color="rgba(202, 28, 18,0.5)" />
      ) : (
        <AntDesign name="hearto" size={15} color={text_color_secondary} />
      )}
    </TouchableOpacity>;
       */