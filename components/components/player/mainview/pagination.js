import React from 'react'
import { View, Text, Animated } from 'react-native'

export default function Pagination({ paginationscroll }) {
    return (
        <View style={{
            width: 1,
            height: '75%',
            backgroundColor: 'rgba(61, 62, 64,0.8)',
            position: "absolute",
            zIndex: 20,
            left: 10,
            top: '19%',
            alignItems: 'center',
            overflow: 'hidden'

        }}>
            <Animated.View style={{
                width: 0.5,
                height: '22%',
                backgroundColor: 'rgba(255, 1, 1,0.6)',
                //top: 30,

                transform: [{ translateY: paginationscroll }]
            }}>

            </Animated.View>

        </View>

    )
}
