const firebase = require("firebase-admin");

var serviceAccount = require("./chatapp-84774-07d430caec3f.json");


firebase.initializeApp ({
    credential: firebase.credential.cert(serviceAccount),
    apiKey: "AIzaSyDIFKORtZaeCcWSA7kuhb0c1Aw7-vtq-hU",
    authDomain: "chatapp-84774.firebaseapp.com",
    databaseURL: "https://chatapp-84774-default-rtdb.firebaseio.com",
    projectId: "chatapp-84774",
    storageBucket: "chatapp-84774.appspot.com",
    messagingSenderId: "543391953679",
    appId: "1:543391953679:web:c4f5fe4cb3cffea650847a"
  });

//var db = firebase.database();

//var ref = db.ref("Server/SaveDatas/");

module.exports = firebase;