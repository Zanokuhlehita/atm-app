import React from 'react'
import { AppRegistry, StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


export default function Artists() {

    const Artists = [
        {
            key: '1', name: "Jayceon",
            role: "Producer / Vocalist / Song Writer",
            image: require("../../assets/artists/plc_m.png"),
            color: "#B6B7AF",
        },
        {
            key: '2', name: "Vinc",
            role: "Vocalist (Seasons Band)",
            image: require("../../assets/artists/plc_m.png"),
            color: "#C3C3C3",
        },
        {
            key: '3', name: "Bray Atlas",
            role: "Song Writer, Rapper",
            image: require("../../assets/artists/plc_m.png"),
            color: "#9C9C9C",
        },
        {
            key: '4', name: "Jaun",
            role: "Vocalist",
            image: require("../../assets/artists/plc_f.png"),
            color: "#B3A29A"
        },

    ]


    const { width, height } = Dimensions.get('window');

    const image_size = 140
    return (

        <View style={{
            flex: 1,
            //backgroundColor: 'pink',
            height: '100%', width: '100%'
        }}>
            <View style={{ marginTop: '50%' }}>
                <FlatList
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',


                    }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    data={Artists}
                    renderItem={({ item }) => {

                        return (
                            <TouchableOpacity>

                                <View style={{
                                    backgroundColor: item.color,
                                    height: 220,
                                    width: width * 0.45,
                                    margin: 5,
                                    borderRadius: 10,
                                    borderColor: 'rgba(0,0,0,0)',
                                    borderWidth: 1,
                                    overflow: 'hidden',
                                }}>



                                    <View style={{
                                        position: 'relative',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 2,
                                        borderColor: 'rgba(0,0,0,0.1)',
                                        height: '70%',
                                        width: '100%',
                                        // elevation: 30,
                                        overflow: 'hidden',
                                        backgroundColor: item.color,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10
                                    }}>

                                        <Image
                                            source={item.image}
                                            style={{

                                                height: image_size,
                                                width: image_size,


                                            }}
                                        ></Image>
                                    </View>
                                    <View style={{
                                        //  backgroundColor: 'blue',
                                        alignItems: 'center'
                                    }}>
                                        <Text
                                            style={{
                                                color: 'rgba(0,0,0,0.7)',
                                                //padding: 10,
                                                fontWeight: 'bold',
                                                fontSize: 15,
                                                paddingTop: 3

                                            }}>{item.name}</Text>
                                        <Text
                                            style={{
                                                color: 'rgba(0,0,0,0.7)',
                                                //padding: 10,

                                                fontSize: 12,
                                                textAlign: 'center',
                                                paddingVertical: 3

                                            }}>{item.role}</Text>
                                    </View>
                                </View>


                            </TouchableOpacity>
                        )
                    }}
                />
                {/* <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <View style={styles.shortcutbox}></View>
                        <View style={styles.shortcutbox}></View>
                    </View> */}


            </View>



        </View>
    )
}