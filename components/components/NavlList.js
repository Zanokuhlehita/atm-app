import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { albumArt1 } from '../plugins/assets'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { bg_color_primary, bg_color_secondary, primary_color, secondary_color } from '../theme/colors';

export default function NavlList({ showNavList, setshowNavList}) {
    const { width, height } = Dimensions.get('window')
    const icon_color = 'rgba(255,255,255, 0.5)'
    const navList = [
        {
            name:  'Dashboard',
            key: '1',
            icon: <EvilIcons
                style={{
                    left: -5
                }} name="user" size={38} color={icon_color} />,
            next_line: true,
            action: () => {
                navigation.navigate('dashboard')
                setshow_navlist('none')
            }
        },




        {
            name: 'Shuffle',
            key: '2',
            icon: <View>
                <SimpleLineIcons name="shuffle" size={22} color={icon_color} />

            </View>,
            next_line: false,
            action: () => {
                shuffle.current = !shuffle.current
                setupdate(!update)
                setshow_navlist('none')
                if (!snack_1_active.current) { EventRegister.emit('snack_1', `Shuffle: ${shuffle.current ? 'on' : 'off'}`) }
                else {
                    if (!snack_2_active.current) { EventRegister.emit('snack_2', `Shuffle: ${shuffle.current ? 'on' : 'off'}`) }
                    else {
                        if (!snack_3_active.current) { EventRegister.emit('snack_3', `Shuffle: ${shuffle.current ? 'on' : 'off'}`) }

                    }

                }

            }
        }, {
            name: 'Repeat',
            key: '3',
            icon: <SimpleLineIcons name="loop" size={22} color={icon_color} />,
            next_line: true,
            action: () => {
                repeat.current = !repeat.current
                setupdate(!update)
                setshow_navlist('none')

                if (!snack_1_active.current) { EventRegister.emit('snack_1', `Repeat: ${repeat.current ? 'on' : 'off'}`) }
                else {
                    if (!snack_2_active.current) { EventRegister.emit('snack_2', `Repeat: ${repeat.current ? 'on' : 'off'}`) }
                    else {
                        if (!snack_3_active.current) { EventRegister.emit('snack_3', `Repeat: ${repeat.current ? 'on' : 'off'}`) }

                    }

                }
            }
        },
        /* {
            name: 'Like',
            key: '4',
            icon: like ? <Entypo name="heart" size={24} color="white" /> :
                <SimpleLineIcons name="heart" size={22} color="white" />,
            next_line: false,
            action: () => {
                like.current = !like
                setshow_navlist('none')
                like ? EventRegister.emit('like', true) : EventRegister.emit('like', false)
                like ? db.collection('user').doc(user_id.current).collection('likes').doc('A007').set({
                    code: 'A007',
                    song_name: 'Ms California',
                    artists: 'Jayceon Adler',
                    featuring_artists: 'Bray Atlas',

                }) : db.collection('user').doc(user_id.current).collection('likes').doc('A007').delete()



            }
        },
        {
            name: 'Share',
            key: '5',
            icon: < SimpleLineIcons name="share" size={21.5} color="white" />,
            next_line: true,
            action: () => onShare()
        }, */
        /*    {
               name: 'Settings',
               key: '6',
               icon: <SimpleLineIcons name="settings" size={23} color="white" />,
               next_line: false
           }, */
        {
            name: 'Support Us',
            key: '7',
            icon: <MaterialCommunityIcons name="medal" size={27} color={icon_color} />,
            next_line: false,
            action: () => {

                EventRegister.emit('openDashboard')
                setTimeout(() => {
                    EventRegister.emit('navigateTo', 'supportus')

                }, 16);
                setshow_navlist('none')

            }


        },
    ]
    const font_color = 'white'

    return showNavList? (
        <View
            style={{
                height: '100%',
                width: '100%',
                //backgroundColor: 'rgba(30, 30, 30, 1)',
                position: 'absolute',
                zIndex: 10,

            }}
        >
            <View style={{
                position: 'absolute',
                right: 30,
                top:30,
                zIndex: 10,

            }}>
                <TouchableOpacity
                    onPress={() => {
                        setshowNavList(false)
                    }}

                    style={{
                   // backgroundColor: 'blue',


                }}>
                    <AntDesign name="close" size={24} color={'rgba(197, 93, 86, 1)'} />

                </TouchableOpacity>
            </View>
            <LinearGradient
                locations={[0, 0.4, 1]}
                colors={[
                    'rgba(29,29,29,0.8)',
                    'rgba(29,29,29,1)',
                    'rgba(29,29,29,1)'
                ]}
                style={{
                    zIndex: 0,

                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                }}
            />
            <ScrollView

            >
                <View style={{
                    height: '100%',
                    width: '100%',
                    marginTop: 50,

                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: height/2.5,


                    }}>
                        <Image
                            style={{
                                width: 150,

                                height: 150,

                            }}
                            source={albumArt1}
                        />
                        <View style={{
                            marginTop: 20,

                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: 15,
                                fontWeight: 'bold',

                            }}>Love Life Loyatye EP</Text>
                            <Text style={{
                                textAlign: 'center',
                                color: 'white',
                            }}>Jayceon Adler</Text>
                        </View>
                    </View>
                    <View style={{
                        height: 1,
                        width: '100%',

                      //  backgroundColor: 'rgba(255,255,255, 0.2)'
                    }}></View>
                    <View style={{
                        marginTop: 10,

                    }}>
                        {navList.map((item, i) => {
                            return (
                                <View
                                    style={{
                                    
                                        height: 60,
justifyContent:'space-between'
                                    }}
                                    key={i.toString()}>
                                    {   i==0     ?   
                                        <View style={{
                                            marginHorizontal:20,

                                        }}>
                                            <View style={{
                                                height: 1,
                                                width: '100%',

                                                backgroundColor: 'rgba(255,255,255, 0.2)'
                                            }}></View>
                                        </View>
                                    : null}

                                    <View style={{
                                        flexDirection: 'row',
                                        marginVertical: 10,
                                        paddingHorizontal: 30,
                                    }}>
                                        <View style={{
                                            width: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center',


                                        }}>
                                            <Text style={{

                                            }}>{item.icon}</Text>
                                        </View>
                                        <View style={{
                                            height: '100%',
                                            justifyContent: 'center',
                                        }}>
                                            <Text style={{
                                                color: font_color,
                                                fontSize: 20,

                                            }}> {item.name}</Text>

                                        </View>

                                    </View>
                                    <View style={{
                                        marginHorizontal: 20,

                                    }}>
                                        <View style={{
                                            height: 1,
                                            width: '100%',

                                            backgroundColor: 'rgba(255,255,255, 0.2)'
                                        }}></View>
                                    </View>
                                    
                                </View>
                            )

                        })}
                    </View>

                </View>
            </ScrollView>
          
          
        </View>
    ) : null
}
