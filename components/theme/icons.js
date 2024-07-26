import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'




export const up_arrorw = <Entypo name="chevron-up" size={24} color="black" />
export const down_arrorw = <Entypo name="chevron-down" size={24} color="black" />
export const right_arrorw = <Entypo name="chevron-right" size={24} color="black" />
export const left_arrorw = <Entypo name="chevron-left" size={24} color="black" />

export const skip_next = <Entypo name="controller-next" size={24} color="black" />

export const skip_back = <Entypo name="controller-jump-to-start" size={24} color="black" />
export const play = <Entypo name="controller-play" size={24} color="black" />
export const pause = <Entypo name="controller-paus" size={24} color="black" />

export const playlist = <Entypo name="list" size={24} color="black" />