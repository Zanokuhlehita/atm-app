import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Keyboard,
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
import Header from "./components/Header";
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
import Playlist from "./components/Playlist";

export default function Search({ navigation }) {
  const font_color = "white";

  const icon_size = 20;
  const [footer, setfooter] = useState(true);

  function keyboardOpened() {
    setfooter(false);
  }
  function keyboardClosed() {
    setfooter(true);
  }
  const keyboardCloseListener = useRef();
  const keyboardOpenListener = useRef();
  useEffect(() => {
    keyboardOpenListener.current = Keyboard.addListener(
      "keyboardDidShow",
      keyboardOpened
    );
    keyboardCloseListener.current = Keyboard.addListener(
      "keyboardDidHide",
      keyboardClosed
    );

    return () => {
      keyboardCloseListener.current.remove();
      keyboardOpenListener.current.remove();
    };
  }, []);

  const [searchValue, setsearchValue] = useState("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(29, 29, 29,1)",
        // paddingBottom: 80,
      }}
    >
      <View style={{}}>
        <View style={{}}>
          <Header navigation={navigation} />
        </View>
        <View
          style={{
            marginTop: 15,

            paddingHorizontal: 5,
            marginLeft: 5,

            borderColor: "rgba(255,255,255, 0.1)",
            //   borderBottomWidth: 1,
            paddingBottom: 20,
            paddingRight: 13,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#858585",
              height: 40,
              paddingHorizontal: 15,
              borderRadius: 5,
            }}
          >
            <Feather
              style={{
                paddingRight: 15,
              }}
              name="search"
              size={icon_size}
              color={font_color}
            />
            <TextInput
              value={searchValue}
              onChangeText={(x) => {
                setsearchValue(x);
              }}
              placeholderTextColor="rgba(255,255,255, 0.5)"
              placeholder="Track names, artists, albums..."
              style={{
                // fontWeight: 'bold',
                flex: 1,
                color: font_color,
              }}
            />
            <View
              style={{
                width: 40,
                marginRight: 5,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 20,
                  //  width: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  //  backgroundColor: bg_color_primary,

                  borderRadius: 3,
                }}
              >
                {/*     <Text style={{
                                    color: font_color,
                                }}>Clear</Text> */}
                {/*  <MaterialIcons name="close" size={15} color={'rgba(222, 255, 255,0.2)'} />
                 */}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*            <View style={{
                    height: 1,
                 

                    marginHorizontal: 15,


                    backgroundColor: 'rgba(255,255,255, 0.1)'
                }}></View> */}
      </View>

      <View
        style={{
          paddingHorizontal: 12,
          marginTop: 0,
        }}
      >
        <Playlist searchValue={searchValue} footer={footer} />
      </View>
    </View>
  );
}
