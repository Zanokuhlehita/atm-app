import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

import { text_color_secondary } from '../../../theme/colors';

export default function Header({ backAction, menuAction }) {
    const icon_size = 18
    const font_color = text_color_secondary
    return (
        <View style={{
            paddingTop: 15,
            flexDirection: 'row',

            height: 80,
            //backgroundColor :  'white',
            paddingHorizontal: 30,

        }}>
            <TouchableOpacity
                onPress={() => {
                    backAction()
                }}

                style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: 10,
                    width: 50,


                }}>
                <AntDesign name="arrowleft" size={20} color={font_color} />

            </TouchableOpacity>
            <View style={{
                paddingTop: 10,
                flex: 1,
                //backgroundColor: 'blue',

                // width: '70%',
                //  paddingLeft: 10,
                //alignItems: 'center',
                justifyContent: 'center',


            }}>
                <Text style={{
                    //fontWeight: 'bold',
                    color: font_color,
                    fontSize: 14,
                    textAlign: 'center',

                }}>
                 SIGN UP
                </Text>

            </View>
            <TouchableOpacity
                onPress={() => {
                    menuAction()
                }}

                style={{
                    width: 50,
                    //flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center',

                    paddingRight: 0,
                    paddingTop: 15,


                }}>

               {/*  <Entypo name="dots-three-vertical" size={15} color={font_color} /> */}
            </TouchableOpacity>




        </View>
    )
}
