import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import Info from './components/Info'
import Lyrics from './components/Lyrics'
import MiniController from './components/MiniController'
import Nothing from './components/Nothing'
import Playlist from './components/Playlist'
import Stories from './components/Stories'
import { EventRegister } from 'react-native-event-listeners'
import Header from "./components/Header";
export default function Drawer({ openDrawer, songName, songArtist, songCoverArt,
    showLyrics,
    setshowLyrics,
    showStories,
    setshowStories,
    showInfo,
    setshowInfo,
    showPlaylist,
    setshowPlaylist,
    showNothing,
    setshowNothing
}) {
  
 
    const { width, height } = Dimensions.get('window')

    const Stack = createStackNavigator();

  
    const screens = [
        { name: 'Lyrics', component: <Lyrics songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} /> },

        { name: 'Stories', component: <Stories songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} />  },
        { name: 'Playlist', component: <Playlist songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} /> },

        { name: 'Playing', component: <Info songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} /> },

    ]
  const listener = useRef()

useEffect(() => {
    
    listener.current = EventRegister.addEventListener('playsong', () => {
setshowLyrics(false)

    })



    return () => {
        EventRegister.removeEventListener(listener.current)

    }
}, [])

  
    return (
        <View
            style={{
                //position: 'absolute',
                backgroundColor: 'rgba(29, 29, 29, 1)',
                width: '100%',
               height: "100%",
             //  height: height,

              marginTop: 30,
overflow:'hidden'

            }}
        >
            <View style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                
                height: 70,
                position: 'absolute',
                zIndex: 10,
                width: '100%',
                backgroundColor: 'rgba(24, 24, 24, 0.8)',
                borderBottomWidth: 0.5,
                borderBottomColor: 'rgba(255,255,255, 0.15)',
//opacity:0.4
              //  overflow: 'hidden',

            }}>

                <Header
                    showLyrics={showLyrics}
                    setshowLyrics={setshowLyrics}
                    showStories={showStories}
                    setshowStories={setshowStories}
                    showInfo={showInfo}
                    setshowInfo={setshowInfo}
                    showPlaylist={showPlaylist}
                    setshowPlaylist={setshowPlaylist}
                    showNothing={showNothing}
                    setshowNothing={setshowNothing}
                />
{/* <MiniController/> */}
            </View>
          
         {/*    <View style={{
                zIndex: 0,


            }}>
                {    openDrawer    ? <FlatList
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    data={screens}
                    snapToInterval={width}
                    decelerationRate={1}
                    renderItem={
                        ({ item }) => {
                            return (
                                <View style={{
                                    //  backgroundColor: 'blue',
                                    width: width,
                                    height: '100%',

                                }}>
                                    {item.component}
                                </View>
                            )

                        }}
                />
                    : null    }

    

          

            </View>
          */}
            { showLyrics ? <Lyrics setshowLyrics={setshowLyrics} setshowNothing={setshowNothing} songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} /> : null}
            {  showStories  ? <Stories songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} />    : null}
            {   showPlaylist ? <Playlist songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} />  : null}
            {  showInfo  ? <Info songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} /> : null}
            {  showNothing ? <Nothing  /> : null}


        </View>
    )
}
