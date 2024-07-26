import React, { useContext, useRef, useState, useEffect } from 'react'
import { MainContext } from '../../contexts/MainContext'
import firebase from 'firebase'
import {
    View, Text, TextInput, Dimensions, Button,
    StyleSheet, Image, TouchableHighlight,
    TouchableOpacity, ScrollView, FlatList
} from 'react-native'
import fb_logo from '../../assets/images/logos/fb_logo2.png'
import google_logo from '../../assets/images/logos/google_logo.png'
import insta_logo from '../../assets/images/logos/insta_logo.png'
import { move } from 'react-native-redash'
import Songcard from '../ui_elements/songcard'
import Songs from '../../assets/songs/Songs.json'
import { useNavigation } from '@react-navigation/native'
import { EventRegister } from 'react-native-event-listeners'
import Search from '../libraries/search'


export default function Viewsongs({ navigation }) {
    //const { songs } = useContext(MainContext)
    const { width, height } = Dimensions.get('window');
    const db = firebase.firestore()




    const [songs, setsongs] = useState([])




    const search = async () => {
        db.collection('songs').where('song_name', '==', search_text).get().then(({ docs }) => {
            docs.forEach((doc) => {
                setsongs([])
                setdocid([])
                setsongs(prev => [...prev, doc.data()])
                setdocid(prev => [...prev, doc.id])
            })
        })
        setupdate(!update)
    }
    const [listener, setlistener] = useState()
    const [docid, setdocid] = useState([])
    /*  useEffect(() => {
         db.collection('songs').orderBy('song_name').get().then(({ docs }) => {
             docs.forEach((doc) => {
                 setsongs(prev => [...prev, doc.data()])
                 setdocid(prev => [...prev, doc.id])
             })
         })
         return () => {
             setsongs([])
             setdocid([])
 
         }
     }, []) */
    const [search_text, setsearch_text] = useState('')

    useEffect(() => {


        db.collection('songs').orderBy('song_name').onSnapshot((doc) => {
            setsongs([])
            setdocid([])
            doc.docs.forEach((doc) => {
                setsongs(prev => [...prev, doc.data()])
                setdocid(prev => [...prev, doc.id])
            })

        })


        setlistener(EventRegister.addEventListener('navigateToAdmin', (screen) => {
            navigation.navigate(screen)

        }))
        return () => {
            setsongs([])
            setdocid([])
            EventRegister.removeEventListener(listener)
        }
    }, [])
    const [update, setupdate] = useState(true)
    useEffect(() => {
        console.log('viewsongs updated view')

    }, [update])
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'rgb(30, 30, 30)',
            width: '80%',
            paddingHorizontal: 30
        }}>
            <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 3, width: 150, backgroundColor: 'white' }}></View>
            </View>







            <View style={{ height: 60, marginVertical: 5 }}>
                <Button title='update me'

                    onPress={() => { setupdate(!update) }}
                />
            </View>




            <View style={{ height: 35, marginVertical: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'white' }}>All Tracks Playlist</Text>
            </View>
            <TextInput style={{
                borderWidth: 2,
                borderColor: 'white',
                color: 'white',
                paddingHorizontal: 10,
                marginVertical: 20
            }}
                onChangeText={(txt) => setsearch_text(txt)}
            ></TextInput>
            <Button title='search'
                onPress={() => {
                    search()
                }}
            />

            <View style={{
                width: '100%',
                marginTop: 20
            }}>

                <FlatList
                    scrollEnabled={false}
                    data={songs}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{
                        // paddingBottom: 480

                    }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                flexDirection: 'row'
                            }}><TouchableOpacity onPress={() => { navigation.navigate('editsong', docid[index]/* item.song_name */) }}>
                                    <View style={{
                                        width: '80%'
                                    }}>
                                        <Songcard
                                            song_name={item.song_name}
                                            cover_art_link={item.cover_art_link}
                                            artists={item.artists}
                                            featuring_artists={item.featuring_artists}
                                        ></Songcard>
                                        <Text>{docid[index]}</Text>
                                    </View>
                                </TouchableOpacity>

                                <Button title='del'

                                    onPress={() => {

                                        db.collection('songs').doc(docid[index]).delete()
                                        // console.log('songs[0]', songs[0].song_name)
                                    }} />
                            </View>

                        )
                    }}
                />




            </View>


        </View>

    )
}









