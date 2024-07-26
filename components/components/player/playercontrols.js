import React, { Component, useEffect, useState, useContext, useRef } from 'react'
import {
    AppRegistry, Button, StyleSheet, Text, View, TouchableHighlight, Image
    , ActivityIndicator, TouchableWithoutFeedback, Easing, Animated
} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MainContext } from '../../contexts/MainContext'
import { EventRegister } from 'react-native-event-listeners'
import CircleSlider from './mainview/playercontrols/circleslider'
import { DataContext } from '../../contexts/DataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PlayerControls() {
    const context = useContext(MainContext)
    const dispatch = useDispatch()
    const {
        now_playing_playlist, soundAll_ref, now_playing_ref, play_status, isPlayerControl,
        song_duration, repeat, shuffle, OnPlaybackStatusUpdate
    } = useContext(MainContext)
    const { recent_play_ref } = useContext(DataContext)
    const circle_slider = useRef()

    const [loading_indicator, setloading_indicator] = useState(false)

    const skip_disabled = useRef(false)
    const loading_song = useRef(false)
    /* LOCAL STATE: START */

    const loadAudio = async (index, shouldPlay, local) => {
        if (loading_song.current) {
            return
        } else {
            loading_song.current = true
            if (soundAll_ref.current) await soundAll_ref.current.unloadAsync()
            if (index === undefined) {
                index = 0
            }
            try {
                const sound = new Audio.Sound()
                const song_link = now_playing_playlist.current[index].link
                const status_play = {
                    shouldPlay: true,
                    //volume: volume
                }
                await sound.loadAsync({ uri: song_link }, status_play)
                soundAll_ref.current = sound
                const Mill = await sound.getStatusAsync();
                let duration = Mill.durationMillis;
                song_duration.current = duration / 1000
                sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate.current)
                now_playing_ref.current = index
                if (shouldPlay) play_status.current = true
                setplaylist_end(false)
            } catch (e) {
                console.log("my error", e)
            }
            loading_song.current = false
            isPlayerControl.current = false
        }

    }
    const recent_fired = useRef(false)

    const storeData = async (storageKey, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(storageKey, jsonValue)

        } catch (e) {
            // saving error
        }
    }
    const getData = async (storageKey) => {
        try {
            const jsonValue = await AsyncStorage.getItem(storageKey)
            if (jsonValue != null) {
                // console.log(JSON.parse(jsonValue))

                const value = JSON.parse(jsonValue)
                recent_play_ref.current = value
            } else {
                console.log('empty value');
            }

        } catch (e) {
            // error reading value
        }
    }

    const should_refresh_views = useRef(false)

  

    const [playlist_end, setplaylist_end] = useState(false)

    async function skip(direction) {
        skip_disabled.current = true
        setloading_indicator(true)
        let index
        if (direction == 'next') {
            index = now_playing_ref.current + 1 > now_playing_playlist.current.length - 1 ? /* 0 */ EventRegister.emit('scroll_to_playlist_end') : now_playing_ref.current + 1
            if (!index) {
                play_status.current = !play_status.current
                setplaylist_end(true)
                setloading_indicator(false)
                return
            }
        }
        if (direction == 'prev') {
            index = now_playing_ref.current == 0 ? now_playing_playlist.current.length - 1 : now_playing_ref.current - 1
            if (playlist_end == true) index = now_playing_playlist.current.length - 1
        }
        if (playlist_end) {
            EventRegister.emit('slideTo', index)
            setloading_indicator(false)
            setplaylist_end(false)
            skip_disabled.current = false
            should_refresh_views.current = true
            setupdate(Math.round())
            return
        }
        if (soundAll_ref.current) {
            await soundAll_ref.current.unloadAsync()
        }
        try {
            loadAudio(index)
            play_status.current = true
            isPlayerControl.current = true
            EventRegister.emit('slideTo', index)
            should_refresh_views.current = true
        } catch (error) {
        }
    }
    /////////////////////////////////////////////////

    const [update, setupdate] = useState()

    const handlePlayPause = async () => {
        if (soundAll_ref.current) {
            play_status.current = !play_status.current
            try {
                play_status.current ? await soundAll_ref.current.playAsync() : await soundAll_ref.current.pauseAsync()
            } catch (e) {
                console.log('playpause error', e)
                loadAudio(0)
            }
        }
        else {
            play_status.current = !play_status.current
            loadAudio(now_playing_ref.current)
        }
        setupdate(!update)
    }

    const opacity = useRef(new Animated.Value(0)).current
    const [now_playlist_name, setnow_playlist_name] = useState('All Tracks')
    const listener = useRef()
    const timerScale_listener = useRef()
    useEffect(() => {
        timerScale_listener.current = EventRegister.addEventListener('show_small_timer', (status) => {

            status ?
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true

                }).start() :
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 60,
                    useNativeDriver: true
                }).start()
        })
        listener.current = EventRegister.addEventListener('songs', (playlist) => {
            if (playlist == 'all_tracks') setnow_playlist_name('All Tracks')
            if (playlist == 'new_tracks') setnow_playlist_name('New Tracks')
            if (playlist == 'hot_tracks') setnow_playlist_name('Hot Tracks')
            if (playlist == 'reset') setnow_playlist_name('none')
            if (playlist == 'suggested_plays') setnow_playlist_name('Suggested Plays')
            if (playlist == 'recent_plays') setnow_playlist_name('Recent Plays')
            //if (playlist == 'favorites') setnow_playlist_name('Favorites)
            if (playlist == 'new_releases') setnow_playlist_name('New Releases')
            if (playlist == 'suggested_single_play') setnow_playlist_name('Single Play')
            ///////// playlists //////////////
            if (playlist == 'love_vibes') {
                setnow_playlist_name('Love Vibes Playlist')
            }
            if (playlist == 'soul_trap') {

                setnow_playlist_name('Soul Trap Playlist')
            }
            if (playlist == 'hustlers_mind') {

                setnow_playlist_name('Hustlers Mind Playlist')
            }
            if (playlist == 'loyalty') {

                setnow_playlist_name('Loyalty Playlist')
            }
            if (playlist == 'album_intros') {

                setnow_playlist_name('Album Intros Playlist')

            }
            ///////// moods //////////
            if (playlist == 'happy') {

                setnow_playlist_name('Happy Mood')
            }
            if (playlist == 'love') {

                setnow_playlist_name('Love Mood')
            }
            if (playlist == 'heart_broken') {

                setnow_playlist_name('Heart Broken')
            }
            if (playlist == 'grateful') {

                setnow_playlist_name('Grateful')
            }
            if (playlist == 'overwhelmed') {

                setnow_playlist_name('Overwhelmed')
            }
            if (playlist == 'flattery') {

                setnow_playlist_name('Flattery')
            }
            if (playlist == 'Afro Beat') {

                setnow_playlist_name('Afro Beat')
            }
        })
        return () => {
            EventRegister.removeEventListener(listener.current)

            EventRegister.removeEventListener(timerScale_listener.current)
        }
    }, [])
    const lyrics_listener = useRef()
    const timer = useRef(0)
    const updatelistener = useRef()
    useEffect(() => {
        lyrics_listener.current = EventRegister.addEventListener('sound_position', (pos) => {

            const move = Math.round((pos / song_duration.current) * 100)
            if (move == timer.current) return
            timer.current = move
            try {
                circle_slider.current.animate(move, 60, Easing.quad, null, true)


            } catch (error) {
                console.log('timer not working plc')
            }

        })
        updatelistener.current = EventRegister.addEventListener('update_playercontrols', () => {
            setupdate(!update)
            console.log('update refresh')
        })


        return () => {
            EventRegister.removeEventListener(updatelistener.current)
            EventRegister.removeEventListener(lyrics_listener.current)

        }
    }, [])
    return (

        <View style={{

            height: '100%',
            width: '100%',
            backgroundColor: '#181B1F',
            paddingHorizontal: '10%',
        }}
        >
            <View style={{
                justifyContent: 'space-around', alignItems: 'center',
                flexDirection: 'row',
                height: " 50%", position: 'relative', top: '-3%'

            }}>

                <TouchableOpacity
                    disabled={now_playing_ref.current == 0 ? true : false}
                    onPress={() => { skip('prev') }} style={{
                        borderRadius: 50, width: 70, height: 70
                        , alignItems: 'center', justifyContent: 'center',
                    }}>
                    <View style={{
                        elevation: 5,
                        width: 40, height: 40, borderRadius: 50,
                        backgroundColor: '#181B1F', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <FontAwesome style={{ marginRight: '8%', marginTop: '-6%' }} name="angle-double-left" size={24} color={now_playing_ref.current == 0 || skip_disabled.current ? 'grey' : 'white'} />
                    </View>

                </TouchableOpacity>
                <View style={{
                    // backgroundColor: 'yellow',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 8
                }}>



                    <TouchableOpacity

                        onPress={handlePlayPause}
                        disabled={playlist_end ? true : false}
                        style={{
                            borderRadius: 50, width: 100, height: 100
                            , alignItems: 'center', justifyContent: 'center',
                        }}>
                        <Animated.View style={{
                            position: 'absolute',
                            zIndex: 150,
                            opacity

                        }}>
                            <AnimatedCircularProgress

                                ref={circle_slider}
                                size={71}
                                width={1}
                                fill={0}
                                tintColor='rgba(255,30,30,0.9)'
                                rotation={0}

                            />
                        </Animated.View>
                        <View
                            style={{
                                elevation: 5,
                                width: 70, height: 70, borderRadius: 50,
                                backgroundColor: '#181B1F',
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                            }}>
                            <View style={{
                                position: 'absolute', flex: 1,
                                alignItems: 'center', justifyContent: 'center',
                                backgroundColor: 'transparent', height: 100, width: 100
                                , zIndex: 100
                            }}>
                                <CircleSlider
                                    percentage={360}
                                    color={'red'}
                                    delay={500 + 100}
                                    max={360} />
                            </View>
                            {play_status.current ? <Feather style={{ marginLeft: '4%', }} name="pause" size={22} color={'rgb(150, 50, 0)'} />
                                :
                                <Ionicons style={{ marginLeft: '10%', marginTop: '0%' }} name="ios-play" size={35} color={'white'} />
                            }
                        </View>

                        <ActivityIndicator style={{
                            position: 'absolute',
                            zIndex: 100,

                        }} size={85}
                            color="red"
                            animating={loading_indicator} />


                    </TouchableOpacity>
                </View>



                <TouchableOpacity
                    disabled={skip_disabled.current}
                    onPress={() => { skip('next') }} style={{
                        borderRadius: 50, width: 70, height: 70
                        , alignItems: 'center', justifyContent: 'center',
                    }}>
                    <View style={{
                        elevation: 5,
                        width: 40, height: 40, borderRadius: 50,
                        backgroundColor: '#181B1F', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <FontAwesome style={{ marginLeft: '8%', marginTop: '-6%' }} name="angle-double-right" size={24}
                            color={playlist_end || skip_disabled.current ? 'grey' : 'white'} />
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{
                alignItems: 'center', position: 'relative',
                bottom: -20
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: 'grey', fontSize: 10,
                }}>{now_playlist_name}{/*{now_playing_ref.current}*/}</Text>
                <View style={{ backgroundColor: 'grey', height: 1, width: 18, marginVertical: 7 }}></View>
            </View>
        </View>
        /*      </TouchableWithoutFeedback> */
    )

}

