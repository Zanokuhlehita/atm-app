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
import { MainContext } from "../contexts/MainContext";
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
import * as FileSystem from "expo-file-system";
import { getAllRecordsLevel2 } from "../plugins/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAFolder } from "../plugins/FileSystem";

export default function DownloadSongs({}) {
  const {
    soundAll_ref,
    isPlaying_context_ref,
    allSongs,

    setnowPlayingLyrics_context,
    nowPlayingDuration_context_ref,
    OnPlaybackStatusUpdate,
  } = useContext(MainContext);

  const callback = (downloadProgress) => {
    const progress = (
      (downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite) *
      100
    ).toFixed(0);

    setdownloadProgress(progress);
  };

  /* 
  try {
    await downloadResumable.pauseAsync();
    console.log("Paused download operation, saving for future retrieval");
    AsyncStorage.setItem(
      "pausedDownload",
      JSON.stringify(downloadResumable.savable())
    );
  } catch (e) {
    console.error(e);
  }

  try {
    const { uri } = await downloadResumable.resumeAsync();
    console.log("Finished downloading to ", uri);
  } catch (e) {
    console.error(e);
  }
 */
  //To resume a download across app restarts, assuming the the DownloadResumable.savable() object was stored:
  /*   const downloadSnapshotJson = await AsyncStorage.getItem("pausedDownload");
  const downloadSnapshot = JSON.parse(downloadSnapshotJson);
  const downloadResumable = new FileSystem.DownloadResumable(
    downloadSnapshot.url,
    downloadSnapshot.fileUri,
    downloadSnapshot.options,
    callback,
    downloadSnapshot.resumeData
  ); */

  /*   try {
    const { uri } = await downloadResumable.resumeAsync();
    console.log("Finished downloading to ", uri);
  } catch (e) {
    console.error(e);
  } */
  const [downloadProgress1, setdownloadProgress1] = useState(0);

  function downloadAllSongs(index) {
    if (!index) index = 0;
    var song = allSongs[index];
    if (!song) return;
    FileSystem.getInfoAsync(
      `${FileSystem.documentDirectory}songs/${song.code}.mp3`
    )
      .then((res) => {
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
              console.log(`Finished downloading ${song.code} to `, uri);
              downloadAllSongs(index + 1);
            } catch (e) {
              console.error("e", e.toString());
              makeAFolder("songs").then((res) => {
                if (res) {
                  downloadAllSongs(0);
                }
              });
            }
          };
          func();
        } else {
          console.log(`Song local fetch ${song.code}`);
          downloadAllSongs(index + 1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  /////////////////////////////////////////////////////////////
  const storeData = async (value, storageKey) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const getData = async (storageKey) => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
  /////////////////////////////////////////////////
  const [lyrics, setlyrics] = useState([]);
  function downloadAllLyrics() {
    allSongs.map((item, i) => {
      checkLyricsLocal(item.code);
    });
  }

  async function checkLyricsLocal(songCode) {
    getData(`${songCode}_LYRICS`).then((res) => {
      if (!res) {
        console.log(`Lyrics online fetch ${songCode}`);

        getAllRecordsLevel2("songs", songCode, "more").then((lyricsDoc) => {
          if (lyricsDoc[0] == undefined) return;
          else {
            storeData(lyricsDoc[0].lyrics, `${songCode}_LYRICS`);
          }
        });
      } else {
        console.log(`Lyrics local fetch ${songCode}`);
      }
    });
  }
  useEffect(() => {
    if (allSongs[2]) {
      downloadAllSongs(0);
      downloadAllLyrics();
    }

    return () => {};
  }, [allSongs]);

  return (
    <View
      style={{
        //   height: "100%",
        // width: "100%",
        backgroundColor: "blue",
      }}
    >
      {1 == 2 ? (
        <ScrollView>
          <View style={{ marginTop: 50 }}>
            {allSongs.map((item, i) => {
              return (
                <View
                  style={{
                    backgroundColor: i % 2 == 1 ? "red" : "blue",
                    flexDirection: "row",
                    height: 80,
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                  key={i.toString()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      width: "40%",

                      borderColor: "black",
                    }}
                  >
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      FileSystem.deleteAsync(
                        `file:///var/mobile/Containers/Data/Application/1A3A6ABA-B894-4B8C-9B63-2CAE12443859/Documents/ExponentExperienceData/%2540arnoldadler%252Fadler-tempo-music/songs/A0007.mp3`
                      )
                        .then((res) => {
                          FileSystem.getInfoAsync(
                            `file:///var/mobile/Containers/Data/Application/1A3A6ABA-B894-4B8C-9B63-2CAE12443859/Documents/ExponentExperienceData/%2540arnoldadler%252Fadler-tempo-music/songs/A0007.mp3`
                          )
                            .then((res) => {
                              console.log(res);
                              // returns [] of file names in folder
                            })
                            .catch((e) => {
                              console.log(e);
                            });
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }}
                    style={{
                      paddingHorizontal: 20,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="download" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      //check if song exist
                    }}
                    style={{
                      paddingHorizontal: 20,
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AntDesign name="play" size={24} color="white" />
                  </TouchableOpacity>
                  <Text
                    style={{ color: "white", flex: 1, textAlign: "center" }}
                  >
                    {i == 0 ? downloadProgress1 : null}%
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}
