import React from 'react'
import { View, Text } from 'react-native'

export default function BlankSpace({ style }) {
    return (
        <View style={[{
            height: '100%',
            width: '20%',
            // backgroundColor: 'grey',

        }, style]}></View>
    )
}
