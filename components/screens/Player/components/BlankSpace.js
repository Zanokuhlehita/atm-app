import React from 'react'
import { View, Text } from 'react-native'

export default function BlankSpace({ style }) {
    return (
        <View style={[{
            width: '100%',
            height: '60%',
            //    backgroundColor: 'blue',
        }, style]}>
        </View>
    )
}
