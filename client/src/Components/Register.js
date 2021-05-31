import React from "react";
import '../Stylesheets/Register.css';
import $ from "jquery";
import firebase from "firebase";
import "firebase/auth";

export default function Register() {

  const SentRegisterData=() =>{
    
    var name = $('#Username').val();
    var email = $('#Email').val();
    var pw = $('#Password').val();
    var cpw = $('#CheckPassword').val();
    //前端取資料
    if (!name || !email || !pw || !cpw) {
      alert('請輸入未填欄位!');
    } else if(email.search('@')===-1){
      alert('並未電子信箱');
    } else if(pw.length<6){
      alert('密碼太短');
    } 
    else if (pw !== cpw) {
      alert('兩次輸入密碼不相同!');
        //除錯
    } else {
        var api = "/member/register";
        //url 連線api
        var data = {
            'name': name,
            'email': email,
            'password': pw,
            'checkpassword' : cpw,
        };
        //data
        $.post(api, data, function (res) {
            if (res.status === 0) {
                //cookie.set('zhjk217chatapp', data, { expires: 7, path: '/' });
                firebase
                  .auth()
                  .signInWithEmailAndPassword(email, pw)
                  .then((userCredential) => {
                    // Signed in
                    //var user = userCredential.user;
                    console.log(userCredential.user.uid);
                    alert("註冊成功");
                    // ...
                  })
                  .catch((error) => {
                  //var errorCode = error.code;
                  var errorMessage = error.message;

                  alert("註冊失敗"+errorMessage);
                   });
                  //post
            }
            else{
              alert(res.msg);
            }
            });
        //post
  };
};
  return (
    <div className="Register">
        <div>
            <input type="text" id="Username" placeholder="UserName"/>
        </div>
        <div>
          <input type="text" id="Email" placeholder="Email"/>
        </div>
        <div>
           <input type="password" id="Password" placeholder="Password"/>
        </div>
        <div>
            <input type="password" id="CheckPassword" placeholder="CheckPassword"/>
        </div>
        <div class="btn">
      <button onClick={SentRegisterData}>Register</button>
   
      </div>
     </div>
  );
}