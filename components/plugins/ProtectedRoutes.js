import React, { useState, useContext, useRef, useEffect } from 'react'
import firebase from 'firebase';
import { View } from 'native-base';
import { Text } from 'react-native-svg';
function ProtectedRoute({ Component, navigation }) {

    const [allowAccess, setallowAccess] = useState(false)
    const [count, setcount] = useState(0)
    const isAuthenticated = firebase.auth().currentUser

    const loop = useRef()
    const [update, setupdate] = useState(0)
/*     function checkUser() {
        setupdate(Math.random())
        console.log('logot', update)
        if (allowAccess) {
            clearInterval(loop.current)
            loop.current = null
            console.log('cleared loop',);

        }
        if (isAuthenticated) {
            clearInterval(loop.current)
            // setallowAccess(true)
            //  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa',)
        } else {
            console.log('Condition not met', update);

            if (update == 5) navigate('/dd')
            setupdate(update + 1)
        }
    }



    useEffect(() => {
        loop.current = setInterval(checkUser, 1000)
        return () => {
        }
    }, [])
    useEffect(() => {
        console.log('Update value', count, update)
        setcount(count + 1)
        if (isAuthenticated) {
            clearInterval(loop.current)
            console.log('cleared loop',);
        }
        if (count == 10) {
            navigate('/login')
            clearInterval(loop.current)
        }
        return () => {
        }
    }, [update]) */
    return isAuthenticated ? (
        <Component />
    ) : (
            allowAccess ? <Component navigation={navigation}/> : <View style={{
                flex: 1,
          backgroundColor:'red'      
            }}>
                <Text>
                    oopss
                </Text>
        </View> /*  <Navigate to={{ pathname: '/' }} /> */
    );
}


export default ProtectedRoute;