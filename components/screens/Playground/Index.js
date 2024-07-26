
import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Animated,
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
// import { MainContext } from "../../contexts/MainContext";
// import { Audio } from "expo-av";
// import { getData, storeData } from "../../plugins/asyncLocalStorage";


export default function index({ navigation }) {
  const data = [{ name: "To" }, { name: "name2" }, { name: "name3" }];
  const { allSongs, soundAll_ref } = useState('');

  //////////////////////////loadSong////////////////////////////
  async function loadSong(source, i, desc) {
    // const sound = new Audio.Sound();
    const initialStatus = {
      shouldPlay: false,
    };
    await sound
      .loadAsync(source, initialStatus, false)
      .then((v) => {
        console.log("Song loaded---", i, desc);

        /*         loaded.current++;
                setloaded2(loaded.current); */
      })
      .catch((v) => {
        console.log("Song load Error", v);
        /*   notLoaded.current++; */
        loadSong(source, i, "Second try");
      });
    soundAll_ref.current.push({
      id: allSongs[i].link,
      sound: sound,
    });
  }
  /////////////////////////////////////////////////////////

  const loaded = useRef(0);
  const notLoaded = useRef(0);

  //////////////////////////////loadSongs/////////////////////////////////
  async function loadSongs() {
    try {
      soundAll_ref.current = [];

      for (let i = 0; i < allSongs.length; i++) {
        const source = {
          uri: allSongs[i].link,
        };

        await loadSong(source, i, "First try");

      }
    } catch (e) {
      console.log("ERROR", e);
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  const loadAudio = async (songLink, index) => {
    try {
      const sound = new Audio.Sound();
      if (soundAll_ref.current) {
        soundAll_ref.current.unloadAsync();
      }
      const status_play = {
        shouldPlay: true,
      };

      await sound
        .loadAsync(
          {
            uri: songLink,
          },
          status_play,
          false
        )
        .then(() => {
          console.log("Song has been loaded");
        });
      soundAll_ref.current = sound;
      //  const Mill = await sound.getStatusAsync();
      //  sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate.current);
    } catch (e) {
      Alert.alert("Error occured while loading song.");
      console.log("Error occured while loading song.", e);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 30,
      }}
    >
      <Text>Play ground - {loaded.current} </Text>
      <View style={{ flexDirection: "row", marginTop: 60 }}>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate("settings");
            // await soundAll_ref.current.playAsync();
          }}
          style={{
            height: 40,
            width: "50%",
            backgroundColor: "green",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Nav</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            soundAll_ref.current.map(async (item, i) => {
              await soundAll_ref.current[i].sound.pauseAsync();
            });
          }}
          style={{
            height: 40,
            width: "50%",
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Pause</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <TouchableOpacity
          onPress={async () => {
            loadSongs();
          }}
          style={{
            height: 40,
            width: "50%",
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Load songs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {


            var code = 'A0001'
            var song = soundAll_ref.current.filter((item, i) => {
              if (item.code == code) return item;
            });
            console.log(song[0].name);
          }}
          style={{
            height: 40,
            width: "50%",
            backgroundColor: "orange",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>CLG</Text>
        </TouchableOpacity>
      </View>

      <View style={{}}>
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            {/* {allSongs.map((item, i) => {
              return (
                <View
                  style={{ flexDirection: "row", marginVertical: 10 }}
                  key={i.toString()}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      await soundAll_ref.current[i].sound.playAsync();

                      // loadAudio(item.link, i);
                    }}
                    style={{
                      height: 50,
                      width: "100%",
                      backgroundColor: "blue",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })} */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
