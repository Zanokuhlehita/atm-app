

const initialState = {
    usersettings: { repeat: false, shuffle: false },
    user_data: '',

}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_USER":

            return { ...state, user_data: action.payload }


        default:
            return state

    }
}

export default userReducer