import React, { useState, useRef, useEffect, useContext } from 'react'
import {
    AppRegistry, StyleSheet, Text, View, ImageBackground, Button,
    Image, Dimensions, SafeAreaView, FlatList, Animated, TouchableWithoutFeedback
} from 'react-native'
import Swipeup from './mainview/swipeup'
import { EventRegister } from 'react-native-event-listeners'
import Mainviewheader from './mainview/mainviewheader'
import { activateLoadIndicator, skipbuttonpress, enableopendrawer, skipto } from '../../plugins/store/actions'

import Songs from '../../assets/songs/Songs'
import { MainContext } from '../../contexts/MainContext'
import { Audio } from 'expo-av';
import Pagination from './mainview/pagination'
import Backgroundimage from './mainview/backgroundimage'
import Backgroundgradient from './mainview/backgroundgradient'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DataContext } from '../../contexts/DataContext'
import Playersplashscreen from './mainview/playersplashscreen'
import suggested_plays from '../../contexts/data/suggestedplays'
import new_releases from '../../contexts/data/newreleases'
import { Feather, FontAwesome5, FontAwesome, Entypo, SimpleLineIcons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { set } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
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
import AsyncStorage from '@react-native-async-storage/async-storage'


const { width, height } = Dimensions.get('window');
export default function Mainview() {
    const navigation = useNavigation();

    const { isPlaying, setisPlaying, isMinimized,
        now_playing_playlist, skip_to, soundAll_ref,
        test, settest, now_playing_ref, play_status, isPlayerControl, now_playing_id, song_duration,
        repeat, shuffle, song_init_render, bg_moveX, mainview_bg
    } = useContext(MainContext)
    const { all_tracks, new_tracks, new_tracks_ref, all_tracks_ref, hot_tracks_ref, recent_play_ref } = useContext(DataContext)



    const [player_data, setplayer_data] = useState([])

    const loading_song = useRef(false)

    const mainview = useRef()
    const loadAudio = async (index, shouldPlay, local) => {
        console.log('loadsong of player controls', index)

        if (loading_song.current || now_playing_ref.current == index && !local) {
            console.log('refused to load song')
            return
        } else {
            loading_song.current = true
            if (soundAll_ref.current) await soundAll_ref.current.unloadAsync()
            should_refresh_views.current = true
            if (index === undefined) { index = 0 }
            //For minimized player
            EventRegister.emit('slideTo', index)
            try {

                const sound = new Audio.Sound()
                const song_link = now_playing_playlist.current[index].link
                const status_play = {
                    shouldPlay: shouldPlay//isPlaying,
                    //volume: volume
                }
                await sound.loadAsync({ uri: song_link }, status_play)
                soundAll_ref.current = sound
                const Mill = await sound.getStatusAsync();
                let duration = Mill.durationMillis
                song_duration.current = duration / 1000
                sound.setOnPlaybackStatusUpdate(OnPlaybackStatusUpdate)
                now_playing_ref.current = index

                //setplaylist_end(false)
                isPlayerControl.current = false
                if (shouldPlay) play_status.current = true
                EventRegister.emit('update_playercontrols')
                EventRegister.emit('nowplayingcode', allSongs[index].code)

            } catch (e) {
                console.log("my error", e)
            }
            loading_song.current = false
        }

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




    const [dispatched, setdispatched] = useState(0)
    const [loading_indicator, setloading_indicator] = useState(false)
    const onViewChangeRef = useRef(({ viewableItems }) => {
        if (isMinimized.current || isPlayerControl.current) {
            scrollY.setValue(0)
            console.log('mainview change song does nothin, on index', isMinimized.current, isPlayerControl.current)
            return
        }
        else {
            scrollY.setValue(0)
            try {
                loadAudio(viewableItems[0].index, true, false)
            } catch (error) {
                console.log('mainview error', error)
            }
        }



    })
    const viewConfigRef = useRef(
        { itemVisiblePercentThreshold: 100 }
    )


    const scrollY = useRef(new Animated.Value(0)).current
    const [h, seth] = useState(100)
    const half = h / 2
    const opacity_1 = scrollY.interpolate({
        inputRange: [0, h / 2, h * 2],
        outputRange: [1, 0, 0]

    })
    const opacity_2 = scrollY.interpolate({
        inputRange: [half, h, (h * 2) - half],
        outputRange: [0, 1, 0]
    })
    const opacity_3 = scrollY.interpolate({
        inputRange: [(h * 2) - half, (h * 2), (h * 3) - half],

        outputRange: [0, 1, 0]

    })
    const opacity_4 = scrollY.interpolate({
        inputRange: [(h * 2), (h * 3) - half, (h * 3)],

        outputRange: [0, 0, 1]

    })

    const paginationscroll = scrollY.interpolate({
        inputRange: [0, h],
        outputRange: [0, (h * 0.615) / 4]

    })

    const listener = useRef()
    const play_listener = useRef()
    const listener2 = useRef()
    const listener3 = useRef()
    const listener4 = useRef()

    const [current_playlist_name, setcurrent_playlist_name] = useState('Playlist Name Unknown')

    const [current_playlist_icon, setcurrent_playlist_icon] = useState(< FontAwesome5 style={{ alignSelf: 'center' }
    } name="fire" size={75} color="rgba(241, 66, 53,0.8)" />)
    useEffect(() => {
        seth(height)
        setTimeout(() => {
            setplayer_data(all_tracks_ref.current)
            now_playing_playlist.current = all_tracks_ref.current
        }, 2000);


        listener3.current = EventRegister.addEventListener('scroll_to_playlist_end', () => {
            try {
                mainview.current.scrollToEnd()
            } catch (error) {
                console.log('mainview swipe error', error)
            }
        })
        play_listener.current = EventRegister.addEventListener('slideTo', (i) => {
            try {
                mainview.current.scrollToIndex({
                    index: i,
                    animated: true,
                })
            } catch (error) {
                console.log('mainview swipe error', error)
            }
        })
        play_listener.current = EventRegister.addEventListener('songs', (playlist) => {
            setplayer_data([])

            if (playlist == 'all_tracks') {
                setplayer_data(all_tracks_ref.current)
                now_playing_playlist.current = all_tracks_ref.current
                setcurrent_playlist_name('Shuffle All')
                setcurrent_playlist_icon(<Feather style={{ alignSelf: 'center' }} name="shuffle" size={75} color="rgb(255, 152, 0)" />)

            }
            if (playlist == 'new_tracks') {
                setplayer_data(new_tracks_ref.current)
                now_playing_playlist.current = new_tracks_ref.current
                setcurrent_playlist_name('New Tracks')
                setcurrent_playlist_icon(<Feather name="clock" style={{ alignSelf: 'center' }} size={80} color="rgb(76, 175, 80)" />)

            }
            if (playlist == 'hot_tracks') {
                setplayer_data(hot_tracks_ref.current)
                now_playing_playlist.current = hot_tracks_ref.current
                setcurrent_playlist_name('Hot List')
                setcurrent_playlist_icon(< FontAwesome5 style={{ alignSelf: 'center' }} name="fire" size={75} color="rgb(241, 66, 53)" />)
            }
            if (playlist == 'reset') {
                setplayer_data([])
                now_playing_playlist.current = []

            }

            if (playlist == 'suggested_plays') {
                setplayer_data(suggested_plays)
                now_playing_playlist.current = suggested_plays
                setcurrent_playlist_name('Suggested Plays')

            }
            if (playlist == 'recent_plays') {
                setplayer_data(recent_play_ref.current)
                now_playing_playlist.current = recent_play_ref.current
                setcurrent_playlist_name('Recent Plays')
            }
            //if (playlist == 'favorites') setplayer_data(hot_tracks_ref.current)
            if (playlist == 'new_releases') {
                setplayer_data(new_releases)
                now_playing_playlist.current = new_releases
                setcurrent_playlist_name('New Releases')
            }

            if (playlist == 'suggested_single_play') {
                setplayer_data([suggested_plays[song_init_render.current]])
                now_playing_playlist.current = [suggested_plays[song_init_render.current]]
                setcurrent_playlist_name('Single Song Play')
                setcurrent_playlist_icon(<MaterialCommunityIcons style={{ alignSelf: 'center' }} name="star-circle" size={75} color="white" />)

            }
            if (playlist == 'new_releases_single_play') {
                setplayer_data([new_releases[song_init_render.current]])
                now_playing_playlist.current = [new_releases[song_init_render.current]]
                setcurrent_playlist_name('Single Song Play')
                setcurrent_playlist_icon(<MaterialCommunityIcons style={{ alignSelf: 'center' }} name="star-circle" size={75} color="white" />)

            }

            ///////// playlists //////////////
            if (playlist == 'love_vibes') {
                setplayer_data(love_vibes)
                now_playing_playlist.current = love_vibes
                setcurrent_playlist_name('Love Vibes')
            }
            if (playlist == 'soul_trap') {
                setplayer_data(soul_trap)
                now_playing_playlist.current = soul_trap
                setcurrent_playlist_name('Soul Trap')
            }
            if (playlist == 'hustlers_mind') {
                setplayer_data(hustlers_mind)
                now_playing_playlist.current = hustlers_mind
                setcurrent_playlist_name('Hustlers Mind')
            }
            if (playlist == 'loyalty') {
                setplayer_data(loyalty)
                now_playing_playlist.current = loyalty
                setcurrent_playlist_name('Loyalty')
            }
            if (playlist == 'album_intros') {
                setplayer_data(album_intros)
                now_playing_playlist.current = album_intros
                setcurrent_playlist_name('Album Intros')
            }
            ///////// moods //////////
            if (playlist == 'happy') {
                setplayer_data(happy)
                now_playing_playlist.current = happy
                setcurrent_playlist_name('Happy Mood')
            }
            if (playlist == 'love') {
                setplayer_data(love)
                now_playing_playlist.current = love
                setcurrent_playlist_name('Love Mood')
            }
            if (playlist == 'heart_broken') {
                setplayer_data(heart_broken)
                now_playing_playlist.current = heart_broken
                setcurrent_playlist_name('Heart Broken')
            }
            if (playlist == 'grateful') {
                setplayer_data(grateful)
                now_playing_playlist.current = grateful
                setcurrent_playlist_name('Grateful')
            }
            if (playlist == 'overwhelmed') {
                setplayer_data(overwhelmed)
                now_playing_playlist.current = overwhelmed
                setcurrent_playlist_name('Overwhelmed')
            }
            if (playlist == 'flattery') {
                setplayer_data(flattery)
                now_playing_playlist.current = flattery
                setcurrent_playlist_name('Flattery')
            }
            if (playlist == 'Afro Beat') {
                setplayer_data(afro_beat)
                now_playing_playlist.current = afro_beat
                setcurrent_playlist_name('Afro Beat')
            }


        })
        listener.current = EventRegister.addEventListener('changeheader', (e) => {
            scrollY.setValue(e)
        })
        listener4.current = EventRegister.addEventListener('slide_to_top', (e) => {
            mainview.current.scrollToOffset({ animated: true, offset: 0 });
        })
        return () => {
            EventRegister.removeEventListener(play_listener.current)
            EventRegister.removeEventListener(listener.current)
            EventRegister.removeEventListener(listener2.current)
            EventRegister.removeEventListener(listener3.current)
            EventRegister.removeEventListener(listener4.current)
            unloadSound()
        }
    }, [])

    async function unloadSound() {
        if (soundAll_ref.current) await soundAll_ref.current.unloadAsync()

    }

    const { enable_open_drawer } = useSelector(state => state.settings)
    return (
        <View>
            <Mainviewheader
                opacity_1={opacity_1}
                opacity_2={opacity_2}
                opacity_3={opacity_3}
                opacity_4={opacity_4}
            />


            <Pagination paginationscroll={paginationscroll} />


            <Backgroundimage />


            <Backgroundgradient />

            <View style={{

            }}>

                <Animated.FlatList
                    //scrollEnabled={false}

                    refreshing={true}
                    onViewableItemsChanged={onViewChangeRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}

                    extraData={setcurrent_playlist_icon}
                    /*  onScroll={Animated.event(
                         [{ nativeEvent: { contentOffset: { x: bg_moveX } } }],
                         { useNativeDriver: true }
                     )} */
                    onScroll={(e) => {
                        bg_moveX.setValue(e.nativeEvent.contentOffset.x)

                    }}
                    ListFooterComponent={
                        <View
                            style={{
                                height: '100%',
                                width: '100%',
                                //backgroundColor: 'green',
                                position: 'absolute',
                                zIndex: 500
                            }}
                        >
                            <View style={{
                                marginTop: 100,
                                marginBottom: 15,
                                justifyContent: 'center'
                            }}><Text style={{
                                fontSize: 24,
                                color: 'white',
                                alignSelf: 'center',
                                fontWeight: 'bold',
                                marginVertical: 15

                            }}>End Of Playlist</Text></View>
                            <View style={{

                                justifyContent: 'center',
                                alignContent: 'center',
                                transform: [{ scale: 0.7 }]
                            }}>
                                {current_playlist_icon}
                            </View>
                            <View style={{
                                marginTop: 5,
                                marginBottom: 25,

                                justifyContent: 'center'
                            }}><Text style={{
                                fontSize: 12,
                                color: 'white',
                                alignSelf: 'center',
                                //fontWeight: 'bold',
                            }}>{current_playlist_name}</Text>
                            </View>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    flexDirection: 'row',
                                    marginVertical: 10,
                                    width: width
                                }}>
                                <TouchableOpacity onPress={() => {
                                    mainview.current.scrollToIndex({
                                        index: 0,
                                        animated: false,
                                    })
                                }}>
                                    <View style={styles.btn}>
                                        <FontAwesome style={styles.btn_icon} name="repeat" size={24} color="white" />
                                        <Text style={styles.btn_txt}>Repeat</Text>
                                        <Text style={styles.btn_txt2}>playlist</Text>


                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    EventRegister.emit('open_libraries')

                                    EventRegister.emit('minimize_player', true)

                                }}>
                                    <View style={styles.btn}>
                                        <MaterialIcons style={styles.btn_icon} name="explore" size={30} color="white" />
                                        <Text style={styles.btn_txt}>Explore</Text>
                                        <Text style={styles.btn_txt2}>libraries</Text>

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={
                                    () => {
                                        EventRegister.emit('open_search')
                                        EventRegister.emit('minimize_player', true)
                                        EventRegister.emit('update_swipe_up_all')

                                    }
                                } >
                                    <View style={styles.btn}>
                                        <FontAwesome style={styles.btn_icon} name="search" size={24} color="white" />
                                        <Text style={styles.btn_txt}>Search</Text>
                                        <Text style={styles.btn_txt2}>songs</Text>

                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                width: width
                            }}>
                                <TouchableOpacity onPress={() => {
                                    {
                                        EventRegister.emit('openDashboard')
                                        setTimeout(() => {
                                            EventRegister.emit('navigateTo', 'supportus')

                                        }, 16);
                                        // setshow_navlist('none')

                                        // storeData('plays', 'dick dick')

                                    }
                                }}>
                                    <View style={{

                                        height: 50,
                                        backgroundColor: 'rgba(185, 162, 90,1)',
                                        borderRadius: 5,
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        padding: 5,
                                        margin: 7,
                                        marginTop: 15,
                                        width: width * 0.8

                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            color: 'white',
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                        }}>Support us</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>}
                    ListFooterComponentStyle={{
                        width: width,
                        height: height,
                        // position: 'absolute',
                        zIndex: 500

                    }}
                    contentContainerStyle={{
                        overflow: 'visible'
                    }}

                    ref={mainview}
                    // initialScrollIndex={song_init_render.current}
                    horizontal
                    data={player_data}
                    // extraData={player_data}
                    snapToInterval={width}
                    decelerationRate={0.1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({ item, index }) => {
                            return (


                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // backgroundColor: 'blue',
                                    width: width,
                                    height: height,
                                }} >
                                    <Swipeup id={index} loading_indicator={loading_indicator}
                                        song={item}></Swipeup>
                                </View>

                            );
                        }
                    }


                >


                </Animated.FlatList>
            </View >



        </View >

    )

}

const styles = StyleSheet.create({
    btn: {

        height: 120,
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 5,
        marginHorizontal: 7,
        width: width * 0.24,
        borderWidth: 1,
        borderColor: 'rgba(185, 162, 90,0.2)'
    },
    btn_txt: {
        fontSize: 14,
        color: 'rgb(185, 162, 90)',
        alignSelf: 'center',
        // fontWeight: 'bold',
    },
    btn_txt2: {
        fontSize: 10,
        color: 'rgba(239,239, 239,0.7)',
        alignSelf: 'center',
        // fontWeight: 'bold',
    },
    btn_icon: {
        alignSelf: 'center',
        margin: 15
    }
})



