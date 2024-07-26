
//Playlists Import


import { love_vibes } from './playlists/love_vibes'
import { album_intros } from './playlists/album_intros'
import { loyalty } from './playlists/loyalty'
import { soul_trap } from './playlists/soul_trap'
import { hustlers_mind } from './playlists/huslters_mind'

export default playlists = [
    {
        name: "Love Vibes",
        color: "#B27620",
        color_fade: "rgba(178, 118, 32,0.5)",
        image: require("../../assets/images/covers/love_vibes.jpg"),
        key: '1',
        songs_num: love_vibes.length,
        description: 'Love is that special romantic interest that gets your life force vibrating at its highest level.\n\n To get your love vibration flowing, we have assembled here… '
        ,
        var_name: 'love_vibes',
        data: love_vibes,
        last_update: '01 jan 21'
    },
    {
        name: "Soul Trap",
        color: "#B13B3B",
        color_fade: "rgba(87, 137, 147,0.5)",
        image: require("../../assets/images/covers/soul_trap.jpg"),
        key: '2',
        songs_num: soul_trap.length,
        description: 'A new genre of soul that infuses soul, rap and R & B.',
        data: soul_trap,
        last_update: '01 jan 21',
        var_name: 'soul_trap',
    },

    {
        name: "Huslters Mind",
        color: "#8E81B9",
        color_fade: "rgba(142, 129, 185,0.5)",
        image: require("../../assets/images/covers/hustlers_mind.jpg"),
        key: '3',
        songs_num: hustlers_mind.length,
        description: 'Hustlers go all out every day, pushing past their breaking point.\nDespite odds never quiting doing the hard work, creating our own opportunities, believing in ourselves.\n\nThis playlist has tunes that resonate with a everyday hustler'
        , data: hustlers_mind,
        last_update: '01 jan 21',
        var_name: 'hustlers_mind',

    },
    {
        name: "Loyalty",
        color: "#578993",
        color_fade: "rgba(177, 59, 59,0.5)",
        image: require("../../assets/images/covers/loyalty.jpg"),
        key: '4',
        songs_num: loyalty.length,
        description: 'Appreciation tracks for those who have stayed true to us both in the good and bad times.'
        , data: loyalty,
        last_update: '01 jan 21',
        var_name: 'loyalty',
    },
    {
        name: "Album Intro's",
        color: "#5744B5",
        color_fade: "rgba(231, 153, 155,0.5)",
        image: require("../../assets/images/covers/album_intros.jpg"),
        key: '5',
        songs_num: album_intros.length,
        description: "All intro songs for albums and ep's.",
        data: album_intros,
        last_update: '01 jan 21',
        var_name: 'album_intros',
    },

]


