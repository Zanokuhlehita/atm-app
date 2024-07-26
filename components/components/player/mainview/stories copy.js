
import React, { useEffect, useState, useContext, useRef } from 'react'
import { AppRegistry, Dimensions, StyleSheet, Text, View, Animated, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { EventRegister } from 'react-native-event-listeners'
import { DataContext } from '../../../contexts/DataContext'
import { MainContext } from '../../../contexts/MainContext'



export default function Stories({ id }) {
    const { isPlaying, setisPlaying, isMinimized,
        now_playing_playlist, skip_to, soundAll_ref,
        test, settest, now_playing_ref, play_status, now_playing_id, stories_on
    } = useContext(MainContext)
    const { all_songs } = useContext(DataContext)


    const stories_import = all_songs[id].story_line_link


    const [stories, setStories] = useState([{ story: 'Story 1 Im gonna make a way', key: '1', color: "#1E0805" },
    { story: ' Story 2 Baby dont you walk away', key: '2', color: "#0B100C" },
    {
        story: 'Story 3 Baby don;t you turn your back from me', key: '3',
        color: "#091B15"
    },
    ])
    const [mytimeout, setmytimeout] = useState(new Animated.Value(0))
    const [startstories, setstartstories] = useState()
    const [stopstories, setstopstories] = useState()
    function time_listenrs(i) {
        stories_interval[i].timer.addListener(({ value }) => console.log(Math.round(value)))
    }

    useEffect(() => {
        setStories(stories_import.stories)
        //
        /*   setstartstories(EventRegister.addEventListener('start_stories', () => {
              start()
          }))
          setstartstories(EventRegister.addEventListener('stop_stories', () => {
              resetStories(false)
          })) */



        /*  var stl = stories.length;
         for (var i = 0; i < stl; i++) time_listenrs(i);
  */
        return () => {
            EventRegister.removeEventListener(startstories)
            EventRegister.removeEventListener(stopstories)
        }
    }, [])

    const stories_interval = useState([{ timer: new Animated.Value(0) },
    { timer: new Animated.Value(0) }, { timer: new Animated.Value(0) }
        , { timer: new Animated.Value(0) }, { timer: new Animated.Value(0) }
        , { timer: new Animated.Value(0) }, { timer: new Animated.Value(0) }
        , { timer: new Animated.Value(0) }, { timer: new Animated.Value(0) }
        , { timer: new Animated.Value(0) }, { timer: new Animated.Value(0) }
        , { timer: new Animated.Value(0) }, { timer: new Animated.Value(0) }
        , { timer: new Animated.Value(0) }, { timer: new Animated.Value(0) }
    ]

    )[0]

    //const time_bar = React.useRef([]);
    const [time_bar, setTime_bar] = useState(new Animated.Value(0))

    const timeBarHeight = (e) => {
        setTime_bar(e.width)
        //console.log("time_bar", time_bar)
    }



    function resetStories(restart) {
        console.log("internal rset stories")
        const reset = (story_num) => {
            console.log("reseeting", story_num, stories_interval[story_num].timer)

            Animated.timing(stories_interval[story_num].timer, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }).start()
        }
        var x = stories.length;

        for (var i = 0; i < x; i++) reset(i);

        setshow_story(
            show_story.map(item => {
                return (
                    item.key == 1 ? { ...item, show: true } : { ...item, show: false }
                )
            }
            ))


        if (restart) {
            EventRegister.emit('start_stories')
        }
        current_num.current = null


    }

    const timer_perc = (i) => stories_interval[i].timer.interpolate({

        inputRange: [0, 100],
        outputRange: ["0%", "100%"]
    })

    const { width, height } = Dimensions.get('window');
    const current_num = useRef(null)
    const back = useRef(false)


    const startold = (story_num) => {
        // 
        // 
        var stories_length = stories.length;


        //    
        if (!story_num) { story_num = 0 }
        if (story_num == current_num.current) { return }
        if (story_num >= stories_length) {
            resetStories()
            setTimeout(() => {
                if (current_num.current == null) start()

            }, 500);

        }
        console.log('storynum', story_num)
        current_num.current = story_num
        setshow_story(
            show_story.map(item => {
                return (
                    item.key == story_num + 1 ? { ...item, show: true } : { ...item, show: false }
                )
            }
            ))
        Animated.timing(stories_interval[story_num].timer, {
            toValue: 93,
            duration: 5000,
            useNativeDriver: true
        }).start(({ finished }) => {
            /*  if (back.current) { 
                 start(story_num + 1)
              } 
             else {*/
            if (finished) {
                start(story_num + 1)
                if (story_num == stories_length) {
                    resetStories()
                    setTimeout(() => {
                        if (current_num.current == null) start()

                    }, 500);
                }
            }

            // }


        })



        // 
        //  }
        /*   else {
              console.log('is it me', story_num, stories_length)
              setTimeout(() => {
                  resetStories()
              }, 2000);
     */

    }



    const [show_story, setshow_story] = useState([{ show: true, key: '1' },
    { show: false, key: '2' },
    { show: false, key: '3' },
    { show: false, key: '4' },
    { show: false, key: '5' },
    { show: false, key: '6' }, { show: false, key: '7' }, { show: false, key: '8' },
    { show: false, key: '9' }, { show: false, key: '10' },
    ])






    function start() {

    }

    const translateX = useRef()



    return (
        <View style={{
            marginTop: "25%", height: '65%', width: '90%'
            , borderRadius: 20, overflow: 'hidden',
        }}>

            {/* base Timer */}

            <View style={{
                height: 10, marginTop: 15,
                marginHorizontal: 0, paddingHorizontal: 10,
                width: '100%', position: 'absolute',
                zIndex: 1, flexDirection: 'row',
                backgroundColor: 'yellow'
            }}>
                {stories.map((stories, i) => {
                    return (

                        <View key={i} style={{
                            backgroundColor: 'grey', height: 5,
                            flex: 1, marginHorizontal: 2,
                            zIndex: 1, overflow: "hidden",
                            opacity: 0.8
                        }}>

                        </View>


                    )
                })

                }
                <Animated.View
                    onLayout={(event) => { timeBarHeight(event.nativeEvent.layout) }}
                    style={{
                        backgroundColor: 'pink',
                        position: 'absolute',
                        height: 3,
                        width: 100,
                        /*  width: 93  timer_perc(i), */
                        // marginLeft: '-102%',
                        // transform: [{ translateX: stories_interval[i].timer }],
                        zIndex: 1
                    }}>
                    <Animated.View
                        onLayout={(event) => { timeBarHeight(event.nativeEvent.layout) }}
                        style={{
                            backgroundColor: 'red',
                            position: 'absolute',
                            height: 3,
                            width: 100,
                            /*  width: 93  timer_perc(i), */
                            // marginLeft: '-102%',
                            transform: [{ translateX: -90 }],
                            zIndex: 1
                        }}>

                    </Animated.View>
                </Animated.View>

            </View>
            {/* base timer end */}


            {stories.map((stories, i) => {

                return (
                    show_story[i].show ? (

                        <View key={i} style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%', width: '100%', backgroundColor: stories.color
                        }}>



                            <Text style={{
                                fontSize: 28,
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: "bold",
                                paddingHorizontal: 20

                            }}>{stories.line}</Text>
                        </View>

                    ) : null

                )
            })}



        </View>
    )
}









































