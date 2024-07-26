import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'

export default function BlankSpace({ style, color, icon, action }) {
    return (
        <View style={[{
            height: '100%',
            width: '20%',
            backgroundColor: color ? color : 'transparent',
            alignItems: 'center',
            // justifyContent: 'center',
            paddingTop: 15,

        }, style]}>

            {   icon ?
                <TouchableOpacity
                    onPress={action}

                    style={{

                    }}>
                    {icon}
                </TouchableOpacity>
                : null}


        </View>
    )
}
