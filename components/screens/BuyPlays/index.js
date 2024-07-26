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

import { Portal } from "react-native-portalize";
import Slider from "@react-native-community/slider";
import HeaderSettings from "../../components/HeaderSettings";
import ATMAButton from "../../components/ATMAButton";
import { primary_color, secondary_color } from "../../theme/colors";
import Header from "../../components/Header";
import WebView from "react-native-webview";
import { buyPlays_uri } from "../../app-config";

export default function BuyPlays({navigation}) {
    var rates = [
      { key: "1", value: 10 },
      { key: "2", value: 12 },
      { key: "3", value: 13 },
      { key: "4", value: 14 },
      { key: "5", value: 15 },
      { key: "6", value: 15.5 },
      { key: "7", value: 16 },
      { key: "8", value: 16.5 },
      { key: "9", value: 17 },
      { key: "10", value: 17.5 },
      { key: "11", value: 18 },
      { key: "12", value: 18.5 },
      { key: "13", value: 19 },
      { key: "14", value: 19.5 },
      { key: "15", value: 20 },
      { key: "16", value: 20.5 },
      { key: "17", value: 21 },
      { key: "18", value: 21.5 },
      { key: "19", value: 22 },
      { key: "20", value: 22.5 },
    ];
  const [plays, setplays] = useState(0);
  const [amount, setamount] = useState(5)
  useEffect(() => {
        const obj = rates.find((item) => item.key == amount);
        var plays = amount * obj.value;

        setplays(plays);
    return () => {
      
    }
  }, [])
    const [activityIndicator, setactivityIndicator] = useState(true);
const webview = useRef();
  return (
    <Portal>
      <View
        style={{
          backgroundColor: "#201F24",
          flex: 1,
          height: "100%",
        }}
      >
        <Header
          title="Buy Plays"
          backAction={() => {
            webview.current.postMessage("Message From React Native App to Web");
            //navigation.goBack();
          }}
          back
        />
        {activityIndicator ? (
          <View
            style={{
              //backgroundColor: 'red',
              marginTop: 80,
              position: "absolute",
              zIndex: 10,
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator
              animating={activityIndicator}
              color="rgba(255,255,255, 0.8)"
              size={50}
              style={{
                top: -60,
              }}
            />
          </View>
        ) : null}

        <WebView
          ref={(ref) => {
            webview.current = ref;
          }}
          onMessage={(event) => {
            const { data } = event.nativeEvent;
            alert("a message in console");
            console.log("object", data);
          }}
          style={{
            backgroundColor: "#201F24",
            width: "100%",
            marginTop: 10,
          }}
          onLoadEnd={() => {
            setactivityIndicator(false);
          }}
          source={{
            uri: buyPlays_uri,
          }}
        ></WebView>

        {/*   <View style={{
                backgroundColor: '#201F24',
                height: '40%',
                width: '100%',
                flexDirection: 'row',
                paddingRight: 20,
                marginTop: 18,

            }}>

              
                <MainView />
            </View>
            <View style={{
                backgroundColor: '#2A2A30',
                height: '70%',
                width: '100%',
                flexDirection: 'row',
                paddingRight: 20,
                paddingBottom: '32%',

            }}>
            

                <InfoView song={song} />
            </View>
             <MiniPlayer navigation={navigation} /> */}
      </View>
    </Portal>
  );
}
