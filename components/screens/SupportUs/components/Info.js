import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import Divider from '../../../components/Divider'
import { MainContext } from '../../../contexts/MainContext'
import { bg_color_secondary, primary_color, secondary_color, text_color_primary, text_color_secondary } from '../../../theme/colors'
import WebView from 'react-native-web'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';



export default function Info({ song }) {

    const { infoViewIndex_context_ref, allSongs_context_ref } = useContext(MainContext)



    useEffect(() => {

        return () => {

        }
    }, [])

    return (
        <View style={{
            flex: 1,
            //backgroundColor: 'red',
            paddingLeft: 10,

        }}>


            <View style={{
                //  height: 60,
                marginTop: 15,

                width: '100%',
                //backgroundColor: 'purple',
                justifyContent: 'center',
                // paddingHorizontal: 10,


            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',

                    color: secondary_color,



                }}>Support Us</Text>




            </View>
            <View style={{
                height: '75%',

            }}>
                <ScrollView
                    indicatorStyle='white'
                >

                    <Text style={{
                        color: text_color_primary,
                        textAlign: 'justify',
                        marginVertical: 10,
                        marginBottom: 20,


                    }}>Become a Adler Tempo Hero and play a crucial role in initiating change for the future of Adler Tempo.{'\n'}{'\n'}
                    Every song we create requires us to take a different road of discovery.
                    You can become part of this journey and help us change our story.

                </Text>



                </ScrollView>
                <Divider />
                <TouchableOpacity style={{
                    marginVertical: 15,

                    height: 70,
                    width: '100%',
                    backgroundColor: bg_color_secondary,
                    borderRadius: 2,

                    flexDirection: 'row',

                }}>
                    <View style={{
                        // backgroundColor: 'yellow',
                        width: '70%',
                        height: '100%',
                        paddingHorizontal: 10,

                        //  alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text
                            // numberOfLines={1}
                            style={{
                                color: 'white',
                                fontSize: 18,
                                lineHeight: 23,


                            }}>PROCEED TO CHECKOUT</Text>
                    </View>

                    <View style={{
                        width: '30%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',

                    }}>
                        <AntDesign
                            style={{

                            }}
                            name="arrowright" size={24} color={secondary_color} />
                    </View>

                </TouchableOpacity>

            </View>

        </View>
    )
}
