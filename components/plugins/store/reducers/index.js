import settingsReducer from './settingsReducer'
import songsReducer from './songsReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'


const Reducers = combineReducers({
    settings: settingsReducer,
    songs: songsReducer,
    user: userReducer,
});

export default Reducers;


