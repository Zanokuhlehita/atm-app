import React from 'react'
import { View, Text, Image } from 'react-native'
import { secondary_color, text_color_secondary } from '../../../../../theme/colors'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

export default function Playing({ songName, songArtist, songCoverArt, style }) {
    return (
        <>
            <View style={{
                // backgroundColor: 'grey',
                //paddingRght: 20,
               // marginTop: 15,
                paddingHorizontal: 30,

                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',


            }}>
                <View style={{
                    // backgroundColor: '#B5A3E5',
                    width: '100%',
                    height: '65%',
                  
                    borderRadius: 10,
                    overflow: 'hidden',

                }}>
                    <Image
                        style={{
                            height: '100%',
                            width: '100%',

                            //  resizeMode: 'contain'
                        }}
                        source={songCoverArt} />
                </View>

                <View style={{
                    // backgroundColor: 'grey',

                    width: '100%',
                    height: 80,
                    flexDirection: 'row',
                    //   marginTop: '10%',

                }}>
                    <View style={{
                        // backgroundColor: 'white',
                        width: '90%',
                        height: '100%',
                      //  paddingHorizontal: 10,


                    }}>
                        <View style={{
                            // height: '50%',
                            width: '100%',
                            paddingTop: 35,
                            flexDirection: 'row',

                        }}>
                            <Text
                                numberOfLines={1}

                                style={{
                                    width: '110%',
                                    fontSize: 20,
                                    //fontWeight: 'bold',
                                    color: text_color_secondary
                                }}>{songName}</Text>
                            <View style={{
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: -5,
                                right: 20,



                            }}>
                                <AntDesign name="hearto" size={15} color={text_color_secondary} />

                            </View>
                        </View>
                        <View style={{
                            //  height: '50%',
                            width: '100%',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                //fontWeight: 'bold',
                                color: 'white',
                                opacity: 0.5,

                                
                            }}>{songArtist}1</Text>
                        </View>
                    </View>
                    <View style={{
                        // backgroundColor: 'yellow',
                        width: '10%',
                        height: '100%',
                    }}>

                    </View>
                </View>
           </View>

        </>

    )
}
