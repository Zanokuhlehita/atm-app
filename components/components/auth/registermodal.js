import React, { useRef, useState, useEffect } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    ScrollView,
    Dimensions,
    Keyboard,
    Animated,
    ActivityIndicator
} from "react-native";
import firebase from 'firebase'
import { EventRegister } from 'react-native-event-listeners';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import CountryPicker, { getAllCountries, getCallingCode, DARK_THEME } from 'react-native-country-picker-modal';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Registermodal({ register }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [feed_back_sent, setfeed_back_sent] = useState(false)
    const [text_focus, settext_focus] = useState(false)
    const emoji_color = 'rgba(0,0,0,0.1)'
    const emoji_size = 30
    const [active_index, setactive_index] = useState(3)
    const { width, height } = Dimensions.get('window');
    const feedback_text = useRef()
    const [text, settext] = useState('')
    const db = firebase.firestore()
    const [display, setdisplay] = useState('none')
    const translateY = useRef(new Animated.Value(height)).current
    const opacity = translateY.interpolate(
        {
            inputRange: [0, height],
            outputRange: [1, 0]
        }
    )
    const storeData = async (storageKey, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(storageKey, jsonValue)

        } catch (e) {
            // saving error
        }
    }
    const [countryCode, setcountryCode] = useState()
    const [nationality, setnationality] = useState()
    const [gender, setgender] = useState()
    const [activity_indicator, setactivity_indicator] = useState(false)
    function submit() {
        try {
            if (nationality && gender) {
                modal(false)

                storeData('user', { nationality, gender })
                register()
            } else {

                Alert.alert(
                    `Please fill in your ${!gender ? 'gender' : ''}${!nationality && !gender ? ' & ' : ''}${!nationality ? 'nationality' : ''} to continue.`,
                    '',
                    [

                        { text: "OK", onPress: () => {/*    */ } }
                    ],
                    { cancelable: false }
                );




            }


            /* 
                        // db.collection('feedback').add({
                        //   db.collection('feedback').doc(code).set({
                        db.collection('feedback').add({
                            from: 'app user',
                            rating: active_index,
                            message: text,
                        })
             */

        } catch (e) {
            console.log(e.toString())
        }

    }
    const listener = useRef()
    useEffect(() => {


        listener.current = EventRegister.addEventListener('open_register_modal', () => {
            modal(true)
        })
        return () => {
            EventRegister.removeEventListener(listener.current)

        };
    }, []);
    function modal(status) {
        if (status) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 60,
                useNativeDriver: true
            }).start()
        } else {
            Animated.timing(translateY, {
                toValue: height,
                duration: 60,
                useNativeDriver: true
            }).start()
        }
    }

    const bg_color = '#181B1F'

    return (
        <Animated.View style={{
            //s flex: 1,
            //justifyContent: "center",
            alignItems: "center",
            display: 'none',
            transform: [{ translateY }],

            opacity: 1,
            zIndex: 100,
            justifyContent: "center",
            alignItems: "center",
            position: 'absolute',
            width: '100%',
            height: '100%'
        }}>

            <TouchableWithoutFeedback >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 22,

                    alignSelf: 'center',
                    //marginHorizontal: 20,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    width: width,
                    height: '100%'

                }}
                >

                    <View style={{
                        width: '87%',
                        margin: 10,
                        backgroundColor: bg_color,
                        borderRadius: 20,
                        padding: 35,
                        alignItems: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}>
                        <View style={{
                            width: '100%'
                        }}>
                            <TouchableOpacity

                                onPress={() => {
                                    modal(false)
                                }}>
                                <MaterialCommunityIcons name="window-close" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                        <ActivityIndicator animating={activity_indicator}
                            color='grey'
                            size={50}
                            style={{
                                position: 'absolute',
                                zIndex: 10,
                                top: '50%'

                            }}
                        ></ActivityIndicator>


                        <View>
                            <Text style={{
                                color: 'white',
                                fontSize: 25,
                                fontWeight: 'bold',
                                marginBottom: 30,
                                textAlign: 'center',


                            }}>Basic Info</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: 12,
                                textAlign: 'center',
                                //fontWeight: 'bold',
                                marginBottom: 12

                            }}>Please fill in your basic information,{'\n'}to complete your account setup.</Text>
                        </View>

                        <DropDownPicker
                            items={[
                                { label: 'Male', value: 'Male', icon: () => <Ionicons name="md-male" size={15} color="white" /> },
                                { label: 'Female', value: 'Female', icon: () => <Ionicons name="md-female" size={15} color="white" /> },
                            ]}
                            placeholder='Gender'
                            placeholderStyle={{ color: 'rgba(255, 255, 255, 0.3)' }}
                            // defaultValue={{ country: 'uk' }}
                            containerStyle={{ height: 40, width: 250, marginVertical: 20 }}
                            labelStyle={{ color: 'white' }}
                            style={{ backgroundColor: bg_color, }}
                            itemStyle={{
                                justifyContent: 'flex-start',


                            }}

                            dropDownStyle={{
                                backgroundColor: bg_color,

                            }}
                            onChangeItem={gender => {
                                //console.log(gender)
                                setgender(gender.label)
                            }}
                        />
                        <View style={{
                            flexDirection: 'row', marginVertical: 30,
                            alignContent: 'center'
                        }}>
                            <Text style={{
                                color: 'rgba(255, 255, 255, 0.3)',
                                width: '60%'
                            }}>Nationality:</Text>

                            <CountryPicker
                                // containerButtonStyle={{ marginVertical: 10, borderColor: 'white', borderWidth: 1 }}
                                /*  theme={{
                                     primaryColor: 'white',
                                     primaryColorVariant: 'white',
                                     backgroundColor: bg_color,
                                     onBackgroundTextColor: 'white',
                                     filterPlaceholderTextColor: 'green',
                                     //fontSize: 16,
                                     /*   fontFamily: Platform.select({
                                           ios: 'System',
                                           android: 'Roboto',
                                           web: 'Arial'
                                       }),
                                    
                                       activeOpacity: 0.7,
                                       itemHeight: getHeightPercent(7) 
                                 }} */
                                theme={DARK_THEME}
                                onSelect={(nationality) => {
                                    //console.log(nationality)
                                    setnationality(nationality.name)
                                    setcountryCode(nationality.cca2)
                                }}
                                withFilter
                                withEmoji

                                countryCode={countryCode}
                                withFlag
                                withCountryNameButton
                                withAlphaFilter



                            />

                        </View>
                        <TouchableOpacity
                            style={{
                                width: 200,
                                borderRadius: 20,
                                padding: 10,
                                elevation: 2
                                , backgroundColor: "#2196F3",
                                marginVertical: 20,
                                marginTop: 30
                            }}
                            onPress={submit}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 12,
                                alignSelf: 'center',
                                fontWeight: 'bold'
                            }}>Done</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </TouchableWithoutFeedback>
        </Animated.View >
    );
};

const styles = StyleSheet.create({





});
