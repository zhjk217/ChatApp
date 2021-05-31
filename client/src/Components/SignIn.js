import React from "react";
import '../Stylesheets/SignIn.css';
import $ from "jquery";
import firebase from "firebase";
import "firebase/auth";

export default function SignIn() {

  const SentLoginData = () => { 

    var email = $('#Email').val();
    var pw = $('#Password').val();

    //前端取資料
    if (!email || !pw) {
      alert('請輸入帳號密碼!');
    } else {
      //data
      firebase.auth().signInWithEmailAndPassword(email, pw)
        .then((userCredential) => {
          // Signed in
          //var user = userCredential.user;
          console.log(userCredential.user.uid);
          alert("登入成功");
          // ...
        })
        .catch((error) => {
          //var errorCode = error.code;
          var errorMessage = error.message;

          alert("登入失敗"+errorMessage);
        });
      //post
    }
  };

  const googleSignInOption = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  return ( <div className = "SignIn" >
    <span > </span> <div >
    <input type = "text" id = "Email" placeholder = "Email" />
    </div> 
    <div >
    <input type = "text"
    id = "Password"
    placeholder = "Password" />
    </div> <span> </span> <div class = "btn" >
    <button onClick = {SentLoginData} > SignIn </button> 
    <button onClick={googleSignInOption}>
    <img src = "https://img.icons8.com/plasticine/100/000000/google-logo.png"
    alt = "google" />
    </button> </div> </div>
  );
}