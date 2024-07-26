import React, { useContext, useState, useEffect, useRef } from 'react'
import { AppRegistry, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native'
import { DataContext } from '../../../contexts/DataContext'
import Slides from './exploreslides/slides'
import suggested_plays from '../../../contexts/data/suggestedplays'
import new_releases from '../../../contexts/data/newreleases'
import { EventRegister } from 'react-native-event-listeners'
import { MainContext } from '../../../contexts/MainContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Exploreslides() {

    //const { suggested_plays } = useContext(DataContext)


    //const [suggested_plays, setsuggested_plays] = useState(setsuggested_plays)
    const { recent_play_ref } = useContext(DataContext)
    const [recent_plays, setrecent_plays] = useState([{
        song_name: "N/A",
        key: '1',
        cover_image: require('../../../assets/images/covers/plc.jpg')
    }])
    const [favorites, setfavorites] = useState([{
        song_name: "N/A",
        key: '1',
        cover_image: require('../../../assets/images/covers/plc.jpg')
    }])


    const storeData = async (storageKey, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(storageKey, jsonValue)

        } catch (e) {
            // saving error
        }
    }
    const getData = async (storageKey) => {
        try {

            const jsonValue = await AsyncStorage.getItem(storageKey)
            if (jsonValue != null || jsonValue != []) {
                const value = JSON.parse(jsonValue)
                setrecent_plays(value)
            } else {
            }

        } catch (e) {
        }
    }
    const listener = useRef()

    useEffect(() => {
        setTimeout(() => {
            getData('recent_plays')

        }, 3000);

        listener.current = EventRegister.addEventListener('update_recent_plays', () => {
            setrecent_plays(recent_play_ref.current)
            console.log('UPDATED RECENTS EMITTED')
        })
        return () => {
            EventRegister.removeEventListener(listener.current)
        };
    }, []);

    return (

        <View style={{

            //backgroundColor: 'pink',
            height: '100%', width: '200%',
            ///paddingLeft: 10,
            paddingBottom: 150,

        }}>
            {/*   {state.map((item, i) => (
                <Slides  title={item.title} data={item.data} index={i} />
            ))} */}
            <Slides title={'Suggested Plays'} data={suggested_plays} data_name='suggested_single_play' /* data_name='suggested_plays' */ />

            {/*       <Slides title={'Recently Played'} data={recent_plays} data_name='recent_plays' />*/}

            <Slides title={'New Releases'} data={new_releases} data_name='new_releases_single_play' />
            <Slides title={'Your Favorites'} data={favorites} data_name='favorites' />
            {/* 
            <FlatList
                scrollEnabled={true}
                style={{ paddingBottom: 200 }}
                nestedScrollEnabled={true}
                keyExtractor={(item) => item.key}
                data={state}
                renderItem={
                    ({ item, index }) => {
                        return (

                            <Slides title={item.title} data={item.data} index={index} />


                        )
                    }
                }
            /> */}


        </View>
    )
}
