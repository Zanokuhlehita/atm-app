
import React from 'react'
import { useContext } from 'react';
import { FlatList, AppRegistry, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { EventRegister } from 'react-native-event-listeners';
import { DataContext } from '../../contexts/DataContext';
import { MainContext } from '../../contexts/MainContext';

//import playlists from '../../contexts/data/playlists.js'

export default function Playlists({ navigation }) {
    const { playlists } = useContext(DataContext)
    const { playlist_number_ref } = useContext(MainContext)
    const { width, height } = Dimensions.get('window');

    const cover_art_size = 70

    return (

        <View style={{

            flex: 1,
            //backgroundColor: 'orange',
            height: '100%', width: '100%'
        }}>
            <View style={{
                marginTop: '50%',
                // backgroundColor: 'pink',
                alignItems: 'center',

            }}>

                <FlatList
                    contentContainerStyle={{

                        justifyContent: 'center',


                    }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    data={playlists}
                    renderItem={({ item, index }) => {
                        if (item.name != 'plc')
                            return (
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            playlist_number_ref.current = index
                                            navigation.navigate('playlist')

                                        }

                                    }
                                >

                                    <View style={{
                                        backgroundColor: item.color,
                                        height: 99,
                                        width: width * 0.45,
                                        margin: 5,
                                        borderRadius: 10,
                                        borderColor: 'rgba(0,0,0,0.3)',
                                        borderWidth: 3,
                                        overflow: 'hidden',

                                    }}>

                                        <View >
                                            <Text
                                                style={{
                                                    color: 'rgb(239,239,239)',
                                                    //padding: 10,
                                                    fontWeight: 'bold',
                                                    fontSize: 15,
                                                    top: 15,
                                                    left: 10
                                                }}>{item.name}</Text>
                                        </View>

                                        <View style={{
                                            position: 'relative',
                                            top: 20,
                                            left: width / 4,
                                            transform: [{ rotate: '20deg' }],
                                            borderWidth: 1,
                                            borderColor: 'rgba(0,0,0,0.6)',
                                            height: cover_art_size + 4,
                                            width: cover_art_size,
                                            elevation: 30,
                                            borderRadius: 2
                                        }}>

                                            <Image
                                                source={item.image}
                                                style={{
                                                    height: cover_art_size,
                                                    width: cover_art_size,

                                                }}
                                            ></Image>
                                        </View>

                                    </View>

                                </TouchableOpacity>
                            )
                    }}
                />
            </View>


        </View>
    )
}
