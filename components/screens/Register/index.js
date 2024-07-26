import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import logo from "../../assets/images/logos/at_logo.png";
import fb_logo from "../../assets/images/logos/fb_logo2.png";
import google_logo from "../../assets/images/logos/google_logo.png";
import insta_logo from "../../assets/images/logos/insta_logo.png";
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

import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

import { EventRegister } from "react-native-event-listeners";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Use } from "react-native-svg";
import { DataContext } from "../../contexts/DataContext";
import { MainContext } from "../../contexts/MainContext";
import Header from "./components/Header";
import { Avatar_PLC, Avatar } from "../../plugins/assets";
const auth = firebase.auth();
const db = firebase.firestore();

export default function Register({ navigation }) {
  const { user } = useContext(MainContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [retypePassword, setretypePassword] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [profieImageLink, setprofieImageLink] = useState("");
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    //  console.log(result);
    setprofileImage(result.uri);
  };

  async function uploadImage(uri, imagName) {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("displayImages/" + imagName);
    // It takes firebase lists 10 seconds to object…
    async function gt() {
      newLink_ref.current = await ref.getDownloadURL();
      //updateField('users', firebase.auth().currentUser.uid, { profilePhotoUrl: newLink_ref.current })
      setprofieImageLink(newLink_ref.current);
    }

    gt().then((e) => {
      alert("no timer");
    });
    return ref.put(blob);
  }

  function Register() {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          var user = firebase.auth().currentUser;
          firebase.firestore().collection("users").doc(cred.user.uid).set({
            firstName: first_name,
            lastName: last_name,
            email: email,
            password: password,
            profileImage: profieImageLink,
            accLevel: 1,
            accType: "normal",
            subscriptions: "Free",
            accActive: true,
          });

          user
            .updateProfile({
              displayName: `${first_name}`,
              displayImage: profieImageLink,
            })
            .then(() => {
              navigation.navigate("home");
              setactivity_indicator(false);
            })
            .catch((e) => {
              console.log("err updating user");
            });
        })
        .catch((e) => {
          console.log("Firebase login error", e);
          Alert.alert(
            "Error Registering User",
            "1) This email may be in use by another account.\n2)Check your internet connection.",
            [
              {
                text: "Ok",
              },
            ],
            { cancelable: true }
          );
          setactivity_indicator(false);

          return;
        });
    } catch (e) {
      console.log(e.toString());
    }

    return () => {};
  }
  async function Validation() {
    setactivity_indicator(true);
    const email_valid = validateEmail(email);
    if (!email_valid) {
      Alert.alert(
        "Invalid email address",
        "",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: true }
      );
      setactivity_indicator(false);
      return;
    }
    if (password.length <= 7) {
      Alert.alert(
        "Password must have atleast 8 characters",
        "",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: true }
      );
      setactivity_indicator(false);

      return;
    }
    if (!first_name) {
      Alert.alert(
        "First name Required",
        "",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: true }
      );
      setactivity_indicator(false);

      return;
    }
    if (!last_name) {
      Alert.alert(
        "Last name Required",
        "",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: true }
      );
      setactivity_indicator(false);

      return;
    }
    if (password != retypePassword) {
      Alert.alert(
        "Passwords not matching. Retype Passwords",
        "",
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: true }
      );
      setpassword("");
      setretypePassword("");
      setactivity_indicator(false);

      return;
    }

    if (profileImage) {
      uploadImage(profileImage, `${first_name}_${last_name}`)
        .then(() => {
          Register();
        })
        .catch((e) => {
          Alert.alert("Profile could not be uploaded", e);
        });
    } else {
      Register();
    }
  }

  const validateEmail = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const bg_color = "#181B1F";
  const [activity_indicator, setactivity_indicator] = useState(false);

  const image_size = 75;

  const textFields = [
    {
      name: "First Name",
      placeholder: "eg. John",
      onChangeText: (first_name) => {
        setfirst_name(first_name);
      },
      value: first_name,
    },
    {
      name: "Last Name",
      placeholder: "eg. Doe",
      onChangeText: (last_name) => {
        setlast_name(last_name);
      },
      value: last_name,
    },
    {
      name: "Email Address",
      placeholder: "eg. johndoe@gmail.com",
      onChangeText: (email) => {
        setemail(email);
      },
      value: email,
    },
    {
      name: "Password",
      placeholder: "Type Pin",
      onChangeText: (password) => {
        setpassword(password);
      },
      value: password,
    },
    {
      name: "Retype Password",
      placeholder: "Confirm Pin",
      onChangeText: (password) => {
        setretypePassword(password);
      },
      value: retypePassword,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: bg_color,
        height: "100%",
      }}
    >
      <ActivityIndicator
        animating={activity_indicator}
        color="grey"
        size={50}
        style={{
          position: "absolute",
          zIndex: 10,
          top: "40%",
          alignSelf: "center",
        }}
      ></ActivityIndicator>
      <Header
        backAction={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View
          style={{
            //   backgroundColor: 'blue',
            alignItems: "center",
            justifyContent: "center",

            marginTop: 35,
          }}
        >
          <TouchableOpacity
            onPress={pickImage}
            style={{
              height: image_size + 5,
              width: image_size + 5,
              borderRadius: image_size,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#858585",
            }}
          >
            <Image
              style={{
                height: image_size,
                width: image_size,
                borderRadius: image_size,
              }}
              source={profileImage ? { uri: profileImage } : Avatar_PLC}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              position: "absolute",
              bottom: 0,
              paddingLeft: 50,
            }}
          >
            <MaterialCommunityIcons
              name="camera-image"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 30,

            backgroundColor: "white",
            borderRadius: 15,
            padding: 15,
          }}
        >
          {textFields.map((item, i) => {
            return (
              <View
                key={i.toString()}
                style={{
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                  }}
                >
                  {item.name}
                </Text>
                <TextInput
                  autoCapitalize={item.name == "Email Address" ? "none" : null}
                  secureTextEntry={
                    item.name == "Password" || item.name == "Retype Password"
                  }
                  placeholderTextColor="rgba(0,0,0, 0.2)"
                  placeholder={item.placeholder}
                  style={{
                    borderBottomWidth: 1,
                    color: "black",
                    borderColor: "rgba( 0,0,0, 0.5)",
                    // backgroundColor: 'blue',
                  }}
                  value={item.value}
                  onChangeText={item.onChangeText}
                ></TextInput>
              </View>
            );
          })}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginHorizontal: 30,
          }}
        >
          <TouchableOpacity
            onPress={Validation}
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
                Create Account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
