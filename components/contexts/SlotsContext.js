
import React, { Component, createContext, useState, useRef, useEffect } from 'react'
import { Text, View } from 'react-native'
import { Audio } from 'expo-av';
import { EventRegister } from 'react-native-event-listeners'
import { nowplayingid, loadsound, playsong } from '../plugins/store/actions'
import { activateLoadIndicator } from '../plugins/store/actions'
import firebase from 'firebase'
import allsongs from './data/allsongs'
import newtracks from './data/newtracks'
import hotlist from './data/hotlist'


const SlotsContext = createContext()

export default function SlotsProvider(props) {

    const bar_width_ref_1 = useRef()
    const bar_width_ref_2 = useRef()
    const bar_width_ref_3 = useRef()
    const bar_width_ref_4 = useRef()
    const bar_width_ref_5 = useRef()
    const bar_width_ref_6 = useRef()
    const bar_width_ref_7 = useRef()
    const bar_width_ref = useRef([])



    return (
        <SlotsContext.Provider value={{
            bar_width_ref_1,
            bar_width_ref_2,
            bar_width_ref_3,
            bar_width_ref_4,
            bar_width_ref_5,
            bar_width_ref_6,
            bar_width_ref_7,
            bar_width_ref
        }}>
            {props.children}
        </SlotsContext.Provider>
    )
}
export { SlotsProvider, SlotsContext }