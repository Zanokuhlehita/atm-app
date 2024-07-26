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
  Animated,
} from "react-native";
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

import ATMAButton from "../../../components/ATMAButton";
import ATMATextInput from "../../../components/ATMATextInput";

import Header from "../../../components/Header";
import { secondary_color } from "../../../theme/colors";
import Background from "../components/Background";
import Toast from "react-native-root-toast";
import firebase from "firebase";
import { MainContext } from "../../../contexts/MainContext";
import { Portal } from "react-native-portalize";
import LoadingScreenMain from "../../../components/LoadingScreenMain";

export default function CompleteProfile({
  title,
  navigation,
  onPressContinue,
}) {
  const {
    loadingSlider,
    userProfileComplete_ref,
    completeLoad,
    setmainLoadingScreen,
    opacity_animation,
  } = useContext(MainContext);

  const [activityIndicator, setactivityIndicator] = useState(false);
  const [error, seterror] = useState("");
  const [gender, setgender] = useState("");
  const [ageRange, setageRange] = useState("");
  const [loadingIndicator, setloadingIndicator] = useState(false);
  const [checkingUserName, setcheckingUserName] = useState(false)
  const ages = [
    { name: "Below 13", value: "<13", onPress: () => setageRange("<13") },
    { name: "13-17", value: "13-17", onPress: () => setageRange("13-17") },
    { name: "18-22", value: "18-22", onPress: () => setageRange("18-22") },
    { name: "23-27", value: "23-27", onPress: () => setageRange("23-27") },
    { name: "28-35", value: "28-35", onPress: () => setageRange("28-35") },

    { name: "Above 35", value: ">35", onPress: () => setageRange(">35") },
  ];
  const { width, height } = Dimensions.get("window");
  const [userName, setuserName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userNameTaken, setuserNameTaken] = useState(false)
  function updateUser() {
     
// first check if username is not taken

    if (userNameTaken) {
      startShake();

      seterror(
        "The username you have chosen has been taken, Please choose different a one."
      );
      return;
    }
    if (userName.length < 3) {
      startShake();
      const msg = "User name should have atleast 3 characters";
      seterror(msg);
      return;
    }
   if (firstName.length < 2) {
     startShake();
     const msg = "First name should have atleast 2 characters";
     seterror(msg);
     return;
   }
      if (lastName.length < 2) {
        startShake();
        const msg = "Last name should have atleast 2 characters";
        seterror(msg);
        return;
      }
    if (!firstName) {
      startShake();
      seterror("Please enter first name to continue.");
      return;
    }
    if (!lastName) {
      startShake();
      seterror("Please enter last name to continue.");
      return;
    }

    if (!userName) {
      startShake();
      seterror("Please enter user name to continue.");
      return;
    }
    if (!gender) {
      startShake();
      seterror("Please select your gender to continue.");
      return;
    }
    if (!ageRange) {
      startShake();
      seterror("Please select age range to continue.");
      return;
    }
    if (ageRange == "<13") {
      startShake();
      seterror("Please note this app is not meant for your age range.");
      return;
    }
    loadingSlider.setValue(-150);
       opacity_animation.setValue(1);
    setloadingIndicator(true);
    setmainLoadingScreen(true);
    Animated.timing(loadingSlider, {
      toValue: -10,
      duration: 4500,
      useNativeDriver: true,
    }).start(() => {});
    var data = {
      userName,
      firstName,
      lastName,
      gender,
      ageRange,
    };

    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update(data)
      .then(() => {
        console.log("Record Added Succesfully");
        userProfileComplete_ref.current = true;
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'home',
              },
            ],
          });
          setTimeout(() => {
        completeLoad("home", true);
            
          }, 500);
      })
      .catch((e) => {
        alert("Error 4730.");
        console.log("Error Adding Record", e);
        setloadingIndicator(false);
      });
  }
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
  return (
    <Portal>
      <View style={{ flex: 1 }}>
        <Background />
        {loadingIndicator ? (
          <Portal>
            <LoadingScreenMain />
          </Portal>
        ) : null}

        {activityIndicator ? (
          <View
            style={{
              position: "absolute",
              zIndex: 1000,
              height: height,
              width: width,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba( 0,0,0, 0.5)",
            }}
          >
            <ActivityIndicator animating={true} color="#525252" size={50} />
          </View>
        ) : null}
        <Animated.View
          style={{ flex: 1, transform: [{ translateX: shakeAnimation }] }}
        >
          <View
            style={{
              marginTop: "20%",
              marginBottom: error ? 30 : 55,
            }}
          >
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
                Complete Profile
              </Text>
            </View>
          </View>
          {error ? (
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                paddingHorizontal: 33,
              }}
            >
              <Text style={{ color: "red", marginRight: 5 }}>{"\u25CF"}</Text>
              <Text style={{ color: "red" }}>{error}</Text>
            </View>
          ) : null}

          <ScrollView
            style={{
              flex: 1,

              height: "100%",
              width: "100%",
              zIndex: 40,
            }}
          >
            <View
              style={{
                paddingHorizontal: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <ATMATextInput
                  value={firstName}
                  style={{
                    flex: 1,
                    paddingRight: 10,
                    marginRight: 10,
                  }}
                  onChangeText={(v) => {
                    if (v.length > 15) {
                      startShake();
                      const msg =
                        "First Name must have a maximum of 15 characters";
                      seterror(msg);
                      return;
                    } else {
                      seterror();
                    }
                    var num = /\d+/g; //checks for numbers
                    if (num.test(v)) {
                      startShake();
                      const msg = "Invalid character for name.";
                      seterror(msg);
                      return;
                    }
                    console.log(v);
                    setfirstName(v.replace(/[^a-zA-Z ]/g, ""));
                  }}
                  title="First Name"
                />
                <ATMATextInput
                  style={{
                    flex: 1,
                  }}
                  value={lastName}
                  onChangeText={(v) => {
                    if (v.length > 15) {
                      startShake();
                      const msg =
                        "Last Name must have a maximum of 15 characters";
                      seterror(msg);
                      return;
                    } else {
                      seterror();
                    }

                    var num = /\d+/g;
                    if (num.test(v)) {
                      startShake();
                      const msg = "Invalid character for name.";
                      seterror(msg);
                      return;
                    }
                    console.log(v);
                    setlastName(v.replace(/[^a-zA-Z ]/g, ""));
                  }}
                  title="Last Name"
                />
              </View>

              <ATMATextInput
                value={userName}
                autoCapitalize="none"
                onBlur={async () => {
                  if (userName == "") return;
                  if (userName.length < 3) {
                    startShake();
                    const msg =
                      "User name should have atleast 3 characters";
                    seterror(msg);
                    return;
                  }
                  setcheckingUserName(true);
                  await firebase
                    .firestore()
                    .collection("users")
                    .where("userName", "==", userName)
                    .get()
                    .then((results) => {
                      if (results.empty) {
                        console.log("No documents found!, proceed register");
                        setuserNameTaken(false);
                        setcheckingUserName(false);
                      } else {
                        setcheckingUserName(false);

                        setuserNameTaken(true);
                        startShake();
                        seterror(
                          "The username you have chosen has been taken, Please choose different a one."
                        );
                        return;
                      }
                    })
                    .catch(function (error) {
                      setcheckingUserName(false);
                      console.log("Error getting documents:", error);
                    });
                }}
                onFocus={() => {
                  if (userName == "") {
                    setuserName(
                      `${firstName.replace(/\s/g, "_").toLowerCase()}_${lastName
                        .replace(/\s/g, "_")
                        .toLowerCase()}`
                    );
                  }
                }}
                onChangeText={(v) => {
                  if (v == "") {
                    setuserName("");
                    return;
                  }
                  if (v.length > 30) {
                    startShake();
                    const msg =
                      "User Name must have a maximum of 30 characters";
                    seterror(msg);
                    return;
                  } else {
                    seterror();
                  }

                  var re = /^\w+$/;

                  if (!re.test(v)) {
                    startShake();
                    const msg =
                      "Character not applicable. Use letters, numbers and underscore's";
                    seterror(msg);
                    return;
                  }
                  setuserName(v.toLowerCase());
                }}
                preText="@"
                title="User Name"
              />

              <View style={{ marginTop: 10, height: 50, marginBottom: 50 }}>
                <Text style={{ color: "white" }}>Gender</Text>
                <View
                  style={{
                    height: "100%",

                    flexDirection: "row",
                    backgroundColor: "#CCCCCC",
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setgender("male");
                    }}
                    style={{
                      flexDirection: "row",
                      width: "49.5%",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 20,
                    }}
                  >
                    <View style={{}}>
                      <Ionicons
                        style={{ marginRight: 10 }}
                        name="ios-male"
                        size={24}
                        color={gender == "male" ? secondary_color : "white"}
                      />
                    </View>

                    <Text
                      style={{
                        color: gender == "male" ? secondary_color : "white",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      Male
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: "100%",
                      width: 1,
                      backgroundColor: "white",
                    }}
                  ></View>
                  <TouchableOpacity
                    onPress={() => {
                      setgender("female");
                    }}
                    style={{
                      flexDirection: "row",
                      width: "49.5%",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 20,
                    }}
                  >
                    <View style={{}}>
                      <Ionicons
                        style={{ marginRight: 10 }}
                        name="ios-female"
                        size={24}
                        color={gender == "female" ? secondary_color : "white"}
                      />
                    </View>

                    <Text
                      style={{
                        color: gender == "female" ? secondary_color : "white",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{}}>
                <Text style={{ color: "white", marginBottom: 10 }}>
                  Age Range
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {ages.map((item, i) => {
                    return (
                      <View
                        style={{ width: "31%", marginBottom: 10 }}
                        key={i.toString()}
                      >
                        <TouchableOpacity
                          onPress={item.onPress}
                          style={{
                            backgroundColor:
                              ageRange == item.value
                                ? secondary_color
                                : "#CCCCCC",
                            height: 50,
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontWeight: "bold" }}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              </View>
              <View style={{ bottom: 0, marginTop: 20 }}>
                <ATMAButton
                  onPress={updateUser}
                  disabled={checkingUserName}
                  title="Start Listening"
                  color={secondary_color}
                  fontStyle={{
                    fontWeight: "bold",
                    //textTransform: "uppercase",
                    color: "black",
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Portal>
  );
}
