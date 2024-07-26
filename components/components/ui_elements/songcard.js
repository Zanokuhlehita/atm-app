import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import { DataContext } from '../../contexts/DataContext';
import { MainContext } from '../../contexts/MainContext';
import { Audio } from 'expo-av';

import { EventRegister } from 'react-native-event-listeners'


export default function Songcard({ cover_image, id, song_name, cover_art_link, artists, featuring_artists, song_link_name }) {
    const { now_playing_ref, soundAll_ref, song_duration, shuffle, repeat, play_status,
        isPlayerControl
    } = useContext(MainContext)


    const [update, setupdate] = useState()
    const listener2 = useRef()
    const listener = useRef()
    const [now_playing_id, setnow_playing_id] = useState(0)
    useEffect(() => {
        listener.current = EventRegister.addEventListener('update_now_playing', (i) => {
            setnow_playing_id(i)
        })

        listener2.current = EventRegister.addEventListener('update_views', () => {
            setTimeout(() => {
                setupdate(Math.random())
            }, 0);
            setTimeout(() => {
                setupdate(Math.random())
            }, 1500);
            setTimeout(() => {
                setupdate(Math.random())
            }, 3000);
        })

        return () => {
            EventRegister.removeEventListener(listener2.current)
            EventRegister.removeEventListener(listener.current)

        }
    }, [])

    const handlePlayPause = async () => {
        if (soundAll_ref.current) {
            play_status.current = !play_status.current
            try {
                play_status.current ? await soundAll_ref.current.playAsync() : await soundAll_ref.current.pauseAsync()
            } catch (e) {
                console.log('playpause error', e)
            }
        }
        else {
            play_status.current = !play_status.current
            loadAudio(now_playing_ref.current)
        }
        setupdate(!update)
    }


    const loading_song = useRef()
    const skip_disabled = useRef()
    const loadAudio = async (index, shouldPlay, local) => {
        //  console.log('loadsong of mainswiper', index)

        if (loading_song.current) {
            return
        } else {

            loading_song.current = true
            isPlayerControl.current = true
            if (soundAll_ref.current) await soundAll_ref.current.unloadAsync()

            if (index === undefined) {
                index = 0
            }

            EventRegister.emit('slideTo', id)

            try {
                const sound = new Audio.Sound()
                // const song_link = now_playing_playlist.data[index].song_link
                const status_play = {
                    shouldPlay: true//isPlaying,
                    //volume: volume 
                }
                await sound.loadAsync({ uri: song_link }, status_play)

                soundAll_ref.current = sound

                const Mill = await sound.getStatusAsync();
                let duration = Mill.durationMillis;

                song_duration.current = duration / 1000

                sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate)




                //setsound_data(sound)


                now_playing_ref.current = id
                if (shouldPlay) play_status.current = true




            } catch (e) {
                console.log("my error", e)
            }
            loading_song.current = false

            skip_disabled.current = false
            isPlayerControl.current = false


        }

    }

    async function OnPlaybackStatusUpdate(status) {
        const pos = (status.positionMillis / 1000).toFixed(1);
        EventRegister.emit('sound_position', pos)
        if (status.didJustFinish) {
            if (repeat.current) {
                loadAudio(now_playing_ref.current)
                console.log('repeating')
            }
            else {
                if (shuffle.current) {
                    console.log('shuffling')
                    index = Math.floor(Math.random() * 6);
                    skip_disabled.current = true
                    setloading_indicator(true)
                    if (soundAll_ref.current) {
                        await soundAll_ref.current.unloadAsync()
                    }
                    try {
                        loadAudio(index, true)
                        play_status.current = true
                        isPlayerControl.current = true

                        EventRegister.emit('slideTo', index)


                    } catch (error) {
                        console.log('play prev error', index, error)
                    }
                    setloading_indicator(false)
                } else {
                    handleNext()
                    console.log('playing next')
                }

            }

        }
    }
    function play() {

    }
    const { width, height } = Dimensions.get('window');

    return (
        <TouchableWithoutFeedback >


            <View>



                <View style={{
                    // margin: 8,
                    backgroundColor: now_playing_id == id ? 'rgb(51, 51, 51)' : 'rgba(0,0,0,0)',

                    width: width,
                    height: 60, width: '100%',
                    flexDirection: 'row',
                    borderRadius: 10,
                    paddingHorizontal: 5
                }}>
                    <TouchableOpacity
                        onPressIn={() => { console.log('touched') }}
                        style={{
                            height: 60, width: '100%',
                            flexDirection: 'row'
                        }}
                        onPress={() => {
                            EventRegister.emit('update_now_playing', id)
                            loadAudio()
                        }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                            <View style={{
                                height: 48, width: 48,
                                borderRadius: 5,
                                backgroundColor: 'rgba(200,30,30, 0.3)',
                                alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Image style={{
                                    height: 45, width: 45,
                                    borderRadius: 3,
                                }} source={cover_image}></Image>
                            </View>




                        </View>
                        <View style={{
                            alignItems: 'flex-start', width: '80%', paddingVertical: 4,
                            paddingHorizontal: 5

                        }}>

                            <Text style={{
                                color: 'white', fontWeight: 'bold'
                                , fontSize: 17, paddingVertical: 3
                            }}>{song_name}{/* {now_playing_id}{now_playing_ref.current} {id} */}</Text>
                            <Text
                                style={{ color: 'white', fontSize: 12 }}>{artists} {featuring_artists ? `ft ${featuring_artists}` : null}
                            </Text>

                        </View>
                    </TouchableOpacity>
                    {/*  <TouchableOpacity
                    onPress={() => {
                        if (now_playing_id == id) { handlePlayPause() }
                        else {
                            EventRegister.emit('update_now_playing', id)
                            loadAudio()
                            setupdate(Math.random())
                        }
                    }}
                    style={{
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //backgroundColor: 'pink'

                    }}>
                    <View style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgb(51, 51, 51)',
                        alignSelf: 'center',
                        borderRadius: 50
                    }}>
                        {now_playing_id == id ?
                            play_status.current ? <Feather name="pause" size={13} color='rgba(221, 82, 70,0.6)' />
                                :
                                <Ionicons name="ios-play" size={15} color="white" />

                            : <Feather name="more-horizontal" size={18} color="white" />
                        }


                    </View>
                </TouchableOpacity> */}
                </View>
            </View >

        </TouchableWithoutFeedback>


    )
}
