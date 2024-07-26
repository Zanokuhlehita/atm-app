import React, { useState, useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  Dimensions,
  Animated,
  Alert,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Platform } from "react-native";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import logo from "../../assets/images/logos/at_logo.png";
import fb_logo from "../../assets/images/logos/fb_logo2.png";
import google_logo from "../../assets/images/logos/google_logo.png";
import insta_logo from "../../assets/images/logos/insta_logo.png";
import { Hoshi } from "react-native-textinput-effects";
import firebase from "firebase";
import { Input } from "native-base";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
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

import * as Facebook from "expo-facebook";
import ATMAAlert from "../../components/ATMAAlert";
import ATMAButton from '../../components/ATMAButton'
export default function SignIn({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const validateEmail = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  function login() {
    setactivityIndicator(true);
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((cred) => {
          //     console.log('signed in ', cred)
          navigation.navigate("home");
          setactivityIndicator(false);
        })
        .catch((e) => {
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
            subMsg = `No account found with email ${email}, Create account if you don't have one.`;
          }

          seterrorAlert({
            title: "Error",
            msg: msg ? msg : e.toString(),
            subMsg: subMsg,
            onYes: () => {
              seterrorAlert("");
            },
          });
          /*    if (e.toString() == "Error: The email address is badly formatted.") {
            //  alert("Invalid Email Address.");
          
          } */
          console.log(e.toString());

          setactivityIndicator(false);
          return;
          setmessage("Incorrect User Name and Password.");
          setmessage2("Forgot Password ?");
          Alert.alert(
            "Login Failed",
            "Invalid Username and Pasword",
            [
              {
                text: "Ok",
              },
            ],
            { cancelable: true }
          );
          setactivityIndicator(false);
        });
    } catch (e) {
      Alert.alert(
        "Error",
        "App can't connect to internet.",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: true }
      );

      setactivityIndicator(false);
    }
  }

  async function loginFacebook() {}
  function sociallogin() {
    Alert.alert(
      "Social Login",
      "This feature is currently in Beta Mode, And will be completley available in next app version release.",
      [
        {
          text: "Ok",
        },
      ],
      { cancelable: true }
    );
  }

  const { width, height } = Dimensions.get("window");
  const divider_color = "rgba(255,255,225,0.4)";
  const divider_width = 0.5;
  const image_size = 60;
  const icon_color = "#858585";
  const icon_size = 20;
  const [activityIndicator, setactivityIndicator] = useState(false);

  const [loginStatus, setloginStatus] = useState("");

  const [passwordRessetAlert, setpasswordRessetAlert] = useState(false);
  const [errorAlert, seterrorAlert] = useState(false);

  const [tokenLocal, settokenLocal] = useState("");
  async function getToken(params) {
    const res = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    console.log(res);
  }
  async function loginWithFacebook() {
    //ENTER YOUR APP ID
    var token =
      "EAAYGlZANz2bABAFYGxteO8AlKmHRVncuJKLY4mNB9pZAeN8APMAxe4JKZCgNi6w3My02jvjfLyLmTIUrelvGEWZAr2AGFQSYBhCwy7nfGkiA1O2NTnqElFrNCBsVdyyRByU6CsMbXxmVMGgmTPtIGIcBZBABV0dnXhVODMalRgsBKazgUZAxnwNc47CPFb81DSx4gCkrJrATJ3cX8bFJdefhrDHIK5nusZD";
    /*   const response = await fetch(
    `https://graph.facebook.com/me?fields=email,first_name,last_name,name,picture&access_token=${token}`
  );
  console.log(await response.json()); */
    await Facebook.initializeAsync({
      appId: "236956754626886",
    });
    const res = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });

    const type = "success";
    const credential = firebase.auth.FacebookAuthProvider.credential(res.token);
    console.log(res);
    /*  console.log(token); */
    if (type == "success") {
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => {
          navigation.navigate("home");
          setactivityIndicator(false);
        })
        .catch((error) => {
          console.log(error);
          setactivityIndicator(false);
        });
    }
  }
  const isAndroid = () => Platform.OS === "android";
  async function googleSingIn(params) {
    var id =
      "283169871987-moce7oo6t62o3gf4k50lhp327h9egtlh.apps.googleusercontent.com";
    var iosId =
      "283169871987-k1rqmenmvqlj8vce47afrvcin7144mkn.apps.googleusercontent.com";
    const res = await Google.logInAsync({
      clientId: isAndroid() ? id : iosId,
      /*      iosClientId: iosId,
      androidClientId: id,
      iosStandaloneAppClientId: iosId,
      androidStandaloneAppClientId: id, */
    });
    console.log("res", res);
    if (res.type === "success") {
      // Then you can use the Google REST API
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${res.accessToken}` },
        }
      );
      console.log("userInfoResponse", userInfoResponse);
    }
  }
  function gSign(params) {
    var idToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjExMmU0YjUyYWI4MzMwMTdkMzg1Y2UwZDBiNGM2MDU4N2VkMjU4NDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyODMxNjk4NzE5ODctazFycW1lbm12cWxqOHZjZTQ3YWZydmNpbjcxNDRta24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyODMxNjk4NzE5ODctazFycW1lbm12cWxqOHZjZTQ3YWZydmNpbjcxNDRta24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTEzMjE2MzE3MTMzMTcwOTcxMTIiLCJlbWFpbCI6ImFybm9sZGd3YXRpZHpvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZklZR19GZHpNRlFmb1hBTXhHQmpZZyIsIm5vbmNlIjoibUpmNHczZWdJcWF6N3hScmpBdTVWcTFoWS1NMXg4VFY0UU8zMldwYzFtOCIsIm5hbWUiOiJBcm5vbGQgR3dhdGlkem8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2kzeTd0NlBQLTVtaEpCMWJFMld1SjNNUGltNmRyb1RoVzR5RFNaQkE9czk2LWMiLCJnaXZlbl9uYW1lIjoiQXJub2xkIiwiZmFtaWx5X25hbWUiOiJHd2F0aWR6byIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjI0NzI3ODE5LCJleHAiOjE2MjQ3MzE0MTl9.Uz8L597V_qVWl5xreCYt9dpyH4B8dn4aK0QFEOTO23xtwPKf3qX1ZqOErucctEim5P7ulv3_iDSRRdZiPo8bATYU0JAB1UHo4uetlQD5Xu1YjAjlEuEx8djRETcJE7XeGcOBpazXAC1QErqlkm3aGU_xo36ap6Xok5UTZ8N9v4vXQgaY3xJnBy1Bmk08ffwiOg0rrnbWvYgt0Tq1RTiCu-zUo2f8ebZfhnqrq9ksTGsLL3Oym2fa0i0MjYp7qlD48bwkVzbHAIHyvd6JGwU3f_IdrjybqRiPGGpcfzpO389pAmEKurfZpBLyv_JwymDmOiO-uLFMWi3bCxVDhjW1ig";
    var token =
      "ya29.a0AfH6SMAgqqIn2y-7dyXRHjeDobn5WrvQa7jPdisfRUxqgMie_B3SpBO-FCUdAw60YYG2hqgHSCYBdBkRKz4qHGq64fPAmMh6_e-2i-qdyezMgKufLSXPVpOOtHhNvK8NZ83hqVCZc4ieeFrB707GZngVCW_M";
    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      token
    );
    console.log("creds", credential);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        navigation.navigate("home");
        setactivityIndicator(false);
      })
      .catch((error) => {
        console.log(error);
        setactivityIndicator(false);
      });
  }
const type = 'signin'

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{}}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#181B1F",
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 40,
        }}
      >
        <ATMAAlert alert={passwordRessetAlert} />
        <ATMAAlert alert={errorAlert} />
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
          <View
            style={{
              height: 150,
              flexDirection: "row",
              //  justifyContent: 'flex-start',
              paddingHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                marginLeft: -25,
                marginTop: 70,
                marginRight: 5,
                height: image_size,
                width: image_size,
              }}
              source={logo}
            ></Image>
          </View>
          {/*    <View
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 30,

                fontWeight: "bold",
              }}
            >
              {type == "signin" ? "Welcome Back" : "Lets Get Started"}
              <Text style={{}}></Text>
            </Text>
          </View> */}

          <View style={{ marginTop: 15 }}>
            <Text style={{ color: "red", marginBottom: 2 }}>{loginStatus}</Text>
          </View>

          <ATMAButton
            title="Sign In With Facebook"
            color="rgba( 60, 83, 154, 1)"
            fontStyle={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            icon={<FontAwesome name="facebook" size={24} color="white" />}
          />

          <ATMAButton
            title="Sign In With Google"
            onPress={() => {
              googleSingIn();
            }}
            color="rgba( 60, 83, 154, 1)"
            fontStyle={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
            icon={
              <FontAwesome
                name="google"
                size={24}
                color="rgba(220, 60, 42, 1)"
              />
            }
          />
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{ flex: 1, height: 1, backgroundColor: "#9D9D9F" }}
            ></View>
            <Text style={{ color: "white", paddingHorizontal: 10 }}>or</Text>
            <View
              style={{ flex: 1, height: 1, backgroundColor: "#9D9D9F" }}
            ></View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              height: 100,
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                alignItems: "center",
                height: "50%",
              }}
            >
              <MaterialCommunityIcons
                name="email"
                size={icon_size}
                color={icon_color}
              />
              <TextInput
                placeholderTextColor="'rgba(0,0,0, 1)'"
                placeholder="Email"
                autoCapitalize="none"
                style={{
                  paddingHorizontal: 10,
                  flex: 1,
                }}
                onChangeText={(email) => {
                  setemail(email);
                }}
              ></TextInput>
            </View>

            <View
              style={{
                height: 1,
                width: "100%",

                backgroundColor: "rgba(0,0,0, 0.2)",
              }}
            ></View>
       
       
       
       
       
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 10,
                alignItems: "center",
                height: "50%",
                width: "100%",
              }}
            >
              <MaterialIcons name="lock" size={icon_size} color={icon_color} />
              <TextInput
                secureTextEntry={true}
                placeholderTextColor="'rgba(0,0,0, 1)'"
                placeholder="Password"
                style={{
                  paddingHorizontal: 10,
                  flex: 1,
                }}
                onChangeText={(password) => {
                  setpassword(password);
                }}
              ></TextInput>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setpasswordRessetAlert({
                msg: "Forgot your password?",
                subMsg:
                  "To resset password a link will be sent to your email with your new password",
                inputField: {
                  title: "Type Email Address",
                  defaultValue: email,
                  autoCapitalize: false,
                },
                onYes: (inputValue) => {
                  firebase
                    .auth()
                    .sendPasswordResetEmail(inputValue)
                    .then(() => {
                      setloginStatus(
                        `Password Resset Email Sent to: ${inputValue}`
                      );
                      setpasswordRessetAlert("");
                    })
                    .catch((error) => {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      var msg = "";
                      var subMsg = "";

                      if (
                        errorMessage == "The email address is badly formatted."
                      ) {
                        msg = "Invalid Email Address";
                        subMsg =
                          "Make sure yo have typed your email address correctly.";
                        Alert.alert(msg, subMsg);
                        return;
                      }
                      if (
                        errorMessage ==
                        "There is no user record corresponding to this identifier. The user may have been deleted."
                      ) {
                        msg = "Account Not Found";
                        subMsg = `No account found with email ${inputValue}, Create a account if you don't have one.`;
                        Alert.alert(msg, subMsg);
                        return;
                      }
                      Alert.alert(errorMessage);
                    });
                },
                onNo: () => {
                  setpasswordRessetAlert("");
                },
                onYesTitle: "Email Password",
                onNoTitle: "Cancel",
              });
            }}
            style={{ marginTop: 10 }}
          >
            <Text
              style={{
                color: "white",

                fontSize: 15,
                textDecorationLine: "underline",
              }}
            >
              Forgot Password ?
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={login}
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 50,
                  width: "100%",

                  backgroundColor: "#FDB81E",
                  justifyContent: "center",
                  borderRadius: 10,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                gSign(); //navigation.navigate("register");
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 50,
                  width: "100%",

                  backgroundColor: "#00F3F4",
                  justifyContent: "center",
                  borderRadius: 10,
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Create a new account
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  textinput: {
    borderBottomWidth: 2,
    color: "rgba(255,255,255, 0.7)",

    borderColor: "white",
    margin: 2,
    borderRadius: 2,
    height: 40,
  },
  image: {
    height: 50,
    width: 35,
    flexWrap: "wrap",
    flexDirection: "row",
    margin: 20,
    padding: 0,
    resizeMode: "contain",
  },
});
