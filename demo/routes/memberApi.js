const express = require('express');
const router = express.Router();
//路由系統
//以express定義的路由(router)

const firebase = require('../models/FireBase.js');


//載入模組

//post
router.post('/register', function (req, res) {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    firebase
        .auth()
        .createUser({
            displayName: data.name,
            email: data.email,
            password: data.password,
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            res.json({
                "status": 0,
                "msg": "註冊成功"
            });
        })
        .catch((error) => {
            res.json({
                "status": 1,
                "msg": "重複註冊"
            });
        });
});
router.post('/login', function (req, res) {
    //use firebase api login
});
router.post('/changePW', function (req, res) {
    //no code yet
});

module.exports = router;