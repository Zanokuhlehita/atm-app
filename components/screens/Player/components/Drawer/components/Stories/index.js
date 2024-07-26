import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Modal, Button, TouchableOpacity, TouchableWithoutFeedback, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions, ImageBackground } from 'react-native'
import { albumArt1, albumArt2, albumArt3, logo } from '../../../../../../plugins/assets'
import { Entypo, AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import StoriesData from './components/StoriesData';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import StoryView from './components/StoryView';
import { secondary_color } from '../../../../../../theme/colors';

export default function Stories() {

    const avatar_size = 50
    const grad_color = '29, 29, 29'
    const icon_size = 55
    const [currentUserIndex, setCurrentUserIndex] = useState(0)
    const modalScroll = useRef(null);
    const [modal, setmodal] = useState(false)

    const [isModelOpen, setModel] = useState(false);

    const onStorySelect = (index) => {
        setCurrentUserIndex(index);
        setModel(true);
    };

    const onStoryClose = () => {
        setModel(false);
    };

    const onStoryNext = (isScroll) => {
      /*   const newIndex = currentUserIndex + 1;
        if (StoriesData.length - 1 > currentUserIndex) {
            setCurrentUserIndex(newIndex);
            if (!isScroll) {
                 modalScroll.current.scrollTo(newIndex, true);
             } 
        } else {
            setModel(false);
        } */
        setModel(false);

    };

    const onStoryPrevious = (isScroll) => {
        const newIndex = currentUserIndex - 1;
        if (currentUserIndex > 0) {
            setCurrentUserIndex(newIndex);
            if (!isScroll) {
                modalScroll.current.scrollTo(newIndex, true);
            }
        }
    };

    const onScrollChange = (scrollValue) => {
        if (currentScrollValue > scrollValue) {
            onStoryNext(true);
            console.log('next');
            setCurrentScrollValue(scrollValue);
        }
        if (currentScrollValue < scrollValue) {
            onStoryPrevious();
            console.log('previous');
            setCurrentScrollValue(scrollValue);
        }
    };

    const renderSeperator = () => (
        <View style={{ height: 1, backgroundColor: '#ccc' }} />
    );


    return (
        <ImageBackground
            // source={BGTest}

            style={{
               // position: 'absolute',

                height: '100%',
                width: '100%',

            }}>
            {isModelOpen ? 
                <View
                //  callBackAfterSwipe={g => onScrollChange(g)} ref={modalScroll}

                style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: 100000000,
                      //  top: -255,

               // flex: 1,
              //  paddingVertical: 50,
                backgroundColor: 'rgba(255,255,255,255)',
            }}>

            <StoryView
                onClose={onStoryClose}
                onStoryNext={onStoryNext}
                onStoryPrevious={onStoryPrevious}
                user={StoriesData[0]}
                isNewStory={false/* index !== currentUserIndex */}

            />

            </ View>
              : null
}
            
            <View
                style={{
                    paddingTop: 20,
                    backgroundColor: 'rgba(0, 252, 231, 0.8)',


                height: '100%',
                width: '100%',
            }}>
                <View
                    style={{
                        paddingHorizontal: 30,
                        paddingTop: 50,

                    }}
                >
                    
                    <View style={{
                        //paddingHorizontal: 15,
                        paddingTop: 10,

                    }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: secondary_color,
                        }}>Select Story </Text>
                    </View>
            <View style={{

            }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                data={StoriesData}
                renderItem={
                    ({ item,index }) => {
                        return (
                                                            <View
                                                            style={{
                                    marginVertical: 10,

                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setCurrentUserIndex(index);
                                        setModel(true);
                                    }}
                                    style={{
                                flexDirection: 'row',
                                   /*  backgroundColor: 'rgba( 40, 40, 40, 1)',
                                    padding: 10,
                                    borderRadius: 5, */

                                }}>
                                    <View style={{
                                        height: avatar_size + 10,
                                        width: avatar_size + 10,
                                        borderRadius: 60,
                                      //  backgroundColor: 'grey',
                                        borderRadius: 50,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 2,
                                        borderColor: 'rgba(0, 252, 231, 0.5)'

                                    }}>
                                    <View style={{
                                        height: avatar_size,
                                        width: avatar_size,
                                        borderRadius: 60,
                                      backgroundColor: 'grey',
                                        borderRadius: 50,

                                    }}>  
                                        <Image
                                            style={{
                                           borderRadius: 50,

                                                height: '100%',
                                                width: '100%',

                                            }}
                                                source={logo}
                                        >
                                            
</Image>

                                        </View>
                                        </View>
                                    <View style={{
                                        flex: 1,
                                        paddingHorizontal: 10,
                                        justifyContent: 'center',
                                        paddingLeft: 20,

                                    }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 15,
                                            marginBottom: 5,

                                    color: 'white',
                                        }}>{item.username}</Text>
                                        <Text style={{
                                            color: 'rgba(255,255,255, 0.8)',
                                            fontSize: 10,

                                        }}>{item.title}</Text>
                                    </View>
                                   
                                    <View style={{
                                       // width: 10,
                                       // backgroundColor: 'orange',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',


                                    }}> 
                                        {item.liked   ?     <Entypo
                                            style={{
                                                marginRight: 10,

                                            }}
                                            name="heart" size={15} color="rgba(201, 40, 25, 0.5)" />
                                            :
                                            null
                                    }

                                     
                                        <Entypo name="dots-three-vertical" size={13} color="white" />
                                    </View>

                                </TouchableOpacity>
                                </View>
                           
                        )

                    }}
            />
            </View>
             {/*    <View style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    bottom: 140,
                    right: 15,



                }}>
                    <View style={{
                        height: icon_size,
                        width: icon_size,
                        backgroundColor: 'rgba( 2, 169, 175, 1)',
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 24,

                    }}>

                        <MaterialIcons name="add" size={24} color="white" />
                    </View>
                </View> */}
    
</View>
            
                <LinearGradient
                    // Background Linear Gradient
                    locations={[0, 1]}

                    colors={[
                        `rgba(${grad_color},0.8)`,

                        `rgba(${grad_color},1)`,

                    ]}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        opacity: 1,
                        height: '100%',
                        zIndex: -2                    }}
                />
            </View>
           
         
                <View style={{
               height: '100%',
                    width: '100%',
                    backgroundColor: 'orange',
                

            }}>
                
              


               
                </View>
         

        </ImageBackground>
    )
}
