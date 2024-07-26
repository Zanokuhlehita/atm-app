import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, Keyboard, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import BlankSpace from '../../../components/BlankSpace';


export default function SearchBox({ headerFooter, searchValue, setsearchValue, setSearchMode }) {
    return (
        <>
            <View style={{
                // backgroundColor: 'grey',
                height: headerFooter ? '10.5%' : '20.5%',
                flexDirection: 'row',
                marginTop: 30,

            }}>
                <View style={{
                    height: '100%',
                    width: '85%',
                    // backgroundColor: 'pink',

                    // justifyContent: 'center',
                    flexDirection: 'row',

                }}>

                    <View style={{
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        // backgroundColor: 'blue',
                        width: '100%',
                        borderBottomWidth: 1,
                        borderColor: 'white',
                        marginLeft: 18,


                    }}>
                        <TextInput
                            value={searchValue}
                            onChangeText={(x) => {
                                setsearchValue(x)
                            }}
                            style={{
                                height: '100%',
                                width: '100%',
                                fontSize: 50,
                                color: 'rgba(255,255,255, 0.7)',

                                // backgroundColor: 'orange'
                            }}

                            placeholderTextColor='rgba(255,255,255, 0.2)'
                            placeholder='Search'
                        />
                    </View>

                </View>
                <View style={{
                    // backgroundColor: 'red',
                    borderBottomWidth: 1,
                    borderColor: 'white',
                    height: '100%',
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (searchValue) setsearchValue('')
                            else {
                                Keyboard.dismiss()
                                // setSearchMode(false)
                            }
                        }}

                        style={{
                            height: 40,
                            width: '100%',
                            //backgroundColor: 'blue',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Entypo name="cross" size={24} color="#F7B958" />
                    </TouchableOpacity>

                </View>

            </View>

        </>
    )
}
