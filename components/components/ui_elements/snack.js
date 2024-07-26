import React, { useRef, useState, useEffect, useContext } from 'react'
import { View, Text, Animated } from 'react-native'
import { EventRegister } from 'react-native-event-listeners';
import { MainContext } from '../../contexts/MainContext';

export default function Snack() {

    const [snack_1_msg, setsnack_1_msg] = useState('')
    const [snack_2_msg, setsnack_2_msg] = useState('')
    const [snack_3_msg, setsnack_3_msg] = useState('')

    const opacity_1 = useRef(new Animated.Value(1)).current
    const opacity_2 = useRef(new Animated.Value(1)).current
    const opacity_3 = useRef(new Animated.Value(1)).current
    const [listener1, setlistener1] = useState()
    const [listener2, setlistener2] = useState()
    const [listener3, setlistener3] = useState()

    const { snack_1_active, snack_2_active, snack_3_active } = useContext(MainContext)

    useEffect(() => {

        setlistener1(EventRegister.addEventListener('snack_1', (msg) => {
            snack_1_active.current = true
            setsnack_1_msg(msg)

            console.log('in 1')
            if (opacity_1 < 1) opacity_1.setValue(1)
            Animated.timing(opacity_1, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true
            }).start(() => {

                opacity_1.setValue(1)
                snack_1_active.current = false
                setsnack_1_msg('')
            })
        }))
        setlistener2(EventRegister.addEventListener('snack_2', (msg) => {
            snack_2_active.current = true


            setsnack_2_msg(msg)


            if (opacity_2 < 1) opacity_2.setValue(1)
            Animated.timing(opacity_2, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true
            }).start(() => {

                opacity_2.setValue(1)
                snack_2_active.current = false
                setsnack_2_msg('')
            })
        }))
        setlistener3(EventRegister.addEventListener('snack_3', (msg) => {
            snack_3_active.current = true
            setsnack_3_msg(msg)


            if (opacity_3 < 1) opacity_3.setValue(1)
            Animated.timing(opacity_3, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true
            }).start(() => {

                opacity_3.setValue(1)
                snack_3_active.current = false
                setsnack_3_msg('')
            })
        }))

        return () => {
            EventRegister.removeEventListener(listener1)
            EventRegister.removeEventListener(listener2)
            EventRegister.removeEventListener(listener3)
        }
    }, [])

    return (


        <Animated.View
            style={{
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,0.5)',
                height: 30,
                opacity: 1,
                zIndex: 50,
                top: '30%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15
            }}>
            <Animated.Text style={{

                opacity: opacity_1,
                color: 'rgb(203, 203, 59)',
                fontSize: 15,
                fontWeight: 'bold',
                shadowColor: 'black',
                textShadowColor: 'black',
                textShadowRadius: 50,
                marginHorizontal: 50,
                position: 'absolute'
            }}>
                {snack_1_msg}
            </Animated.Text>
            <Animated.Text style={{

                position: 'absolute',
                opacity: opacity_2,
                color: 'rgb(203, 203, 59)',
                fontSize: 15,
                fontWeight: 'bold',
                shadowColor: 'black',
                textShadowColor: 'black',
                textShadowRadius: 50,

            }}>
                {snack_2_msg}
            </Animated.Text>
            <Animated.Text style={{

                opacity: opacity_3,
                color: 'rgb(203, 203, 59)',
                fontSize: 15,
                fontWeight: 'bold',
                shadowColor: 'black',
                textShadowColor: 'black',
                textShadowRadius: 50,
                // marginHorizontal: 50,


            }}>
                {snack_3_msg}
            </Animated.Text>
        </Animated.View>

    )
}
