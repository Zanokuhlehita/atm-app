import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions } from 'react-native'
import firebase from 'firebase'
export default function CoverArt({ songCoverArt}) {
    return (
        <View style={{
            //backgroundColor: 'grey',
            //paddingRght: 20,
            // marginTop: 15,
           

            width: '100%',
            height: 250,
    


        }}>
            <View style={{
                // backgroundColor: '#B5A3E5',
                width: '100%',
                height: '100%',

                borderRadius: 10,
                overflow: 'hidden',

            }}>
                <Image
                    
                    style={{
                        height: '100%',
                        width: '100%',

                        //  resizeMode: 'contain'
                    }}
                    source={{ uri: songCoverArt }} />
            </View>
           
       </View>

    )
}
