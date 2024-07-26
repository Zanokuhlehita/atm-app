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
  ImageBackground,
} from "react-native";
import ATMAButton from "../../components/ATMAButton";
import HeaderSettings from "../../components/HeaderSettings";
import { Avatar, Avatar_PLC } from "../../plugins/assets";
import DataFields from "./components/DataFields";
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
// import { MainContext } from "../../contexts/MainContext";
// import { updateRecord } from "../../plugins/firebase";
import * as ImagePicker from "expo-image-picker";
// import firebase from "firebase";
import ATMAAlert from "../../components/ATMAAlert";
import { primary_color } from "../../theme/colors";
import { Portal } from "react-native-portalize";

export default function Profile({ navigation }) {
  const { user_context, setuser_context } = useState('');

  const [profileImage, setprofileImage] = useState("");
  const [downloadLink, setdownloadLink] = useState("");
  const [uploadProgress, setuploadProgress] = useState("0");
  const [isUploading, setisUploading] = useState(false);

  async function updateUserContext() {
    var user = await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

    user
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setuser_context(doc.data());
        } else {
          Alert.alert(
            "Error updating your profile. Contact us at arnoldadler3@gmail.com"
          );
        }
      })
      .catch(function (error) {
        Alert.alert(
          "Error updating your profile. Contact us at arnoldadler3@gmail.com"
        );
      });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    ///    console.log(result);
    uploadImage(
      result.uri,
      `${user_context.firstName} ${user_context.lastName}`
    );
  };

  async function uploadImage(uri, imagName) {
    const response = await fetch(uri);
    const blob = await response.blob();
    setuploadProgress("0");
    setisUploading(true);
    const storageRefSong = firebase.storage().ref();
    const fileRef = storageRefSong.child("profileImages").child(imagName);
    fileRef.put(blob).on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 * 0.99
        );
        setuploadProgress(progress);
      },
      (error) => {
        alert("File upload failed, Try again later.");
      },
      (v) => {
        fileRef.getDownloadURL().then((url) => {
          //  console.log('File link', url)
          setdownloadLink(url);

          // updateRecord("users", firebase.auth().currentUser.uid, {
          //   profileImage: url,
          // })
          // .then(() => {
          //   setprofileImage(uri);
          //   setisUploading(false);
          //   updateUserContext();
          // });
        });
      }
    );
  }

  const [changes, setchanges] = useState(false);

  const [name, setname] = useState("");
  const [phone, setphone] = useState(user_context.phone);
  const [email, setemail] = useState("");
  const [profileAlert, setprofileAlert] = useState("");

  function verifyEmail() {
    setprofileAlert({
      msg: "Verify Email",
      subMsg: (
        <Text style={{}}>
          To verify your email,. a link will be sent to this email address:
          {"\n"}
          {"\n"}
          <Text style={{ color: "blue", marginTop: 5, marginBottom: 5 }}>
            {user_context.email}
          </Text>
          {"\n"}
          {"\n"}
          Click the emailed link in your mail to verify your account.
        </Text>
      ),

      onYes: (inputValue) => {
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            Alert.alert(
              `Link has been sent to your mail. Please check your email and press the verification link.`
            );

            setprofileAlert("");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var msg = "";
            var subMsg = "";
            if (errorMessage == "The email address is badly formatted.") {
              msg = `Invalid Email Address`;
              subMsg = `Make sure yo have typed your email address correctly.`;
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
        console.log(firebase.auth().currentUser.emailVerified);
        setprofileAlert("");
      },
      onYesTitle: "Email Link",
      onNoTitle: "Cancel",
    });
  }
  return (
    <Portal>
      <View
        style={{
          backgroundColor: "#201F24",

          flex: 1,
        }}
      >
        <ATMAAlert alert={profileAlert} />
        <View
          style={{
            flex: 1,
          }}
        >
          <View style={{ paddingHorizontal: 25 }}>
            <HeaderSettings
              backAction={() => {
                if (phone != "" && changes) {
                  Alert.alert(
                    "Warning",
                    "Do you want to save your changes.",
                    [
                      {
                        text: "No",
                        onPress: () => navigation.goBack(),
                        style: "cancel",
                      },
                      {
                        text: "Yes, Save",
                        // onPress: () => {
                        //   // updateRecord("users", firebase.auth().currentUser.uid, {
                        //     phone: phone,
                        //   })
                        // .then(() => {
                        //   alert("Profile Saved");
                        //   updateUserContext().then(() => {
                        //     navigation.goBack();
                        //   });
                        // });
                        // },
                      },
                    ],
                    { cancelable: true }
                  );
                } else navigation.goBack();
              }}
              navigation={navigation}
            />
          </View>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 25,
            }}
          >

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Image
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 5,
                }}
                source={
                  user_context.profileImage
                    ? { uri: user_context.profileImage }
                    : Avatar_PLC
                }
              ></Image>

              {isUploading ? (
                <View
                  style={{
                    position: "absolute",
                    // height: '100%',
                    //      width: '100%',
                    // backgroundColor: 'blue',
                  }}
                >
                  <ActivityIndicator
                    animating={true}
                    color="#525252"
                    size={35}
                    style={{}}
                  />

                  <Text
                    style={{
                      marginTop: 20,
                    }}
                  >
                    Uploading {uploadProgress}%
                  </Text>
                </View>
              ) : null}

              <TouchableOpacity
                onPress={pickImage}
                style={{
                  marginTop: 10,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    color: "white",

                    fontSize: 10,
                  }}
                >
                  Choose Image
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <DataFields
                name={name}
                setname={setname}
                phone={phone}
                setphone={setphone}
                email={email}
                setemail={setemail}
                setchanges={setchanges}
              />
            </View>
            {/*    <ATMAButton
            text="Reset Password"
            variant="outlined"
            //  color="#FDB81E"
            onPress={() => {
              setprofileAlert({
                msg: "Resset Password",
                subMsg:
                  "To resset password a link will be sent to your email, click the emailed link to set new password.",

                onYes: (inputValue) => {
                  firebase
                    .auth()
                    .sendPasswordResetEmail(user_context.email)
                    .then(() => {
                      Alert.alert(
                        `Password Resset Email Sent to: ${user_context.email}`
                      );

                      setprofileAlert("");
                    })
                    .catch((error) => {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      var msg = "";
                      var subMsg = "";
                      if (
                        errorMessage == "The email address is badly formatted."
                      ) {
                        msg = `Invalid Email Address`;
                        subMsg = `Make sure yo have typed your email address correctly.`;
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
                  setprofileAlert("");
                },
                onYesTitle: "Email Link",
                onNoTitle: "Cancel",
              });
            }}
            style={{
              marginTop: 7,
            }}
          ></ATMAButton>
        */}

            {phone != "" && changes ? (
              <View
                style={{
                  height: 50,
                  //  backgroundColor: 'black',
                  width: "100%",
                }}
              >
                <ATMAButton
                  text="Save Changes"
                  color="#FDB81E"
                  onPress={() => {
                    updateRecord("users", firebase.auth().currentUser.uid, {
                      phone: phone,
                    }).then(() => {
                      alert("Profile Saved");
                      updateUserContext();
                    });
                  }}
                ></ATMAButton>
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>

    </Portal>
  );
}
