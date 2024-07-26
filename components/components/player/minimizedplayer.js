import React, { useState, useEffect, useRef, useContext } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, FlatList, Dimensions, Animated, Easing, ActivityIndicator } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper'
import CircleSlider from './mainview/playercontrols/circleslider'

import Songs from '../../assets/songs/Songs'
import { playsong, nowplayingid, skipbuttonpress } from '../../plugins/store/actions'
import { minimizeplayer } from '../../plugins/store/actions'
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { EventRegister } from 'react-native-event-listeners'
import { Audio } from 'expo-av';


import { TouchableOpacity } from 'react-native-gesture-handler';
import { MainContext } from '../../contexts/MainContext';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../contexts/DataContext';

import suggested_plays from '../../contexts/data/suggestedplays'
import new_releases from '../../contexts/data/newreleases'

import { love_vibes } from '../../contexts/data/playlists/love_vibes'
import { soul_trap } from '../../contexts/data/playlists/soul_trap'
import { hustlers_mind } from '../../contexts/data/playlists/huslters_mind'
import { loyalty } from '../../contexts/data/playlists/loyalty'
import { album_intros } from '../../contexts/data/playlists/album_intros'
import { love } from '../../contexts/data/moods/love'
import { happy } from '../../contexts/data/moods/happy'
import { heart_broken } from '../../contexts/data/moods/heart_broken'
import { grateful } from '../../contexts/data/moods/grateful'
import { overwhelmed } from '../../contexts/data/moods/overwhelmed'
import { flattery } from '../../contexts/data/moods/flattery'
import { afro_beat } from '../../contexts/data/moods/afro_beat'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
export default function Minimizedplayer({ navigation }) {
    // const navigation = useNavigation()
    const { isPlaying, setisPlaying, isMinimized,
        now_playing_playlist, skip_to, soundAll_ref, song_init_render,
        test, settest, now_playing_ref, play_status, disable_player_maximize, show_player_minimized, song_duration
    } = useContext(MainContext)


    const { all_tracks, new_tracks, new_tracks_ref, all_tracks_ref, hot_tracks_ref, recent_play_ref } = useContext(DataContext)

    const { width, height } = Dimensions.get('window');

    const dispatch = useDispatch()
    // const songs_imported = require('../../assets/songs/songs')
    const { player_is_minimized } = useSelector(state => state.settings)

    const minimized = useState(new Animated.Value(0))[0]
    const scale = useRef(new Animated.Value(0)).current
    const listener = useRef()
    const listener2 = useRef()
    const listener3 = useRef()
    const timer = useRef()

    const [displayListener, setdisplayListener] = useState()
    const [display, setdisplay] = useState('flex')
    useEffect(() => {


        listener2.current = EventRegister.addEventListener('songs', (playlist) => {
            if (playlist == 'all_tracks') {
                now_playing_playlist.current = all_tracks_ref.current
                setupdate(Math.random())
            }
            if (playlist == 'new_tracks') {

                now_playing_playlist.current = new_tracks_ref.current
                setupdate(Math.random())

            }
            if (playlist == 'hot_tracks') {

                now_playing_playlist.current = hot_tracks_ref.current
                setupdate(Math.random())

            }
            if (playlist == 'reset') {

                now_playing_playlist.current = []
                setupdate(Math.random())

            }

            if (playlist == 'suggested_plays') {

                now_playing_playlist.current = suggested_plays
                setupdate(Math.random())


            }
            if (playlist == 'recent_plays') {
                now_playing_playlist.current = recent_play_ref.current
                setupdate(Math.random())

            }
            //if (playlist == 'favorites') setplayer_data(hot_tracks_ref.current)
            if (playlist == 'new_releases') {
                now_playing_playlist.current = new_releases
                setupdate(Math.random())

            }

            if (playlist == 'suggested_single_play') {
                now_playing_playlist.current = [suggested_plays[song_init_render.current]]
                setupdate(Math.random())

            }
            ///////// playlists //////////////
            if (playlist == 'love_vibes') {
                now_playing_playlist.current = love_vibes
                setupdate(Math.random())

            }
            if (playlist == 'soul_trap') {
                now_playing_playlist.current = soul_trap
                setupdate(Math.random())

            }
            if (playlist == 'hustlers_mind') {
                now_playing_playlist.current = hustlers_mind
                setupdate(Math.random())

            }
            if (playlist == 'loyalty') {
                now_playing_playlist.current = loyalty
                setupdate(Math.random())

            }
            if (playlist == 'album_intros') {
                now_playing_playlist.current = album_intros
                setupdate(Math.random())

            }
            ///////// moods //////////
            if (playlist == 'happy') {
                now_playing_playlist.current = happy
                setupdate(Math.random())

            }
            if (playlist == 'love') {
                now_playing_playlist.current = love
                setupdate(Math.random())

            }
            if (playlist == 'heart_broken') {
                now_playing_playlist.current = heart_broken
                setupdate(Math.random())

            }
            if (playlist == 'grateful') {
                now_playing_playlist.current = grateful
                setupdate(Math.random())

            }
            if (playlist == 'overwhelmed') {
                now_playing_playlist.current = overwhelmed
                setupdate(Math.random())

            }
            if (playlist == 'flattery') {
                now_playing_playlist.current = flattery
                setupdate(Math.random())

            }
            if (playlist == 'Afro Beat') {
                now_playing_playlist.current = afro_beat
                setupdate(Math.random())

            }
        })

        listener.current = EventRegister.addEventListener('minimize_player', (status) => {


            if (status) {
                Animated.timing(minimized, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }).start();
            } else {
                Animated.timing(minimized, {
                    toValue: 65,
                    duration: 500,
                    useNativeDriver: true
                }).start();
            }
        })
        listener3.current = EventRegister.addEventListener('sound_position', (pos) => {

            const move = Math.round((pos / song_duration.current) * 100)
            if (move == timer.current) return
            timer.current = move
            try {
                circle_slider.current.animate(move, 60, Easing.quad, null, true)


            } catch (error) {
                console.log('timer not working mini')
            }

        })
        return () => {
            EventRegister.removeEventListener(listener.current)
            EventRegister.removeEventListener(listener2.current)
            EventRegister.removeEventListener(listener3.current)


        }
    }, [])
    const circle_slider = useRef()
    const [loading_song, setloading_song] = useState()

    const loadAudio = async (index, shouldPlay, local) => {
        console.log('loadsong of minimized', index, local)

        if (loading_song || now_playing_ref.current == index) {
            console.log('failed mini load check')

            return
        }





        setloading_song(true)
        if (soundAll_ref.current) await soundAll_ref.current.unloadAsync()

        if (index === undefined) {
            index = 0
        }

        EventRegister.emit('slideTo', index)
        should_refresh_views.current = true

        try {
            const sound = new Audio.Sound()
            const song_link = now_playing_playlist.current[index].link
            const status_play = {
                shouldPlay: true//isPlaying,
                //volume: volume
            }


            sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate)

            await sound.loadAsync({ uri: song_link }, status_play)
            const Mill = await sound.getStatusAsync();
            let duration = Mill.durationMillis
            song_duration.current = duration / 1000

            soundAll_ref.current = sound

            now_playing_ref.current = index
            if (shouldPlay) play_status.current = true
        } catch (e) {
            console.log("my error", e)
        }
        setloading_song(false)


    }
    const should_refresh_views = useRef(false)
    const recent_fired = useRef(false)

    async function OnPlaybackStatusUpdate(status) {
        const pos = Math.round(status.positionMillis / 1000)
        EventRegister.emit('sound_position', pos)

        if (should_refresh_views.current) {
            should_refresh_views.current = false
            EventRegister.emit('update_lyrics')
            EventRegister.emit('update_stories')
            EventRegister.emit('update_views')
            setTimeout(() => {
                setloading_indicator(false)
            }, 1500);
        }
        if (Math.round(pos) == 5) {
            EventRegister.emit('update_swipe_up')

            if (recent_fired.current == false) {
                recent_fired.current = true
                recent_play_ref.current = recent_play_ref.current.filter((item) => {
                    return item.song_name != now_playing_playlist.current[now_playing_ref.current].song_name
                })
                recent_play_ref.current.unshift(now_playing_playlist.current[now_playing_ref.current])
                setTimeout(() => {
                    storeData('recent_plays', recent_play_ref.current)
                    recent_fired.current = false
                    console.log('updated recent plays');
                    //send message update recent plays
                    EventRegister.emit('update_recent_plays')
                }, 1500);
            }


        }


        if (status.didJustFinish) {
            if (repeat.current) {
                loadAudio(now_playing_ref.current, true, true)
                console.log('repeating')
            }
            else {
                if (shuffle.current) {
                    console.log('shuffling')
                    index = Math.floor(Math.random() * 6);

                    setloading_indicator(true)
                    if (soundAll_ref.current) {
                        await soundAll_ref.current.unloadAsync()
                    }
                    try {
                        loadAudio(index, true, true)
                        play_status.current = true
                        isPlayerControl.current = true
                        EventRegister.emit('slideTo', index)

                    } catch (error) {
                        console.log('play on finish error', index, error)
                    }
                    setloading_indicator(false)
                } else {
                    const index = now_playing_ref.current + 1 > 8 - 1 ? 0 : now_playing_ref.current + 1

                    console.log('playing next')
                    setloading_indicator(true)
                    if (soundAll_ref.current) {
                        await soundAll_ref.current.unloadAsync()
                    }
                    try {
                        loadAudio(index, true)
                        play_status.current = true
                        isPlayerControl.current = false
                        EventRegister.emit('slideTo', index)

                    } catch (error) {
                        console.log('play on finish error', index, error)
                    }
                    setloading_indicator(false)
                }

            }

        }
    }


    const storeData = async (storageKey, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(storageKey, jsonValue)

        } catch (e) {
            // saving error
        }
    }



    const onViewChangeRef = React.useRef(({ viewableItems }) => {
        if (isMinimized.current) {
            try {
                loadAudio(viewableItems[0].index, true, true)
            } catch (error) {
                console.log('mainview error', error)
            }
        }
        else {
            console.log('mini player change song does nothin')

            return
        }
    })
    const viewConfigRef = useRef(
        { itemVisiblePercentThreshold: 60 }
    )

    const play_listener = useRef()

    const update_listener = useRef()
    const [is_mini, setis_mini] = useState(true)
    const slider = useRef()
    const [cover_image, setcover_image] = useState(require('../../assets/images/covers/love_life_loyalty_ep.jpg'))
    useEffect(() => {
        update_listener.current = EventRegister.addEventListener('update_mini_player', () => {
            setcover_image(now_playing_playlist.current[i].cover_image)
            setupdate(Math.round())
        })
        play_listener.current = EventRegister.addEventListener('slideTo', (i) => {
            try {
                slider.current.scrollToIndex({
                    index: i,
                    animated: true,
                })
                setcover_image(now_playing_playlist.current[i].cover_image)
            } catch (error) {
                console.log('mainview swipe error', error)
            }
        })
        return () => {
            EventRegister.removeEventListener(play_listener.current)
        }
    }, [])

    const [loading_indicator, setloading_indicator] = useState(false)
    const { sound_data, is_playing, nowplaying_id, playlist } = useSelector(state => state.songs)
    const [update, setupdate] = useState()
    /////////////////////////////////////////////////
    const handlePlayPause = async () => {
        setloading_indicator(true)
        if (soundAll_ref.current) {
            play_status.current = !play_status.current
            console.log('status', play_status.current)
            try {
                play_status.current ? await soundAll_ref.current.playAsync() : await soundAll_ref.current.pauseAsync()

            } catch (e) {
                console.log('playpause error', e)
                loadAudio(0, false, true)
            }
        }
        else {
            loadAudio(0, false, true)
            //console.log('must load audio from audio house', soundAll_ref)

        }
        setupdate(!update)

        setloading_indicator(false)
    }
    ////////////////////////////////////



    return (
        <Animated.View style={{
            transform: [{ translateY: minimized },
            ],

            height: 63,
            position: 'absolute',
            bottom: 0,
            zIndex: 2,
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            //justifyContent: 'space-around',
            backgroundColor: '#111111',
            alignItems: 'center',
            borderTopColor: 'rgba(255,255,255,0.2)',
            borderTopWidth: 0.25
        }}>
            <View style={{
                alignItems: 'center', justifyContent: 'center', width: width * 0.2,
                //marginHorizontal: 10,
                //backgroundColor: 'blue',

            }}>
                <View style={{
                    height: 42, width: 42,
                    backgroundColor: 'rgba(221, 82, 70,0.35)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5
                }}>
                    <Image style={{ width: 40, height: 40, borderRadius: 5 }}
                        source={cover_image}></Image>
                </View>
            </View>
            <TouchableOpacity style={{
                width: width * 0.6,

                //left: 30,
                // paddingLeft: 30,
                // marginLeft: 10,
                //    backgroundColor: 'orange',
                zIndex: 20
            }}

                onPress={() => {

                    //navigation.navigate('player')
                    EventRegister.emit('minimize_player', false)
                }}>

                <View style={{
                    width: '100%',
                    height: '100%'


                    // backgroundColor: 'orange'
                }}>




                    <FlatList
                        style={{
                            // backgroundColor: 'brown',
                            width: '100%'
                        }}
                        onScrollToIndexFailed={(e) => {
                            console.log('minimized slider scroll failed', e)
                        }}
                        viewabilityConfig={viewConfigRef.current}

                        onViewableItemsChanged={onViewChangeRef.current}
                        removeClippedSubviews={true}
                        initialNumToRender={1}
                        ref={slider}
                        maxToRenderPerBatch={1}
                        horizontal
                        data={now_playing_playlist.current}
                        snapToInterval={width * 0.8}
                        decelerationRate={0.1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={
                            ({ item, index }) => {
                                return (

                                    <View style={{
                                        // flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        // backgroundColor: 'blue',
                                        width: width * 0.8,


                                    }} >
                                        <View style={{
                                            width: width * 0.8,

                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            //    backgroundColor: 'red',
                                            marginTop: -5,
                                            marginHorizontal: 5
                                        }}>
                                            <Text style={{ color: "white", fontSize: 15, fontWeight: 'bold', paddingVertical: 2 }}>{item.song_name} </Text>
                                            <Text style={{ color: "white", fontSize: 12 }}>{item.artists}{item.featuring_artists ? ` ft ${item.featuring_artists}` :
                                                null
                                            } </Text>
                                        </View>
                                    </View>
                                );
                            }
                        }


                    >


                    </FlatList>




                </View>


            </TouchableOpacity>

            <TouchableOpacity onPress={handlePlayPause} style={{
                borderRadius: 0,
                //marginHorizontal: 30,
                width: width * 0.2,
                height: "100%",
                alignItems: 'center',
                justifyContent: 'center',

                // backgroundColor: 'blue'
            }}>

                <View
                    style={{
                        elevation: 5,
                        width: 35, height: 35, borderRadius: 50,
                        backgroundColor: '#181B1F',
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}>
                    <View style={{
                        position: 'absolute', flex: 1,
                        alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'transparent',
                        //height: 100,
                        width: '20%'
                        , zIndex: 100
                    }}>
                        <Animated.View style={{
                            position: 'absolute',
                            zIndex: 150,
                            opacity: 1

                        }}>
                            <AnimatedCircularProgress

                                ref={circle_slider}
                                size={34}
                                width={0.5}
                                fill={0}
                                tintColor='rgba(255,30,30,0.5)'
                                rotation={0}

                            />
                        </Animated.View>
                    </View>
                    {play_status.current ? <Feather style={{ marginLeft: '3.5%', }} name="pause" size={13} color='rgba(221, 82, 70,0.6)' />
                        :
                        <Ionicons style={{ marginLeft: '10%', marginTop: '0%' }} name="ios-play" size={15} color="white" />
                    }
                </View>
                <ActivityIndicator style={{
                    position: 'absolute',
                    zIndex: 100,

                }} size={43.2}
                    color="red"
                    animating={loading_indicator} />

            </TouchableOpacity>

        </Animated.View >



    )
}



const styles = StyleSheet.create({
    wrapper: {},

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})