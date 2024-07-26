import React from 'react'
import { View, Text } from 'react-native'
import { text_color_secondary } from '../theme/colors'

export default function Divider({ color, style }) {
    return (
        <View style={[{
            height: 1,
            width: '100%',
            backgroundColor: color ? color : 'rgba(255,255,255, 0.2)',

        }, style]}>
        </View>
    )
}
