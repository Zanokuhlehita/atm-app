import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
  Animated,
  Dimensions,
  BackHandler,
} from "react-native";
// import { useRoute } from "@react-navigation/native";
// import { EventRegister } from "react-native-event-listeners";
// import * as FileSystem from "expo-file-system";
// import { Portal } from "react-native-portalize";
// import { MainContext } from "../../contexts/MainContext";
// import Header from "./components/Header";
// import ScrollBanner from "./components/ScrollBanner";
// import Suggestions from "./components/Suggestions";
// import LibraryMenu from "./components/LibraryMenu";
// import { LinearGradient } from "expo-linear-gradient";
// import firebase from "firebase";
// import Player from "../Player/index";
// import { Modalize } from "components/ATMAModal";
// import { getData } from "plugins/asyncLocalStorage";
// import LoadingScreenMain from "components/LoadingScreenMain";
// import ATMAButton from "../../components/ATMAButton";

export default function Home({ navigation, routes }) {
  // const {
  //   soundAll_ref,
  //   isPlaying_context_ref,
  //   allSongs,
  //   setallSongs_context,
  //   currentIndex_context_ref,
  //   setnowPlayingLyrics_context,
  //   nowPlayingDuration_context_ref,
  //   OnPlaybackStatusUpdate,
  //   mainNavigation_context_ref,
  //   playSong,
  //   user_context,
  //   playsSettings,
  //   appLoaded_ref,
  //   userLikes,
  //   setuserLikes,
  //   setrecentlyPlayed,
  //   screenHeight,
  //   screenWidth,
  //   playerModal,
  //   playerModalVisible,
  //   setplayerModalVisible,
  //   loadSongs,
  //   nowPlayingSong,
  //   setnowPlayingSong,
  //   nowPlayingPlaylist,
  //   setnowPlayingPlaylist,
  //   loadingScreen,
  //   setloadingScreen,
  //   userProfileComplete_ref,
  //   appLoaded,
  //   getLyrics,
  //   setappLoaded,
  // } = useContext(MainContext);

  // const [searchMode, setSearchMode] = useState(false);
  // const [headerFooter, setheaderFooter] = useState(true);

  // const [searchValue, setsearchValue] = useState("");

  // const [closeSplash, setcloseSplash] = useState(false);
  // const route = useRoute();

  //////// This effect is resposnible for loading the songs in the sound objects
  // useEffect(() => {
  //   if (allSongs[0].name != "" && soundAll_ref.current == "") {
  //     loadSongs();
  //   } /* else console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", soundAll_ref); */
  //   return () => { };
  // }, [allSongs]);

  // const [keyboardActive, setkeyboardActive] = useState(false);
  // const keyboardCloseListener = useRef();
  // const keyboardOpenListener = useRef();

  // function keyboardOpened() {
  //   setheaderFooter(false);
  // }

  // function keyboardClosed() {
  //   setheaderFooter(true);
  // }

  // useEffect(() => {
  //   keyboardOpenListener.current = Keyboard.addListener(
  //     "keyboardDidShow",
  //     keyboardOpened
  //   );
  //   keyboardCloseListener.current = Keyboard.addListener(
  //     "keyboardDidHide",
  //     keyboardClosed
  //   );

  //   return () => {
  //     keyboardCloseListener.current.remove();
  //     keyboardOpenListener.current.remove();
  //   };
  // }, []);

  /////////////////////////////// PLAY SOUND FUNVTION ///////////////////////////////

  // useEffect(() => {
  //   playerModalAnimation.addListener(({ value }) => {
  //     /*   if (value < 300) setminiPlayerZIndex(0);
  //     else setminiPlayerZIndex(10); */
  //   });
  //   appLoaded_ref.current = true;
  //   if (!userProfileComplete_ref.current) {
  //     navigation.navigate("completeprofile");
  //   }
  //   FileSystem.getFreeDiskStorageAsync().then((freeDiskStorage) => {
  //     var toKB = freeDiskStorage / 1024;
  //     var toMB = (toKB / 1024).toFixed(0);
  //     var toGB = (toMB / 1024).toFixed(0);
  //     // console.log(toMB, "MB", toGB, "GB");
  //     if (toMB < 300) {
  //       Alert.alert(
  //         "Please free up space on your device to allow offline play."
  //       );
  //     }
  //   });
  //   return () => {
  //     appLoaded_ref.current = false;
  //     /*  playerModalAnimation.removeAllListeners(); */
  //   };
  // }, []);

  // function renewDailyFreePlays() {
  //   var lastUpdate = user_context.dailyFreePlaysLastUpdate.toDate();
  //   const datesAreOnSameDay = (first, second) =>
  //     first.getFullYear() === second.getFullYear() &&
  //     first.getMonth() === second.getMonth() &&
  //     first.getDate() === second.getDate();

  //   var sameDay = datesAreOnSameDay(lastUpdate, new Date());
  //   if (!sameDay) {
  //     var freePlaysLimit = () => {
  //       if (user_context.dailyFreePlaysLimit == "default")
  //         return playsSettings.dailyFreePlaysLimit;
  //       /*   if (user_context.dailyFreePlaysLimit == "zimbabwe")
  //               return playsSettings.dailyFreePlaysLimitZimbabwe;
  //             if (user_context.dailyFreePlaysLimit == "southafrica")
  //               return playsSettings.dailyFreePlaysLimitSouthAfrica; */
  //       if (!user_context.dailyFreePlaysLimit)
  //         return playsSettings.dailyFreePlaysLimit;
  //       if (user_context.dailyFreePlaysLimit)
  //         return user_context.dailyFreePlaysLimit;
  //     };

  //     firebase
  //       .firestore()
  //       .collection("users")
  //       .doc(user_context.id)
  //       .update({
  //         dailyFreePlaysLastUpdate: new Date(),
  //         dailyFreePlays: freePlaysLimit(),
  //       })
  //       .then((v) => {
  //         console.log("Daily free plays has been updated.");
  //       })
  //       .catch((e) => {
  //         console.log("log", e);
  //         Alert.alert(
  //           "Error trying to update your daily free plays. Please make sure you are connected to the internet."
  //         );
  //       });
  //   } else {
  //     console.log("Daily free plays is already upto date.");
  //   }
  // }

  // useEffect(() => {
  //   if (allSongs[0].name != "" && nowPlayingPlaylist.name == "All Songs") {
  //     setnowPlayingPlaylist({
  //       name: "All Songs",
  //       songs: allSongs,
  //     });
  //   }
  //   return () => { };
  // }, [allSongs]);

  // useEffect(() => {
  //   getData("lastPlayedSong").then((v) => {
  //     var song = allSongs.filter((item, i) => {
  //       if (v == item.code) return item;
  //     });
  //     if (song[0]) {
  //       setnowPlayingSong(song[0]);
  //       getLyrics(song[0].code);
  //     } else {
  //       setnowPlayingSong({ code: "A0001" });
  //       getLyrics("A0001");
  //     }
  //   });

  //   ///////////////////////////////////////////
  //   renewDailyFreePlays();

  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .collection("likes")
  //     .onSnapshot(
  //       ({ docs }) => {
  //         var data = docs.map((doc) => {
  //           var id = doc.id;
  //           return { id, ...doc.data() };
  //         });
  //         setuserLikes(data);
  //       },
  //       (err) => {
  //         alert("likes update Error 589");
  //         console.log("Error loading user likes", err);
  //       }
  //     );
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .collection("plays")
  //     .onSnapshot(
  //       ({ docs }) => {
  //         var data = docs.map((doc) => {
  //           var id = doc.id;
  //           var date = doc.data().createdAt.toDate();

  //           return { id, date, ...doc.data() };
  //         });
  //         setrecentlyPlayed(data);
  //       },
  //       (err) => {
  //         alert("Recent plays update Error 589");
  //         console.log(`Encountered error: ${err}`);
  //       }
  //     );
  //   return () => { };
  // }, []);

  // /////////////////////////////////////////////////////////////////////////////////

  // const modalHeight = 80;
  // const animateThreshHold = 150;
  // const playerModalAnimation = useRef(new Animated.Value(0)).current;

  // const modalOffset = screenHeight.current - modalHeight;

  // const miniPlayer_opacity = playerModalAnimation.interpolate({
  //   inputRange: [0, 300, modalOffset],
  //   outputRange: [0, 0, 1],
  // });

  // const player_opacity = playerModalAnimation.interpolate({
  //   inputRange: [0, 300, modalOffset],
  //   outputRange: [1, 0, 0],
  // });

  // const coverArtSizeHeight = screenHeight.current * 0.4;
  // const coverArtSizeWidth = screenWidth.current * 0.86;
  // const coverArtTranslate = screenHeight.current * 0.1 - 6.5;

  // const coverArtHieght = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [coverArtSizeHeight, coverArtSizeHeight, 40],
  // });

  // const coverArtWidth = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [coverArtSizeWidth, coverArtSizeWidth, 40],
  // });

  // const coverArtTop = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [0, 0, -coverArtTranslate],
  // });

  // const lyricsTanslation = playerModalAnimation.interpolate({
  //   inputRange: [0, 20, animateThreshHold + 30, modalOffset],
  //   outputRange: [1, 0, 0, 0],
  // });

  // const songDescriptionTop = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [0, 0, 130],
  // });

  // const songDescriptionLeft = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [0, 0, 47],
  // });

  // const songDescriptionSize = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [20, 20, 15],
  // });

  // const songDescriptionSize2 = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [20, 20, 15],
  // });

  // const songDescriptionColor = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: ["white", "white", "black"],
  // });

  // const songDescriptionColor2 = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: ["white", "white", "black"],
  // });

  // const songDescriptionPadding = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [1, 1, 0.5],
  // });

  // const coverArtBorderRadius = playerModalAnimation.interpolate({
  //   inputRange: [0, animateThreshHold, modalOffset],
  //   outputRange: [10, 10, 3],
  // });

  // const { width, height } = Dimensions.get("window");
  // const grad_color = "222, 255, 255";
  // const position_ref = useRef("initial");
  // const [position, setposition] = useState("initial");
  // const [playerVisible, setplayerVisible] = useState(false);
  // const miniPlayer = useRef(null);
  // const [miniPlayerZIndex, setminiPlayerZIndex] = useState(1);
  // const miniPlayerZIndex_ref = useRef(-1);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "lime",
        // backgroundColor: "rgba(29, 29, 29,1)",
        paddingBottom: 80,
      }}
    >
      <View
        style={
          {
            //  backgroundColor: "white",
          }
        }
      >
        {/* <Header navigation={navigation} /> */}
        {/* <ScrollBanner /> */}

        {/* <Portal style={{}}> */}
        {/* <Modalize
            style={{ transform: [{ translateY: 20 }] }}
            onLayout={() => { }}
            onPositionChange={(pos) => {
              console.log("fffffffff", height - modalHeight, pos);
              if (
                pos == "top"
                  ? (miniPlayerZIndex_ref.current = -1)
                  : (miniPlayerZIndex_ref.current = 10)
              )
                position_ref.current = pos;
              setposition(pos);
            }}
            onDrag={(pos) => {
              //    if (position_ref.current == 'top' && ) console.log("ffffffffffffffffff", pos);
              playerModalAnimation.setValue(pos);
            }}
            alwaysOpen={modalHeight}
            withHandle={false}
            modalHeight={height}
         ref={playerModal}
          >
            <ScrollView style={{}}>
           

              <View
                ref={(ref) => {
                  miniPlayer.current = ref;
                }}
                style={{
                  //  backgroundColor: "rgba(222, 255, 255,0.8)",
                  height: height,
                  width: "100%",
                }}
              >
                <View>
                  <Player
                    miniPlayerZIndex={miniPlayerZIndex}
                    miniPlayerZIndex_ref={miniPlayerZIndex_ref}
                    player_opacity={player_opacity}
                    miniPlayer_opacity={miniPlayer_opacity}
                    coverArtHieght={coverArtHieght}
                    coverArtWidth={coverArtWidth}
                    coverArtTop={coverArtTop}
                    lyricsTanslation={lyricsTanslation}
                    coverArtBorderRadius={coverArtBorderRadius}
                    songDescriptionTop={songDescriptionTop}
                    songDescriptionLeft={songDescriptionLeft}
                    songDescriptionSize={songDescriptionSize}
                    songDescriptionColor={songDescriptionColor}
                    songDescriptionSize2={songDescriptionSize2}
                    songDescriptionColor2={songDescriptionColor2}
                    songDescriptionPadding={songDescriptionPadding}
                    navigation={navigation}
                    position_ref={position_ref}
                    playerBg_color={"0, 252, 231, 0.8"}
                    setminiPlayerZIndex={setminiPlayerZIndex}
                    position={position}
                  />
                </View>
              </View>
            </ScrollView>
          </Modalize> */}

        {/* </Portal> */}

        <View
          style={
            {
              //height: 100,
            }
          }
        ></View>

        {/* <Portal>
          <LoadingScreenMain />
        </Portal> */}
        {/* 
        <LinearGradient
          // Background Linear Gradient
          locations={[0, 0.25, 1]}
          colors={[
            `rgba(${grad_color},1)`,
            `rgba(${grad_color},1)`,

            `rgba(${grad_color},0)`,
          ]}
          style={{
            position: "absolute",
            width: "100%",
            opacity: 1,
            height: "100%",
            zIndex: -5,
          }}
        /> */}
      </View>
      {/*       <ATMAButton
        onPress={() => {
          playerModal.current.open();
        }}
      /> */}
      <View
        style={{
          height: "50%",
          marginTop: 10,
        }}
      >
        {/* <LibraryMenu navigation={navigation} /> */}
        {/* <Suggestions /> */}
      </View>
    </View>
  );
}
