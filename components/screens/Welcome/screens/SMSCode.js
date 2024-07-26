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
import firebase from "firebase";

import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ATMAAlert from "../../../components/ATMAAlert";
import ATMAButton from "../../../components/ATMAButton";
import Header from "../../../components/Header";
import { secondary_color } from "../../../theme/colors";
import Background from "../components/Background";
// import { MainContext } from "../../../contexts/MainContext";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

export default function SMSCode({ title, route, navigation }) {
  const { playsSettings } = useState([]);
  const [loadingIndicatorLocal, setloadingIndicatorLocal] = useState(false);


  const { signInMethod, emailPhone, code, verificationId, isNewUser } = route.params;
  const { width, height } = Dimensions.get("window");
  const [activityIndicator, setactivityIndicator] = useState(false);
  const [loginStatus, setloginStatus] = useState("");
  const [digit1, setdigit1] = useState("");
  const [digit2, setdigit2] = useState("");
  const [digit3, setdigit3] = useState("");
  const [digit4, setdigit4] = useState("");
  const [digit5, setdigit5] = useState("");
  const [digit6, setdigit6] = useState("");
  const smsCode_ref = useRef();

  const sms_code = [
    { number: digit1 },
    { number: digit2 },
    { number: digit3 },
    { number: digit4 },
    { number: digit5 },
    { number: digit6 },
  ];
  const [smsCode, setsmsCode] = useState("");
  const [verificationId2, setverificationId2] = useState("");
  const recaptchaVerifier = useRef(null);

  const resendCode = async () => {
    // const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      emailPhone,
      recaptchaVerifier.current
    );
    setverificationId2(verificationId);
    setcodesLeft(codesLeft - 1)
  };

  const verifyCode = async () => {
    setloadingIndicatorLocal(true)

    if (signInMethod == "phone") {

      /*       console.log(emailPhone);
      await firebase
        .auth()
        .signInWithPhoneNumber(emailPhone, verificationId)
        .then((v) => {
          console.log("replyyyyyyyy", v);
        })
        .catch((v) => {
          console.log("replyyyyyyyyerr", v);
        });
         
      
            return */
      try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          smsCode
        );
        await firebase
          .auth()
          .signInWithCredential(credential)
          .then((cred) => {
            console.log("replyyyyyyyy", cred.additionalUserInfo.isNewUser);

            if (cred.additionalUserInfo.isNewUser) {
              console.log("did it");
              firebase
                .firestore()
                .collection("users")
                .doc(cred.user.uid)
                .set({
                  userName: cred.user.phoneNumber,
                  firstName: "",
                  lastName: "",
                  email: "",
                  profileImage: "",
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
                  setloadingIndicatorLocal(false);

                })
                .catch((e) => {
                  console.log("err updating user");
                  setloadingIndicatorLocal(false);

                });
            } else {
              console.log("leeave it");
              //navigation.navigate('home')

            }



          });
      } catch (err) {
        setloadingIndicatorLocal(false);

        console.log("Phone Verification Error", err);
        Alert.alert(
          "Ooops",
          "An Error Occured, try again or choose different sign in method.",
          [
            {
              text: "OK",
              onPress: () => {
                //     navigation.goBack()
              },
            },
          ],
          { cancelable: false }
        );
      }
    } else {
      console.log(smsCode, code);
      if (smsCode == code) {

        navigation.navigate("password", {
          emailPhone: emailPhone,
          signInMethod: signInMethod,
          isNewUser: isNewUser,
        });
      } else {


        Alert.alert('Invalid Code', "Note the code you have entered is incorrect. Make sure you entered the code sent to you via email.");
      }
      setloadingIndicatorLocal(false);
    }
  };
  const [codesLeft, setcodesLeft] = useState(2);

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <Header
        title=" "
        backAction={() => {
          navigation.goBack();
        }}
      />
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
      />
      <View style={{ flex: 1 }}>
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
            <View style={{ marginTop: 33 }}>
              <Text style={{ color: "red", marginBottom: 2 }}>
                {loginStatus}
              </Text>
            </View>
            <View style={{ marginTop: 0, marginBottom: 30 }}>
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
                  {signInMethod == "phone" ? "SMS code" : "Verification code"}
                </Text>
              </View>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                smsCode_ref.current.focus();
              }}
              style={{
                borderRadius: 5,
                marginTop: 12,
                marginBottom: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  alignItems: "flex-end",
                  height: 50,
                  //          width: width,
                  justifyContent: "center",
                }}
              >
                {sms_code.map((item, i) => {
                  return (
                    <View key={i.toString()} style={{}}>
                      <View
                        style={{
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 10,
                        }}
                      >
                        <Text style={{ fontSize: 25, color: "white" }}>
                          {item.number}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor:
                            i < smsCode.length ? "white" : "grey",
                          height: 1,
                          width: width / 6 - 20,

                          marginHorizontal: 5,
                        }}
                      ></View>
                    </View>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
            <TextInput
              autoFocus
              keyboardType="number-pad"
              ref={(ref) => {
                smsCode_ref.current = ref;
              }}
              value={smsCode}
              onChangeText={(v) => {
                if (v.length > 6) return;
                setsmsCode(v);
                setdigit1(v.charAt(0));
                setdigit2(v.charAt(1));
                setdigit3(v.charAt(2));
                setdigit4(v.charAt(3));
                setdigit5(v.charAt(4));
                setdigit6(v.charAt(5));
              }}
              style={{ backgroundColor: "red", height: 0 }}
            />
            <ATMAButton
              onPress={verifyCode}
              /*     onPress={()=>{
              console.log(code, verificationId);
            }} */
              loading={loadingIndicatorLocal}
              style={{}}
              title="Continue"
              color={secondary_color}
              fontStyle={{
                fontWeight: "bold",
                //textTransform: "uppercase",
                color: "black",
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              if (codesLeft) {
                Alert.alert(
                  "Resend Code",
                  `Confirm if you wish to resend code to ${emailPhone}.`,
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    {
                      text: "Resend",
                      onPress: () => {
                        resendCode();
                      },
                    },
                  ],
                  { cancelable: true }
                );
              } else {
                Alert.alert(
                  "You out of codes",
                  `Please choose a different sign in method to continue.`,
                  [
                    {
                      text: "Ok",
                      onPress: () => {
                        navigation.navigate("signin");
                      },
                    },
                  ],
                  { cancelable: true }
                );
              }
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white", textTransform: "uppercase" }}>
              Resend code to {emailPhone}
            </Text>
            <Text style={{ color: "white", marginTop: 4 }}>
              {codesLeft} codes left
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
