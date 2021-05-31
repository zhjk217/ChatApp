const express = require('express');
const router = express.Router();

const firebase = require('../models/FireBase.js');

const db = firebase.database();

const ref = db.ref("server/saving-data");

const usersRef = ref.child("messages");

router.post('/message', function (req, res) {
    const data = {
        photoURL: req.body.photoURL,
        name: req.body.name,
        uid:req.body.uid,
        msg: req.body.msg,
    }
    usersRef.push().set(data);
    res.json({
      msg:"sueess"
    });
});
router.get('/getallmessage', function (req, res) {
      usersRef.limitToLast(25).on("value", function (snapshot) {
        //once fetch
        //on socketio
        var list = [];
        snapshot.forEach(function (elem) {
          list.push(elem.val());
        });
        res.json(list);
      });
});

module.exports = router;