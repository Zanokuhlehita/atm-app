import React, { useContext, useEffect, useRef } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
} from "react-native";
import { MainContext } from "../../../../contexts/MainContext";
import { EventRegister } from "react-native-event-listeners";

export default function slides({ title, data, index, data_name }) {
  const image_size = 105;
  const { width, height } = Dimensions.get("window");

  const {
    allow_mini_scroll,
    library_swiper,
    song_init_render,
    soundAll_ref,
    snack_1_active,
    snack_2_active,
    snack_3_active,
  } = useContext(MainContext);
  const sliderY = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const sliderPan = useRef(
    PanResponder.create({
      //onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        /*  sliderY.setOffset({
                 x: sliderY.x._value,
 
                 y: sliderY.y._value
 
             }) */
        console.log("yipi");
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: sliderY.x,
            dy: sliderY.y,
          },
        ],
        { useNativeDriver: false }
      ),
      // (e, { dy }) => {
      //sliderPan.x.setValue(gesture.dx)
      //sliderPan.setValue({ y: 550 })
      // console.log('g_dy', dy)
      // }

      onPanResponderRelease: () => {
        const x = sliderY.y.__getValue();
        console.log("x", x);
        if (x < -100) {
          sliderY.y.setValue(-190);
        } else {
          sliderY.y.setValue(0);
        }
        //sliderY.flattenOffset()

        /*  Animated.spring(sliderY, {
                 toValue: { x: 0, y: 570 },
                 useNativeDriver: true
             }).start() */
      },
    })
  ).current;
  async function unloadSound() {
    if (soundAll_ref.current) await soundAll_ref.current.unloadAsync();
  }

  return (
    <View
      style={{
        height: 200,
        /*    position: 'absolute',
               zIndex: 50, */
        marginVertical: 3,
      }}
    >
      <TouchableWithoutFeedback
        onPressIn={() => {
          library_swiper.current.setNativeProps({ scrollEnabled: true });
        }}
      >
        <View
          style={{
            paddingVertical: 10,
            paddingLeft: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPressIn={() => {
          if (data.length < 4)
            library_swiper.current.setNativeProps({ scrollEnabled: true });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: width,

            //  backgroundColor: 'red',
            //  height: 20
          }}
        >
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              //scroll end solution
              /* let paddingToBottom = 0;
                            paddingToBottom += e.nativeEvent.layoutMeasurement.width;
                            if (e.nativeEvent.contentOffset.x >= e.nativeEvent.contentSize.width - paddingToBottom) {
                                library_swiper.current.setNativeProps({ scrollEnabled: true })
                            }
     */
            }}
            contentContainerStyle={{
              height: 150,
              paddingRight: 2,
              paddingLeft: 5,
            }}
          >
            {data.map((item, index) => (
              <View
                key={index.toString()}
                style={{
                  height: 150,
                }}
              >
                <TouchableOpacity
                  onPressIn={() => {
                    if (data.length > 3)
                      library_swiper.current.setNativeProps({
                        scrollEnabled: false,
                      });
                  }}
                  onPress={() => {
                    if (data_name == "favorites") {
                      if (!snack_1_active.current) {
                        EventRegister.emit("snack_1", `Empty list.`);
                      } else {
                        if (!snack_2_active.current) {
                          EventRegister.emit("snack_2", `Empty list.`);
                        } else {
                          if (!snack_3_active.current) {
                            EventRegister.emit("snack_3", `Empty list.`);
                          }
                        }
                      }
                      return;
                    }
                    unloadSound();
                    EventRegister.emit("minimize_player", false);
                    EventRegister.emit("player_splash_screen", true);
                    song_init_render.current = index;
                    EventRegister.emit("slideTo", 0);

                    setTimeout(() => {
                      EventRegister.emit("songs", "reset");

                      EventRegister.emit("songs", data_name);

                      //  EventRegister.emit('slideTo', index)

                      //console.log(song_init_render.current)
                      console.log(data[index]);
                    }, 0);
                  }}
                >
                  <View
                    style={{
                      //backgroundColor: "red",
                      height: image_size,
                      width: image_size,
                      margin: 5,
                      borderRadius: 10,
                      overflow: "hidden",
                      borderWidth: 2,
                      borderColor: "rgba(0,0,0,0.2)",
                    }}
                  >
                    <Image
                      style={{
                        borderRadius: 10,
                        height: image_size,
                        width: image_size,
                      }}
                      source={item.cover_image}
                    ></Image>
                  </View>

                  <Text
                    style={{
                      // position: 'relative',
                      width: image_size,
                      paddingHorizontal: 10,
                      // marginTop: 5,
                      color: "rgba(239,239,239,1)",
                      fontWeight: "600",
                    }}
                  >
                    {item.song_name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  explorecoverarts: {},
});
