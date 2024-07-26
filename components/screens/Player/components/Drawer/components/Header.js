import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { MainContext } from '../../../../../contexts/MainContext';

export default function Header({ 
    showLyrics,
    setshowLyrics,
    showStories,
    setshowStories,
    showInfo,
    setshowInfo,
    showPlaylist,
    setshowPlaylist,
    showNothing,
    setshowNothing
}) {
    const { 
        currentIndex_context_ref, allSongs,
      } = useContext(MainContext)
    const artist = allSongs[currentIndex_context_ref.current].artists
    const name = allSongs[currentIndex_context_ref.current].name
    return (
        <View
            style={{
              //  backgroundColor: 'blue',
                paddingHorizontal: 20,
              height: 70,
             /*    borderBottomWidth: 1,
                borderBottomColor: 'rgba(255,255,255, 0.1)',
 */

            }}
        >
            <View style={{
          marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
               // marginBottom: 10,


            }}>
                <View style={{
                    height: 3,
                    width: 50,
                    borderRadius: 5,

                    backgroundColor: 'rgba(255,255,255, 0.5)'
                }}>

                </View>
            </View>
            <View style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                <View style={{
                    height: '100%',
                  //  alignItems: 'center',
                  justifyContent: 'center',


                }}>
                    {showLyrics ? <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', }}>Lyrics</Text> : null}
                    {showStories ? <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', }}>Stories</Text> : null}
                    {showPlaylist ? <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', }}>Playlist</Text> : null}
                    {showInfo ? <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', }}>Song Info</Text> : null}

                    <Text style={{
                        fontSize: 10,
                        color: 'white',
                        marginTop: 5,

                    }}>{name} - {artist}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        try {
                             setshowLyrics(false)
                        setshowStories(false)
                        setshowNothing(false)
                        setshowInfo(false)
                        setshowPlaylist(false)
                        } catch (e) {
                            
                        }
                       
``                    }}

                    style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    //backgroundColor: 'blue',
                    width: 40,


                }}>
                    <MaterialIcons name="close" size={22} color="rgba(239,239,239,0.5)" />
                </TouchableOpacity>
            </View>
           
        </View>
    )
}
