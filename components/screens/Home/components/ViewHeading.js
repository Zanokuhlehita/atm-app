import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import BlankSpace from '../../../components/BlankSpace';


export default function ViewHeading() {
    return (
        <View style={{
            // backgroundColor: 'grey',
            height: '18.5%',
            flexDirection: 'row',

        }}>
            <View style={{
                height: '100%',
                width: '90%',
                // backgroundColor: 'pink',

                // justifyContent: 'center',
                flexDirection: 'row',

            }}>
                <BlankSpace style={{
                    //backgroundColor: 'blue',

                }} />
                <View style={{
                    justifyContent: 'center',
                    paddingHorizontal: 20,

                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                    }}>Home</Text>
                </View>

            </View>
            <View style={{
                // backgroundColor: 'red',

                height: '100%',
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity style={{
                    height: 40,
                    width: '100%',
                    //  backgroundColor: 'blue',
                    //alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Entypo name="dots-two-horizontal" size={24} color="#F7B958" />
                </TouchableOpacity>

            </View>
        </View>
    )
}
