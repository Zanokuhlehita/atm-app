import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { bg_color_primary, bg_color_secondary, secondary_color, text_color_secondary } from '../../../../theme/colors'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import MiniController from '../Drawer/components/MiniController';
import MiniPlayer from '../../../../components/MiniPlayer';
import { updateRecord ,addRecordLevel2} from '../../../../plugins/firebase';

export default function BottomNavigation({ openDrawer, setopenDrawer,

    showLyrics,   
                    setshowLyrics ,  
                    showStories , 
                    setshowStories  , 
                    showInfo  , 
                    setshowInfo  , 
                    showPlaylist ,  
                    setshowPlaylist , 

}) {
    const icon_active_color = 'rgba(0, 252, 231, 0.8)'
    const icon_color = 'rgba(255,255,255, 0.6)'
    const icon_size = 20
  
    const data = [
        {
            name: 'lyrics', icon: <Entypo name="text" size={icon_size + 6} color={openDrawer && showLyrics ? icon_active_color : icon_color} />,
            action: () => {
                setshowStories(false)
                setshowPlaylist(false)
                setshowInfo(false)

                setshowLyrics(!showLyrics)
            }
           },
        {
            name: 'Stories',
            icon: <FontAwesome5 name="book-reader" size={icon_size} color={openDrawer && showStories ? icon_active_color : icon_color}  />,
          action: () => {
              setshowStories(!showStories)
              setshowPlaylist(false)
              setshowInfo(false)

              setshowLyrics(false)
            }
        },
        {
            name: 'Playist', icon: <Entypo name="folder-music" size={icon_size} color={openDrawer && showPlaylist ? icon_active_color : icon_color} />,
            action: () => {
                setshowStories(false)
                setshowPlaylist(!showPlaylist)
                setshowInfo(false)

                setshowLyrics(false)
            }
            },
        {
            name: 'Info', icon: <Fontisto name="applemusic" size={icon_size - 2} color={openDrawer && showInfo ? icon_active_color : icon_color} />,
            action: () => {
                setshowStories(false)
                setshowPlaylist(false)
                setshowInfo(!showInfo)

                setshowLyrics(false)
            }
},

    ] 

     


    return (
        <View style={{
            paddingTop: 30,
            paddingBottom: 10,

            borderTopLeftRadius: 10,
           borderTopRightRadius: 10,
            backgroundColor: bg_color_secondary,
            height: 65,
            width: '100%',
           // position: 'absolute',
            width: '100%',
            bottom: 0,
           // alignItems: 'center',
            justifyContent: 'flex-end',
           // borderBottomColor: 'rgba(0,0,0, 0.3)',
           // borderBottomWidth:1 

        }}>
           {/*  <View style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',

                marginBottom: 10,

            }}>
                <MiniPlayer />

            </View> */}
        {/*     <View style={{
                height: 60,
                width: '100%',
                //backgroundColor: 'green',
                backgroundColor: 'rgba(29, 29, 29, 1)',
                borderBottomColor: 'rgba(255,255,255, 0.1)',

                borderTopColor: 'rgba(255,255,255, 0.15)',
                borderBottomWidth: 0.5,
                borderTopWidth: 0.5,
               // position: 'absolute',
                bottom: 0
            }}>
                <MiniController />

            </View> */}
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 30,

            }}>
                {data.map((item, i) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                               // console.log('ooooo')
                           //  addRecordLevel2('songs', 'A0005', 'more', 'lyrics', { lyrics: A002_tomorrow_lyrics })
                                
                             item.action()
                            }}
                            
                            key={i.toString()} 
                            style={{

                            }}>
                            <View style={{
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                             

                            }}>
                                {item.icon}

                            </View>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',


                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    color: icon_color,
                                    fontSize: 10,
                                   // color: i == 0 ? 'rgba(0, 252, 231, 0.8)' : icon_color
                                }}>
                                    {item.name}
                                </Text>
                            </View>
                            
                        </TouchableOpacity>
                    )

                })}
            </View>
        </View>
    )
}



