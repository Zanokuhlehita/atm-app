import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { text_color_secondary } from '../../../theme/colors'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import firebase from "firebase";
import { MainContext } from '../../../contexts/MainContext';



export default function SongDetails({  }) {
        const {
          user_context,
          nowPlayingIndex_ref,
          nowPlayingCode,
          getNowPlayingArtistNames,
          getNowPlayingSongName,
        } = useContext(MainContext);

    const [like, setlike] = useState(false)
const [disableLikeButton, setdisableLikeButton] = useState(false)
    useEffect(() => {
      var result = user_context.likes.filter((item, i) => {
        console.log("Item", item);
        if (nowPlayingCode == item) {
         
          return item;
        }
      });
if(result != '') setlike(true);
else setlike(false)
      return () => {};
    }, [nowPlayingCode,user_context]);
    function likeSong() {
        setdisableLikeButton(true)
     var likesLocal = user_context.likes;
     setlike(true);
               firebase
                 .firestore()
                 .collection("users")
                 .doc(firebase.auth().currentUser.uid)
                 .update({ likes: [nowPlayingCode, ...likesLocal] })
                 .then(() => {
                   console.log("Record Update Succesfull");
        setdisableLikeButton(false);

                 })
                 .catch((e) => {
                  alert("Error while liking song: Error 5897.");
          console.log("Error while unliking song: Error 5897.", e)
        setdisableLikeButton(false);
                 })
                }
    function unLike() {
        setdisableLikeButton(true);

        setlike(false);
        var newLikes = user_context.likes.filter((item, i) => {
          if (item != nowPlayingCode) {
            return item;
          }
        });
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({ likes: newLikes })
        .then(() => {
          console.log("Record Update Succesfull");
        setdisableLikeButton(false);

        })
        .catch((e) => {
          alert("Error while unliking song: Error 5897.");
          console.log("Error while unliking song: Error 5897.", e);
        setdisableLikeButton(false);

        });
    }
    return (
      <View
        style={{
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
            <Text
              numberOfLines={1}
              style={{
                width: "110%",
                fontSize: 20,
                //fontWeight: 'bold',
                color: text_color_secondary,
              }}
            >
              {getNowPlayingSongName()}
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (!like) likeSong();
                else unLike();
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
                <AntDesign
                  name="heart"
                  size={15}
                  color="rgba(197, 15, 31,0.8)"
                />
              ) : (
                <AntDesign
                  name="hearto"
                  size={15}
                  color={text_color_secondary}
                />
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              //  height: '50%',
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                //fontWeight: 'bold',
                color: "white",
                opacity: 0.5,
              }}
            >
              {getNowPlayingArtistNames()}
            </Text>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: 'yellow',
            width: "10%",
            height: "100%",
          }}
        ></View>
      </View>
    );
}
