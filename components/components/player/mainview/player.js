import React, { Component, useRef, useState, useContext, useEffect } from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Loader from './loader'
import { View, Text, Animated, Button, Image, Easing } from 'react-native'
import { Circle } from 'react-native-svg'
import { Entypo } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import { MainContext } from '../../../contexts/MainContext';

export default function Player({ song, loading_indicator, id }) {
    const { nowplaying_id } = useSelector(state => state.songs)
    const Heart = Animated.createAnimatedComponent(Entypo)
    const { soundAll_ref, song_duration, user_likes } = useContext(MainContext)
    const circle_slider = useRef()
    const opacity = useRef(new Animated.Value(1)).current
    const scale = useRef(new Animated.Value(0)).current
    const translateY = scale.interpolate({
        inputRange: [0, 20],
        outputRange: [0, -6]
    })
    const [listener1, setlistener1] = useState()
    const [listener2, setlistener2] = useState()
    const [lyrics_listener, setlyrics_listener] = useState()
    const timer = useRef(0)
    useEffect(() => {
        setlyrics_listener(EventRegister.addEventListener('sound_position', (pos) => {

            const move = Math.round((pos / song_duration.current) * 100)
            if (move == timer.current) return
            timer.current = move
            // console.log('aside', move, 'timer', timer.current, move)
            try {
                circle_slider.current.animate(move, 60, Easing.quad, null, true)

            } catch (error) {
                console.log('timer not working main')
            }

        }))
        return () => {
            EventRegister.removeEventListener(lyrics_listener)
        }
    }, [])

    function showHeart(status) {
        if (status) {
            Animated.spring(scale, {
                toValue: 7,
                friction: 6,
                // tension: 5,
                //speed: 40,
                // bounciness: 20,
                useNativeDriver: true
            }).start(() => {
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            })
        } else {
            Animated.spring(scale, {
                toValue: 2,
                friction: 6,
                useNativeDriver: true
            }).start(() => {
                Animated.timing(scale, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            })
        }

    }
    /* 
        const [liked, setliked] = useState(false)
        useEffect(() => {
            setTimeout(() => {
                console.log(user_likes.current)
                console.log(song.code)
                const find = user_likes.current.find((code) => code == song.code)
                if (find) setliked(true)
    
            }, 8000);
            setlistener1(EventRegister.addEventListener('like', (status) => {
                setliked(status)
            }))
            return () => {
                EventRegister.removeEventListener(listener1)
            }
        }, [])
    
        useEffect(() => {
            liked ? showHeart(true) : showHeart(false)
            return () => {
            }
        }, [liked]) */
    return (

        <View >

            <View style={{

                marginTop: '65%',
                justifyContent: 'center',
                alignItems: 'center'


            }}>
                <View style={{ position: 'absolute', }}>
                    <AnimatedCircularProgress
                        ref={circle_slider}
                        size={194}
                        width={0.7}
                        fill={0}
                        tintColor='rgba(255,30,30,0.9)'
                        // onAnimationComplete={() => console.log('onAnimationComplete')}
                        //backgroundColor="blue"
                        //backgroundColor="#3d5875"
                        // renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="20" fill="blue" />}
                        rotation={0}

                    />
                </View>
                <View style={{
                    position: 'absolute',
                    backgroundColor: 'black',
                    opacity: 0.3,
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center',
                    height: 196, width: 196, borderRadius: 300,
                    //  zIndex: 20
                }}

                ><Loader loading_indicator={loading_indicator} id={id}></Loader>

                </View>
                <View style={{
                    position: 'absolute',
                    // backgroundColor: 'blue',
                    flexDirection: 'row', justifyContent: 'center',
                    alignItems: 'center', overflow: 'hidden',
                    height: 190, width: 190, borderRadius: 300
                }}

                >
                    <Image style={{ width: 200, height: 200 }} source={song.cover_image}></Image>

                </View>
                <View style={{
                    position: 'absolute',
                    zIndex: 20
                }}>

                </View>

            </View>


            <View style={{ marginTop: 200, flex: 1 }}>
                {/*  <Button title="biounce" onPress={() => {
                    Animated.spring(scale, {
                        toValue: 7,
                        friction: 6,
                        // tension: 5,
                        //speed: 40,
                        // bounciness: 20,
                        useNativeDriver: true
                    }).start(() => {
                        Animated.timing(scale, {
                            toValue: 1,
                            duration: 100,
                            useNativeDriver: true
                        }).start()
                    })

                }} /> 
                <Button title="reset" onPress={() => {
                    console.log(user_likes.current)
                    console.log(song.code)
                    const find = user_likes.current.find((code) => code == song.code)
                    setliked(find)

                }} />*/}
                <Heart

                    style={{
                        transform: [{ scale: 0 },
                        { translateY }],
                        top: -55,
                        alignSelf: 'center'
                    }} name="heart" size={10} color="rgba(237, 28, 36,0.5)" />


                <Text style={{ textAlign: "center", color: 'white', fontSize: 20 }}>{song.song_name}</Text>
                <Text style={{ textAlign: "center", color: 'white', fontSize: 12 }}>{song.artists}</Text>
            </View>



        </View >


    )
}

