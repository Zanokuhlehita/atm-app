import React, { useState, useEffect } from 'react'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialCommunityIcons, Entypo, EvilIcons, Feather } from '@expo/vector-icons';

import { TouchableHighlight } from 'react-native-gesture-handler';
import { EventRegister } from 'react-native-event-listeners'
import { minimizeplayer } from '../../plugins/store/actions'
export default function Header() {

    const dispatch = useDispatch()
    //  const [current_view, setcurrent_view] = useState("index")

    const { current_view } = useSelector(state => state.settings)
    //const [current_view, setcurrent_view] = useState('heu')

    return (


        <View style={{
            height: 50, position: 'absolute',
            top: 40, zIndex: 2,
            flexDirection: 'row', width: '100%',

        }}>
            <View style={{
                width: '20%', alignItems: 'center',
                // backgroundColor: 'orange'
            }}>
                < TouchableOpacity
                    style={{
                        //backgroundColor: 'green',
                        height: 80,
                        width: 80,
                        position: 'absolute',
                        alignItems: 'center',
                        marginTop: -26,
                        justifyContent: 'center'

                    }}
                    onPress={() => {
                        EventRegister.emit('open_libraries')
                        EventRegister.emit('minimize_player', true)

                        EventRegister.emit('update_swipe_up_all')

                    }}>
                    <EvilIcons name="chevron-down" size={39} color='white' />
                    {/* <MaterialCommunityIcons name="library-music" size={24} color="white" /> */}</ TouchableOpacity>
            </View>
            <View style={{ width: '60%', alignItems: 'center', }}><Text style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',

            }}>

            </Text>
            </View>
            <View style={{ width: '20%', alignItems: 'center', }}>
                <TouchableOpacity
                    style={{
                        //backgroundColor: 'green',
                        height: 80,
                        width: 80,
                        position: 'absolute',
                        alignItems: 'center',
                        marginTop: -26,
                        justifyContent: 'center'

                    }}
                    onPress={() => {
                        EventRegister.emit('navlist_player', true)
                        // dispatch(minimizeplayer())

                    }}>
                    <Feather name="more-vertical" size={21} color="white" />

                </TouchableOpacity>
            </View>



        </View >

    )
}