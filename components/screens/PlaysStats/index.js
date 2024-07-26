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
import HeaderSettings from "../../components/HeaderSettings";
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
import * as ImagePicker from "expo-image-picker";
import { secondary_color } from "../../theme/colors";
import ATMAButton from "../../components/ATMAButton";
import base64 from "react-native-base64";
import song from "../../assets/songs/A004_under_pressure.mp3";
import * as FileSystem from "expo-file-system";
import { MainContext } from "../../contexts/MainContext";
import { getData } from "../../plugins/asyncLocalStorage";

export default function PlaysStats({ navigation }) {
  const { plays,user_context, registerPlay } = useContext(MainContext);
  const [dailyFreePlays, setdailyFreePlays] = useState(0);
  const [promotionalPlays, setpromoPlays] = useState(0);
  const [premiumplays, setpremiumplays] = useState(0);
  const availablePlays = [
    {
      name: "Premium Plays",
      value: premiumplays,
      help: "These are the plays ou bought using cash",
    },
    {
      name: "Daily Free Plays",
      value: dailyFreePlays,
      help: "These are daily free plays awarded to all user. They are renewed everyday and the number varies depending location",
    },
    {
      name: "Promotional Plays",
      value: promotionalPlays,
      help: "These are the plays you get through promotions",
    },
  ];

  const playsStats = [
    {
      name: "Total Plays Today",
      value: 5,
      help: "These are the total plays you made today",
    },
    {
      name: "Total Plays this week",
      value: 31,
      help: "These are the total plays you made today",
    },
    {
      name: "Total Plays this month",
      value: 120,
      help: "These are the total plays you made today",
    },
  ];
  async function getPlayStats() {
    //var plays = await getData("availablePlays");

    setdailyFreePlays(user_context.dailyFreePlays);
    setpromoPlays(user_context.promotionalPlays);
    setpremiumplays(user_context.premiumPlays);
  }
  useEffect(() => {
    getPlayStats();

    return () => {};
  }, [user_context]);
  return (
    <View
      style={{
        backgroundColor: "#201F24",

        flex: 1,
      }}
    >
      {/*       <ATMAAlert alert={profileAlert} /> */}
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ paddingHorizontal: 25 }}>
          <HeaderSettings title="Plays Stats" navigation={navigation} backAction={()=>{navigation.goBack()}}/>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 25,
          }}
        >
          <View style={{ marginTop: 15 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "white",
                marginBottom: 10,
              }}
            >
              Available Plays ({dailyFreePlays + promotionalPlays + premiumplays})
            </Text>
            <View>
              {availablePlays.map((item, i) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",

                      marginBottom: 5,
                    }}
                    key={i.toString()}
                  >
                    <Text style={{ color: "white", fontSize: 18, flex: 1 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        textAlign: "center",
                        fontWeight: "bold",

                        width: 60,
                      }}
                    >
                      {item.value}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        console.log(user_context);

                      }}
                      style={{
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="help-circle-outline"
                        size={18}
                        color={"#0CB3ED"}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                marginBottom: 5,
              }}
            >
              Plays Stats
            </Text>
            <View>
              {playsStats.map((item, i) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",

                      marginBottom: 5,
                    }}
                    key={i.toString()}
                  >
                    <Text style={{ color: "white", fontSize: 18, flex: 1 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        textAlign: "center",
                        fontWeight: "bold",

                        width: 60,
                      }}
                    >
                      {item.value}
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="help-circle-outline"
                        size={18}
                        color={"#0CB3ED"}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={{ paddingVertical: 20, marginTop: 2 }}>
            <ATMAButton
              style={{ marginBottom: 15 }}
              text="Buy Plays"
              color="#FCB91C"
              textColor="black"
              fontStyle={{
                fontWeight: "bold",
                textTransform: "uppercase",
                fontSize: 18,
              }}
              onPress={() => {}}
            ></ATMAButton>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
