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
import format from "date-fns/format";
import { Portal } from "react-native-portalize";
import BottomNavigation from "../Player/components/BottomNavigation";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ATMATextInput from "../../components/ATMATextInput";
import firebase from "firebase";
import { MainContext } from "../../contexts/MainContext";

export default function Support({ navigation }) {
  const { chat, setchat, user_context } = useContext(MainContext);
  const mainScrollView = useRef();
  useEffect(() => {
    firebase
      .firestore()
      .collection("support")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(
        (doc) => {
          setchat(doc.data());
        },
        (err) => {
          alert("Initial Songs array Data Update Error 250");
          console.log(`Encountered error: ${err}`);
        }
      );
    return () => {};
  }, []);
  const [message, setmessage] = useState("");
  const sendMessage = () => {
    if (!message) {
      //   seterror("Please type in the description to continue.");
      Alert.alert(
        "Empty Message",
        "Please type in your message to continue.",
        [
          {
            text: "Ok",
            onPress: () => {},
          },
        ],
        { cancelable: true }
      );
      return;
    }

    setmessage("");

    var data = {
      clientId: firebase.auth().currentUser.uid,
      clientName: user_context.userName,
      createdAt: new Date(),
      subject: "App Chat",
      message,
      chat: [
        {
          message: message,
          createdAt: new Date(),
          sender: "Client",
          seen: false,
          sent: true,
          lastDate: new Date(),
        },
      ],
      status: "open",
    };
    if (chat == undefined) {
      firebase
        .firestore()
        .collection("support")
        .doc(firebase.auth().currentUser.uid)
        .set(data)
        .then(() => {
          console.log("Record Added Succesfully");
        })
        .catch((e) => {
          alert("Error 4730.");
        });
    } else {
      var msgLocal = {
        message: message,
        createdAt: new Date(),
        sender: "Client",
        seen: false,
        sent: true,
      };
      var msg = {
        message: message,
        createdAt: format(new Date(), "Pp"),
        sender: "Client",
        seen: false,
        sent: false,
      };
      // const chatLocal = [...chat];
      if (chat != undefined) {
        setchatLocal([msg]);
      } else {
        setchatLocal([...chat.chat, msg]);
      }

      var chatLocal2 = [...chat.chat, msgLocal];

      firebase
        .firestore()
        .collection("support")
        .doc(firebase.auth().currentUser.uid)
        .update({ chat: chatLocal2 })
        .then(() => {
          console.log("Record Update Succesfull");
          //alert("Record Update Succesfull");
        })
        .catch((e) => {
          alert("Error Updating Record: Check your log for more info.");
          console.log("Error Updating Record", e);
        });
    }
  };
  useEffect(() => {
    console.log("chatLocal", chatLocal);
    if (chat != undefined) {
      setchatLocal(chat.chat ? chat.chat : []);
    }
    return () => {};
  }, [chat]);
  const [chatLocal, setchatLocal] = useState([]);
  return (
    <Portal>
      <ScrollView
        style={{}}
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View
          style={{
            height: "100%",
            flex: 1,
            backgroundColor: "rgba(255, 255, 255,1)",
          }}
        >
          <Header
            backAction={() => {
              navigation.goBack();
            }}
            title="Live Support Chat"
          ></Header>
          <ScrollView
            ref={(ref) => (mainScrollView.current = ref)}
            onContentSizeChange={() =>
              mainScrollView.current.scrollToEnd({ animated: true })
            }
          >
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
              {chatLocal == "" ? (
                <ChatMessage
                  message={{
                    message:
                      "Welcome to ATMA live chat support, one of our support team member will be ready to assist you with your needs. Thank You.",
                    createdAt: new Date(),
                    sender: "System",
                    seen: false,
                    sent: true,
                    lastDate: new Date(),
                  }}
                ></ChatMessage>
              ) : null}
              {chatLocal.map((item, i) => {
                return (
                  <ChatMessage message={item} key={i.toString()}></ChatMessage>
                );
              })}
            </View>
          </ScrollView>

          <View
            style={{
              backgroundColor: "white",

              flexDirection: "row",
              maxHeight: 160,
              width: "100%",
              borderTopWidth: 1,
              borderColor: "rgba(247, 247, 247, 1)",
              marginBottom: 10,
              paddingTop: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingHorizontal: 15,
                marginHorizontal: 10,

                borderRadius: 5,
                borderWidth: 1,
                borderColor: "rgba(204, 204, 204, 1)",
              }}
            >
              <TextInput
                onChangeText={(e) => {
                  setmessage(e);
                }}
                value={message}
                multiline
                placeholder="Write a message..."
              />
            </View>
            <View
              style={{
                //  width: 80,
                right: 5,

                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={sendMessage} style={{ padding: 10 }}>
                <Ionicons
                  name="ios-send-outline"
                  size={24}
                  color="rgba( 0,0,0, 0.7)"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Portal>
  );
}
