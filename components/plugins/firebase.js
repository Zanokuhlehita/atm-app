
import firebase from 'firebase';

import { EventRegister } from 'react-native-event-listeners'



var firebaseConfig = {
    apiKey: "AIzaSyCnJ_U3vRfEmjK8Z2JBQiUd_eNXkCcsdZs",
    authDomain: "i-net-app.firebaseapp.com",
    projectId: "i-net-app",
    storageBucket: "i-net-app.appspot.com",
    messagingSenderId: "377129510369",
    appId: "1:377129510369:web:2ec549a91f484a8e4f9ea0",
    measurementId: "G-WD59Q6KDRM"
};
// Initialize Firebase

export const initFirebase = () => {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (error) {
        alert('App could not connect to database')
        console.log('App could not connect to database', error)
    }
}




export const currentUser = () => firebase.auth().currentUser




export async function addRecord(collection, docId, obj) {
    const db = firebase.firestore()
    db.collection(collection).doc(docId)
        .set(obj).then(() => {
            console.log('Record Added Succesfully');
        }).catch((e) => {
            alert('Error Adding Record: Check your log for more info.')
            console.log('Error Adding Record', e);
        })
}

export async function updateRecord(collection, docId, obj) {
    const db = firebase.firestore()
    db.collection(collection).doc(docId)
        .update(obj).then((r) => {
            console.log('Record Update Succesfully', r);
        }).catch((e) => {
            alert('Error Updating Record: Check your log for more info.')
            console.log('Error Adding Record', e);
        })
}

export async function updateDisplayName(name) {
    const user = firebase.auth().currentUser
    user.updateProfile({
        displayName: name,
    }).then(() => {
        console.log('User Name Updated Succesfully');
    }).catch((e) => {
        alert('Error Updating User Name: Check your log for more info.')
        console.log('Error Updating User Name', e);
    })
}

export async function updateUserPhotoUrl(link) {
    const user = firebase.auth().currentUser
    user.updateProfile({
        photoURL: link
    }).then(() => {
        console.log('User Photo Url Updated Succesfully', link);

    }).catch((e) => {
        alert('Error Updating User Photo Url: Check your log for more info.')
        console.log('Error Updating User Photo Url', e);
    })
}


export const getAllRecords = async (collection) => {
    const db = firebase.firestore();

    const data = await db.collection(collection).get()

    return data.docs.map(doc => {
        var id = doc.id
        return { id, ...doc.data() }
    });
}

export async function addRecordLevel2(collection, docId, collectionLevel2, docIdLevel2, obj) {
    const db = firebase.firestore()

    if (collectionLevel2) {

        db.collection(collection).doc(docId).collection(collectionLevel2).doc(docIdLevel2)
            .set(obj).then(() => {
                console.log('Record Added Succesfully');
            }).catch((e) => {
                alert('Error Adding Record: Check your log for more info.')
                console.log('Error Adding Record', e);
            })
    }
    else {
        alert('Level 2 Collection Not Defined')
    }
}
export const getAllRecordsLevel2 = async (collection, docId, collection2) => {
    const db = firebase.firestore();

    const data = await db.collection(collection).doc(docId).collection(collection2).get()

    return data.docs.map(doc => {
        var id = doc.id
        return { id, ...doc.data() }
    });
}
export const getAllRecordsLevel2Snapshot = async (collection, docId, collection2) => {
    /*   const db = firebase.firestore();
      const documents = [];
      const data = await db.collection(collection).doc(docId).collection(collection2).onSnapshot((docs) => {
  
          docs.map(doc => doc.data());
  
          documents = docs.docChanges().map(change => ({
              id: change.doc.id,
              title: change.doc.data().title
          }));
  
          return documents;
      });
  
   */
    return 'not available yet'

}


export const deleteDoc = async (collection, docId) => {
    const db = firebase.firestore();
    db.collection(collection).doc(docId).delete().then(() => {
        console.log('Record Deleted Succesfully');
    }).catch((e) => {
        alert('Error Deleting Record: Check your log for more info.')
        console.log('Error Deleting Record', e);
    })

}


export const updateField = async (collection, docId, obj) => {
    const db = firebase.firestore();
    await db.collection(collection).doc(docId).update(obj).then(() => {
        console.log('Record Update Succesfull');
    }).catch((e) => {
        alert('Error Updating Record: Check your log for more info.')
        console.log('Error Updating Record', e);
    })

}
export const updateFieldLevel2 = async (collection, docId, collection2, docId2, obj) => {
    const db = firebase.firestore();
    const update = await db.collection(collection).doc(docId).collection(collection2).doc(docId2).update(obj).then(() => {
        console.log('Record Update Succesfull');
    }).catch((e) => {
        alert('Error Updating Record: Check your log for more info.')
        console.log('Error Updating Record', e);
    })
    return update
}

export const firebaseSignOut = async () => {
    firebase.auth().signOut().then((e) => {
    // alert('sign out succesful')
        console.log('Firebase Signed Out', e)
     //   EventRegister.emit('reset_navigation')
        return true
    }).catch((e) => {
        alert('Sign out failed')
        console.log('Firebase Sign Out Error', e)
return false
    });
}