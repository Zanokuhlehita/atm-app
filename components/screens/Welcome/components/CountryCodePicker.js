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

import  CountryPicker  from "react-native-country-codes-picker";

export default function CountryCodePicker() {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  return (
    <View style={{ height: 150 }}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          width: "80%",
          height: 60,
          backgroundColor: "black",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
          }}
        >
          {countryCode}
        </Text>
      </TouchableOpacity>
      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
}
