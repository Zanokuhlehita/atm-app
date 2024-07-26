
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

export default function Playlists() {
    const divider_color = 'rgba(255,255,225,0.1)'
    const divider_width = 0.5
    const { width, height } = Dimensions.get('window');
    const active_color = 'rgb(25, 118, 210)'
    return (

        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'grey',
            alignItems: 'center',
            marginLeft: -20,
        }}>
            <Text> Playlists</Text>

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