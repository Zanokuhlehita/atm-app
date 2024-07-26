import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'

import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { text_color_secondary } from '../../../theme/colors';
import { MainContext } from '../../../contexts/MainContext';

import { EventRegister } from 'react-native-event-listeners'


export default function SearchResaults({ style, searchValue }) {

    const { allSongs, setallSongs_context} = useContext(MainContext)

    const [songs, setsongs] = useState([
        {
            name: 'Tomorrow',
            artist: 'Jayceon Adler',
            cover_art: require('../../../assets/images/cover_arts/love_life_loyalty.jpg')
        },
    ]);
    const [noDataFlag, setnoDataFlag] = useState(false);
    const font_color = text_color_secondary

    useEffect(() => {
        searchText(searchValue)
        return () => {

        }
    }, [searchValue])
    const searchText = (e) => {

        let text = e.toLowerCase()
        let trucks = allSongs
        let filteredName = trucks.filter((item) => {
            return item.song_name.toLowerCase().match(text)
        })
        if (!text || text === '') {
            setsongs(allSongs)
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
            // set no data flag to true so as to render flatlist conditionally
            setnoDataFlag(true)
        } else if (Array.isArray(filteredName)) {
            setsongs(filteredName)
        }
    }

    return (<>


        <ScrollView
            style={[{
                //backgroundColor: 'pink',
                height: '100%',
                width: '80%',
                paddingRght: 10,
                marginRight: 10,
                left: -4,


            }, style]}

        >
            <View style={{
                //backgroundColor: 'blue',
                paddingTop: 10,

            }}>
                {!searchValue ?
                    <Text style={{
                        fontSize: 20,
                        color: 'white',

                        marginVertical: 10,
                        //  fontWeight: 'bold',
                        paddingHorizontal: 10,



                    }}>All Tracks</Text> : <View style={{
                        height: 5,

                    }}>

                    </View>}

            </View>
            {songs.map((item, i) => {
                return (
                    <TouchableOpacity
                        onPress={() => {

                            const songIndex = (el) => el.song_name == item.song_name;
                            const index = allSongs.findIndex(songIndex)
                            EventRegister.emit('playsonghome', index)
                            EventRegister.emit('showactivityindicator', true)
                            //console.log('mmmmm', pos);

                        }}

                        key={i.toString()}
                        style={{
                            height: 70,
                            width: '100%',
                            //backgroundColor: 'blue',
                            marginVertical: 5,
                            flexDirection: 'row',

                        }}
                    >
                        <View style={{
                            width: '25%',
                            height: '100%',
                            // backgroundColor: 'green',
                            padding: 5,

                        }}>
                            <Image
                                style={{
                                    height: '100%',
                                    width: '100%',

                                }}
                                source={item.cover_image}
                            />
                        </View>
                        <View style={{
                            height: '100%',
                            width: '60%',
                            //backgroundColor: 'yellow'
                            paddingHorizontal: 5,

                        }}>
                            <View style={{
                                //height: '50%',
                                justifyContent: 'center',
                            }}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                        color: font_color,
                                        marginTop: 5,



                                    }}>{item.song_name}</Text>
                            </View>
                            <View style={{
                                //height: '50%',
                                //  justifyContent: 'center',

                            }}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontSize: 12,
                                        color: font_color,



                                    }}>{item.artists}</Text>
                            </View>
                        </View>
                        <View style={{
                            height: '100%',
                            width: '15%',
                            //backgroundColor: 'red'
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    EventRegister.emit('mainimenu', {
                                        songName: item.song_name,
                                        songArtist: item.artists,
                                        songIndex: i,
                                    })
                                }}

                                style={{
                                    height: '100%',
                                    width: '100%',


                                    alignItems: 'center',
                                    //  justifyContent: 'center',
                                }}>
                                <Entypo name="dots-two-horizontal" size={24} color="#F7B958" />
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>
                )

            })}
            {/*      <Text style={{
                fontSize: 20,
                color: 'white',

                marginVertical: 10,
                //  fontWeight: 'bold',
                paddingHorizontal: 10,



            }}>Albums / EP's</Text> */}
        </ScrollView>

    </>
    )
}
