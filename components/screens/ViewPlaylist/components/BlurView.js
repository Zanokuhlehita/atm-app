import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
const uri = 'https://s3.amazonaws.com'

export default class Menu extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image
                    key={'blurryImage'}
                    source={{ uri }}
                    style={styles.absolute}
                />
                <Text style={styles.absolute}>Hi, I am some blurred text</Text>
                {/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
                <BlurView
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />
                <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});