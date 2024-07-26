import React, { useContext, useRef, useState } from 'react'
import { MainContext } from '../../contexts/MainContext'
import firebase from 'firebase'
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native'
import fb_logo from '../../assets/images/logos/fb_logo2.png'
import google_logo from '../../assets/images/logos/google_logo.png'
import insta_logo from '../../assets/images/logos/insta_logo.png'
import { move } from 'react-native-redash'


export default function Addsongs({ navigation }) {
    const { songs } = useContext(MainContext)
    const db = firebase.firestore()

    const [song_name, setsong_name] = useState('')
    const [code, setcode] = useState('A00')
    const [song_link_name, setsong_link_name] = useState('A00x_name.pm3')
    const [artists, setartists] = useState('Jayceon Adler')
    const [featuring_artists, setfeaturing_artists] = useState('Bray Atlas')
    const [genres, setgenres] = useState('Trap')
    const [album_ep, setalbum_ep] = useState('LLL')
    const [release_date, setrelease_date] = useState('1 Jan 2021')
    const [other_stores, setother_stores] = useState('')
    const [lyrics_link, setlyrics_link] = useState('../../assets/lyrics/A00x_name')
    const [story_line, setstory_line] = useState('')
    const [cover_image, setcover_image] = useState('x.jpg')
    const [producers, setproducers] = useState('Jayceon Adler')
    const [writers, setwriters] = useState('Bray Atlas')
    const [moods, setmoods] = useState('')




    const no = useRef(run).current

    function add() {
        try {
            // db.collection('songs').add({
            db.collection('songs').doc(code).set({
                code,
                song_name,
                song_link_name,
                artists,
                featuring_artists,
                genres,
                album_ep,
                release_date,
                other_stores,
                lyrics_link,
                story_line,
                cover_image,
                producers,
                writers,
                moods,
            })
            navigation.navigate('viewsongs')

        } catch (e) {

            console.log(e.toString())
        }

    }




    const run = async () => {
        await db.collection('songs').get().then((data) => data.docs[0].data())
    }
    return (
        <View style={{
            flex: 1,
            width: '75%',
            //justifyContent: 'center',
            //alignItems: 'center',
            backgroundColor: '#181B1F'

        }}>
            <View
                style={{ height: '15%' }} />
            <View style={{
                //flex: 1,
                //justifyContent: 'center',
                //alignItems: 'center',
                backgroundColor: '#181B1F'

            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 35,
                    color: 'white',
                    textAlign: 'center'
                }}>New Song
                 <Text style={{
                        fontWeight: 'bold',
                        fontSize: 10,
                        color: 'white',
                        textAlign: 'center'
                    }}></Text></Text>
            </View>
            <ScrollView>
                <View
                    style={{ marginVertical: 20, marginHorizontal: '10%' }}
                >
                    {/* fileds */}
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='code' style={styles.textinput}
                        onChangeText={(email) => { setcode(email) }}
                        value={code}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='song_name' style={styles.textinput}
                        onChangeText={(txt) => { setsong_name(txt) }}
                        value={song_name}
                    ></TextInput>
                    <TouchableOpacity style={{
                        height: 40,
                        width: '80%',

                        justifyContent: 'center',
                        alignItems: 'center',

                        borderRadius: 2,
                        margin: 10
                    }}
                        onPress={add}
                    >
                        <View style={{
                            height: 40,
                            width: '100%',
                            backgroundColor: '#FF9800',
                            justifyContent: 'center',
                            borderRadius: 2,
                            margin: 10
                        }}>

                            <Text style={{ textAlign: 'center', color: 'white' }}>Add Song</Text>


                        </View>
                    </TouchableOpacity>

                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='song_link_name' style={styles.textinput}
                        onChangeText={(txt) => { setsong_link_name(txt) }}
                        value={song_link_name}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='artists' style={styles.textinput}
                        onChangeText={(txt) => { setartists(txt) }}
                        value={artists}
                    ></TextInput>

                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='featuring_artists' style={styles.textinput}
                        onChangeText={(txt) => { setfeaturing_artists(txt) }}
                        value={featuring_artists}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='genres' style={styles.textinput}
                        onChangeText={(txt) => { setgenres(txt) }}
                        value={genres}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='album_ep' style={styles.textinput}
                        onChangeText={(txt) => { setalbum_ep(txt) }}
                        value={album_ep}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='release_date' style={styles.textinput}
                        onChangeText={(txt) => { setrelease_date(txt) }}
                        value={release_date}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='other_stores' style={styles.textinput}
                        onChangeText={(txt) => { setother_stores(txt) }}
                        value={other_stores}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='lyrics_link' style={styles.textinput}
                        onChangeText={(txt) => { setlyrics_link(txt) }}
                        value={lyrics_link}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='storyline' style={styles.textinput}
                        onChangeText={(txt) => { setstory_line(txt) }}
                        value={story_line}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='cover_image' style={styles.textinput}
                        onChangeText={(txt) => { setcover_image(txt) }}
                        value={cover_image}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='producers' style={styles.textinput}
                        onChangeText={(txt) => { setproducers(txt) }}
                        value={producers}
                    ></TextInput>


                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='writers' style={styles.textinput}
                        onChangeText={(txt) => { setwriters(txt) }}
                        value={writers}
                    ></TextInput>
                    <TextInput
                        placeholderTextColor="rgba(255,255,255, 0.3)"
                        placeholder='moods' style={styles.textinput}
                        onChangeText={(txt) => { setmoods(txt) }}
                        value={moods}
                    ></TextInput>



                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                </View>

            </ScrollView>
        </View>

    )
}





const styles = StyleSheet.create({
    textinput: {
        borderBottomWidth: 2,
        color: 'rgba(255,255,255, 0.7)',

        borderColor: 'white'
        ,
        margin: 2,
        borderRadius: 2,
        height: 40,
        marginVertical: 12
    },
    image: {
        height: 50,
        width: 35,
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: 20,
        padding: 0,
        resizeMode: 'contain'
    }

})