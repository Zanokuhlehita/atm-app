
import React, { useRef, useState, useEffect, useContext } from 'react'
import {
    View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, Animated, Button, TextInput,
    ScrollView, Alert, Keyboard
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Scrollcounter from './supportus/scrollcounter'
import {
    SimpleLineIcons, EvilIcons, Fontisto, Ionicons, MaterialCommunityIcons,
    FontAwesome5
} from '@expo/vector-icons';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";


export default function Supportus() {
    const divider_color = 'rgba(255,255,225,0.1)'
    const divider_width = 0.5
    const { width, height } = Dimensions.get('window');

    const amount = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const [active_amount, setactive_amount] = useState(10)
    const amount_slider = useRef()
    const active_color = 'rgba(206, 168, 23, 1)'
    const scrollY = useRef()
    return (
        <View style={{
            width: width,
            height: '100%',
            backgroundColor: 'rgb(51, 51, 51)',
            // alignItems: 'center',
            marginLeft: 0,
            padding: 15,
            paddingTop: 40
        }}>



            <Text style={{
                color: "white",
                fontSize: 20,
                fontWeight: 'bold'
            }}>Support Us</Text>
            <ScrollView
                ref={(ref) => { scrollY.current = ref }}
                style={{
                    width: width - 60,
                    left: -15
                }}>

                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',

                        marginTop: 40
                    }}>
                    <Image
                        style={{
                            height: 116,
                            width: 100,
                            alignSelf: 'center',
                            resizeMode: 'cover'
                        }}
                        source={require('../../assets/images/support_us3.png')}>

                    </Image>
                </View>





                <Text style={{

                    color: "white",
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                    width: '85%',
                    textAlign: 'center',
                    marginVertical: 20,
                    alignSelf: 'center'

                }}>Become a Adler Tempo Hero and play a crucial role in initiating change for the future of Adler Tempo.{'\n'}
                    Every song we create requires us to take a different road of discovery.
                    You can become part of this journey and help us change our story.


                    {/* Adler Tempo music is reaching out for your support BECAUSE we can only finance more music through  love you to give us more ability to release more content.
                    Our expert content creators have made this app a possibility
                    when you make a donation your account instanlt first to you recieves music releases.
                    YOU can select the amount you wish. Finance the next project. No Amount is too small to help us */}
                </Text>
                <View style={{


                    alignItems: 'center',

                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'

                    }}>
                        <View>
                            <TouchableOpacity onPress={() => {
                                setactive_amount(5)
                            }}>
                                <View style={[styles.boxes, {
                                    backgroundColor: active_amount == 5 ? active_color : 'white'
                                }]}>
                                    <Text style={[styles.boxesText, { color: active_amount == 5 ? 'rgb(255,255,255)' : 'black' }]}>$5</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setactive_amount(10)
                            }}>
                                <View style={[styles.boxes, {
                                    backgroundColor: active_amount == 10 ? active_color : 'white'
                                }]}>
                                    <Text style={[styles.boxesText, { color: active_amount == 10 ? 'rgb(255,255,255)' : 'black' }]}>$10</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                setactive_amount(25)
                            }}>
                                <View style={[styles.boxes, {
                                    backgroundColor: active_amount == 25 ? active_color : 'white'
                                }]}>
                                    <Text style={[styles.boxesText, { color: active_amount == 25 ? 'rgb(255,255,255)' : 'black' }]}>$25</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setactive_amount(50)
                            }}>
                                <View style={[styles.boxes, {
                                    backgroundColor: active_amount == 50 ? active_color : 'white'
                                }]}>
                                    <Text style={[styles.boxesText, { color: active_amount == 50 ? 'rgb(255,255,255)' : 'black' }]}>$50</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        width: 210,
                        height: 50,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        paddingLeft: 20,
                        flexDirection: 'row',
                        marginVertical: 5

                    }}>
                        <Text style={{
                            color: "black",
                            fontSize: 13,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            marginRight: 5
                        }}>$</Text>

                        <TextInput
                            keyboardType='numeric'
                            onFocus={() => {


                                scrollY.current.scrollToEnd({ animated: true })
                            }}
                            placeholder='Custom Amount'
                            onChangeText={(text) => {
                                setactive_amount(text)

                            }}
                            style={{
                                //borderWidth: 1,
                                width: '100%',
                                height: '100%',
                                borderColor: 'black',

                            }} />
                    </View>
                </View>
                <TouchableOpacity onPress={() => {

                }}>
                    <View style={{
                        backgroundColor: 'rgb(30, 30, 30)',
                        height: 50,
                        width: 230,
                        borderRadius: 50,
                        justifyContent: 'center',
                        marginVertical: 10,


                        alignSelf: 'center'
                    }}>
                        <Text style={{
                            color: "white",
                            fontSize: 13,
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>Submit Your Donation</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    text: {
        color: 'rgba(239,239,239,0.8)',
        fontSize: 14,
        paddingVertical: 13,
        paddingHorizontal: 0,
        width: '50%',
        textAlign: 'center',
        //fontWeight: 'bold',

    },
    boxes: {

        height: 50, width: 100,
        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5
    },
    boxesText: {
        color: "black",
        fontSize: 13,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})