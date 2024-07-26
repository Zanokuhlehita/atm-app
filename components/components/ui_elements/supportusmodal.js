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
    Animated
} from "react-native";
import firebase from 'firebase'
import { EventRegister } from 'react-native-event-listeners';

import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
export default function Supportusmodal() {
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
    function submit() {
        try {
            // db.collection('feedback').add({
            //   db.collection('feedback').doc(code).set({
            db.collection('feedback').add({
                from: 'app user',
                rating: active_index,
                message: text,
            })

            Alert.alert(
                "Feedback Sent",
                'Thank you!',
                [

                    { text: "OK", onPress: () => { modal(false) } }
                ],
                { cancelable: false }
            );
        } catch (e) {
            console.log(e.toString())
        }

    }
    const listener = useRef()
    useEffect(() => {


        listener.current = EventRegister.addEventListener('open_feedback_modal', () => {
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
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 22,

                    alignSelf: 'center',
                    //marginHorizontal: 20,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    width: '100%',
                    height: '100%'

                }}
                >
                    <View style={{
                        width: '87%',
                        margin: 10,
                        backgroundColor: "white",
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
                        <Text style={{
                            marginBottom: 15,
                            textAlign: "center",
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Your opinion matters to us!</Text>
                        <Text style={{
                            marginBottom: 15,
                            textAlign: "center"
                        }}>We work super hard to make Adler Tempo Better
                            better for you, and would love to know how would
                            you rate your experience here.
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            padding: 10
                        }}>
                            <TouchableOpacity
                                onPress={() => setactive_index(1)}>
                                <FontAwesome5 style={{
                                    padding: 10
                                }} name="angry" size={30} color={active_index == 1 ? 'rgba(254, 30, 30,0.7)' : emoji_color} />

                            </TouchableOpacity >
                            <TouchableOpacity
                                onPress={() => setactive_index(2)}>
                                <Entypo style={{
                                    padding: 10
                                }} name="emoji-sad" size={emoji_size} color={active_index == 2 ? 'rgba(237, 198, 15,1)' : emoji_color} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setactive_index(3)}>
                                <Entypo style={{
                                    padding: 10
                                }} name="emoji-neutral" size={emoji_size} color={active_index == 3 ? 'rgba(234, 131, 7,1)' : emoji_color} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setactive_index(4)}>
                                <Entypo style={{
                                    padding: 10
                                }} name="emoji-happy" size={emoji_size} color={active_index == 4 ? 'rgba(74, 181, 22,1)' : emoji_color} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setactive_index(5)}>
                                <Entypo style={{
                                    padding: 10
                                }} name="emoji-flirt" size={emoji_size} color={active_index == 5 ? 'green' : emoji_color} />

                            </TouchableOpacity>

                        </View>

                        <TouchableWithoutFeedback onPress={() => {
                            setTimeout(() => {
                                feedback_text.current.focus()
                            }, 0);


                        }}
                            style={{
                                height: 100,
                                marginBottom: 20
                            }}>
                            <ScrollView contentContainerStyle={{
                                height: 100,
                                borderWidth: 1,

                                width: width * 0.65,
                            }}
                                keyboardShouldPersistTaps='never'
                            >
                                <TextInput
                                    multiline={true}

                                    ref={(input) => { feedback_text.current = input; }}
                                    onChangeText={(text) => settext(text)}

                                    style={{
                                        padding: 5,

                                        width: 250,
                                        marginVertical: 0
                                    }} />
                            </ScrollView>

                        </TouchableWithoutFeedback>
                        <TouchableOpacity
                            style={{
                                width: 200,
                                borderRadius: 20,
                                padding: 10,
                                elevation: 2
                                , backgroundColor: "#2196F3"
                            }}
                            onPress={submit}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 12,
                                alignSelf: 'center',
                                fontWeight: 'bold'
                            }}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: 10,
                            }}
                            onPress={() => {
                                modal(false)
                            }}
                        >
                            <Text style={{
                                color: 'blue',
                                fontSize: 12,
                                alignSelf: 'center',
                                //fontWeight: 'bold'
                            }}>No Thanks</Text>
                        </TouchableOpacity>


                    </View>
                </View>

            </TouchableWithoutFeedback>
        </Animated.View >
    );
};

const styles = StyleSheet.create({





});
