import React, { useContext } from 'react'
import { AppRegistry, StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import { moods } from '../../contexts/data/moods'
import { MainContext } from '../../contexts/MainContext';

export default function Mood({ navigation }) {
    const { playlist_number_ref } = useContext(MainContext)

    const { width, height } = Dimensions.get('window');
    const image_size = 62
    return (

        <View style={{
            flex: 1,
            //backgroundColor: 'purple',
            height: '100%', width: '100%'
        }}>


            <View style={{
                marginTop: '50%',

            }}>


                <FlatList
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',


                    }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    data={moods}
                    renderItem={({ item, index }) => {

                        return (
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        playlist_number_ref.current = index
                                        navigation.navigate('mood')
                                    }

                                }
                            >

                                <View style={{
                                    backgroundColor: item.color,
                                    height: 105,
                                    width: width * 0.3,
                                    margin: 5,
                                    borderRadius: 10,
                                    borderColor: 'rgba(0,0,0,0.3)',
                                    borderWidth: 3,
                                    overflow: 'hidden',
                                }}>



                                    <View style={{
                                        //  backgroundColor: 'blue',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '80%'
                                    }}>

                                        <Image
                                            source={item.image}
                                            style={{
                                                height: image_size,
                                                width: image_size,

                                            }}
                                        ></Image>
                                    </View>
                                    <View >
                                        <Text
                                            style={{
                                                color: 'rgba(0,0,0,0.7)',
                                                //padding: 10,
                                                fontWeight: 'bold',
                                                fontSize: 12,
                                                textAlign: 'center'
                                            }}>{item.name}</Text>
                                    </View>

                                </View>

                            </TouchableOpacity>
                        )
                    }}
                />

                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View style={styles.shortcutbox}></View>
                    <View style={styles.shortcutbox}></View>
                    <View style={styles.shortcutbox}></View>
                </View> */}



            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    shortcutbox: {

    }
})