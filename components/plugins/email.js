import Axios from 'axios'
import { addRecord } from './firebase';
import { emailLink } from './settings';
import firebase from 'firebase'
import React from 'react'
import { View, Text, Alert } from 'react-native'


export const sendEmail = (data) => {

    //data should be object with atttributes name & msg

    async function send(params) {
        const res = await firebase.firestore().collection('emails').add({
            user: data.user,
            msg: data.msg,
            read: false
        })
            .then(() => {
                Alert.alert(
                    "Your Requst has been sent",
                    'An i-Net Telecoms agent will get back to you within 24 hours',
                    [
                        /*   {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              sty le: "cancel"
                          },*/
                        {

                            text: "Ok", onPress: () => {


                            }
                        }
                    ],
                    { cancelable: true }
                );
            }).catch(() => {
                alert('Message Failed')

            })
        res
    }
    send()
    /* Axios.post(emailLink, data).then((res) => {
        alert('Request Succesfull,\nAn i-Net Telecoms agent will get back to you within 24hrs')
        console.log('log', res)
    }).catch((e) => {
        console.log('log', e)
        alert('Request Not Sent: Error sending request')
    }); */

}


export const sendFault = (data) => {

    //data should be object with atttributes name & msg

    async function send(params) {
        const res = await firebase.firestore().collection('faults').add({
            user: data.user,
            msg: data.msg,
            read: false
        })
            .then(() => {
                Alert.alert(
                    "Your Fault has been sent",
                    'An i-Net Telecoms agent will get back to you within 24 hours',
                    [
                        /*   {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              sty le: "cancel"
                          },*/
                        {

                            text: "Ok", onPress: () => {


                            }
                        }
                    ],
                    { cancelable: true }
                );
            }).catch(() => {
                alert('Message Failed')

            })
        res
    }
    send()
    /* Axios.post(emailLink, data).then((res) => {
        alert('Request Succesfull,\nAn i-Net Telecoms agent will get back to you within 24hrs')
        console.log('log', res)
    }).catch((e) => {
        console.log('log', e)
        alert('Request Not Sent: Error sending request')
    }); */

}