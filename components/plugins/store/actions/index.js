

/* Settings: Start */

export const changeheading = (heading) => ({
    type: "CHANGE_HEADING",
    payload: heading

});
export const minimizeplayer = () => ({
    type: "MINIMIZE_PLAYER",
    //    payload: heading

});
export const enableopendrawer = (status) => ({
    type: "ENABLE_OPEN_DRAWER",
    payload: status

});

/* Settings: End */

/* User :Start */
export const registeruser = (user) => ({
    type: "REGISTER_USER",
    payload: user

});
/* User : End */

/* Songs : Start */

export const sound_position = (pos) => ({
    type: "SOUND_POSITION",
    payload: pos

});
export const playsong = (i) => ({
    type: "NEXT_SONG",
    payload: i

});
export const skipto = (i) => ({
    type: " SKIP_TO",
    payload: i

});
export const activateLoadIndicator = (status) => ({
    type: "ACTIVATE_LOAD_INDICATOR",
    payload: status

});

export const loadsound = (sound_data) => ({
    type: "LOAD_SOUND_DATA",
    payload: sound_data

});
export const playstatus = (status) => ({
    type: "SET_PLAY_STATUS",
    payload: status

});
export const nowplayingid = (i) => ({
    type: "SET_NOWPLAING_ID",
    payload: i

});
export const skipbuttonpress = (status) => ({
    type: "SET_BUTTON_PRESS",
    payload: status

});
/* Songs :End */


export const addition5 = () => {
    console.log('in action')
    return ({
        type: "ADDITION5",


    });
}

export const subtraction5 = () => ({
    type: "SUBTRACTION5",

});