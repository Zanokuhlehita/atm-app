import React, { useContext } from 'react'
import { AppRegistry, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { Feather, FontAwesome5, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MainContext } from '../../../contexts/MainContext';
import { DataContext } from '../../../contexts/DataContext';
import { EventRegister } from 'react-native-event-listeners'
import { unloadAllAsync } from 'expo-font';

export default function Shortcutboxes() {
    const { soundAll_ref, now_playing_playlist, snack_1_active, snack_2_active, snack_3_active, library_swiper, song_init_render } = useContext(MainContext)
    const { all_tracks, new_tracks, new_tracks_ref, all_tracks_ref } = useContext(DataContext)


    async function unloadSound() {
        if (soundAll_ref.current) await soundAll_ref.current.unloadAsync()
    }
    const Shortcutboxes = [
        {
            name: 'New Tracks',
            icon: <Feather name="clock" size={80} color="rgb(76, 175, 80)" />,
            color: 'rgba(76, 175, 80,0.3)',
            action: () => {
                unloadSound()
                song_init_render.current = 0

                EventRegister.emit('minimize_player', false)
                EventRegister.emit('player_splash_screen', true)
                EventRegister.emit('slideTo', 0)


                setTimeout(() => {
                    EventRegister.emit('songs', 'new_tracks')


                }, 0);
            }

        },
        {
            name: 'Shuffle All',
            icon: <Feather name="shuffle" size={75} color="rgb(255, 152, 0)" />,
            color: 'rgba(255, 152, 0,0.3)',
            action: () => {
                unloadSound()
                song_init_render.current = 0
                EventRegister.emit('minimize_player', false)
                EventRegister.emit('player_splash_screen', true)

                EventRegister.emit('slideTo', 0)

                setTimeout(() => {
                    EventRegister.emit('songs', 'all_tracks')

                }, 0);
            }

        },
        {
            name: 'Your Favourites',
            icon: <Feather name="heart" size={80} color="rgb(233, 30, 99)" />,
            color: 'rgba(233, 30, 99,0.3)',
            action: () => {
                if (!snack_1_active.current) { EventRegister.emit('snack_1', `No favourite tracks found.`) }
                else {
                    if (!snack_2_active.current) { EventRegister.emit('snack_2', `No favourite tracks found.`) }
                    else {
                        if (!snack_3_active.current) { EventRegister.emit('snack_3', `No favourite tracks found.`) }

                    }

                }
            }

        },
        {
            name: 'Hot List',
            icon: <FontAwesome5 name="fire" size={75} color="rgb(241, 66, 53)" />,
            color: 'rgba(241, 66, 53,0.3)',
            action: () => {
                unloadSound()
                song_init_render.current = 0
                EventRegister.emit('minimize_player', false)
                EventRegister.emit('player_splash_screen', true)
                EventRegister.emit('slideTo', 0)

                setTimeout(() => {

                    EventRegister.emit('songs', 'hot_tracks')

                }, 0);
            }
        },

    ]
    const { width, height } = Dimensions.get('window');

    return (
        <TouchableWithoutFeedback onPressIn={() => {
            library_swiper.current.setNativeProps({ scrollEnabled: true })
        }}>


            <View style={{
                flex: 1,
                //backgroundColor: 'pink',
                height: '100%', width: '100%',
                paddingHorizontal: 0
            }}>

                <FlatList
                    data={Shortcutboxes}
                    numColumns={2}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={item.action}>
                            <View style={{
                                backgroundColor: item.color,

                                height: 125,
                                width: width * 0.45,
                                margin: 6,
                                borderRadius: 5,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {item.icon}
                                <Text
                                    style={{

                                        color: 'rgba(239,239,239,0.2)',
                                        paddingTop: 5,
                                        fontSize: 10
                                    }}
                                >{item.name}</Text>
                            </View>

                        </TouchableOpacity>

                    )}
                />




            </View>
        </TouchableWithoutFeedback>
    )
}
