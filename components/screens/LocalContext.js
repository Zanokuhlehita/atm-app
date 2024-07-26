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

export default function LocalContext() {
  const { screenHeight, screenWidth } = useContext(MainContext);
   const { width, height } = Dimensions.get("window");
    useEffect(() => {
        screenHeight.current = height
        screenWidth.current = width
      return () => {};
    }, []);


  return null;
}
