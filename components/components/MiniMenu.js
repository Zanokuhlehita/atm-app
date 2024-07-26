import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Animated, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'



import { EventRegister } from 'react-native-event-listeners'

import { bg_color_primary, bg_color_secondary, secondary_color, text_color_secondary } from '../theme/colors'
import BlankSpace from './BlankSpace'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import Divider from './Divider';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MainContext } from '../contexts/MainContext'

export default function MiniMenu({ open }) {

    const { mainNavigation_context_ref, infoViewIndex_context_ref,  allSongs } = useContext(MainContext)


    const translateY = useRef(new Animated.Value(0)).current

    const { width, height } = Dimensions.get('window')
    const listener = useRef()
    const [songName, setsongName] = useState('');
    const [songArtist, setsongArtist] = useState('');
    const [songIndex, setsongIndex] = useState('');
    useEffect(() => {
        //open ? openMenu() : closeMenu()

        listener.current = EventRegister.addEventListener('mainimenu', (v) => {
            if (v) {
                setsongName(v.songName)
                setsongArtist(v.songArtist)
                setsongIndex(v.songIndex)
                setshow(true)
                /*    setTimeout(() => {
                       openMenu()
   
                   }, 3000); */
            } else {
                closeMenu()

            }
           // console.log('vvvvvv', v.songName, v.songArtist,);

        })

        return () => {
            EventRegister.removeEventListener(listener.current)

        }
    }, [open])
    const [show, setshow] = useState(true);

    const opacity = translateY.interpolate({
        inputRange: [0, height * 0.4],
        outputRange: [0.5, 0]
    })
    function openMenu() {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true
        }).start(() => {
            setshow(true)

        })
    }

    function closeMenu() {
        Animated.timing(translateY, {
            toValue: height * 0.4,
            duration: 250,
            useNativeDriver: true
        }).start(() => {
            setshow(false)
        })
    }




    return show ? (

        <View style={{
            height: '100%',
            width: '100%',
            backgroundColor: `rgba(0,0,0, ${opacity})`,
            position: 'absolute',


        }}>
            <TouchableWithoutFeedback
                onPress={() => {
                    closeMenu()

                }}

                style={{
                    height: '60%',
                    width: '100%',
                    transform: [{ scale: 5 }],
                }}
            >
                <Animated.View style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0, 1)',
                    opacity,
                }}>

                </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View style={{
                backgroundColor: 'rgba(0,0,0, 0.9)',
                height: '40%',

                width: '100%',
                bottom: '0%',

                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                overflow: 'hidden',
                //  position: 'absolute',
                transform: [{ translateY }],
            }}>
                <View
                    style={{
                        backgroundColor: bg_color_secondary,
                        width: '100%',

                        height: '100%',
                        flexDirection: 'row',

                    }}

                >
                    <BlankSpace
                        action={closeMenu}
                        color='rgba(20, 20, 21,0.5)' icon={<Entypo name="cross" size={24} color={text_color_secondary} />} />
                    <View style={{
                        padding: 15,
                        paddingTop: 10,
                        width: '80%',




                        backgroundColor: bg_color_secondary,

                    }}>
                        <View style={{
                            marginBottom: 5,
                            width: '95%',
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 28,
                                    //         fontWeight: 'bold',

                                    color: text_color_secondary,
                                }}
                            >{songName}</Text>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 22,
                                    //  fontWeight: 'bold',

                                    color: secondary_color,
                                }}
                            >{songArtist}</Text>
                        </View>
                        <View style={{

                            width: '95%',


                        }}>
                            <Divider /* color='white' */ />
                            <TouchableOpacity
                                onPress={() => {


                                    if (mainNavigation_context_ref.current.dangerouslyGetState().routes[0].name == 'home') {

                                        const songIndex = (el) => el.song_name == songName;
                                        const index = allSongs.findIndex(songIndex)
                                        EventRegister.emit('playsonghome', index)
                                    } else {
                                        EventRegister.emit('playsong', songIndex)
                                    }

                                    closeMenu()

                                }}

                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 18,
                                    //   marginTop: 18,
                                    alignItems: 'center',

                                }}>
                                <Entypo name="controller-play" size={24} color="white" />
                                <Text style={{
                                    color: text_color_secondary,
                                    marginHorizontal: 10,
                                    fontSize: 22,

                                }}>Play Song</Text>
                            </TouchableOpacity>
                            <Divider />
                            <TouchableOpacity
                                onPress={() => {

                                    if (mainNavigation_context_ref.current.dangerouslyGetState().routes[0].name == 'home') {

                                        const songIndex = (el) => el.song_name == songName;
                                        const index = allSongs.findIndex(songIndex)
                                        infoViewIndex_context_ref.current = index
                                        mainNavigation_context_ref.current.navigate('info')
                                    } else {
                                        infoViewIndex_context_ref.current = songIndex
                                        mainNavigation_context_ref.current.navigate('info')
                                    }


                                    closeMenu()

                                }}


                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 18,
                                    alignItems: 'center',

                                }}>
                                <Entypo

                                    name="info-with-circle" size={18} color="white" />
                                <Text style={{
                                    color: text_color_secondary,
                                    marginHorizontal: 10,
                                    fontSize: 22,
                                    paddingLeft: 5,


                                }}>Song Information</Text>
                            </TouchableOpacity>
                            <Divider />
                        </View>



                    </View>

                </View >

            </Animated.View>



        </View>
    ) : null
}

