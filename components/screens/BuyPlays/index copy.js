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

export default function BuyPlays() {
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
  return (
    <Portal>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgb(29,29,29)",
          paddingHorizontal: 30,
        }}
      >
        <ScrollView>
          <HeaderSettings title="Buy Plays" />
          <View style={{}}>
            <View style={{ marginTop: 50, marginBottom: 50 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Move slider to change amount.
              </Text>
            </View>
            <View
            
              style={{ flexDirection: "row", marginBottom: 20, marginTop: 50 }}
            >
              <View
                style={{
                  borderRightWidth: 1,
                  borderColor: "white",
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 40,
                  }}
                >
                  $ {amount}
                </Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Amount
                </Text>
              </View>
              <View
                style={{
                  //   borderRightWidth: 1,
                  borderColor: "white",
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 40,
                  }}
                >
                  {plays}
                </Text>
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Plays
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Slider
              step={1}
              //tapToSeek
              value={amount}
              onValueChange={(amt) => {
                setamount(amt.toFixed(2));

                const obj = rates.find((item) => item.key == amt);
                var plays = amt * obj.value;

                setplays(plays);
              }}
              style={{ width: 250, marginTop: 10 }}
              minimumValue={1}
              maximumValue={20}
              minimumTrackTintColor="white"
              maximumTrackTintColor="white"
            />
          </View>
        </ScrollView>
        <ATMAButton
          title="Checkout"
          color={secondary_color}
          style={{ marginBottom: 30 }}
          fontStyle={{ fontWeight: "bold" }}
        />
      </View>
    </Portal>
  );
}
