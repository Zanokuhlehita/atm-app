import React, { useState, useRef, useEffect, useContext } from "react";
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  Share,
} from "react-native";
import {
  SimpleLineIcons,
  EvilIcons,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import firebase from "firebase";
import { EventRegister } from "react-native-event-listeners";

import { MainContext } from "../../../contexts/MainContext";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "../../../contexts/DataContext";

export default function Navlist({ navigation }) {
  const {
    isPlaying,
    setisPlaying,
    isMinimized,
    shuffle,
    repeat,
    now_playing_playlist,
    skip_to,
    soundAll_ref,
    snack_1_active,
    snack_2_active,
    snack_3_active,
    test,
    settest,
    now_playing_ref,
    play_status,
    now_playing_id,
    setlyrics_listener,
    lyrics_listener,
    user_id,
    like,
  } = useContext(MainContext);
  const { user } = useContext(DataContext);
  const db = firebase.firestore();

  const { user_data } = useSelector((state) => state.user);
  const [shuffle_local, setshuffle_local] = useState();
  const [update, setupdate] = useState(true);
  const { width, height } = Dimensions.get("window");
  const active_color = "rgb(25, 118, 210)";
  const divider_color = "rgba(255,255,225,0.1)";
  const divider_width = 0.5;

  const Navlist = [
    {
      name: user ? `${user.first_name} ${user.last_name}` : "Dashboard",
      key: "1",
      icon: (
        <EvilIcons
          style={{
            left: -5,
          }}
          name="user"
          size={38}
          color="white"
        />
      ),
      next_line: true,
      action: () => {
        navigation.navigate("dashboard");
        setshow_navlist("none");
      },
    },

    {
      name: "Shuffle",
      key: "2",
      icon: (
        <View>
          <SimpleLineIcons
            name="shuffle"
            size={22}
            color={shuffle.current ? "rgba(252, 64, 73,0.6)" : "white"}
          />
        </View>
      ),
      next_line: false,
      action: () => {
        shuffle.current = !shuffle.current;
        setupdate(!update);
        setshow_navlist("none");
        if (!snack_1_active.current) {
          EventRegister.emit(
            "snack_1",
            `Shuffle: ${shuffle.current ? "on" : "off"}`
          );
        } else {
          if (!snack_2_active.current) {
            EventRegister.emit(
              "snack_2",
              `Shuffle: ${shuffle.current ? "on" : "off"}`
            );
          } else {
            if (!snack_3_active.current) {
              EventRegister.emit(
                "snack_3",
                `Shuffle: ${shuffle.current ? "on" : "off"}`
              );
            }
          }
        }
      },
    },
    {
      name: "Repeat",
      key: "3",
      icon: (
        <SimpleLineIcons
          name="loop"
          size={22}
          color={repeat.current ? "rgba(252, 64, 73,0.6)" : "white"}
        />
      ),
      next_line: true,
      action: () => {
        repeat.current = !repeat.current;
        setupdate(!update);
        setshow_navlist("none");

        if (!snack_1_active.current) {
          EventRegister.emit(
            "snack_1",
            `Repeat: ${repeat.current ? "on" : "off"}`
          );
        } else {
          if (!snack_2_active.current) {
            EventRegister.emit(
              "snack_2",
              `Repeat: ${repeat.current ? "on" : "off"}`
            );
          } else {
            if (!snack_3_active.current) {
              EventRegister.emit(
                "snack_3",
                `Repeat: ${repeat.current ? "on" : "off"}`
              );
            }
          }
        }
      },
    },
    /* {
            name: 'Like',
            key: '4',
            icon: like ? <Entypo name="heart" size={24} color="rgba(252, 64, 73,0.6)" /> :
                <SimpleLineIcons name="heart" size={22} color="white" />,
            next_line: false,
            action: () => {
                like.current = !like
                setshow_navlist('none')
                like ? EventRegister.emit('like', true) : EventRegister.emit('like', false)
                like ? db.collection('user').doc(user_id.current).collection('likes').doc('A007').set({
                    code: 'A007',
                    song_name: 'Ms California',
                    artists: 'Jayceon Adler',
                    featuring_artists: 'Bray Atlas',

                }) : db.collection('user').doc(user_id.current).collection('likes').doc('A007').delete()



            }
        },
        {
            name: 'Share',
            key: '5',
            icon: < SimpleLineIcons name="share" size={21.5} color="white" />,
            next_line: true,
            action: () => onShare()
        }, */
    /*    {
               name: 'Settings',
               key: '6',
               icon: <SimpleLineIcons name="settings" size={23} color="white" />,
               next_line: false
           }, */
    {
      name: "Support Us",
      key: "7",
      icon: (
        <MaterialCommunityIcons
          name="medal"
          size={27}
          color="rgba(252, 64, 73,0.5)"
        />
      ),
      next_line: false,
      action: () => {
        EventRegister.emit("openDashboard");
        setTimeout(() => {
          EventRegister.emit("navigateTo", "supportus");
        }, 16);
        setshow_navlist("none");
      },
    },
  ];

  const getData = async (storageKey) => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey);
      if (jsonValue != null) {
        const value = JSON.parse(jsonValue);
        console.log(value);

        return value;
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  async function seek(x) {
    await soundAll_ref.current.setPositionAsync(x);
    //console.log(soundAll_ref)
  }

  const [x, setx] = useState(0);
  const ShareExample = () => {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "ncodia.co.za",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const listener = useRef();
  const navlist_opacity = useState(new Animated.Value(0))[0];
  useEffect(() => {
    getData("user");

    listener.current = EventRegister.addEventListener("navlist_player", () => {
      // navlist_opacity.setValue(1)
      setshow_navlist("flex");
    });
    return () => {
      EventRegister.removeEventListener(listener.current);
    };
  }, []);
  const [show_navlist, setshow_navlist] = useState("none");

  return (
    <Animated.View
      style={{
        //backgroundColor: 'rgba(0,0,0,0.1)',
        height: "100%",
        zIndex: 80,

        display: show_navlist,
      }}
    >
      <TouchableNativeFeedback
        onPress={
          () => setshow_navlist("none")

          // navlist_opacity.setValue(0)
        }
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "100%",
            zIndex: 10,
          }}
        ></View>
      </TouchableNativeFeedback>
      <View
        style={{
          position: "absolute",
          zIndex: 20,
          top: 80,
          right: 10,
          height: "45%",
          width: "60%",

          borderRadius: 10,
          // borderBottomLeftRadius: 10,
          overflow: "hidden",
          //backgroundColor: 'blue'
        }}
      >
        {/* Side Navigation: Start */}
        <View
          style={{
            position: "absolute",

            width: "100%",
            height: "100%",
            backgroundColor: "rgb(51, 51, 51)",
            // justifyContent: 'center',
            alignItems: "center",
            paddingHorizontal: 0,
            paddingLeft: 20,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          {Navlist.map((item, index) => {
            return (
              <View key={index.toString()}>
                <TouchableOpacity onPress={item.action}>
                  <View
                    style={{
                      marginVertical: 18,
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "25%",

                        //  backgroundColor: 'yellow'
                      }}
                    >
                      {item.icon}
                    </View>
                    <View
                      style={{
                        width: "70%",

                        paddingLeft: 5,
                        //  backgroundColor: 'pink'
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal: 0,
                          color: "white",
                          fontSize: 18,
                          // fontWeight: 'bold'
                        }}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {item.next_line ? (
                  <View
                    style={{
                      borderBottomColor: "white",
                      borderBottomWidth: 1,
                      width: width * 0.5,
                      height: 1,
                      zIndex: 30,
                      opacity: 0.5,
                    }}
                  ></View>
                ) : null}
              </View>
            );
          })}
        </View>
        {/* Side Navigation: End */}
      </View>
    </Animated.View>
  );
}
