import React, { useContext } from 'react'
import { AppRegistry, StyleSheet, Text, View, TextInput, FlatList, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Songcard from '../../components/ui_elements/songcard'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Songs from '../../assets/songs/Songs.json'
import { LinearGradient } from 'expo-linear-gradient';

import { MainContext } from '../../contexts/MainContext';
export default function Search() {
    const { width, height } = Dimensions.get('window');
    const { now_playing_playlist } = useContext(MainContext)

    return (

        <View style={{
            flex: 1,
            //backgroundColor: 'blue',
            height: '100%', width: '100%'
        }}>
            <View style={{

                height: '100%', width: '100%',
                position: 'absolute',


            }} >
                <LinearGradient
                    // Background Linear Gradient
                    locations={[0, 1]}
                    colors={['#32373D', '#181B1F']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,

                        height: '100%',
                    }}
                />


            </View>

            <View >
                <View style={{
                    height: 100,
                    justifyContent: 'center',
                    paddingHorizontal: 20
                }}>
                    <Text style={{
                        fontSize: 30,
                        color: 'white',
                        fontWeight: '600',


                    }}>Search</Text>
                </View>
                <View style={{
                    paddingHorizontal: 20,

                }}>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: 'white',
                            paddingVertical: 10,
                            paddingLeft: 50,
                            color: 'white',
                            elevation: 2
                        }}
                        placeholderTextColor="white"
                        placeholder='Song, artists or playlists' />
                    <Ionicons
                        style={{
                            position: 'relative',
                            top: -37,
                            left: 18
                        }}
                        name="ios-search" size={24} color="white" />

                </View>
                <View style={{


                    paddingHorizontal: 20
                }}>
                    <Text
                        style={{
                            fontSize: 17,
                            color: 'white',
                            fontWeight: '700',


                        }}
                    >All songs</Text>
                </View>
                <View

                    style={{
                        marginTop: 10,
                        paddingHorizontal: 10,
                        height: '100%'
                    }}>



                    <FlatList
                        data={now_playing_playlist.current}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{
                            paddingBottom: 480

                        }}
                        renderItem={({ item }) => {
                            return (
                                <Songcard
                                    song_name={item.song_name}
                                    cover_art_link={item.cover_art_link}
                                    artists={item.artists}
                                    featuring_artists={item.featuring_artists}
                                    song_link_name={item.link}
                                ></Songcard>
                            )
                        }}
                    />
                </View>



            </View>




        </View>
    )
}
const styles = StyleSheet.create({
    shortcutbox: {
        backgroundColor: "red",
        height: 110,
        width: '30%',
        margin: 5,
        borderRadius: 10
    }
})