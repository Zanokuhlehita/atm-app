import React, { useRef, useState, useEffect, useContext } from 'react'
import { View, Text, Animated, Button } from 'react-native'
import { EventRegister } from 'react-native-event-listeners';
import { MainContext } from '../../contexts/MainContext';
import { Entypo } from '@expo/vector-icons';


export default function Likesnack() {
    const Heart = Animated.createAnimatedComponent(Entypo)

    const opacity = useRef(new Animated.Value(1)).current
    const scale = useRef(new Animated.Value(0)).current
    const [listener1, setlistener1] = useState()
    const [listener2, setlistener2] = useState()

    const { snack_1_active, snack_2_active, snack_3_active } = useContext(MainContext)

    useEffect(() => {


        setlistener1(EventRegister.addEventListener('like_snack', () => {
            Animated.spring(
                scale,
                {
                    toValue: 1.5,
                    friction: 1,
                    useNativeDriver: true
                }
            ).start()
        }))
        setlistener1(EventRegister.addEventListener('unlike_snack', () => {
        }))



        return () => {
            EventRegister.removeEventListener(listener1)
            EventRegister.removeEventListener(listener2)
        }
    }, [])

    return (


        <Animated.View
            style={{
                position: 'absolute',
                zIndex: 50,
                top: '25%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',

            }}>


            <Heart
                style={{
                    transform: [{ scale }],
                    opacity,
                    alignSelf: 'center'
                }} name="heart" size={200} color="rgba(237, 28, 36,0.8)" />


            <Button title="biounce" onPress={() => {
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 6,
                    // tension: 5,
                    //speed: 40,
                    // bounciness: 20,
                    useNativeDriver: true
                }).start(() => {
                    Animated.timing(scale, {
                        toValue: 0,
                        duration: 100,
                        useNativeDriver: true
                    }).start()
                })
            }} />
            <Button title="reset" onPress={() => {
                Animated.timing(scale, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }).start()
            }} />

        </Animated.View>

    )
}
