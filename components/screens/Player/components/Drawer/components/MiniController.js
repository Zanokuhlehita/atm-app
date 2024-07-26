import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'

import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { MainContext } from '../../../../../contexts/MainContext';
import { EventRegister } from 'react-native-event-listeners'
import { getAllRecordsLevel2 } from '../../../../../plugins/firebase';

export default function MiniController() {
    const { isPlaying_context_ref, soundAll_ref,
        currentIndex_context_ref, allSongs,
        setallSongs_context, setnowPlayingLyrics_context } = useContext(MainContext)

    const [isPlaying, setisPlaying] = useState(false);

    const icon_size = 18
    const icon_size_center = 50
    const icon_color ='white'

    const artist = allSongs[currentIndex_context_ref.current].artists
    const name = allSongs[currentIndex_context_ref.current].name

    const loadAudio = async (index, shouldPlay, local) => {
        EventRegister.emit('activityindicator', true)

        try {
            const sound = new Audio.Sound()
            const song_link = allSongs[index].link
            const status_play = {
                shouldPlay: true,
                //volume: volume
            }
            await sound.loadAsync({ uri: song_link }, status_play)
            soundAll_ref.current = sound
       
            sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate.current)
         
            EventRegister.emit('activityindicator', false)
            EventRegister.emit('updatenowplaying', index)
            EventRegister.emit('resetslider')
            EventRegister.emit('nowplayingcode', allSongs[index].code)


            getAllRecordsLevel2('songs', allSongs[index].code, 'more').then((lyricsDoc) => {
                if (lyricsDoc == []) setnowPlayingLyrics_context([{
                    line: 'No Lyrics Found',

                }])
                else {
                    setnowPlayingLyrics_context(lyricsDoc[0].lyrics)

                }

            })
        } catch (e) {
            console.log("my error", e)
        }
        /*   loading_song.current = false
           isPlayerControl.current = false
       }
*/
    }



    /////////////////////////////////////////////////////////////////////////////////    

    const handlePlayPause = async () => {


        if (soundAll_ref.current) {

            try {
                if (isPlaying) {
                    await soundAll_ref.current.pauseAsync()
                    setisPlaying(false)
                    isPlaying_context_ref.current = false
                    EventRegister.emit('updateplaypause', false)

                }
                else {
                    await soundAll_ref.current.playAsync()
                    setisPlaying(true)
                    isPlaying_context_ref.current = true
                    EventRegister.emit('updateplaypause', true)

                }


            } catch (e) {
                console.log('playpause error', e)
                loadAudio(0)
            }
        }
        else {

            setisPlaying(true)
            loadAudio(0)
        }
    }

    return (


                                        <View style={{
            paddingHorizontal: 30,
            height: '100%',
            //backgroundColor: 'blue',
            height: 35,
            justifyContent: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: 'rgba(255,255,255, 0.1)',
                                }}>
                                    
        
        <View
        
                style={{

                flexDirection: 'row',
                alignItems: 'center',
             //   height: 60,

            }}
        >
            
            <View style={{
              
                flex: 1,
            }}>
                <Text style={{
                    color: 'white',
                    }}>{name} - {artist}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 80,
                height: '100%',
               // backgroundColor: 'blue',

            }}>
                <TouchableOpacity
                        onPress={() => {
                            EventRegister.emit('skip', 'prev')

                    }}

                    style={{
                        // backgroundColor: 'white',
                       // height: 50,
                       // width: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Entypo name="controller-jump-to-start" size={icon_size} color={icon_color} />
                </TouchableOpacity>
                <TouchableOpacity
                   onPress={handlePlayPause}

                    style={{
                        // backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                     //   height: 70,
                     //   width: 70,

                    }}>
                    {isPlaying ?
                        <MaterialIcons
                            style={{
                                //color: text_color_secondary,
                                elevation: 24


                            }}
                            name="pause-circle-filled" size={icon_size_center - 20} color='white' />
                            : <Entypo name="controller-play" size={icon_size_center - 20} color={'white'} />
                    }

               </TouchableOpacity>

                <TouchableOpacity
                        onPress={() => {
                            EventRegister.emit('skip', 'next')

                    }}

                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                       // height: 60,
                       // width: 50,
                        // backgroundColor: 'white',
                    }}>
                    <Entypo name="controller-next" size={icon_size} color={icon_color} />

                </TouchableOpacity>
            </View>
            </View>
        </View>

    )
}
