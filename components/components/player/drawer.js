
import React, { useContext, useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, FlatList, Dimensions } from 'react-native'
import { color } from 'react-native-reanimated'
import Songcard from '../ui_elements/songcard'
import Songs from '../../assets/songs/Songs.json'
import { MainContext } from '../../contexts/MainContext'
import { DataContext } from '../../contexts/DataContext'
import { Button } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { EventRegister } from 'react-native-event-listeners'

export default function Drawer() {
    const { songs, now_playing_playlist_ref, now_playing_playlist, now_playing_ref } = useContext(MainContext)
    const { all_songs } = useContext(DataContext)
    const { width, height } = Dimensions.get('window');



    /// this is for upnext track indexed with +1


    const [now_playlist_name, setnow_playlist_name] = useState('All Tracks')

    const listener = useRef()


    useEffect(() => {

        listener.current = EventRegister.addEventListener('songs', (playlist) => {
            if (playlist == 'all_tracks') setnow_playlist_name('All Tracks')
            if (playlist == 'new_tracks') setnow_playlist_name('New Tracks')
            if (playlist == 'hot_tracks') setnow_playlist_name('Hot Tracks')
            if (playlist == 'reset') setnow_playlist_name('none')


            if (playlist == 'suggested_plays') setnow_playlist_name('Suggested Plays')
            if (playlist == 'recent_plays') setnow_playlist_name('Recent Plays')
            //if (playlist == 'favorites') setnow_playlist_name('Favorites)
            if (playlist == 'new_releases') setnow_playlist_name('New Releases')
            if (playlist == 'suggested_single_play') setnow_playlist_name('Single Play')

            ///////// playlists //////////////
            if (playlist == 'love_vibes') {
                setnow_playlist_name('Love Vibes')
            }
            if (playlist == 'soul_trap') {

                setnow_playlist_name('Soul Trap')
            }
            if (playlist == 'hustlers_mind') {

                setnow_playlist_name('Hustlers Mind')
            }
            if (playlist == 'loyalty') {

                setnow_playlist_name('Loyalty')
            }
            if (playlist == 'album_intros') {

                setnow_playlist_name('Album Intros')
            }
            ///////// moods //////////
            if (playlist == 'happy') {

                setnow_playlist_name('Happy Mood')
            }
            if (playlist == 'love') {

                setnow_playlist_name('Love Mood')
            }
            if (playlist == 'heart_broken') {

                setnow_playlist_name('Heart Broken')
            }
            if (playlist == 'grateful') {

                setnow_playlist_name('Grateful')
            }
            if (playlist == 'overwhelmed') {

                setnow_playlist_name('Overwhelmed')
            }
            if (playlist == 'flattery') {

                setnow_playlist_name('Flattery')
            }
            if (playlist == 'Afro Beat') {

                setnow_playlist_name('Afro Beat')
            }
        })
        return () => {
            EventRegister.removeEventListener(listener.current)

        }
    }, [])


    return (
        <View style={{
            flex: 1,
            // backgroundColor: 'yellow',
            width: '100%',
            paddingHorizontal: 10
        }}>
            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 3, width: 150, backgroundColor: 'white' }}></View>
            </View>







            <View style={{ height: 60, marginVertical: 5, paddingHorizontal: 15 }}>
                <TouchableOpacity
                    onPress={() => {
                        //console.log(now_playing_playlist.data[0].song_name)
                    }}

                >
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>Up Next</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <Text
                        style={{
                            fontSize: 12, color: 'white',
                            marginLeft: 20
                        }}

                    >{now_playing_playlist.current[now_playing_ref.current + 1] ?
                        `${now_playing_playlist.current[now_playing_ref.current + 1].song_name + ' - ' + now_playing_playlist.current[now_playing_ref.current + 1].artists} ${now_playing_playlist.current[now_playing_ref.current + 1].featuring_artists ? 'ft ' + now_playing_playlist.current[now_playing_ref.current + 1].featuring_artists : null}`
                        : 'N/A'} </Text>
                </View>
            </View>
            <View style={{ height: 35, marginVertical: 5, paddingHorizontal: 15 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>{now_playlist_name} Playlist</Text>
            </View>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
                indicatorStyle={{ color: 'white' }}
                bounces={false}
                alwaysBounceVertical={false}

            >
                <View style={{
                    marginBottom: 450,
                    borderBottomColor: 'rgba(255,255,255,0.3)',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10
                }}>

                    <FlatList
                        scrollEnabled={false}
                        data={now_playing_playlist.current}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{
                            // paddingBottom: 480

                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <Songcard
                                    song_name={item.song_name}
                                    cover_art_link={item.cover_art_link}
                                    artists={item.artists}
                                    featuring_artists={item.featuring_artists}
                                    song_link_name={item.link}
                                    cover_image={item.cover_image}
                                    id={index}
                                ></Songcard>
                            )
                        }}
                    />



                </View>

            </ScrollView>
        </View>



    )
}
