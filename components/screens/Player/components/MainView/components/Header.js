import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'



import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

import { secondary_color, text_color_secondary } from '../../../../../theme/colors'

export default function Header({ songName, songArtist, songCoverArt, style, paddingTop }) {
    return (
        <View style={[{
            // backgroundColor: 'grey',
            width: '100%',
            height: '30%',
            flexDirection: 'row',
            //   marginTop: '10%',

        }, style]}>
            <View style={{
                width: '22%',
                height: '100%',
                justifyContent: 'center',
            }}>
                <Image
                    style={{
                        height: 60,
                        width: 60,

                    }}
                    source={songCoverArt}
                />
            </View>
            <View style={{
                // backgroundColor: 'white',
                width: '70%',
                height: '100%',
                paddingHorizontal: 10,


            }}>
                <View style={{
                    // height: '50%',
                    width: '100%',
                    paddingTop: paddingTop ? paddingTop : 35,
                    // backgroundColor: 'blue',
                    marginTop: 5,


                }}>
                    <Text
                        numberOfLines={1}
                        style={{

                            fontSize: 15,
                            //fontWeight: 'bold',
                            color: text_color_secondary
                        }}>{songName}</Text>
                </View>
                <View style={{
                    //  height: '50%',
                    width: '100%',
                }}>
                    <Text style={{
                        fontSize: 14,
                        //fontWeight: 'bold',
                        color: secondary_color,
                    }}>{songArtist}</Text>
                </View>
            </View>
            <View style={{
                // backgroundColor: 'yellow',
                width: '10%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 0,
            }}>
                <TouchableOpacity style={{
                    height: 40,
                    width: '100%',
                    //  backgroundColor: 'blue',
                    //alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Entypo name="dots-two-horizontal" size={24} color="#F7B958" />
                </TouchableOpacity>
            </View>
        </View>

    )
}
