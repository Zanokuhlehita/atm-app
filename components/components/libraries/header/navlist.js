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
} from "@expo/vector-icons";
import firebase from "firebase";
import { EventRegister } from "react-native-event-listeners";

import { MainContext } from "../../../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "../../../contexts/DataContext";
export default function Navlist({ navigation }) {
  const { shuffle, repeat, show_player_minimized, user_id, user_likes } =
    useContext(MainContext);
  const { recent_plays, user } = useContext(DataContext);
  const { user_data } = useSelector((state) => state.user);
  const db = firebase.firestore();

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
        show_player_minimized.current = false;
        //navigation.navigate('dashboard')
        EventRegister.emit("openDashboard");

        setshow_navlist("none");
      },
    },

    {
      name: "Share",
      key: "2",
      icon: (
        <View>
          <SimpleLineIcons name="share" size={21.5} color="white" />
        </View>
      ),
      next_line: true,
      action: () => {
        onShare();
        setshow_navlist("none");
      },
    },
    /* {
           name: 'Settings',
           key: '3',
           icon: <SimpleLineIcons name="settings" size={25} color="white" />,
           next_line: false,
           action: () => {
               context.loadAudio()
           }
       }, */
    {
      name: "Support Us",
      key: "4",
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "ncodia.co.za",
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const [listener, setlistener] = useState();
  const navlist_opacity = useState(new Animated.Value(0))[0];
  useEffect(() => {
    setlistener(
      EventRegister.addEventListener("navlist", () => {
        setshow_navlist("flex");
      })
    );
    return () => {
      EventRegister.removeEventListener(listener);
    };
  }, []);
  const [show_navlist, setshow_navlist] = useState("none");

  return (
    <Animated.View
      style={{
        //backgroundColor: 'rgba(0,0,0,0.1)',
        height: "100%",
        zIndex: 80,
        // opacity: navlist_opacity,
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
          top: 100,
          right: 5,
          height: "35%",
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
            backgroundColor: "rgba(17, 17, 17,0.95)",
            // justifyContent: 'center',
            alignItems: "center",
            paddingHorizontal: 20,
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
                        width: "30%",

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
                          paddingHorizontal: 5,
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
