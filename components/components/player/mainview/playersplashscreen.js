import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'

export default function Playersplashscreen() {
    const listener = useRef()
    const listener1 = useRef()
    const [show_splash, setshow_splash] = useState(false)
    useEffect(() => {
        listener1.current = EventRegister.addEventListener('player_splash_screen', (status) => {

            setshow_splash(status)
            setTimeout(() => {
                setshow_splash(false)
            }, 60);
        })
        return () => {


            EventRegister.removeEventListener(listener1.current)


        }
    }, [])
    return (
        show_splash ?
            <View style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
                zIndex: 200,
                height: '100%',
                width: '100%',
                alignContent: 'center',
                justifyContent: 'center',

            }}>
                <ActivityIndicator
                    animating={true}
                    color='rgba(247, 59, 63,0.5)'
                    size={70}
                    style={{
                        top: '-15%'

                    }}
                />
            </View> : null
    )
}
