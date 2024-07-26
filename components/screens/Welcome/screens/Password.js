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
import Header from "../../../components/Header";

import ATMAButton from "../../../components/ATMAButton";
import { secondary_color } from "../../../theme/colors";
import Background from "../components/Background";
import TextFieldForm from "../components/TextFieldForm";
import firebase from "firebase";
// import { MainContext } from "../../../contexts/MainContext";


export default function Password({ navigation, route }) {
  const { signInMethod, emailPhone, isNewUser } = route.params;
  const { playsSettings, mainNavigation_context_ref } = useState([]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const shakeSpeed = 50;
  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: shakeSpeed,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: shakeSpeed,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: shakeSpeed,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: shakeSpeed,
        useNativeDriver: true,
      }),
    ]).start();
  };
  useEffect(() => {
    setloadingIndicatorLocal(false)
    return () => {

    }
  }, [])
  const [loadingIndicatorLocal, setloadingIndicatorLocal] = useState('')
  function completeSignUp() {

    setloadingIndicatorLocal(true)
    if (password.length < 8) {
      startShake();
      seterror("Password must be 8 characters or more");
    }



    if (isNewUser) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailPhone, password)
        .then((cred) => {
          console.log("replyyyyyyyy", cred.additionalUserInfo.isNewUser);

          if (cred.additionalUserInfo.isNewUser) {
            console.log("did it");
            firebase
              .firestore()
              .collection("users")
              .doc(cred.user.uid)
              .set({
                userName: cred.user.email,
                firstName: "",
                lastName: "",
                email: "",
                profileImage: "",
                password: password,
                accLevel: 1,
                accType: "normal",
                subscriptions: "Free",
                accActive: true,
                premiumPlays: 0,
                promotionalPlays: 0,
                dailyFreePlays: playsSettings.dailyFreePlaysLimit || 15,
                dailyFreePlaysLastUpdate: new Date(),
                dailyFreePlaysLimit: "default",
                gender: "",
                lastPremiumAt: "",
                likes: [],
                lastSeenAt: new Date(),
                createdAt: new Date(),
                verifiedAt: new Date(),
              })
              .then(() => {
                setloadingIndicatorLocal(false);
              })
              .catch((e) => {
                console.log("err updating user");
                setloadingIndicatorLocal(false);
              });
          }
        })
        .catch((e) => {
          handleError(e)
        });
    } else {

      firebase
        .auth()
        .signInWithEmailAndPassword(emailPhone, password)
        .then((cred) => {

        })
        .catch((e) => {

          handleError(e);
        });



    }

  }

  function handleError(e) {
    setloadingIndicatorLocal(false);
    var msg = "";
    var subMsg = "";

    if (e.toString() == "Error: The email address is badly formatted.") {
      msg = "Invalid Email Address";
      subMsg = "Make sure yo have typed your email address correctly.";
    }
    if (
      e.toString() ==
      "Error: The password is invalid or the user does not have a password."
    ) {
      msg = "Invalid Password";
      subMsg = "Make sure you have typed in your password.";
    }
    if (
      e.toString() ==
      "Error: There is no user record corresponding to this identifier. The user may have been deleted."
    ) {
      msg = "Account Not Found";
      subMsg = `No account found with email ${emailPhone}, Create account if you don't have one.`;
    }
    startShake();
    seterror(msg);
  }
  const [activityIndicator, setactivityIndicator] = useState(false);
  const [error, seterror] = useState("");
  const [password, setpassword] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <Background />
      <Header
        title=" "
        backAction={() => {
          navigation.goBack();
        }}
      />
      <Animated.View
        style={{ flex: 1, transform: [{ translateX: shakeAnimation }] }}
      >
        <ScrollView
          scrollEnabled={false}
          style={{
            flex: 1,

            height: "100%",
            width: "100%",
            zIndex: 40,
          }}
        >
          {/*           <ATMAAlert alert={passwordRessetAlert} />
          <ATMAAlert alert={errorAlert} /> */}
          {activityIndicator ? (
            <View
              style={{
                position: "absolute",
                zIndex: 10,
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba( 0,0,0, 0.5)",
              }}
            >
              <ActivityIndicator animating={true} color="#525252" size={50} />
            </View>
          ) : null}

          <View
            style={{
              paddingHorizontal: 30,
            }}
          >
            <View style={{ marginTop: 35, marginBottom: 20 }}>
              <View style={{}}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 27,
                    color: "white",
                    lineHeight: 32,
                  }}
                >
                  {isNewUser ? 'Create a password' : 'Enter your password'}
                </Text>
              </View>
            </View>
            {error ? (
              <View
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                  flexDirection: "row",
                }}
              >
                <Text style={{ color: "red", marginRight: 5 }}>{"\u25CF"}</Text>
                <Text style={{ color: "red", marginBottom: 2 }}>{error}</Text>
              </View>
            ) : null}

            <View
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                marginTop: 12,
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  alignItems: "center",
                  height: 50,
                }}
              >
                <TextInput
                  placeholderTextColor="'rgba(0,0,0, 1)'"
                  placeholder=""
                  autoCapitalize="none"
                  autoFocus
                  style={{
                    paddingHorizontal: 10,
                    flex: 1,
                  }}
                  value={password}
                  onChangeText={(v) => {
                    setpassword(v);
                    seterror(false);
                  }}
                ></TextInput>
              </View>
            </View>
            <ATMAButton
              loading={loadingIndicatorLocal}
              onPress={completeSignUp}
              title="Continue"
              color={secondary_color}
              fontStyle={{
                fontWeight: "bold",
                //textTransform: "uppercase",
                color: "black",
              }}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
