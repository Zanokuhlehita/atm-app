
import React, { useState, useEffect, useRef } from 'react'
import {
    View, Text, Image, TouchableOpacity, FlatList,
    StyleSheet, Dimensions, Animated, Button
} from 'react-native'


import {
    SimpleLineIcons, EvilIcons, Fontisto, Ionicons, MaterialCommunityIcons,
    FontAwesome5, AntDesign
} from '@expo/vector-icons';
import About from '../../../components/dashboard/about'

import User from '../../../components/dashboard/user'

export default function Scrollcounter({ dashboardY, navigation }) {
    const { width, height } = Dimensions.get('window');
    const [navlist_color, setnavlist_color] = useState()


    const active_color = 'rgb(25, 118, 210)'
    const inactive_color = 'white'
    const alert_active_color = 'rgba(252, 64, 73, 1)'





    const scrollY = useState(new Animated.Value(0))[0]

    const user_opacity = scrollY.interpolate({
        inputRange: [0, height, height * 2],
        outputRange: [0, 1, 1]
    })
    const info_opacity = scrollY.interpolate({
        inputRange: [0, height, height * 2],
        outputRange: [1, 0, 1]
    })
    const supportUs_opacity = scrollY.interpolate({
        inputRange: [0, height, height * 2],
        outputRange: [1, 1, 0]
    })
    const dispatch = useDispatch()
    const [Navlist, setNavlist] = useState([
        {
            name: 'User',
            key: '1',
            icon: <EvilIcons name="user" size={40} color={active_color} />,
            icon2: <EvilIcons style={{
                opacity: 1
            }} name="user" size={40} color={inactive_color} />,
            view: <User></User>,
            opacity: user_opacity
        },

        {
            name: 'Info',
            key: '5',
            icon: <SimpleLineIcons name="info" size={27} color={active_color} />,
            icon2: <SimpleLineIcons name="info" size={27} color={inactive_color} />,

            view: <About />,
            next_line: true,
            opacity: info_opacity

        },
        {
            name: 'Support Us',
            key: '6',
            icon: <MaterialCommunityIcons name="medal" size={30} color={active_color} />,
            icon2: <MaterialCommunityIcons name="medal" size={30} color={alert_active_color} />,
            next_line: true,
            view: <About />,
            opacity: supportUs_opacity

        }, {
            name: 'Logout',
            key: '7',
            icon: <AntDesign name="logout" size={26} color={active_color} />,
            icon2: <AntDesign name="logout" size={26} color={inactive_color} />,


        },

    ])

    const divider_color = 'rgba(255,255,225,0.1)'
    const divider_width = 0.5

    return (
        <Animated.View style={{
            flex: 1, flexDirection: 'row',
            position: 'absolute',
            height: '100%',
            zIndex: 30,
            //  transform: [{ translateY: scrollY }]


        }}>


        </Animated.View>
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