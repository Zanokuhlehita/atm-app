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
import ATMATextInput from "../../../components/ATMATextInput";
import { MainContext } from "../../../contexts/MainContext";

export default function DataFields({
  name,
  setname,
  phone,
  setphone,
  email,
  setemail,
  setchanges,
}) {
  const { user_context } = useContext(MainContext);

  return (
    <View style={{}}>
      <ATMATextInput
        label="User Name"
        value={`${user_context.userName}`}
        disabled
      />

      <ATMATextInput
        disabled={true}
        label="Phone Number"
        value={phone}
        onChangeText={(e) => {
          setphone(e);
          setchanges(true);
        }}
        keyboardType="phone-pad"

        // placeholder= 'eg. (+27) 740726374'
      />
      <ATMATextInput label="Email" value={user_context.email} disabled={true} />
    </View>
  );
}
