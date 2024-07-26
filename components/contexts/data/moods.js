
//Playlists Import


import { afro_beat } from './moods/afro_beat'
import { flattery } from './moods/flattery'
import { grateful } from './moods/grateful'
import { happy } from './moods/happy'
import { heart_broken } from './moods/heart_broken'
import { love } from './moods/love'
import { overwhelmed } from './moods/overwhelmed'



export const moods = [
    /*  {
         name: "plc",
         key: '0',
 
     }, */
    {
        name: "Happy",
        color: "#B0721E",
        color_fade: "rgba(176, 114, 30,0.7)",
        image: require("../../assets/moods/happy.png"),
        key: '1',
        songs_num: happy.length,
        description: 'Upbeat Songs with catchy & creative melodies that brings joy to the heart, soul & mind'
        , data: happy,
        last_update: '01 jan 21',
        var_name: 'happy',

    },
    {
        name: "Love",
        image: require("../../assets/moods/love.png"),
        color: "#B13B3B",
        color_fade: "rgba(177, 59, 59,0.7)",
        key: '2',
        songs_num: love.length,
        var_name: 'love',

        description: 'Groove to classic love tracks.',
        data: love,
        last_update: '01 jan 21'
    },

    {
        name: "Heart Broken",
        image: require("../../assets/images/moods/heart_broken.png"),
        color: "#792964", color_fade: "rgba(121, 41, 100,0.7)",
        key: '3',
        var_name: 'heart_broken',
        songs_num: heart_broken.length,
        description: 'During a breakup we feel terrible.\n Rationalise this feeling with these classic jams.'
        , data: heart_broken,
        last_update: '01 jan 21'
    },

    {
        name: "Grateful",
        image: require("../../assets/moods/grateful.png"),
        color: "#D55F71",
        color_fade: "rgba(213, 95, 113,0.7)",
        key: '6',
        var_name: 'grateful',
        songs_num: grateful.length,
        description: "At times we need to take stock of all we have to appreciate and be grateful for.\nHere is playlist if you need some music to remember how grateful you are."
        , data: grateful,
        last_update: '01 jan 21'
    },
    /*    {
           name: "Frustrated",
           image: require("../../assets/moods/frustrated.png"),
           color: "#8E81B9",
           color_fade: "rgba(142, 129, 185,0.7)",
           key: '7',
           songs_num: '10',
           description: "All intro songs for albums and ep's."
       }, */
    {
        name: "Overwhelmed",
        image: require("../../assets/images/moods/overwhelmed.png"),
        color: "#B65671",
        color_fade: "rgba(205, 95, 115,0.7)",
        key: '8',
        var_name: 'overwhelmed',
        songs_num: overwhelmed.length,
        description: "We will face this feeling at some point in our lives, it entails being overcome by an intense and unruly emotion that something is too challenging to manage and overcome.\n\nWhen confronted with being overwhelmed, this playlist helps you think and act rationally."
        , data: overwhelmed,
        last_update: '01 jan 21'
    },
    {
        name: "Flattery",
        image: require("../../assets/images/moods/flattery.png"),
        color: "#CD5F73",
        color_fade: "rgba(182, 86, 113,0.7)",
        key: '9',
        var_name: 'flattery',
        songs_num: flattery.length,
        description: "Exchange of rich compliments makes us feel good about ourselves.\n\nEnjoy lyrics and melodies filled with showers of praise to give us love chills."
        , data: flattery,
        last_update: '01 jan 21'
    },
    {
        name: "Afro Beat",
        image: require("../../assets/images/moods/afro_beat.png"),
        color: "#B13B3B",
        color_fade: "rgba(177, 59, 59,0.7)",
        key: '10',
        var_name: 'afro_beat',
        songs_num: afro_beat.length,
        description: "When you want your heart to groove to an african sound.\n\nHere you will find a collection of african vibes."
        , data: afro_beat,
        last_update: '01 jan 21'
    },
    /*  {
         name: "Gang gang",
         image: require("../../assets/images/moods/gang_gang.png"),
         color: "#578993",
         color_fade: "rgba(87, 137, 147,0.7)",
         key: '11',
         songs_num: '10',
         description: "All intro songs for albums and ep's."
     }, */


]


