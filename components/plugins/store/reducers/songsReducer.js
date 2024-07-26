const initialState = {
    nowplaying: {
        song_playlist_index: null, playlist_name: "", playlist_data: "", song_name: "", song_sound_data: "", song_data: "", is_playing: false, next_song_name: ""
    },
    //playlists: [ playlist_name: null, playlist_data: [] },],
    // playlists: { allsongs: null, },
    sound_position: 0,
    nowplaying_id: 0,
    load_indicator: false,
    sound_data: null,
    is_playing: false,
    is_button_press: false,
    skip_to: 0,
    playlist: [
        {
            title: 'Tommorow',
            author: 'Jayceon Adler',
            song_link: require(`../../../assets/songs/A002_tomorrow.mp3`),
            key: '1'

        },
        {
            title: 'LLL Intro',
            author: 'Jayceon Adler',
            song_link: require(`../../../assets/songs/A003_sorry.mp3`),
            key: '2'

        },
        {
            title: 'Tommorow',
            author: 'Jayceon Adler',
            song_link: require(`../../../assets/songs/A004_under_pressure.mp3`),
            key: '3'

        },
        {
            title: 'Tommorow',
            author: 'Jayceon Adler',
            song_link: require(`../../../assets/songs/A006_family.mp3`),
            key: '4'

        },
        {
            title: 'Tommorow',
            author: 'Jayceon Adler',
            song_link: require(`../../../assets/songs/A001_love_life_loyalty_intro.mp3`),
            key: '5'

        },
        {
            title: 'Tommorow',
            author: 'Jayceon Adler',
            song_link: require(`../../../assets/songs/A005_day_one's.mp3`),
            key: '6'

        },
        {
            title: 'Tommorow',
            author: 'Jayceon Adler',
            song_link: require(`../../../assets/songs/A007_ms_california.mp3`),
            key: '7'

        },

    ]
}

const songsReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_BUTTON_PRESS":

            return { ...state, is_button_press: action.payload }
        case "NEXT_SONG":

            return { ...state, nowplaying_id: action.payload }
        case "SKIP_TO":

            return { ...state, skip_to: action.payload }
        case "SET_NOWPLAING_ID":

            return { ...state, nowplaying_id: action.payload }

        case "ACTIVATE_LOAD_INDICATOR":

            return { ...state, load_indicator: action.payload }
        case "LOAD_SOUND_DATA":

            return { ...state, sound_data: action.payload }
        case "SET_PLAY_STATUS":

            return { ...state, is_playing: action.payload }

        default:
            return state

    }
}
export default songsReducer