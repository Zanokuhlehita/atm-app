

const initialState = {
    adonis_js_link: "http://192.168.101.102:3333",
    player_is_minimized: false,
    welcome_dialog: false,
    permanent_close: false,
    current_view: "NOW PLAYING",
    player_is_minimized: true,
    enable_open_drawer: false
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {

        case "MINIMIZE_PLAYER":

            return { ...state, player_is_minimized: !state.player_is_minimized }

        case "CHANGE_HEADING":

            return { ...state, current_view: action.payload }
        case "ENABLE_OPEN_DRAWER":

            return { ...state, enable_open_drawer: action.payload }

        default:
            return state

    }
}
export default settingsReducer