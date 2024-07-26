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
  ImageBackground,
  Dimensions,
} from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Password from "./screens/Password";
// import SignIn from "./screens/SignIn";
import UserInfo from "./screens/UserInfo";
// import SMSCode from "./screens/SMSCode";

export default function Welcome() {
  // const Stack = createStackNavigator();

  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="signin">
      {/* <Stack.Screen
        name="signin"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="password"
        component={Password}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="userinfo"
        component={UserInfo}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
          name="smscode"
          component={SMSCode}
          options={{
            headerShown: false,
          }}
        /> */}
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