/*
<View style={{
    //  backgroundColor: 'blue',
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'row'
}}>
    <TouchableWithoutFeedback
        onPress={() => {


            try {

                console.log('animate')

                Animated.timing(stories_interval[current_num.current].timer, {

                    useNativeDriver: true
                }).stop()






            } catch (error) {
                console.log(error)

                start()
            }


        }}
        style={{

            height: '100%',

        }}>
        <View style={{
            //   backgroundColor: 'pink',

            height: '100%',
            width: '50%'
        }}></View>
    </TouchableWithoutFeedback >

    <TouchableWithoutFeedback
        onPress={() => {
            console.log(current_num.current)
            var stories_length = stories.length;

            try {
                if (current_num.current + 1 > stories_length) {
                    resetStories()
                    console.log('reset')

                } else {
                    console.log('animate')

                    Animated.timing(stories_interval[current_num.current].timer, {
                        toValue: 93,
                        duration: 100,
                        useNativeDriver: true
                    }).start(() => start(current_num.current + 1))
                }



            } catch (error) {
                console.log(error)

                start()
            }
        }}


        style={{
            //  backgroundColor: 'green',

            height: '100%',
            width: '50%'
        }}>
        <View style={{
            // backgroundColor: 'green',

            height: '100%',
            width: '50%',

        }}>
            <Button
                title='reset'
                onPress={resetStories}
                color='blue'
            />
            <Button
                title='start'
                onPress={() => start()}
                color='blue'
            />
            <Button
                title='continue'
                //onPress={() => }
                color='blue'
            />

        </View>
    </TouchableWithoutFeedback >



</View>
 */