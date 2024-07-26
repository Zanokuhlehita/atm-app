import React, {
  Component,
  createContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { Text, View, Animated, Alert } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import firebase from "firebase";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { getAllRecordsLevel2 } from "../plugins/firebase";
import { getData, storeData } from "../plugins/asyncLocalStorage";
import {
  updateDailyFreePlays,
  updatePremiumPlays,
  updatePromotionalPlays,
} from "../plugins/helperFunctions/playsManagement";
import * as Network from "expo-network";
import { fi, id } from "date-fns/locale";
import { albumArt1 } from "../plugins/assets";

// try {
// var firebaseConfig = {
//   apiKey: "AIzaSyCc5mwWEXPZYoKTcCIqMk5q9WI4fEZVPH8",
//   authDomain: "atma-firebase.firebaseapp.com",
//   databaseURL: "https://atma-firebase.firebaseio.com",
//   projectId: "atma-firebase",
//   storageBucket: "atma-firebase.appspot.com",
//   messagingSenderId: "283169871987",
//   appId: "1:283169871987:web:9edb59e3324238ca22b206",
//   measurementId: "G-X4LHVGKHMK",
// };
// firebase.initializeApp(firebaseConfig);
// } catch (e) {}

const MainContext = createContext();

export default function MainProvider(props) {
  const startLoadingIndicatorSongs = () => {
    setshowloadingIndicatorSongs(true);
  };
  const stopLoadingIndicatorSongs = () => {
    setshowloadingIndicatorSongs(false);
    songLoading_ref.current = false;
  };
  const [showloadingIndicatorSongs, setshowloadingIndicatorSongs] =
    useState(false);

  const [chat, setchat] = useState([]);

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false,
  });

  const [connctionStatus, setconnctionStatus] = useState("");
  const [appLoaded, setappLoaded] = useState(false);
  async function checkConnection(params) {
    await Network.getNetworkStateAsync().then((res) => {
      if (res.isConnected) {
        setconnctionStatus("online");
      } else {
        setconnctionStatus("offline");
      }
      //console.log("Checked Network Status");
    });
  }
  /// Helper to check if they is connection
  useEffect(() => {
    checkConnection();
    var x = setInterval(() => {
      checkConnection();
    }, 30000);
    return () => {
      clearInterval(x);
    };
  }, []);

  const [allSongs, setallSongs_context] = useState([
    { name: "", artists: "", cover_image: null },
  ]);
  function downloadAllSongs(index) {
    if (!index) index = 0;
    var song = allSongs[index];
    if (!song) return;
    FileSystem.getInfoAsync(
      `${FileSystem.documentDirectory}songs/${song.code}.mp3`
    )
      .then((res) => {
        console.log(`${song.code}`, res.exists);

        if (!res.exists) {
          // if exist download file
          const downloadResumable = FileSystem.createDownloadResumable(
            `${song.link}`,
            FileSystem.documentDirectory + `songs/${song.code}.mp3`,
            {},
            (downloadProgress) => {
              const progress = (
                (downloadProgress.totalBytesWritten /
                  downloadProgress.totalBytesExpectedToWrite) *
                100
              ).toFixed(0);
              setdownloadProgress1(progress);
            }
          );

          const func = async () => {
            try {
              const { uri } = await downloadResumable.downloadAsync();
              console.log("Finished downloading to ", uri);
              downloadAllSongs(index + 1);
            } catch (e) {
              console.error(e);
            }
          };
          func();
        } else {
          console.log("file already exist");
          downloadAllSongs(index + 1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const soundAll_ref = useRef([]);
  const isPlaying_context_ref = useRef(false);
  const allSongs_context_ref = useRef([
    { song_name: "", artists: "", cover_image: null },
  ]);
  const currentIndex_context_ref = useRef(0);
  const nowPlayingDuration_context_ref = useRef(0);
  const mainNavigation_context_ref = useRef();
  const infoViewIndex_context_ref = useRef(0);
  const current_position_context_ref = useRef(0);
  const authNavigation_ref = useRef();

  const [nowPlayingLyrics_context, setnowPlayingLyrics_context] = useState([
    {
      line: "No Lyrics Found",
    },
  ]);
  const [nowPlayingStoryline_context, setnowPlayingStoryline_context] =
    useState([
      {
        line: "No Story Found",
        color: "rgb(0,0,0)",
      },
    ]);

  const [user_context, setuser_context] = useState({});

  function generatePlayID() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth();
    var year = d.getFullYear();
    var hour = d.getHours();
    var mins = d.getMinutes();
    var sec = d.getSeconds();
    var playID = `D${day}${(month + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}${year}T${hour}${mins}${sec.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })}A0001`;

    return playID;
  }

  const OnPlaybackStatusUpdate = useRef(async (status) => {
    const pos = (status.positionMillis / 1000).toFixed(1);
    EventRegister.emit("songposition", pos);
    current_position_context_ref.current = pos;
    if (status.didJustFinish) {
      EventRegister.emit("songjustfinished");
    }
  });
  const [playsSettings, setplaysSettings] = useState("");
  const [trackSettings, settrackSettings] = useState({});
  const [recentlyPlayed, setrecentlyPlayed] = useState([]);
  ///// All firebase data
  useEffect(() => {
    if (Object.keys(user_context).length != 0 && allSongs.length < 2) {
      firebase
        .firestore()
        .collection("songs")
        .onSnapshot(
          ({ docs }) => {
            var data = docs.map((doc) => {
              var id = doc.id;
              return { id, ...doc.data() };
            });
            data.sort(function (a, b) {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            });
            if (user_context.userType == "admin") {
              setallSongs_context(data);
            } else {
              var data_filteres = data.filter((item) => {
                return item.status == "released";
              });

              setallSongs_context(data_filteres);
            }
          },
          (err) => {
            alert("Initial Songs array Data Update Error 250");
            console.log(`Encountered error: ${err}`);
          }
        );
    }

    return () => { };
  }, [user_context]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("settings")
      .onSnapshot(
        ({ docs }) => {
          var data = docs.map((doc) => {
            var id = doc.id;
            return { id, ...doc.data() };
          });
          var track_settings = data.filter((item) => {
            console.log(item.id);
            if (item.id == "trackSettings") return item;
          });
          var play_settings = data.filter((item) => {
            if (item.id == "playsSettings") return item;
          });

          setplaysSettings(play_settings[0]);
          settrackSettings(track_settings[0]);
        },
        (err) => {
          alert("Initial Songs array Data Update Error 365");
          console.log(`Encountered error: ${err}`);
        }
      );
    return () => { };
  }, []);
  function playSong(code, shouldPlay, local) {
    try {
      // var songCode = allSongs[index].code;

      //  console.log(songDetails);

      checkForPlays().then((plays) => {
        if (plays) {
          loadAudio(code);
        } else {
          alert("You out of plays");
          songLoading_ref.current = false;
        }
      });
    } catch (error) {
      stopLoadingIndicatorSongs();
      console.log("Error 658", error);
      Alert.alert("Error 258 occured while loading song.");
    }
  }
  const nowPlayingIndex_ref = useRef(0);
  function getLyrics(songCode) {
    getData(`${songCode}_LYRICS`).then((res) => {
      if (!res) {
        console.log(`Lyrics online fetch, ${songCode}`);

        getAllRecordsLevel2("songs", songCode, "more")
          .then((lyricsDoc) => {
            console.log(
              "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              lyricsDoc
            );
            if (lyricsDoc == []) setlyrics([]);
            else {
              storeData(lyricsDoc[0].lyrics, `${songCode}_LYRICS`);
              setlyrics(lyricsDoc[0].lyrics);
              console.log(
                "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                lyricsDoc
              );
            }
          })
          .catch((e) => {
            setnowPlayingLyrics_context([
              {
                line: "No Lyrics Found",
              },
            ]);
          });
      } else {
        console.log(`Lyrics local fetch , ${songCode}`);
        setnowPlayingLyrics_context(res);
      }
    });
  }
  const [stories, setstories] = useState([]);
  function getStories(songCode) {
    getData(`${songCode}_STORIES`).then((res) => {
      if (!res) {
        console.log(`sTORYLINE online fetch, ${songCode}`);

        getAllRecordsLevel2("songs", songCode, "more")
          .then((storylineDoc) => {
            if (storylineDoc == []) setstories([]);
            else {
              storeData(storylineDoc[1].storyline, `${songCode}_STORIES`);
              console.log(
                "ffffffffffffffffffffffffffffffffff",
                storylineDoc[1].storyline
              );
              setstories(storylineDoc[1].storyline);
            }
          })
          .catch((e) => {
            setnowPlayingStoryline_context([
              {
                line: "No Lyrics Found",
              },
            ]);
          });
      } else {
        console.log(`Lyrics local fetch , ${songCode}`);
        setnowPlayingStoryline_context(res);
      }
    });
  }
  const sound_ref = useRef("");
  const loadAudio = async (code) => {
    startLoadingIndicatorSongs();
    async function playTrack(source) {
      const sound = new Audio.Sound();
      const initialStatus = {
        shouldPlay: false,
      };
      await sound
        .loadAsync(source, initialStatus, false)
        .then((v) => {
          console.log("Song loaded");
          stopLoadingIndicatorSongs();
        })
        .catch((v) => {
          console.log("Song load Error", v);
          /*   notLoaded.current++; */
          loadSong(source, "Second try");
        });
      sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate.current);

      const Mill = await sound.getStatusAsync();
      let duration = Mill.durationMillis / 1000;
      soundAll_ref.current.push({
        code,
        duration: duration,
        sound: sound,
      });
      loadAudio(code);
    }
    try {
      // check if its loaded already
      var song = soundAll_ref.current.filter((item, i) => {
        if (item.code == code) return item;
      });
      if (song != "") {
        // load from context
        console.log("Song Loaded from (preloaded) online ", song[0].code);
        const Mill = await song[0].sound.getStatusAsync();
        let duration = Mill.durationMillis / 1000;
        nowPlayingDuration_context_ref.current = duration;

        await song[0].sound.playAsync();
        setisPlaying(true);
        stopLoadingIndicatorSongs();

        sound_ref.current = song[0].sound;
      } else {
        //load from downloads or online
        FileSystem.getInfoAsync(
          `${FileSystem.documentDirectory}songs/${code}.mp3`
        )
          .then((file) => {
            if (file.exists) {
              //load from download
              songLink = file.uri;

              const source = {
                uri: songLink,
              };
              playTrack(source);
              console.log("Song Loaded from downloads");
            } else {
              //load from link
              console.log("Song Loaded from online", nowPlayingSong);

              const source = {
                uri: nowPlayingSong_ref.current.link,
              };
              playTrack(source);
            }
          })
          .catch((e) => {
            console.log("Error 258", e);
            Alert.alert("Error 258 occured while loading song.");
            stopLoadingIndicatorSongs();
          });
      }
    } catch (e) {
      console.log("my error", e);
      Alert.alert("Error occured while loading song.");
      stopLoadingIndicatorSongs();
    }
  };

  const [shuffle, setshuffle] = useState(false);

  const [repeat, setrepeat] = useState(false);
  const now_playing_playlist = useRef([]);

  const user_id = useRef(null);
  const user_name = useRef(null);
  const [showSongs, setshowSongs] = useState("allsongs");
  const [userLikes, setuserLikes] = useState([]);
  const appLoaded_ref = useRef(false);
  const [now_playing_song, setnow_playing_song] = useState({
    name: "",
    data: "",
    index: "",
  });
  const [now_playing_id, setnow_playing_id] = useState(0);
  const [skip_to, setskip_to] = useState(0.1);
  const [playlistener, setplaylistener] = useState();
  const now_playing_ref = useRef(0);
  const stories_on = useRef(false);
  const play_status = useRef(false);
  //const [play_status, setplay_status] = useState(true)

  const [test, settest] = useState(1);
  const snack_1_active = useRef(false);
  const snack_2_active = useRef(false);
  const snack_3_active = useRef(false);
  const allow_mini_scroll = useRef(true);
  const sound_position = useRef(0);
  const isPlayerControl = useRef(false);
  /* STATE SELECTORS : START */
  //const { sound_data } = useSelector(state => state.songs)
  const song_duration = useRef();
  const disable_player_maximize = useRef(false);
  const show_player_minimized = useRef(true);
  /* STATE SELECTORS : END*/
  /* LOCAL STATE: START */
  const [sound_data, setsound_data] = useState();
  const [loading_song, setloading_song] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const playlist_number_ref = useRef(0);
  const song_init_render = useRef(0);
  /* LOCAL STATE: START */
  //-----------------//

  //-------------//
  //////////////////////////////////////////////////////////// START

  const library_swiper = useRef();
  const [mainLoadingScreen, setmainLoadingScreen] = useState(true);
  const [loadingScreen, setloadingScreen] = useState(false);
  ////////////////////////////////////////////////////// END
  const [listener, setlistener] = useState();
  const [lyrics_listener, setlyrics_listener] = useState();

  useEffect(() => {
    if (nowPlayingSong.code) getLyrics(nowPlayingSong.code);
    return () => { };
  }, [nowPlayingSong]);

  const [pos, setpos] = useState(0);

  const bg_moveX = useRef(new Animated.Value(0)).current;
  const mainview_bg = useRef(new Animated.Value(0));
  /////////////////////////////////////////////////////////////
  var playsCountDuration = 10000;
  const pausedAt = useRef(0);
  const playsTimer = useRef(null);
  const date1 = useRef("");
  const date2 = useRef("");
  const timeTarget = useRef(playsCountDuration);
  const timerActive = useRef(false);
  function startPlaysTimer(startNew) {
    if (startNew) {
      timeTarget.current = playsCountDuration;
      pausedAt.current = 0;
    }

    if (!timerActive.current && timeTarget.current != 0) {
      timeTarget.current = timeTarget.current - pausedAt.current;
      console.log("new target", timeTarget.current);
      date1.current = new Date();
      playsTimer.current = setTimeout(() => {
        console.log("New Play update");
        //registerPlay();
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("plays")
          .doc(generatePlayID())
          .set({
            userId: firebase.auth().currentUser.uid,
            playType: connctionStatus,
            songId: allSongs[nowPlayingIndex_ref.current].code,
            createdAt: new Date(),
          })
          .then(() => { });

        resetPlaysTimer();
      }, timeTarget.current);
      timerActive.current = true;
    }
  }
  function pausePlaysTimer() {
    if (timerActive.current) {
      date2.current = new Date();
    }
    var timeDiff = date2.current - date1.current;
    pausedAt.current = timeDiff;
    console.log("Time Left: " + (timeTarget.current - timeDiff) + " seconds");
    clearTimeout(playsTimer.current);
    timerActive.current = false;
  }
  function resetPlaysTimer() {
    date1.current = 0;
    date2.current = 0;
    clearTimeout(playsTimer.current);
    playsTimer.current = null;
    pausedAt.current = 0;
    timerActive.current = false;
    timeTarget.current = 0;
  }
  /////////////////////////////////////////////////////////////
  async function playTrack() {
    if (!sound_ref.current) {
      skipTo(nowPlayingSong.code);
      return;
    }
    await sound_ref.current
      .playAsync()
      .then((e) => {
        startPlaysTimer();
        setisPlaying(true);

        // EventRegister.emit("updateplaypause", true);
      })
      .catch(() => {
        skipTo(nowPlayingSong.code);
      });
  }
  async function pauseTrack() {
    await sound_ref.current.pauseAsync().then((e) => {
      pausePlaysTimer();
      setisPlaying(false);

      //EventRegister.emit("updateplaypause", false);
    });
  }
  async function stopTrack() {
    await sound_ref.current.stopAsync().then((e) => {
      setisPlaying(false);
      resetPlaysTimer();
      EventRegister.emit("resetslider");
    });
  }

  ///////////////////////////////////////////////
  const [plays, setplays] = useState(0);

  function registerPlay() {
    if (user_context.dailyFreePlays > 0) {
      var newVlaue = user_context.dailyFreePlays - 1;
      checkForPlays();
      updateDailyFreePlays(newVlaue);
      return true;
    }
    if (user_context.promotionalPlays > 0) {
      var newVlaue = user_context.promotionalPlays - 1;
      checkForPlays();
      updatePromotionalPlays(newVlaue);
      return true;
    }

    if (user_context.premiumPlays > 0) {
      var newVlaue = user_context.promotionalPlays - 1;
      checkForPlays();
      updatePremiumPlays(newVlaue);
      return true;
    }

    alert(
      "Please note you out of plays, Choose a method to purchase more plays",
      user_context.dailyFreePlays
    );

    return false;
  }

  async function checkForPlays() {
    // var plays = await getData("availablePlays");
    var totalPlays =
      user_context.dailyFreePlays +
      user_context.promotionalPlays +
      user_context.premiumPlays;
    setplays(totalPlays);
    return true;
    if (totalPlays) return totalPlays;
    else return false;
  }

  //////////////////////////loadSong////////////////////////////
  async function loadSong(source, i, desc) {
    const sound = new Audio.Sound();
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
    sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate.current);

    const Mill = await sound.getStatusAsync();
    let duration = Mill.durationMillis / 1000;

    soundAll_ref.current.push({
      ...allSongs[i],
      duration: duration,
      sound: sound,
    });
  }

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

  const [nowPlayingSong, setnowPlayingSong] = useState({ code: "A0000" });
  const nowPlayingSong_ref = useRef({ code: "A0000" });

  const [nowPlayingPlaylist, setnowPlayingPlaylist] = useState({
    name: "All Songs",
    songs: allSongs,
  });

  const songLoading_ref = useRef(false);

  async function skipTo(code, playlist) {
    if (songLoading_ref.current) {
      console.log("Another song is already loading");
      return;
    }
    songLoading_ref.current = true;
    if (playlist) setnowPlayingPlaylist(playlist);
    storeData(code, "lastPlayedSong");
    if (sound_ref.current) await sound_ref.current.stopAsync();

    var songDetails = allSongs.filter((item, i) => {
      if (item.code == code) return item;
    });

    if (songDetails != "") {
      nowPlayingSong_ref.current = songDetails[0];
      setnowPlayingSong(songDetails[0]);
      getLyrics(code);
      getStories(code);
      playSong(code);
      // currentIndex_context_ref.current = index;
      EventRegister.emit("resetslider");
      EventRegister.emit("updateplaypause", true);
    } else {
      songLoading_ref.current = false;

      Alert.alert(
        "Oops",
        "Song was not found, Having any challanges? Contact support.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Contact Support",
            onPress: () => { },
          },
        ],
        { cancelable: true }
      );
    }
  }
  ////////////////////////////////////////////////////
  function getNowPlayingAlbumArt() {
    try {
      var song = allSongs.filter((item, i) => {
        if (item.code == nowPlayingSong.code) return item;
      });
      return { uri: song[0].coverArt };
    } catch (error) {
      return albumArt1;
    }
  }
  function getNowPlayingArtistNames() {
    try {
      var song = allSongs.filter((item, i) => {
        if (item.code == nowPlayingSong.code) return item;
      });
      var artists = "";
      song[0].artists.filter((item, i) => {
        if (i == 0) artists = artists + item;
        else artists = artists + " & " + item;
      });
      song[0].featuringArtists.filter((item, i) => {
        if (i == 0) artists = artists + " ft " + item;
        else artists = artists + ", " + item;
      });

      return artists;
    } catch (error) {
      return "";
    }
  }
  function getNowPlayingSongName() {
    try {
      var song = allSongs.filter((item, i) => {
        if (item.code == nowPlayingSong.code) return item;
      });
      return song[0].name;
    } catch (error) {
      return "";
    }
  }
  /////////////////////////////////////////////////////
  const screenHeight = useRef(640);
  const screenWidth = useRef(360);
  const playerModal = useRef(null);
  const [playerModalVisible, setplayerModalVisible] = useState(true);
  const [loadingIndicator, setloadingIndicator] = useState(false);
  ///////////////////////////////////////////////
  const userProfileComplete_ref = useRef(false);

  //////////////////////LOADING SCREEN CODE///////////////////////

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        getUserInfo(user.uid);
      } else {
        completeLoad("welcome");
      }
    });
    return () => { };
  }, []);

  async function getUserInfo(e) {
    var user = await firebase.firestore().collection("users").doc(e);

    user.onSnapshot(
      (doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());

          var id = doc.id;
          var data = doc.data();
          var user = { ...data, id };
          setuser_context(user);
          //apploaded helps us see we are in home screen to avoid navigation when data changes on this listener
          if (user_context && !appLoaded_ref.current) {
            if (user.gender) {
              // navigation.navigate("completeprofile");
              userProfileComplete_ref.current = true;
            }
            completeLoad("home");
          }
        } else {
          // doc.data() will be undefined in this case
          Alert.alert("Error loading user info contact us info@adlertempo.com");
          console.log("No such document!");
        }
      },
      (err) => {
        Alert.alert("Error with getting user");
        EventRegister.emit("reset_navigation");

        console.log("Error getting document:", error);
      }
    );
  }

  function completeLoad(screen, noReset) {
    // mainNavigation_context_ref.current.navigate(screen);
    if (!noReset) {
      mainNavigation_context_ref.current.reset({
        index: 0,
        routes: [
          {
            name: screen,
          },
        ],
      });
    }
    //-150 is complete length
    Animated.timing(loadingSlider, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => { });
    Animated.timing(opacity_animation, {
      toValue: 0,
      duration: 1000,
      delay: 500,
      // easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      // resetLoad();
      setmainLoadingScreen(false);
    });
  }

  const slider_width = 150;
  const loadingSlider = useRef(new Animated.Value(-slider_width)).current;
  const opacity_animation = useRef(new Animated.Value(1)).current;

  //////////////////////////////////////////////////////////////
  ///////////////// functions for liking songs///////////
  const [like, setlike] = useState(false);
  const [disableLikeButton, setdisableLikeButton] = useState(false);
  function likeSong(code) {
    user_context.likes.push(code);
    setdisableLikeButton(true);
    var likesLocal = user_context.likes;
    setlike(true);
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({ likes: [...likesLocal] })
      .then(() => {
        console.log("Record Update Succesfull");
        setdisableLikeButton(false);
      })
      .catch((e) => {
        alert("Error while liking song: Error 5897.");
        console.log("Error while unliking song: Error 5897.", e);
        setdisableLikeButton(false);
      });
  }

  function unLike(code) {
    var filtered = user_context.likes.filter((value, i) => {
      return code != value;
    });
    user_context.likes = filtered;

    setdisableLikeButton(true);

    setlike(false);
    /*    var newLikes = user_context.likes.filter((item, i) => {
      if (item != code) {
        return item;
      }
    }); */
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({ likes: user_context.likes })
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

  function getLikeStatus(item) {
    var status = false;
    var result = user_context.likes.filter((like, i) => {
      if (item.code == like) {
        status = true;
        return;
      }
    });
    if (result != "") return status;
    else return status;
  }
  //////////////////////////////////////////////////////////
  return (
    <MainContext.Provider
      value={{
        allSongs_context_ref,
        currentIndex_context_ref,
        nowPlayingDuration_context_ref,
        OnPlaybackStatusUpdate,
        mainNavigation_context_ref,
        infoViewIndex_context_ref,
        current_position_context_ref,

        setsound_data: setsound_data,
        now_playing_playlist,
        test: test,
        settest: settest,
        now_playing_id: now_playing_id,
        setnow_playing_id: setnow_playing_id,
        now_playing_ref: now_playing_ref,

        play_status: play_status,
        allow_mini_scroll: allow_mini_scroll,
        isPlayerControl: isPlayerControl,
        sound_position: sound_position,
        pos: pos,
        setpos: setpos,
        listener: listener,
        setlistener: setlistener,
        lyrics_listener: lyrics_listener,
        setlyrics_listener: setlyrics_listener,

        stories_on: stories_on,
        shuffle: shuffle,
        snack_1_active: snack_1_active,
        snack_2_active: snack_2_active,
        snack_3_active: snack_3_active,
        repeat: repeat,
        song_duration: song_duration,
        disable_player_maximize,
        show_player_minimized,

        user_id,
        user_name,

        nowPlayingLyrics_context,
        setnowPlayingLyrics_context,

        user_context,
        setuser_context: setuser_context,
        library_swiper,
        song_init_render,
        playlist_number_ref,
        bg_moveX,
        mainview_bg,
        allSongs,
        setallSongs_context: setallSongs_context,
        shuffle,
        repeat,
        setshuffle,
        setrepeat,

        showSongs,
        setshowSongs,
        playSong,
        downloadAllSongs,
        playTrack,
        pauseTrack,
        stopTrack,
        plays,
        setplays,
        registerPlay,
        playsSettings,
        appLoaded_ref,
        userLikes,
        setuserLikes,
        connctionStatus,
        recentlyPlayed,
        setrecentlyPlayed,
        nowPlayingIndex_ref,
        nowPlayingCode: allSongs[nowPlayingIndex_ref.current].code,
        screenHeight,
        screenWidth,
        playerModal,
        playerModalVisible,

        setplayerModalVisible,
        loadSongs,
        soundAll_ref,
        skipTo,
        nowPlayingSong,
        setnowPlayingSong,
        getNowPlayingSongName,
        getNowPlayingArtistNames,
        getNowPlayingAlbumArt,
        isPlaying,
        setisPlaying,
        nowPlayingPlaylist,
        setnowPlayingPlaylist,
        sound_ref,
        trackSettings,
        mainLoadingScreen,
        setmainLoadingScreen,
        loadingScreen,
        setloadingScreen,
        userProfileComplete_ref,
        loadingIndicator,
        setloadingIndicator,
        appLoaded,
        setappLoaded,
        loadingSlider,
        opacity_animation,
        authNavigation_ref,
        completeLoad,
        getUserInfo,
        getLyrics,
        getLikeStatus,
        unLike,
        likeSong,

        chat,
        setchat,
        nowPlayingStoryline_context,
        showloadingIndicatorSongs,
        setshowloadingIndicatorSongs,
        startLoadingIndicatorSongs,
        stopLoadingIndicatorSongs,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
}
export { MainProvider, MainContext };
