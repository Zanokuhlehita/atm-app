import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import BlankSpace from '../../components/BlankSpace'
import Header from '../../components/Header'
import MiniPlayer from '../../components/MiniPlayer'
import MainView from './components/MainView'
import InfoView from './components/Info'
import { MainContext } from '../../contexts/MainContext'
import WebView from 'react-native-webview'
import { Portal } from 'react-native-portalize'

export default function SupportUs({ navigation }) {


    const [activityIndicator, setactivityIndicator] = useState(true)
    return (
        <Portal>
                 <View style={{
            backgroundColor: '#201F24',
            flex: 1,
            height: '100%',

        }}>
            <Header
            title='Support Us'
                backAction={() => {
                navigation.goBack()
            }} back />
            {     activityIndicator ? <View style={{
                //backgroundColor: 'red',
                marginTop:80,
                position: 'absolute',
                zIndex: 10,
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ActivityIndicator
                    animating={activityIndicator}
                    color='rgba(255,255,255, 0.8)'
                    size={50}
                    style={{
                        top:-60
                    }}
                />
            </View> : null  }

            

            <WebView
                style={{
                    backgroundColor: '#201F24',
                    width: '100%',
marginTop:10,
                }}
                onLoadEnd={() => {
                    setactivityIndicator(false)
                }}
                source={{
                    uri: 'https://atma-firebase.web.app/'
                }}
            >

            </WebView>

            {/*   <View style={{
                backgroundColor: '#201F24',
                height: '40%',
                width: '100%',
                flexDirection: 'row',
                paddingRight: 20,
                marginTop: 18,

            }}>

              
                <MainView />
            </View>
            <View style={{
                backgroundColor: '#2A2A30',
                height: '70%',
                width: '100%',
                flexDirection: 'row',
                paddingRight: 20,
                paddingBottom: '32%',

            }}>
            

                <InfoView song={song} />
            </View>
             <MiniPlayer navigation={navigation} /> */}
        </View>
   
        </Portal>
    )
}
