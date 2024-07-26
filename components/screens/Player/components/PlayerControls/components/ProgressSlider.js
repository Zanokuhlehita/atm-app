import React, { useState, useContext, useRef, useEffect } from 'react'
import { View, Text, Button, Animated, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert, ScrollView, FlatList, Image, BackgroundImage, Dimensions, PanResponder } from 'react-native'


import { EventRegister } from 'react-native-event-listeners'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { move } from 'react-native-redash'
import LoadingIndicator from '../../../../../components/LoadingIndicator'

import { MainContext } from '../../../../../contexts/MainContext'
import { primary_color, secondary_color } from '../../../../../theme/colors'

export default function     ProgressSlider() {

    const { nowPlayingDuration_context_ref, sound_ref } =
      useContext(MainContext);

    const { width, height } = Dimensions.get('window')
    const seek_button_size = 30
    const slider_color = 'white'
    const slider_height = 2

    const moveX = useRef(new Animated.Value(0)).current

    const [time, settime] = useState('0:00');
    const [endTime, setendTime] = useState('0:00');

    const listener = useRef()
    const listener2 = useRef()

    const [seekBarWidth, setseekBarWidth] = useState(300)


    const seekBarScaleY = useRef(new Animated.Value(1)).current
    useEffect(() => {


        listener.current = EventRegister.addEventListener('songposition', (pos) => {
            updateSlider(pos)
        })
        listener2.current = EventRegister.addEventListener('resetslider', () => {
            resetSlider(0)
        })


        return () => {
            EventRegister.removeEventListener(listener.current)
            EventRegister.removeEventListener(listener2.current)
        }
    }, [])

    function resetSlider() {
        try {
            Animated.timing(pan.x, {
                toValue: 1,
                duration: 16,
                useNativeDriver: true
            }).start(() => {
                settime('0:00')
            })
            //settime('0:00')
        } catch (error) {
            console.log('Could not reset time', error);

        }


    }



    function updateSlider(sec) {
        var pos = Math.floor(sec)

        const duration = Math.floor(nowPlayingDuration_context_ref.current)
        const move = (seekBarWidth / duration) * Math.floor(pos)

        
        if (!move) {
            // console.log('nuuuuuuuuuuuuuun' ,);
            return
        }
        try {
           /*  Animated.timing(pan.x, {
                toValue: move,
                duration: 16,
                useNativeDriver: true
            }).start(() => {
                console.log('pan value', pan.x._value)
            }) */
            pan.x.setValue(move)

        } catch (error) {
            console.log('Could not update slide', error);

        }


        var minutes = Math.floor(pos / 60);
        var seconds = pos - minutes * 60;
        function str_pad_left(string, pad, length) {
            return (new Array(length + 1).join(pad) + string).slice(-length);
        }


        var minutes2 = Math.floor(duration / 60);
        var seconds2 = duration - minutes2 * 60;
        var endtimelocal = str_pad_left(minutes2, '', 2) + ':' + str_pad_left(seconds2, '0', 2);
        var finalTime = str_pad_left(minutes, '', 2) + ':' + str_pad_left(seconds, '0', 2);

        setendTime(endtimelocal)
        settime(finalTime)
    }

    const touchSeek = useRef(new Animated.ValueXY()).current;

    const touchResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (_,{x0,moveX}) => {
              const duration = Math.floor(nowPlayingDuration_context_ref.current)
                const position = ((x0 - 30) / (seekBarWidth / duration)) * 1000
                seek(position)
                seekBarScaleY.setValue(1.5)
                Animated.timing(seekBarScaleY, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true
                }).start()
                    },

        })
    ).current;


    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                seekBarScaleY.setValue(1.5)
              
               pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                }); 
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y },
                    
                ],
                {useNativeDriver:false}
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
              const duration = Math.floor(nowPlayingDuration_context_ref.current)
                const position = (pan.x._value / (seekBarWidth / duration)) * 1000
                seek(position)
                Animated.timing(seekBarScaleY, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true
                }).start()
            }
        })
    ).current;
    async function seek(x) {
        await sound_ref.current.setPositionAsync(x)

    }

    const seekBar = useRef()
    return (
        <View

            style={{
                width: '100%',
                height: 30,
                //paddingHorizontal: 30,
                //marginBottom: 10,

               // position: 'absolute',
               // bottom: 27,

      //backgroundColor: 'green',
            }}>
            <View style={{
                height: '50%',
                width: '100%',
                //backgroundColor: 'purple',
                flexDirection: 'row',
                //paddingLeft: 10,
                top: 3,
                paddingRight: 1,



            }}>
                <View style={{
                    width: '50%',
                    height: '100%',
                    //  justifyContent: 'center',
                    //backgroundColor: 'white',

                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 10,

                    }}>{time}</Text>
                </View>
                <View
                  
                    style={{
                    width: '50%',
                    height: '100%',
                    // justifyContent: 'center',
                    alignItems: 'flex-end',
                    //backgroundColor: 'green',
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 10,

                    }}>{endTime} </Text>
                </View>
            </View>

            <View
                ref={ref => { seekBar.current = ref }}
              

            
            
                {...touchResponder.panHandlers}
               /*  onPressIn={() => {
                    seekBarScaleY.setValue(1)
                    Animated.timing(seekBarScaleY, {
                        toValue: 0,
                        duration: 3000,
                        useNativeDriver: true
                    }).start()
                }} */
                style={{
                height: '50%',
                width: '100%',
           backgroundColor: 'rgba(0,0,0,0)',

                //  alignItems: 'center',
                justifyContent: 'center',
               // paddingLeft: 10,

            }}>
                <Animated.View
                 
                    ref={ref => { seekBar.current = ref }}
                    onLayout={() => {
                      //  console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')
                        seekBar.current.measure((fx, fy, width, local_height, px, py) => {
                         
                            setseekBarWidth(width)
                          
                        })
                    }}
                    
                    
                    style={{
                    height: slider_height,
                    width: '100%',
                    backgroundColor: 'rgba(255,255,255, 0.5)',
                        overflow: 'hidden',
                      //  transform: [{ scaleY: seekBarScaleY}]
                }}>
                    <Animated.View style={{
                        height: slider_height,
                        width: '100%',
                        backgroundColor: slider_color,
                        position: 'absolute',
                        transform: [{ translateX:  pan.x  }],
                        right: '100%'
                        // right: 0,

                    }}>

                       
                    </Animated.View>
                </Animated.View>

          
              
              
              
                {/* <LoadingIndicator style={{
                    left: 10,
                }} height={slider_height} />
 */}
            </View>
          
    <Animated.View

                {...panResponder.panHandlers}

                style={{

                 //    backgroundColor: slider_color,
                    position: 'absolute',
                    transform: [{ translateX: pan.x }],
                    left: -10,
                    top:7,
                    zIndex: 900,
                    width: seek_button_size ,
                    height: seek_button_size,
                    alignItems: 'center',
                    justifyContent: 'center',


                }}>

                <Animated.View style={{
                    width: seek_button_size-20,
                    height: seek_button_size-20,
                  //  backgroundColor: slider_color,
                    borderRadius: 10,
                    // position: 'absolute',
                //    opacity:seekBarScaleY ,
left:-5,
                    transform: [{ rotate: '45deg' }]
                }}>

                </Animated.View>

            </Animated.View>
        
        </View>

    )
}
