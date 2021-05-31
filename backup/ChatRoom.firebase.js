import React ,{ useState,useEffect} from "react";
import "../Stylesheets/ChatRoom.css";
import firebase from "firebase";
import "firebase/auth"; 
import ChatMessage from './ChatMessages';
import {socket} from '../Services/socket';

export const ChatRoom =()=> {

  const [formValue, setFormValue] = useState("");

  const [chatData, setChatData] = useState([]);

  const [constructorHasRun, setConstructorHasRun] = useState(false);

  useEffect(() => {
    if (constructorHasRun) return;
    firebase.database().ref('server/saving-data/messages').on("value", function (snapshot) {
      var list = [];
      snapshot.forEach(function (elem) {
        list.push(elem.val());
      });
      setChatData(list);
    });
    setConstructorHasRun(true);
}, [chatData]);

  const sendMessage = async (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    var data = {
      'photoURL':user.photoURL,
      'name': user.displayName,
      'uid': user.uid,
      'msg': formValue,
    };
    await firebase.database().ref('server/saving-data/messages').push().set(data);
    setFormValue("");
  };
  return (
    <>
    <main>
    {chatData.slice(0).reverse().map((message)=><ChatMessage message={message}/>)}
    </main>
  <div className="ChatRoom">
        <textarea value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="let's Chat"
          >
          
          </textarea>

        <button disabled={!formValue} onClick={sendMessage}>
          <span role="img" aria-label="message">
            💌{" "}
          </span>
          Send
        </button> 
  </div>
  </>);
}


