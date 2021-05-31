import React from "react";
import firebase from "firebase";
import "firebase/auth";

export default function SignOut() {
    const cleardata=() =>{
        firebase.auth().signOut()
            .then((userCredential) => {
            // Sign-out successful.
            console.log(userCredential.user.uid);
            })
            .catch((error) => {
            // An error happened.
            });
    }
    return(
        firebase.auth().currentUser &&(<button onClick={cleardata}>SignOut</button>) 
    );
};