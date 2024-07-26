import React, { useEffect, useState, useRef, useContext } from 'react'
import { AppRegistry, StyleSheet, Text, View, ImageBackground, Image, Dimensions, SafeAreaView, FlatList, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { EventRegister } from 'react-native-event-listeners'

import Swiper from 'react-native-swiper'
import Player from '../../../components/player/mainview/player'
import Lyrics from '../../../components/player/mainview/lyrics'
import Stories from '../../../components/player/mainview/stories'
import Stats from '../../../components/player/mainview/stats'
//import { changeheading } from '../../../plugins/store/actions'

import { MainContext } from '../../../contexts/MainContext';






export default function Swipeup({ id, song, changeheading, loading_indicator }) {
    const stats_scrollable = useRef(false)
    const { width, height } = Dimensions.get('window');
    const [current_view, setcurrent_view] = useState('PLAYER')

    const [songs, setsongs] = useState()



    const scrollx = useState(new Animated.Value(0))[0]

    const { isPlaying, setisPlaying, isMinimized,
        now_playing_playlist, skip_to, soundAll_ref,
        test, settest, now_playing_ref, play_status, now_playing_id, stories_on
    } = useContext(MainContext)

    const listener2 = useRef()
    const listener3 = useRef()

    const [update, setupdate] = useState()
    useEffect(() => {
        listener2.current = EventRegister.addEventListener('update_swipe_up', () => {
            if (now_playing_ref.current != id) {
                swipeup.current.scrollToIndex({
                    index: 0,
                    animated: false,
                    viewOffset: 0
                })
            }

        })
        listener3.current = EventRegister.addEventListener('update_swipe_up_all', () => {
            setTimeout(() => {
                try {
                    swipeup.current.scrollToIndex({
                        index: 0,
                        animated: false,
                        viewOffset: 0
                    })
                } catch (e) {

                }

            }, 1500);



        })
        return () => {
            EventRegister.removeEventListener(listener2.current)
            EventRegister.removeEventListener(listener3.current)

        }
    }, [])


    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 10 })


    const swipeup = useRef()
    return (
        <View>
            {/*      <View style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                height: 100,
                width: '100%'
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',

                    backgroundColor: 'blue'
                }}>Played</Text>
            </View> */}

            <Animated.FlatList

                bounce
                ref={swipeup}
                // on viewable items changed can never work because its one big index
                snapToInterval={height}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled

                onScroll={(e) => {
                    try {


                        stats_scrollable.current = false


                        EventRegister.emit('changeheader', e.nativeEvent.contentOffset.y)
                        if (e.nativeEvent.contentOffset.y == 0) {
                            EventRegister.emit('show_small_timer', false)

                        }
                        if (e.nativeEvent.contentOffset.y > height * 3 + 200) {
                            swipeup.current.scrollToIndex({
                                index: 0,
                                animated: false,
                                viewOffset: -height * 3
                            })
                        }
                        //console.log(e.nativeEvent.contentOffset.y, height * 3)
                        if (e.nativeEvent.contentOffset.y == height) {
                            EventRegister.emit('show_small_timer', true)
                            if (stories_on.current) {
                                EventRegister.emit('stop_stories')

                                stories_on.current = false
                                //   console.log('stopping stories', stories_on.current)
                            }
                        }
                        if (e.nativeEvent.contentOffset.y == height * 2) {

                            if (!stories_on.current) {
                                EventRegister.emit('start_stories')
                                stories_on.current = true
                                //  console.log('starting stories', stories_on.current)

                            }


                        }
                        if (e.nativeEvent.contentOffset.y == height * 3) {

                            stats_scrollable.current = true

                            if (stories_on.current) {
                                EventRegister.emit('stop_stories')

                                stories_on.current = false
                                console.log('stopping stories', stories_on.current)
                            }
                        }
                    } catch (error) {
                        console.log('swipe up scroll error', error)
                    }




                }}
                maxToRenderPerBatch={1}
                initialNumToRender={1}
                scrollEventThrottle={16}
                decelerationRate={0.78}

                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}

                data={'1'}
                renderItem={
                    ({ item, index }) => {
                        return (
                            <View >

                                <View style={{
                                    // backgroundColor: 'pink',
                                    width: width,
                                    height: height,
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    //justifyContent: 'center',
                                    // backgroundColor: 'blue'
                                }}>
                                    <Text style={{ backgroundColor: 'pink' }}></Text>
                                    <Player id={id} loading_indicator={loading_indicator} song={song}></Player>

                                </View>
                                <View>
                                    <View style={{
                                        // backgroundColor: 'pink',
                                        width: width,
                                        height: height,
                                        alignItems: 'center',
                                        paddingHorizontal: 10,
                                        //justifyContent: 'center',
                                        // backgroundColor: 'blue'
                                    }}>
                                        <Lyrics song={song} id={id} ></Lyrics>
                                    </View>

                                    <View style={{
                                        // backgroundColor: 'pink',
                                        width: width,
                                        height: height,
                                        alignItems: 'center',
                                        paddingHorizontal: 10,
                                        //justifyContent: 'center',
                                        // backgroundColor: 'blue'
                                    }}>
                                        <Stories song={song} id={id}></Stories>
                                    </View>

                                    <View style={{
                                        // backgroundColor: 'pink',
                                        width: width,
                                        height: height,
                                        alignItems: 'center',
                                        paddingHorizontal: 10,
                                        //justifyContent: 'center',
                                        // backgroundColor: 'blue'
                                    }}>

                                        <Stats song={song} stats_scrollable={stats_scrollable}></Stats>
                                    </View>
                                    <View style={{
                                        // backgroundColor: 'pink',
                                        width: width,
                                        height: height,
                                        alignItems: 'center',
                                        paddingHorizontal: 10,
                                        //justifyContent: 'center',
                                        // backgroundColor: 'blue'
                                    }}>

                                        {/* Dummy View */}
                                    </View>
                                </View>


                            </View>
                        );
                    }
                }

            />

        </View >
    )
}

