import React, { useContext } from 'react'
import { AppRegistry, StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
//import { ScrollView } from 'react-native-gesture-handler'
import Welcomemsg from '../../components/libraries/explore/welcomemsg'
import Shortcutboxes from '../../components/libraries/explore/shortcutboxes'
import { EventRegister } from 'react-native-event-listeners'
import Exploreslides from '../../components/libraries/explore/exploreslides'
import { MainContext } from '../../contexts/MainContext'
export default function Explore({ moveY }) {
    const { library_swiper } = useContext(MainContext)
    return (

        <View style={{
            flex: 1,
            // backgroundColor: 'green',
            height: '100%', width: '100%',
            paddingHorizontal: 0,
        }}>


            <View style={{

            }}>
                <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    //scrollEnabled={false}
                    bounces={false}
                    onScroll={(e) => {

                        EventRegister.emit('header_hide', e.nativeEvent.contentOffset.y)
                        moveY.setValue(-e.nativeEvent.contentOffset.y)

                    }}
                    contentContainerStyle={{
                        paddingBottom: 150,
                        marginTop: 130,
                    }}

                >
                    <View style={{ height: '8%' }}>
                        {/* dummy view */}

                    </View>
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: '100%',
                            // backgroundColor: 'yellow',
                            position: 'absolute'

                        }}
                        onPressIn={() => {
                            // console.log('deactivate')
                            library_swiper.current.setNativeProps({ scrollEnabled: true })
                        }}
                    >
                        <View >
                            {/* dummy view */}

                        </View>
                    </TouchableOpacity>
                    <View>
                        <Welcomemsg></Welcomemsg>
                    </View>

                    <View style={{
                        paddingVertical: 10,
                        paddingHorizontal: 2
                    }}>
                        <Shortcutboxes></Shortcutboxes>
                    </View>
                    <View style={{
                        paddingVertical: 5,
                        height: '100%'
                        //         backgroundColor: 'blue'
                    }}>
                        <Exploreslides></Exploreslides>
                    </View>

                </ScrollView>

            </View>

        </View>
    )
}
