import React, { Component, useState } from 'react'
import { AppRegistry, StyleSheet, Image, Text, View, Animated, Dimensions } from 'react-native'
import img from '../../assets/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import {
    SimpleLineIcons, EvilIcons, Fontisto, Ionicons, MaterialCommunityIcons,
    FontAwesome5
} from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';

export default function Header({ openSearch, explore_opacity,
    playlist_opacity, mood_opacity, artists_opacity, header_opacity, translate_header,

}) {




    return (


        <Animated.View style={{
            transform: [{ translateY: -100 }],
            opacity: 1,
            height: 168, position: 'absolute',
            zIndex: 10,
            alignItems: 'center',
            width: '100%',
            marginHorizontal: 0,
            paddingHorizontal: -5,
            // backgroundColor: '#32373D',
            paddingBottom: 100,
            borderBottomColor: 'rgba(255,255,255,0.1)',
            borderBottomWidth: 1,
            borderRadius: 2
        }}>

            <LinearGradient locations={[0, 1]}
                colors={['#32373D', '#2B3035']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,

                    height: 168.7,
                }}
            />



            <View style={{
                marginTop: 20,

                height: 100,
                //backgroundColor: 'green',
                flexDirection: 'row',

                alignItems: 'center'
            }}>


                <View style={{ width: '20%', alignItems: 'center' }}>
                    <TouchableOpacity
                        // onPress={openSearch}
                        style={{
                            height: 50, width: 50,
                            alignItems: 'center', justifyContent: 'center'
                        }}>
                        <Ionicons name="ios-search" size={24} color="white" />
                    </TouchableOpacity>
                </View>


                <View style={{
                    width: '60%', alignItems: 'center',
                    marginTop: 9
                }}>
                    <Image style={{ height: 70, width: 70 }} source={img}></Image>
                </View>

                <View style={{ width: '20%', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        EventRegister.emit('navlist')
                    }


                    }>
                        <Ionicons name="ios-menu" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                width: '102%',
                flexDirection: 'row',
                // marginLeft: -10,
                // marginRight: -10
                paddingTop: 15,



            }}>
                <View style={{
                    //backgroundColor: "yellow"
                    width: '25%',

                }} >
                    <Animated.Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '600',
                        // transform: [{ scale: 1.1 }],
                        opacity: 0.2
                    }}>Explore</Animated.Text>
                </View>
                <View style={{
                    //backgroundColor: "yellow"
                    width: '25%'
                }}>
                    <Animated.Text style={{
                        color: 'white',
                        textAlign: 'center',
                        opacity: 1,
                        fontWeight: '600',

                    }}>Playlists</Animated.Text>
                </View>
                <View style={{
                    //backgroundColor: "yellow"
                    width: '25%'
                }}>
                    <Animated.Text style={{
                        color: 'white',
                        textAlign: 'center',
                        opacity: 0.2,
                        fontWeight: '600',


                    }}>Mood</Animated.Text>
                </View>
                <View style={{
                    //backgroundColor: "yellow"
                    width: '25%'



                }}>
                    <Animated.Text style={{
                        color: 'white',
                        textAlign: 'center',
                        opacity: 0.2,
                        fontWeight: '600',


                    }}>Artists</Animated.Text>
                </View>
            </View>

        </Animated.View >


    )
}