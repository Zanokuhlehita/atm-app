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
  Animated,
  Easing,
  BackHandler,
} from "react-native";
import { logo } from "../../../plugins/assets";
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
import { LinearGradient } from "expo-linear-gradient";
import ATMAButton from "../../../components/ATMAButton";
import bg_image from "../../../assets/images/welcome_screen/1.jpg";
import {
  primary_color,
  secondary_color,
  text_color_primary,
} from "../../../theme/colors";
import Header from "../../../components/Header";

import axios from "axios";
import firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Platform } from "react-native";
import CountryPicker, {
  getAllCountries,
  getCallingCode,
  DARK_THEME,
} from "react-native-country-picker-modal";
import flags from "../components/flags.json";
import countries from "../components/countries.json";
import * as Facebook from "expo-facebook";
// import { MainContext } from "../../../contexts/MainContext";
import * as Google from "expo-google-app-auth";
import { validateEmail } from "../../../plugins/emailVerification";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { api_link } from "../../../app-config";
import Background from "../components/Background";
import LoadingScreenMain from "../../../components/LoadingScreenMain";
import { Portal } from "react-native-portalize";

export default function SignIn({ navigation }) {
  const {
    playsSettings,
    setloadingIndicator,
    authNavigation_ref,
    mainNavigation_context_ref,
    getUserInfo,
    setmainLoadingScreen,
    completeLoad,
    loadingSlider,
  } = useState([]);
  const [activityIndicator, setactivityIndicator] = useState(false);

  const recaptchaVerifier = useRef(null);
  const [callingCode, setcallingCode] = useState("+1");
  const [flag, setflag] = useState(flags.US.emoji);

  async function getCountryCode() {
    axios.get("http://www.geoplugin.net/json.gp").then((v) => {
      var continent = v.data.geoplugin_continentName;
      var country = v.data.geoplugin_countryName;
      var province = v.data.geoplugin_region;
      var city = v.data.geoplugin_city;
      var countryCode_local = v.data.geoplugin_countryCode;
      var currencyCode = v.data.geoplugin_currencyCode;
      // console.log(v);
      if (countryCode_local) {
        setcountryCode(countryCode_local);
      }
    });
  }

  const renderFlag = () => {
    var flags_local = flags;
    var flag_local = eval(`flags_local.${countryCode}.emoji`);
    return flag_local;
  };
  const renderCallingCode = () => {
    var countries_local = countries;
    var callingCodeLocal = eval(`countries_local.${countryCode}.callingCode`);
    return callingCodeLocal;
  };

  useEffect(() => {
    authNavigation_ref.current = navigation;
    /*     setTimeout(() => {
          mainNavigation_context_ref.current.reset({
            index: 0,
            routes: [
              {
                name: "welcome",
              },
            ],
          });
    }, 5000); */

    const backAction = () => {
      console.log("cdscds");
      if (loginWithEmailPassword_ref.current) {
        showHomeScreen();
      } else {
        return false;
      }

      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    getCountryCode();

    return () => {
      backHandler.remove();
    };
  }, []);
  const [update, setupdate] = useState("");

  const { width, height } = Dimensions.get("window");
  const border_radius = 20;
  const border_width = 0.5;
  const border_color = "#00F3F4";
  const button_font_size = 18;
  const grad_color = "30, 30, 30";
  const slides = [
    {
      title: "Home Of Global Hits",
      subTitle:
        "Welcome to the Adler Tempo Music App, Our job is to give you the best music playlist, for every mood.",
    },
    {
      title: "First Access to latest songs",
      subTitle:
        "Be the first access to our latest releases days before they are released on other streaming platforms.",
    },

    {
      title: "Sing Along\nwith song lyrics",
      subTitle: "Don't miss a line with the new lyrics feature.",
    },
    {
      title: "Best audio quality",
      subTitle:
        "Created with you in mind, get all our music in the highest quality sound.",
    },
    {
      title: "Lets Get Started",
      subTitle: "Sign up for free, or login.",
    },
  ];
  const [sliderIndex, setsliderIndex] = useState(0);
  const emailPhoneInput_ref = useRef();

  function handleOnScroll(event) {
    var x = parseInt(
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );

    if (x >= 0) {
      if (x != sliderIndex) {
        setsliderIndex(x);
      }
    }
  }
  const moveUI = useRef(new Animated.Value(0)).current;
  const [loginWithEmailPassword, setloginWithEmailPassword] = useState(false);
  const loginWithEmailPassword_ref = useRef(false);
  const [emailPhone, setemailPhone] = useState("");

  function animate() {
    if (loginWithEmailPassword) emailPhoneInput_ref.current.blur();
    loginWithEmailPassword_ref.current = !loginWithEmailPassword;
    setloginWithEmailPassword(!loginWithEmailPassword);
  }
  function useEmailPhone(params) {
    Animated.timing(moveUI, {
      toValue: 100,
      /*       easing: Easing.out, */
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      emailPhoneInput_ref.current.focus();
      setloginWithEmailPassword(true);
      loginWithEmailPassword_ref.current = true;
    });
  }
  function showHomeScreen(params) {
    emailPhoneInput_ref.current.blur();
    Animated.timing(moveUI, {
      toValue: 0,
      /*       easing: Easing.out, */
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setloginWithEmailPassword(false);
      loginWithEmailPassword_ref.current = false;
    });
  }

  const initial_opacity = moveUI.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });
  const to_fade_opacity = moveUI.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
  });
  const plc_text_opacity = moveUI.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0, 0],
  });
  const heading_translation = moveUI.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
  });
  const input_translation = moveUI.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 0],
  });
  const button_translation = moveUI.interpolate({
    inputRange: [0, 100],
    outputRange: [-76, 0],
  });
  const header_opacity = moveUI.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0, 1],
  });
  const next_spacing_translation = moveUI.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
  });
  const [countryCode, setcountryCode] = useState("ZA");
  const [openCountryPicker, setopenCountryPicker] = useState(false);
  const [showCountryCode, setshowCountryCode] = useState(false);

  var phoneNumber = `+${renderCallingCode()}${emailPhone}`;
  const [verificationId, setVerificationId] = useState(null);
  const code = useRef("");
  // Function to be called when requesting for a verification code
  const [loadingIndicatorLocal, setloadingIndicatorLocal] = useState(false);
  const sendVerification = async () => {
    setloadingIndicatorLocal(true);

    if (showCountryCode) {
      if (emailPhone.length != 9) {
        Alert.alert(
          "Invalid Phone Number",
          "Please make sure you have typed in your phone number correctly.",
          [
            {
              text: "Ok",
              onPress: () => {
                setloadingIndicatorLocal(false);
              },
            },
          ],
          { cancelable: true }
        );
        return;
      }
      try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
          phoneNumber,
          recaptchaVerifier.current
        );
        setVerificationId(verificationId);
        //const code = null
        setloadingIndicatorLocal(false);
        navigation.navigate("smscode", {
          signInMethod: "phone",
          emailPhone: phoneNumber,
          verificationId,
        });
      } catch (err) {
        console.log("Phone Verification Error", err);
        setloadingIndicatorLocal(false);
        console.log(loadingIndicatorLocal);
        Alert.alert(
          "Verification",
          "The human verification window has been closed without completing. Please complete verification to continue.",
          [
            {
              text: "OK",
              onPress: () => { },
            },
          ],
          { cancelable: false }
        );
      }
    } else {
      if (!validateEmail(emailPhone)) {
        Alert.alert(
          "Invalid Email Address",
          "Please make sure you have typed in your email address correctly.",
          [
            {
              text: "Ok",
              onPress: () => {
                setloadingIndicatorLocal(false);
              },
            },
          ],
          { cancelable: true }
        );
        return;
      }
      var signInMethods = await firebase
        .auth()
        .fetchSignInMethodsForEmail(emailPhone);
      console.log("fetchSignInMethodsForEmail", signInMethods);

      if (!code.current) {
        code.current = Math.floor(Math.random() * 900000) + 100000;
      }

      //send email

      var data = {
        code: code.current,
        sendTo: emailPhone,
      };

      axios
        .post(`https://atma-api.oa.r.appspot.com/verify-email`, data)
        .then(function (response) {
          console.log(response);

          if (signInMethods == "") {
            Alert.alert(
              "Verify Email",
              `A verfication code has been sent to your email address '${emailPhone}'. Please enter the code provided in the mail.`,
              [
                {
                  text: "Ok",
                  onPress: () => {
                    setTimeout(() => {
                      navigation.navigate("smscode", {
                        signInMethod: "email",
                        code: code.current,
                        emailPhone: emailPhone,
                        isNewUser: true,
                      });
                      setloadingIndicatorLocal(false);
                    }, 500);
                  },
                },
              ],
              { cancelable: true }
            );
          } else {
            setloadingIndicatorLocal(false);

            navigation.navigate("password", {
              signInMethod: "email",
              isNewUser: false,

              emailPhone: emailPhone,
            });
          }
        })
        .catch(function (error) {
          console.log("Error 450", error);
          setloadingIndicatorLocal(false);
          Alert.alert(
            "Opps",
            "Error 450 occured, Please make sure you have a working internet connection."
          );
        });
    }
  };
  const [googleSignInIndicator, setgoogleSignInIndicator] = useState(false);
  const [facebookSignInIndicator, setfacebookSignInIndicator] = useState(false);
  async function googleSingIn(params) {
    setgoogleSignInIndicator(true);
    var userName = "";
    const isAndroid = () => Platform.OS === "android";
    var id =
      "283169871987-moce7oo6t62o3gf4k50lhp327h9egtlh.apps.googleusercontent.com";
    var iosId =
      "283169871987-k1rqmenmvqlj8vce47afrvcin7144mkn.apps.googleusercontent.com";
    const res = await Google.logInAsync({
      clientId: isAndroid() ? id : iosId,
    })
      .then((res) => {
        console.log("cancel pressed", res);

        if (res.type == "cancel") {
          setgoogleSignInIndicator(false);
          console.log("cancel pressed");
          return;
        }
        if (res.type == "success") {
          userName = res.user.name;
          const credential = firebase.auth.GoogleAuthProvider.credential(
            res.idToken,
            res.accessToken
          );
          var photo = res.user.photoUrl;
          var firstName = res.user.givenName;
          var lastName = res.user.familyName;
          createUser(credential, userName, photo, firstName, lastName);
        } else {
          /*       */
        }
      })
      .catch((v) => {
        Alert.alert(
          "Error",
          "Google sign in failed. Please try again or choose different sign in method.",
          [
            {
              text: "OK",
              onPress: () => {
                setgoogleSignInIndicator(false);
              },
            },
          ],
          { cancelable: false }
        );
      });
  }

  async function loginWithFacebook() {
    await Facebook.initializeAsync({
      appId: "236956754626886",
    });
    const res = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });

    var userName = "";
    await axios
      .get(
        `https://graph.facebook.com/${res.userId
        }?access_token=${encodeURIComponent(res.token)}`
      )
      .then((value) => {
        userName = value.data.name;
        const credential = firebase.auth.FacebookAuthProvider.credential(
          res.token
        );
        if (res.type == "cancel") {
          setgoogleSignInIndicator(false);
          console.log("cancel pressed");
          return;
        }
        if (res.type == "success") {
          createUser(credential, userName);
        } else {
        }
      })
      .catch((e) => {
        console.log("Facebook sign in Error", e);
        Alert.alert(
          "Error",
          "Facebook sign in failed. Please try again or choose different sign in method.",
          [
            {
              text: "OK",
              onPress: () => {
                setfacebookSignInIndicator(false);
              },
            },
          ],
          { cancelable: false }
        );
      });
  }

  function createUser(credential, userName, photo, firstName, lastName) {
    setmainLoadingScreen(true);
    Animated.timing(loadingSlider, {
      toValue: -50,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => { });
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((cred) => {
        if (cred.additionalUserInfo.isNewUser) {
          firebase
            .firestore()
            .collection("users")
            .doc(cred.user.uid)
            .set({
              userName: userName,
              firstName: firstName ? firstName : "",
              lastName: lastName ? lastName : "",
              email: cred.user.email,
              profileImage: photo ? photo : "",
              password: "",
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
              setgoogleSignInIndicator(false);
              setfacebookSignInIndicator(false);
            })
            .catch((e) => {
              console.log("err updating user");
            });

          /*     user
            .updateProfile({
              displayName: `${first_name}`,
              displayImage: profieImageLink,
            }) */
        } else {
          /*    getUserInfo(cred.user.uid); */
        }
      })
      .catch((error) => {
        setgoogleSignInIndicator(false);
        setfacebookSignInIndicator(false);
        setmainLoadingScreen(false);
        if (
          error.toString() ==
          "Error: An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."
        ) {
          Alert.alert(
            "Ooops",
            "The email address provided has been registered with a different sign in method, Please sign in using the method you used to create this account."
          );
          return;
        }
        console.log(error);
        Alert.alert(
          "Ooops",
          "An Error Occured, try again or choose different sign in method."
        );
      });
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(14, 16, 27,0.2) ",
      }}
    >
      <Background />
      <Portal>
        <LoadingScreenMain />
      </Portal>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <Animated.View
        style={{ zIndex: 10, opacity: header_opacity, position: "absolute" }}
      >
        <Header
          title=" "
          backAction={() => {
            showHomeScreen();

            setemailPhone("");
            setshowCountryCode(false);
          }}
        />
      </Animated.View>
      {/*   <CountryCodePicker />  */}

      <View
        style={{
          paddingTop: 30,
          paddingBottom: 10,
          marginBottom: 0,

          height: "100%",
        }}
      >
        <>
          <Animated.View
            style={{
              marginLeft: 15,
              height: 110,
              marginBottom: 30,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              elevation: 5,
            }}
          >
            <Animated.Image
              style={{
                opacity: to_fade_opacity,
                height: "100%",
                right: 12,

                resizeMode: "contain",
              }}
              source={logo}
            />
          </Animated.View>

          <Animated.View
            style={{
              paddingVertical: 10,
              transform: [{ translateY: heading_translation }],
            }}
          >
            <ScrollView
              scrollEnabled={!loginWithEmailPassword}
              onScroll={(e) => handleOnScroll(e)}
              scrollEventThrottle={5}
              showsHorizontalScrollIndicator={false}
              snapToInterval={width}
              decelerationRate={0.8}
              horizontal
              contentContainerStyle={{}}
            >
              {slides.map((item, i) => {
                return (
                  <View
                    key={i.toString()}
                    style={{
                      width: width,
                      paddingHorizontal: 30,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      onPress={useEmailPhone}
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <Animated.View
                        style={{
                          position: "absolute",
                          opacity: initial_opacity,
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 27,
                            lineHeight: 32,
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          Email or phone{"\n"} number
                        </Text>
                      </Animated.View>

                      <Animated.Text
                        style={{
                          opacity: to_fade_opacity,
                          color: "white",
                          fontSize: 27,
                          lineHeight: 32,
                          textAlign: "center",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.title}
                      </Animated.Text>
                    </View>

                    <Animated.View
                      style={{
                        opacity: to_fade_opacity,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          lineHeight: 17,
                          textAlign: "center",
                          paddingHorizontal: 30,

                          color: "white",
                        }}
                      >
                        {item.subTitle}
                      </Text>
                    </Animated.View>
                  </View>
                );
              })}
            </ScrollView>

            <Animated.View
              style={{
                opacity: to_fade_opacity,
                paddingHorizontal: 30,
                marginTop: 20,
                paddingVertical: 0,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {slides.map((item, i) => {
                  const dot_size = 5.5;
                  return (
                    <View
                      style={{
                        height: dot_size,
                        width: dot_size,
                        borderRadius: 5,
                        backgroundColor:
                          i == sliderIndex
                            ? "rgba(69, 249, 252,1)"
                            : "rgba(133, 128, 134,1)",

                        marginHorizontal: 3.5,
                      }}
                      key={i.toString()}
                    ></View>
                  );
                })}
              </View>
            </Animated.View>
          </Animated.View>
        </>

        <Animated.View
          style={{
            position: "absolute",
            paddingHorizontal: 30,
            paddingTop: 15,
            // height: 50,
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: next_spacing_translation }],
              height: 200,
              width: "100%",
              //backgroundColor:'red'
            }}
          ></Animated.View>
          <Animated.View
            style={{
              marginTop: 20,
              // marginBottom: 10,
              zIndex: 100000,
              transform: [{ translateY: input_translation }],
            }}
          >
            <Animated.View
              style={
                {
                  // transform: [{ translateY: button_translation }],
                }
              }
            >
              {/* Text Input : start */}
              <Animated.View
                style={{
                  //    transform: [{ translateY:  }],
                  width: "100%",
                  borderRadius: 5,
                  backgroundColor: "white",
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  alignItems: "center",
                  height: 48,
                  zIndex: 100000,
                }}
              >
                {showCountryCode ? (
                  <>
                    <CountryPicker
                      onClose={() => {
                        setopenCountryPicker(false);
                      }}
                      /*  theme={{
                                     primaryColor: 'white',
                                     primaryColorVariant: 'white',
                                     backgroundColor: bg_color,
                                     onBackgroundTextColor: 'white',
                                     filterPlaceholderTextColor: 'green',
                                     //fontSize: 16,
                                     /*   fontFamily: Platform.select({
                                           ios: 'System',
                                           android: 'Roboto',
                                           web: 'Arial'
                                       }),
                                    
                                       activeOpacity: 0.7,
                                       itemHeight: getHeightPercent(7) 
                                 }} */
                      //  / theme={DARK_THEME}
                      onSelect={(nationality) => {
                        console.log(nationality.cca2);
                        setcountryCode(nationality.cca2);
                      }}
                      renderFlagButton={(e) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setopenCountryPicker(true);
                            }}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            <Text style={{ fontSize: 20 }}>{renderFlag()}</Text>

                            <EvilIcons
                              onPress={() => {
                                console.log(e);
                              }}
                              name="chevron-down"
                              size={24}
                              color="black"
                            />
                          </TouchableOpacity>
                        );
                      }}
                      visible={openCountryPicker}
                      withFilter
                      withEmoji
                      countryCode={countryCode}
                      withFlagButton
                      withCallingCodeButton
                      withFlag
                      withAlphaFilter
                      withCallingCode
                    />
                    <View
                      style={{
                        marginLeft: 5,

                        height: 20,
                        width: 1,
                        backgroundColor: "rgba( 0,0,0, 0.5)",
                      }}
                    ></View>
                    <Text
                      style={{
                        marginLeft: 8,
                      }}
                    >
                      +{renderCallingCode()}
                    </Text>
                  </>
                ) : null}

                <TextInput
                  //    keyboardType={showCountryCode ? 'phone-pad':'numbers-and-punctuation'}
                  editable={!facebookSignInIndicator && !googleSignInIndicator}
                  autoCompleteType="off"
                  ref={(ref) => {
                    emailPhoneInput_ref.current = ref;
                  }}
                  placeholderTextColor="'rgba(0,0,0, 0.6)'"
                  placeholder={"Email or phone number"}
                  autoCapitalize="none"
                  style={{
                    paddingHorizontal: 5,
                    flex: 1,
                  }}
                  value={emailPhone}
                  onChangeText={(v) => {
                    if (v.charAt(0) == "+") {
                      return;
                    }
                    if (!isNaN(v) && v.length >= 4) {
                      setshowCountryCode(true);

                      if (v.charAt(0) == "0") {
                        setemailPhone(v.substring(1));
                        return;
                      }
                    } else {
                      setshowCountryCode(false);
                    }
                    //   console.log(v);
                    setemailPhone(v);
                  }}
                  blurOnSubmit={false}
                  onFocus={() => {
                    useEmailPhone();
                  }}
                ></TextInput>
                {/* <Animated.View
                style={{
                  display: loginWithEmailPassword,
                  position: "absolute",
                  marginLeft: 20,
                  opacity: plc_text_opacity,
                }}
              >
                <TouchableOpacity onPress={animate} style={{}}>
                  <Animated.Text style={{}}>
                    Email address or Phone number
                  </Animated.Text>
                </TouchableOpacity>
              </Animated.View> */}
                <TouchableOpacity
                  onPress={(v) => {
                    setemailPhone("");
                    setshowCountryCode(false);
                  }}
                  style={{
                    display: emailPhone.length >= 1 ? "flex" : "none",
                    zIndex: 10,
                    height: "100%",
                    justifyContent: "center",
                    width: 30,
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    style={{}}
                    name="ios-close-circle"
                    size={18}
                    color="rgba( 150, 150, 150, 0.5)"
                  />
                </TouchableOpacity>

                <Animated.View
                  style={{
                    position: "absolute",
                    right: 10,

                    opacity: to_fade_opacity,
                  }}
                >
                  <TouchableOpacity
                    disabled={facebookSignInIndicator || googleSignInIndicator}
                    onPress={() => { }}
                    style={{
                      height: 32,
                      width: 32,
                      backgroundColor: "#252526",
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 2,
                    }}
                  >
                    <AntDesign name="arrowright" size={17} color="white" />
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
              {/* Text Input : Endfixed */}
              {/* CONTINUE BUTTTON START */}
              <Animated.View
                style={{
                  transform: [{ translateY: button_translation }],
                  marginTop: 23,
                }}
              >
                <ATMAButton
                  onPress={sendVerification}
                  style={{
                    //position: "absolute",
                    zIndex: 100000,

                    //top: -53,

                    marginBottom: 0,
                  }}
                  loading={loadingIndicatorLocal}
                  title="Continue"
                  color={secondary_color}
                  fontStyle={{ color: "black", fontWeight: "bold" }}
                />
              </Animated.View>
              {/* CONTINUE BUTTTON END */}
            </Animated.View>
          </Animated.View>

          <TextInput
            autoFocus={loginWithEmailPassword}
            style={{ transform: [{ scale: 0 }] }}
          />
          <Animated.View
            style={{
              opacity: to_fade_opacity,
              marginTop: 30,
            }}
          >
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
            <ATMAButton
              loading={facebookSignInIndicator}
              title="Continue With Facebook"
              color="rgba( 60, 83, 154, 1)"
              fontStyle={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
              icon={<FontAwesome name="facebook" size={24} color="white" />}
              onPress={loginWithFacebook}
              disabled={googleSignInIndicator}
            />

            <ATMAButton
              loading={googleSignInIndicator}
              disabled={facebookSignInIndicator}
              title="Continue With Google"
              onPress={googleSingIn}
              in
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
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}
