import React, { useState, useRef, useEffect, useContext } from 'react'
import { AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native'
import firebase from 'firebase'

import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DataContext } from '../../../contexts/DataContext'
import { MainContext } from '../../../contexts/MainContext'

export default function Welcomemsg() {
    const { user_data } = useSelector((state) => state.user)

    const [user_name, setuser_name] = useState('');
    const { user } = useContext(DataContext)
    const { now_playing_playlist } = useContext(MainContext)


    return (

        <View style={{
            flex: 1,
            //backgroundColor: 'pink',s
            height: '100%', width: '100%',
            paddingHorizontal: 20
        }}>

            <View>

                <Text style={{
                    color: 'white',
                    fontSize: 18
                }}>Hello {user ? user.first_name : null}<Text style={{ fontWeight: 'bold', }}>{



                    //  loaded ? firebase.auth().currentUser.displayName.replace(/ .*/, '') : null


                }</Text></Text>


                <Text style={{
                    color: 'white', fontWeight: 'bold',
                    fontSize: 25
                }}>Enjoy Your Music!</Text>
            </View>

        </View>
    )
}
