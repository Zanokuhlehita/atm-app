import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, Alert, ActivityIndicator, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { text_color_secondary } from '../../../theme/colors';
import { MainContext } from '../../../contexts/MainContext';

export default function Header({ navigation}) {
    const icon_size = 18
    const font_color = text_color_secondary
    const { showSongs } = useContext(MainContext)


    return (
        <View style={{
            paddingTop: 15,
            flexDirection: 'row',

            height: 80,
//backgroundColor :  'white',

        }}>
            <TouchableOpacity
                onPress={() => {
                   navigation.goBack()
                }}

                style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 10,
                width: 50,


            }}>
                <AntDesign name="arrowleft" size={22} color={font_color} />

            </TouchableOpacity>
            <View style={{
                paddingTop: 10,
                flex: 1,
              //  backgroundColor: 'blue',

               // width: '70%',
                paddingLeft: 10,
             //alignItems: 'center',
                justifyContent: 'center',


            }}>
                <Text style={{
                  //fontWeight: 'bold',
                    color: font_color,
                    fontSize: 18,

                }}>
                    {showSongs == 'favourites' ? 'Your Favourites' : null}
                    {showSongs == 'allsongs' ? 'All Songs' : null}
                    {showSongs == 'recentlyplayed' ? 'Recently Played' : null}

 
                </Text>

            </View>
            <View style={{
                width: '20%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
             
                paddingRight: 0,
                paddingTop: 15,


            }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('search')
            }}
                >
                    <Feather
                        style={{
                            paddingRight: 10,

                        }}
                        name="search" size={icon_size} color={font_color} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('settings')

                    }}
                >
                    <Feather name="settings" size={icon_size} color={font_color} />

                </TouchableOpacity>
         
            </View>
            
            

        </View>
    )
}



