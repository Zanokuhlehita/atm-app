import React from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function Backgroundgradient() {
    return (
        <View style={{

            height: '100%', width: '100%',
            position: 'absolute',


        }} >
            <LinearGradient
                // Background Linear Gradient
                locations={[0, 1]}
                colors={['transparent', '#181B1F']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,

                    height: '100%',
                }}
            />


        </View>



    )
}
