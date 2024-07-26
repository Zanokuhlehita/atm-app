import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MainContext } from '../../../../../contexts/MainContext';
import { primary_color, secondary_color } from '../../../../../theme/colors';
import { EventRegister } from 'react-native-event-listeners'

export default function Playlist() {
    const {
        allSongs,
        setallSongs_context,
        currentIndex_context_ref
    } = useContext(MainContext)
    const font_color = 'white'
    const { width, height } = Dimensions.get('window')
    const grad_color = '29, 29, 29'
    const image_size = 45
    return (
        <View
                style={{
       paddingTop: 70,
            }} 

           
        >
            <View style={{
                paddingHorizontal: 15,
                paddingTop: 20,
                marginBottom:10
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: secondary_color,
                }}>Up Next</Text>
            </View>

            <ScrollView
                contentContainerStyle={{
                    paddingBottom:150,
                }}
                style={{
                    //backgroundColor: 'pink',
                    height: '100%',
                    width: '100%',



                }}

            >
                <View style={{
                //    marginTop: 10,
                    paddingHorizontal: 15,


                }}>
{allSongs.map((item, i) => {
                    return (
                        <View
                            style={{

                            }}
                            key={i.toString()}
                        >
                            {     i == 0 ?  
                                <View style={{
                                    height: 1,
                                    width: '100%',

                                    //  backgroundColor: 'rgba(255,255,255, 0.2)',
                                    alignItems: 'flex-end',
                                    paddingRight: 3
                                }}>

                                    <View style={{
                                        height: 1,
                                        width: '100%',

                                      backgroundColor: 'rgba(255,255,255, 0.1)'
                                    }}>



                                    </View>

                                </View>

                            : null}

                            <TouchableOpacity
                                onPress={() => {

                                    /*    const songIndex = (el) => el.song_name == item.song_name;
                                       const index = allSongs.findIndex(songIndex)
                                       EventRegister.emit('playsonghome', index) */

                                    //console.log('mmmmm', pos);
                                    EventRegister.emit('showactivityindicator', true)

                                    EventRegister.emit('playsong', i)

                                }}

                                style={{
                                    height: 50,
                                    width: '100%',
                                    backgroundColor: i == currentIndex_context_ref.current ? 'rgba(15, 55, 62, 1)'  :null,
                                    marginVertical: 3,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    // justifyContent: 'center',
                                    borderRadius: 3,
                                    //elevation:5,
                                    paddingLeft: 1.5

                                }}
                            >
                                <View style={{
                                    width: image_size,
                                    height: image_size,
                                    // backgroundColor: 'green',
                                    padding: 5,

                                }}>
                                    <Image
                                        style={{
                                            borderRadius: 2,

                                            height: '100%',
                                            width: '100%',

                                        }}
                                        source={{ uri:item.coverArt}}
                                    />
                                </View>
                                <View style={{
                                    height: '100%',
                                    width: '72%',
                                    //backgroundColor: 'yellow'
                                    paddingHorizontal: 5,

                                }}>
                                    <View style={{
                                        //height: '50%',
                                        justifyContent: 'center',
                                        marginTop: 3,

                                    }}>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 'bold',
                                                color: font_color,
                                                marginTop: 5,



                                            }}>{item.name}</Text>
                                    </View>
                                    <View style={{
                                        //height: '50%',
                                        //  justifyContent: 'center',

                                    }}>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 10,
                                                color: font_color,
                                                opacity: 0.7


                                            }}>{item.artists}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    height: '100%',
                                    width: '10%',
                                    //backgroundColor: 'red'
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                      /*       EventRegister.emit('mainimenu', {
                                                songName: item.song_name,
                                                songArtist: item.artists,
                                                songIndex: i,
                                            }) */
                                        }}

                                        style={{
                                            height: '100%',
                                            width: '100%',


                                            alignItems: 'center',
                                            flexDirection: 'row',

                                            justifyContent: 'center',
                                        }}>
                                        <AntDesign
                                            style={{
                                                marginRight: 10
                                            }}
                                            name="hearto" size={11} color="white" />
                                        <Entypo name="dots-three-vertical" size={12} color="white" />
                                    </TouchableOpacity>
                                </View>

                            </TouchableOpacity>

                               <View style={{
                          height: 1,
                          width: '100%',

                        //  backgroundColor: 'rgba(255,255,255, 0.2)',
                          alignItems: 'flex-end',
                          paddingRight:3
                      }}>
                      
                          <View style={{
                              height: 1,
                              width: '100%',

                              backgroundColor: 'rgba(255,255,255, 0.1)'
                          }}>



                          </View>
                      
                      </View> 
                        </View>
                    )

                })}
                </View>  


            </ScrollView>
            <View style={{
                position: 'absolute',

                backgroundColor: 'blue',

                //   backgroundColor: 'rgba(29, 29, 29,0.8)',

            }}></View>
             <LinearGradient
                // Background Linear Gradient
                locations={[0, 0.54, 0.55, 1]}

                colors={[
                    `rgba(${grad_color},0)`,
                    `rgba(${grad_color},0.6)`,
                    `rgba(${grad_color},1)`,
                    `rgba(${grad_color},1)`,

                ]}
                style={{
                    position: 'absolute',
                   
                    opacity: 1,
                    bottom: 140,
                    bottom: -110,


                    height: 160,
                    width: width,
                   zIndex: -5
                }}
            />
        </View>

    )
}
