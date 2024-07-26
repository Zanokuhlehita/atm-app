import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  createRef,
} from "react";
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  PanResponder,
} from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { opacity } from "react-native-redash";
import { DataContext } from "../../../contexts/DataContext";
import { MainContext } from "../../../contexts/MainContext";
import { SlotsContext } from "../../../contexts/SlotsContext";

export default function Stories({ song, id }) {
  const {
    isPlaying,
    setisPlaying,
    isMinimized,
    now_playing_playlist,
    skip_to,
    soundAll_ref,
    test,
    settest,
    now_playing_ref,
    play_status,
    now_playing_id,
    stories_on,
  } = useContext(MainContext);

  const {
    bar_width_ref,
    bar_width_ref_1,
    bar_width_ref_2,
    bar_width_ref_3,
    bar_width_ref_4,
    bar_width_ref_5,
    bar_width_ref_6,
    bar_width_ref_7,
  } = useContext(SlotsContext);

  const { all_songs } = useContext(DataContext);

  const stories_import = all_songs[id].story_line_link;
  const [stories, setStories] = useState([]);
  const [story_color, setstory_color] = useState([]);
  const stories_ref = useRef([]);

  /*     useEffect(() => {
    
            song.stories = stories_import.stories
            try {
                setthe_story(song.stories[current_story_index.current].line)
                setstory_color(song.stories[current_story_index.current].color)
            } catch (error) {
                console.log('cant set stoyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy', 'current_story_index.current', current_story_index.current, error)
            }
            return () => {
    
            }
        }, []) */

  const listener1 = useRef();
  const listener2 = useRef();
  const [update, setupdate] = useState();
  useEffect(() => {
    listener1.current = EventRegister.addEventListener("update_stories", () => {
      translateX.setValue(0);
      translate_container.setValue(0);
      current_story_index.current = 0;
      setTimeout(() => {
        setupdate(Math.random());
      }, 0);
      setTimeout(() => {
        setupdate(Math.random());
      }, 500);
      setTimeout(() => {
        setupdate(Math.random());
      }, 1000);
      setTimeout(() => {
        setupdate(Math.random());
      }, 1500);
      setTimeout(() => {
        setupdate(Math.random());
      }, 2500);
      setTimeout(() => {
        setupdate(Math.random());
      }, 5000);
    });

    listener2.current = EventRegister.addEventListener("nun", (pos) => {});
    return () => {
      EventRegister.removeEventListener(listener1.current);
      EventRegister.removeEventListener(listener2.current);
    };
  }, []);

  const { width, height } = Dimensions.get("window");

  const [el_width, setel_width] = useState(0);
  const current_story_index = useRef(0);
  const timeBarHeight = (e, i) => {
    setel_width(e.width);
  };
  function start() {
    if (current_story_index.current >= song.stories.length - 1)
      current_story_index.current = -1;

    Animated.timing(translateX, {
      toValue: el_width,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      current_story_index.current = current_story_index.current + 1;
      console.log("story index", current_story_index.current);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
      Animated.timing(translate_container, {
        toValue:
          el_width * current_story_index.current +
          4 * current_story_index.current,
        duration: 100,
        useNativeDriver: true,
      }).start(({ finished }) => {
        // if (finished) start()
        setupdate(Math.random());
      });
    });
  }
  const translateX = useRef(new Animated.Value(-100)).current;
  const translate_container = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        marginTop: "25%",
        height: "65%",
        width: "90%",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {now_playing_ref.current == id ? (
        <View
          style={
            {
              // alignContent: 'center',
              // justifyContent: 'center'
            }
          }
        >
          {/* base Timer */}

          <View
            style={{
              height: 1.5,
              marginTop: 15,
              marginHorizontal: 0,
              paddingHorizontal: 10,
              width: "100%",
              position: "absolute",
              zIndex: 1,
              flexDirection: "row",
              //backgroundColor: 'yellow'
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
                flexDirection: "row",
                // backgroundColor: 'green'
              }}
            >
              {song.stories.map((stories, i) => {
                return (
                  <View
                    onLayout={(event) => {
                      timeBarHeight(event.nativeEvent.layout);
                    }}
                    key={i.toString()}
                    style={{
                      backgroundColor: "grey",
                      height: 1.5,
                      flex: 0.5,

                      zIndex: 1,
                      overflow: "hidden",
                      opacity: 0.8,
                      marginLeft: i == 0 ? 0 : 4,
                    }}
                  ></View>
                );
              })}

              <Animated.View
                //  ref={view => setx(view)}

                style={{
                  backgroundColor: "rgba(220,20,20,1)",
                  position: "absolute",
                  height: 1.5,
                  width: el_width,
                  // left: -4,
                  transform: [{ translateX: translate_container }],
                  zIndex: 1,
                  overflow: "hidden",
                }}
              >
                <Animated.View
                  style={{
                    backgroundColor: "rgba(239,239,239,0.8)",
                    position: "absolute",
                    height: 1.5,
                    width: el_width,
                    transform: [{ translateX }],
                    zIndex: 1,
                  }}
                ></Animated.View>
              </Animated.View>
            </View>
          </View>
          {/* base timer end */}

          <TouchableOpacity
            style={
              {
                // backgroundColor: 'green'
              }
            }
            onPress={() => {
              start();
              setupdate(Math.random());
            }}
          >
            <View
              style={{
                justifyContent: "center",
                // alignItems: 'center',
                height: height * 0.65,
                width: width,
                marginLeft: "-9%",
                backgroundColor:
                  current_story_index.current >= 0
                    ? song.stories[current_story_index.current].color
                    : song.stories[song.stories.length - 1].color,
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",

                  alignSelf: "center",
                  // backgroundColor: 'yellow',
                  width: "70%",
                }}
              >
                {current_story_index.current >= 0
                  ? song.stories[current_story_index.current].line
                  : song.stories[song.stories.length - 1].line}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 1,

            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            animating={true}
            color="rgb(51, 51, 51)"
            size={50}
          />
        </View>
      )}
    </View>
  );
}
