import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'


import { EventRegister } from 'react-native-event-listeners'


import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { bg_color_primary, bg_color_secondary, primary_color, secondary_color, text_color_secondary } from '../../../theme/colors';

export default function NavIcons({ style, playing, setplaying, lyrics, setlyrics, playlist, setplaylist }) {
    const icon_color = text_color_secondary
    const icon_size = 22
    const [active, setactive] = useState('Like');

    const [like, setlike] = useState(false);

    const buttons = [
        {
            name: 'Playing',
            icon: <Fontisto name="applemusic" size={icon_size - 2} color={playing ? secondary_color : icon_color} />,
            action: () => {
                /*  if (active == 'playing') {
                     setplaying(true)
                     setplaylist(false)
                     setlyrics(false)
                     setactive('playing')
                 }
                 else { */
                setplaying(true)
                setplaylist(false)
                setlyrics(false)
                setactive('playing')
                /*      } */
            }
        },
        {
            name: 'Lyrics',
            icon: <Entypo name="text" size={icon_size + 6} color={lyrics ? secondary_color : icon_color} />,
            action: () => {
                /*    if (active == 'lyrics') {
                       setplaying(true)
                       setplaylist(false)
                       setlyrics(false)
                       setactive('playing')
                   }
                   else { */
                setplaying(false)
                setplaylist(false)
                setlyrics(true)
                setactive('lyrics')
                /*  } */


            }
        },
        {
            name: 'Playlist',
            icon: <Entypo name="folder-music" size={icon_size} color={playlist ? secondary_color : icon_color} />,
            action: () => {
                /*    if (active == 'playlist') {
                       setplaying(true)
                       setplaylist(false)
                       setlyrics(false)
                       setactive('playing')
                   }
                   else { */
                setplaying(false)
                setplaylist(true)
                setlyrics(false)
                setactive('playlist')
                /* } */


            }
        },


    ]

    const buttonSize = 50
    return (
        <View style={[{
            backgroundColor: bg_color_secondary,

            width: '100%',
            height: '40%',


        }, style]}>
            {buttons.map((item, i) => {
                return (

                    <TouchableOpacity
                        onPress={() => {
                            item.action()
                        }}

                        key={i.toString()} style={{
                            // backgroundColor: 'white',
                            height: buttonSize,
                            width: buttonSize,
                            marginVertical: 5,
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        {item.icon}
                    </TouchableOpacity>

                )

            })}

        </View>
    )
}
