import firebase from "firebase";
import { Alert } from "react-native";




export const updateDailyFreePlays = (value) =>{
           firebase
             .firestore()
             .collection("users")
             .doc(firebase.auth().currentUser.uid)
             .update({ dailyFreePlays: value })
             .then((v) => {
             
             })
             .catch((e) => {
                  Alert.alert("Error 589 Occured");
               console.log("Error 589:", e);
             });
}

export const updatePremiumPlays = (value) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({ premiumPlays: value })
    .then((v) => {})
    .catch((e) => {
      Alert.alert("Error 589 Occured");
      console.log("Error 589:", e);
    });
};

export const updatePromotionalPlays = (value) => {
  firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({ promotionalPlays: value })
    .then((v) => {})
    .catch((e) => {
      Alert.alert("Error 589 Occured");
      console.log("Error 589:", e);
    });
};