import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { text_color_primary, text_color_secondary } from '../../../theme/colors';




export default function MainView({ style, }) {
    const image_size = '150%'
    const bg_color = 'rgba(201, 139, 107,1)'
    const text_color = 'rgba(255,255,255, 0.9)'
    return (
        <View style={[{
            // backgroundColor: 'orange',
            height: '100%',
            width: '80%',
            // paddingRight: 20
        }, style]}>

            <View style={{
                overflow: 'hidden',

                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image

                    style={{
                        height: image_size,
                        width: image_size,
                        // alignSelf: 'center',
                        left: -10,
                        top: -20,

                        transform: [{ rotate: '38deg' }],
                    }}
                    source={require('../../../assets/images/support_us_large.jpg')}
                ></Image>
                <View style={{

                }}>

                </View>
            </View>

            <View style={{
                backgroundColor: bg_color,
                height: '40%',
                width: '60%',
                position: 'absolute',
                bottom: 0,

            }}>
                <Text style={{
                    color: text_color,
                    position: 'absolute',
                    right: 10,

                    fontSize: 15,

                    top: 10,


                }}>Together We Can</Text>

                <FontAwesome5 style={{
                    bottom: 10,
                    position: 'absolute',
                    left: 10,

                }} name="piggy-bank" size={24} color="rgba(214, 84, 120, 1)" />
            </View>
            <View style={{
                backgroundColor: bg_color,
                height: '40%',
                width: '40%',
                position: 'absolute',
                right: 0,

            }}>
                <Text style={{
                    color: text_color,
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    fontSize: 13,

                }}>Our Hero</Text>

            </View>

        </View>
    )
}
