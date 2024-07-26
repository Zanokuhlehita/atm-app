import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function Playlistendscreen() {
    const listener = useRef()
    const listener1 = useRef()
    const [show_splash, setshow_splash] = useState(true)
    useEffect(() => {
        /* listener1.current = EventRegister.addEventListener('player_splash_screen', (status) => {

            setshow_splash(status)
            setTimeout(() => {
                setshow_splash(false)
            }, 60);
        }) */
        return () => {


            // EventRegister.removeEventListener(listener1.current)


        }
    }, [])
    return (
        show_splash ?
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(37, 37, 38,0)',
                    zIndex: 200
                }}
            >
                <View style={{
                    height: '15%',
                    justifyContent: 'center'
                }}><Text style={{
                    fontSize: 25,
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',

                }}>End Of Playlist</Text></View>
                <View style={{
                    height: '35%',
                    justifyContent: 'center',
                    alignContent: 'center',

                }}>
                    <FontAwesome5 style={{ alignSelf: 'center' }} name="fire" size={150} color="rgb(241, 66, 53)" />
                </View>
                <View style={{
                    height: '5%',
                    justifyContent: 'center'
                }}><Text style={{
                    fontSize: 15,
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',

                }}>Hot List</Text></View>
                <View
                    style={{
                        height: '15%',
                        justifyContent: 'center'
                    }}><Text>quick action Buttons</Text></View>
                <View>
                    <TouchableOpacity style={{
                        width: 250,
                        height: 60,
                        backgroundColor: 'red',
                        borderRadius: 30,
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: 'white',
                            alignSelf: 'center',
                            fontWeight: 'bold',

                        }}>Support us btn</Text>
                    </TouchableOpacity>

                </View>
            </View> : null
    )
}

