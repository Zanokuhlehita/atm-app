import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { MainContext } from '../../../../contexts/MainContext'
import { secondary_color, text_color_secondary } from '../../../../theme/colors'
import { EventRegister } from 'react-native-event-listeners'



export default function MainView({ style, playing, setplaying, lyrics, setlyrics, playlist, setplaylist }) {

    const { allSongs, setallSongs_context , currentIndex_context_ref } = useContext(MainContext)

    const listener = useRef()
    const [songName, setsongName] = useState();
    const [songArtist, setsongArtist] = useState();
    const [songCoverArt, setsongCoverArt] = useState();
    useEffect(() => {
        setsongName(allSongs[currentIndex_context_ref.current].name)
        setsongArtist(allSongs[currentIndex_context_ref.current].artists)
        setsongCoverArt(allSongs[currentIndex_context_ref.current].coverArt)

        listener.current = EventRegister.addEventListener('updatenowplaying', (v) => {
            setsongName(allSongs[v].name)
            setsongArtist(allSongs[v].artists)
            setsongCoverArt(allSongs[v].coverArt)

        })
        return () => {
            EventRegister.removeEventListener(listener.current)
        }
    }, [])



    const font_size = 22
    return (
        <View style={[{
            height: '55%',
            width: '100%',
           // backgroundColor: 'green',
            flexDirection: 'row',
            marginTop: 10,

        }, style]}>
      {/*       {    playing ? <Playing songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} /> : null}
            {    playlist ? <Playlist songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} /> : null}
            {    lyrics ? <Lyrics songName={songName} songArtist={songArtist} songCoverArt={songCoverArt} /> : null}
 */}
        </View>

    )
}
