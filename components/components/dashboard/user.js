
import React, { useState, useRef, useEffect, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, ImageBackground, Animated, Button, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { EventRegister } from 'react-native-event-listeners'
import * as ImagePicker from 'expo-image-picker';
import {
    SimpleLineIcons, EvilIcons, Fontisto, Ionicons, MaterialCommunityIcons,
    FontAwesome5, MaterialIcons
} from '@expo/vector-icons';
import firebase from 'firebase'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../../contexts/DataContext';

export default function User({ navigation }) {
    const { user, setuser } = useContext(DataContext)
    const divider_color = 'rgba(255,255,225,0.1)'
    const divider_width = 0.5
    const { width, height } = Dimensions.get('window');
    const active_color = 'rgb(25, 118, 210)'

    const [listener, setlistener] = useState()

    useEffect(() => {
        getData('user')
        setlistener(EventRegister.addEventListener('navigateTo', (screen) => {
            navigation.navigate(screen)

        }))
        return () => {
            EventRegister.removeEventListener(listener)
        }
    }, [])

    const [user_name, setuser_name] = useState()
    //const [gender, setgender] = useState()
    const [nationality, setnationality] = useState()


    const pickImage = async () => {
        setactivity_indicator(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
        });

        console.log('Just got the image', result);

        if (!result.cancelled) {
            console.log('Its storing the image', result.uri);

            storeData('user', { ...user, profile_image: result.uri })
            setuser({ ...user, profile_image: result.uri })
        }
        setactivity_indicator(false)
    };


    const getData = async (storageKey) => {
        try {
            const jsonValue = await AsyncStorage.getItem(storageKey)
            if (jsonValue != null) {


                const value = JSON.parse(jsonValue)
                // console.log(value)
                return value
            } else {
                return
            }

        } catch (e) {
            console.log(e)
        }
    }
    const [activity_indicator, setactivity_indicator] = useState(false)
    const [image, setImage] = useState(user.gender == 'Male' ? require("../../assets/images/user/male_plc.jpg") : require("../../assets/images/user/female_plc.jpg"));
    const [update, setupdate] = useState()
    const storeData = async (storageKey, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(storageKey, jsonValue)

        } catch (e) {
            // saving error
        }
    }
    return (
        <View>
            <View style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                alignItems: 'center',
                marginLeft: -60,

            }}>
                {/* Image */}


                <View

                    style={{
                        height: '100%',
                        width: '100%',
                        // justifyContent: 'center',
                        //  alignItems: 'center',
                        position: 'absolute'
                    }}>
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            width: 50,
                            /*  height: 30, */
                            left: '75%',
                            top: 20,
                            zIndex: 20,
                            // backgroundColor: 'black',
                            justifyContent: 'center',
                            borderRadius: 2,
                            padding: 10,
                            position: 'absolute'
                        }}>
                        <MaterialIcons name="edit" size={20} color="grey" />
                    </TouchableOpacity>
                    <ImageBackground
                        style={{
                            height: '80%',
                            width: width,

                            alignSelf: 'center'
                        }}
                        source={
                            user.profile_image ? { uri: user.profile_image } :
                                user.gender == 'Male' ? require("../../assets/images/user/male_plc.jpg") : require("../../assets/images/user/female_plc.jpg")
                        }>

                        <ActivityIndicator
                            style={{
                                top: '25%',
                            }}
                            animating={activity_indicator}
                            size={50}
                            color='white'
                        ></ActivityIndicator>

                    </ImageBackground>



                    <LinearGradient
                        // Background Linear Gradient
                        locations={[0, 0.4, 0.5]}
                        colors={['rgba(52, 70, 92,0)', 'rgba(52, 70, 92,0.8)', 'rgb(52, 70, 92)']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,

                            height: '100%',
                        }}
                    />
                </View>
                {/* Gradient */}

                <View style={{ top: '35%' }}>
                    <View>
                        <Text
                            style={{
                                color: 'rgba(239,239,239,0.9)',
                                fontWeight: '600',
                                fontSize: 25,
                                //fontWeight: 'bold',
                                textAlign: 'center',

                            }}
                        >{`${user.first_name} ${user.last_name}`/* firebase.auth().currentUser ? firebase.auth().currentUser.displayName : 'No User' */}</Text>
                    </View>

                    {/* Stats :Start */}
                    <View style={{
                        marginHorizontal: 40,
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text
                                style={styles.text}>Available Plays</Text>
                            <View style={{

                                width: divider_width,
                                height: '100%',
                                backgroundColor: divider_color
                            }}></View>
                            <Text
                                style={styles.text}>Plays Today</Text>

                        </View>

                        <View style={{
                            height: divider_width,
                            width: '85%',
                            backgroundColor: divider_color

                        }} />
                        <View style={{
                            flexDirection: 'row',
                            //justifyContent: 'space-around',

                        }}>
                            <Text
                                style={styles.text}
                            ><MaterialCommunityIcons name="infinity" size={24} color='rgba(239,239,239,0.8)' /></Text>
                            <View style={{

                                width: divider_width,
                                height: '100%',
                                backgroundColor: divider_color
                            }}></View>
                            <Text
                                style={styles.text}>N/A</Text>
                        </View>
                        <View style={{
                            marginTop: 25
                        }}>

                            <Text style={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: 15,
                                fontWeight: 'bold'
                            }}>Profile</Text>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 15
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 12,
                                    //fontWeight: 'bold',
                                    width: '35%'
                                }}>Gender :</Text>
                                <Text style={{
                                    color: "white",
                                    fontSize: 13,
                                    fontWeight: 'bold'
                                }}>{user.gender}</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 10
                            }}>
                                <Text style={{
                                    color: "white",
                                    fontSize: 12,
                                    //fontWeight: 'bold',
                                    width: '35%'
                                }}>Nationality :</Text>
                                <Text style={{
                                    color: "white",
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    width: '50%'
                                }}>{user.nationality}</Text>

                            </View>

                            {/*  <Button title='btn' onPress={() => {
                            
                                console.log('logging', user)

                            }}></Button> */}

                        </View>
                    </View>

                    {/* 
                    <View
                        style={{
                            height: 50,
                            width: 250,
                            backgroundColor: 'rgb(39, 39, 39)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 60
                        }}
                    ><Text

                        style={{

                            width: 250,
                            textAlign: 'center',
                            color: 'white',
                            fontSize: 18,
                            fontWeight: 'bold'

                        }}>More Details</Text></View> */}


                </View>



                {/*    <View style={{
                    position: 'absolute',
                    bottom: 0,


                }}>
                    <Text style={{
                        color: 'white',
                        left: 260,
                        position: 'relative',
                        top: 25,
                        marginVertical: 15,
                        opacity: 0.3,
                        fontWeight: 'bold',
                        fontSize: 8,
                        zIndex: 50

                    }}>PLAYS OVERVIEW</Text>
                    <LineChart
                        data={{
                            labels: ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"],
                            datasets: [
                                {
                                    data: [
                                        Math.floor(Math.random() * (50 - 1 + 1)) + 1,
                                        Math.floor(Math.random() * (50 - 1 + 1)) + 1,
                                        Math.floor(Math.random() * (50 - 1 + 1)) + 1,
                                        Math.floor(Math.random() * (50 - 1 + 1)) + 1,
                                        Math.floor(Math.random() * (50 - 1 + 1)) + 1,
                                        Math.floor(Math.random() * (50 - 1 + 1)) + 1,


                                    ]
                                }
                            ]
                        }}
                        width={width + 5}
                        height={220}
                        // yAxisLabel="$"
                        // yAxisSuffix="Plays"
                        yAxisInterval={10}
                        xAxisInterval={10}
                        // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "blue",
                            backgroundGradientFrom: "rgb(52, 70, 92)",
                            backgroundGradientTo: "rgb(52, 70, 92)",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                //borderRadius: 16
                            },
                            propsForDots: {
                                r: "2",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            backgroundColor: 'blue'
                            // marginVertical: 8,
                            // borderRadius: 16
                        }}
                    />
                </View>
 */}
            </View>

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