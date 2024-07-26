
import React, { Component, createContext, useState, useRef, useEffect } from 'react'

import allsongs from './data/allsongs'
import newtracks from './data/newtracks'
import hotlist from './data/hotlist'
import love_vibes from './data/playlists/love_vibes'
import soul_trap from './data/playlists/soul_trap'

import playlists from './data/playlists'
const DataContext = createContext()

export default function DataProvider(props) {



    const recent_play_ref = useRef([])

    const all_tracks_ref = useRef()
    const new_tracks_ref = useRef()
    const hot_tracks_ref = useRef()
    const playlists_ref = useRef()

    useEffect(() => {
        all_tracks_ref.current = allsongs
        new_tracks_ref.current = newtracks
        hot_tracks_ref.current = hotlist
        playlists_ref.current = playlists

        return () => {

        }
    }, [])
    const [user, setuser] = useState()
    const init_render = useRef(true)
    return (
        <DataContext.Provider value={{
            all_songs: allsongs,
            new_tracks: newtracks,
            all_tracks_ref,
            new_tracks_ref,
            hot_tracks_ref,
            playlists,
            love_vibes,
            soul_trap,
            playlists_ref,
            setuser,
            user,
            recent_play_ref,
            init_render
        }}>
            {props.children}
        </DataContext.Provider>
    )
}
export { DataProvider, DataContext }