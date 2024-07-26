
import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, Animated, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
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
import { EventRegister } from 'react-native-event-listeners';
import Supportusmodal from '../ui_elements/supportusmodal';

export default function About() {
    const divider_color = 'rgba(255,255,225,0.1)'
    const divider_width = 0.5
    const { width, height } = Dimensions.get('window');
    const active_color = 'rgb(25, 118, 210)'
    function openSupportModal() {

    }
    return (

        <View style={{
            width: '100%',
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
            }}>About</Text>

            <View style={{
                flexDirection: 'row',
                marginTop: 20
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 12,
                    //fontWeight: 'bold',
                    width: '30%'
                }}>Company Name :</Text>
                <Text style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: 'bold'
                }}>Adler Tempo </Text>

            </View>

            <View style={{
                flexDirection: 'row',
                marginVertical: 10
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 12,
                    //fontWeight: 'bold',
                    width: '30%'
                }}>About (AT):</Text>
                <Text style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: 'bold',
                    width: '40%',
                    marginHorizontal: 5
                }}>AT is a music Company thats commited to provide a loop of quality music to its listeners.</Text>

            </View>
            <View style={{
                flexDirection: 'row',
                marginVertical: 10
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 12,
                    //fontWeight: 'bold',
                    width: '30%'
                }}>Contact :</Text>
                <Text style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: 'bold',
                    width: '50%'
                }}>(+27) 000 0000{'\n'}(+263) 000 0000{'\n'}info@adlertempo.com

                </Text>

            </View>
            <View style={{
                flexDirection: 'row',
                marginVertical: 10
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 12,
                    //fontWeight: 'bold',
                    width: '30%'
                }}>Social Media :</Text>
                <Text style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: 'bold',
                    width: '50%'
                }}>#FB , #INST</Text>

            </View>
            <View style={{
                flexDirection: 'row',
                marginVertical: 10
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 12,
                    //fontWeight: 'bold',
                    width: '30%'
                }}>App Designed By :</Text>
                <Text style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: 'bold',
                    width: '50%'
                }}>NCODIA{'\n'}info@ncodia.co.za</Text>

            </View>


            <TouchableOpacity

                style={{
                    // backgroundColor: "#F194FF",



                }}
                onPress={() => {
                    EventRegister.emit('open_feedback_modal')
                }}
            >
                <View style={{
                    backgroundColor: 'rgb(30, 30, 30)',
                    height: 50,
                    width: 230,
                    borderRadius: 50,
                    justifyContent: 'center',
                    marginVertical: 0,
                    alignSelf: 'center',
                    marginLeft: -120,
                    marginTop: 20
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 13,
                        fontWeight: 'bold',
                        alignSelf: 'center'
                    }}>Send Us Feedback</Text>
                </View>

            </TouchableOpacity>



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

    }
})