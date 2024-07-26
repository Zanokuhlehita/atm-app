import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator } from 'react-native'

export default function loader({ id }) {
    const { nowplaying_id } = useSelector(state => state.songs)
    const { load_indicator } = useSelector(state => state.songs)
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: 'black',
                opacity: 1,
                flexDirection: 'row', justifyContent: 'center',
                alignItems: 'center',
                height: 196, width: 196, borderRadius: 300,
            }}
        >

            {
                nowplaying_id == id ? <ActivityIndicator style={{
                    position: 'absolute',
                    zIndex: 100,

                }
                } size={233}
                    color="red"
                    animating={load_indicator} /> : null
            }
        </View>
    )
}
