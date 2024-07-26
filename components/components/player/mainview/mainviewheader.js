import React from 'react'
import { View, Text, Animated } from 'react-native'

export default function Mainviewheader({ opacity_1, opacity_2, opacity_3, opacity_4 }) {
    return (

        < View style={{
            height: 20, position: 'absolute',
            marginTop: 42, zIndex: 2,
            justifyContent: 'center',
            //alignItems: 'center',
            flexDirection: 'row', width: '100%', overflow: 'hidden'
        }
        }>
            <Animated.View style={{
                width: '60%', alignItems: 'center',
                height: 100

            }}>

                <Animated.Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    position: 'absolute',
                    opacity: opacity_1
                }}>NOW PLAYING
                    </Animated.Text>

                <Animated.Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    position: 'absolute',
                    opacity: opacity_2

                }}>LYRICS
                    </Animated.Text>
                <Animated.Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    position: 'absolute',
                    opacity: opacity_3

                }}>STORYLINE
                    </Animated.Text>
                <Animated.Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    position: 'absolute',
                    opacity: opacity_4

                }}>CREDITS
                    </Animated.Text>
            </Animated.View>



        </View >


    )
}
