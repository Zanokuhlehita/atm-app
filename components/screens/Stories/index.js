import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { albumArt1, albumArt2, albumArt3, logo } from "../../plugins/assets";
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
import StoriesData from "./components/StoriesData";
import StoryView from "./components/StoryView";
import { secondary_color } from "../../theme/colors";
import { Portal } from "react-native-portalize";
import Header2 from "../../components/Header2";
import AlbumArt from "../../assets/images/cover_arts/love_life_loyalty.jpg";

export default function Stories() {
  const avatar_size = 50;
  const grad_color = "0,0,0"; // '29, 29, 29'
  const icon_size = 55;
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const modalScroll = useRef(null);
  const [modal, setmodal] = useState(false);

  const [isModelOpen, setModel] = useState(false);

  const onStorySelect = (index) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll) => {
    /*   const newIndex = currentUserIndex + 1;
        if (StoriesData.length - 1 > currentUserIndex) {
            setCurrentUserIndex(newIndex);
            if (!isScroll) {
                 modalScroll.current.scrollTo(newIndex, true);
             } 
        } else {
            setModel(false);
        } */
    setModel(false);
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      console.log("next");
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
      console.log("previous");
      setCurrentScrollValue(scrollValue);
    }
  };

  const renderSeperator = () => (
    <View style={{ height: 1, backgroundColor: "#ccc" }} />
  );

  const StoriesData1 = [
    {
      username: "Adler Tempo Music",
      profile: "https://avatars2.githubusercontent.com/u/45196619?s=460&v=4",
      title: "Record Label",
      stories: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1496287437689-3c24997cca99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",

          type: "image",
          duration: 2,
          isReadMore: true,
          line: "New stories feature\nComing Soon",
        },
      ],
    },
  ];

  return (
    <Portal>
      <ImageBackground
        source={AlbumArt}
        style={{
          // position: 'absolute',

          height: "100%",
          width: "100%",
        }}
      >
        <LinearGradient
          // Background Linear Gradient
          locations={[0, 0.25, 0.8, 1]}
          colors={[
            `rgba(${grad_color},1)`,
            `rgba(${grad_color},0.9)`,
            `rgba(${grad_color},0.8)`,
            `rgba(${grad_color},1)`,
          ]}
          style={{
            position: "absolute",
            width: "100%",
            opacity: 1,
            height: "100%",
            zIndex: 0,
          }}
        />
        <Header2 title="Storyline" />
        <StoryView
          onClose={onStoryClose}
          onStoryNext={onStoryNext}
          onStoryPrevious={onStoryPrevious}
          user={StoriesData[0]}
          isNewStory={false /* index !== currentUserIndex */}
        />
      </ImageBackground>
    </Portal>
  );
}
