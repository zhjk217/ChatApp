import React, { useState, useEffect } from "react";
import "../Stylesheets/ChatRoom.css";
import firebase from "firebase";
import "firebase/auth";
import ChatMessage from './ChatMessages';
import { socket } from '../Services/socket';

export const ChatRoom = () => {

  const [formValue, setFormValue] = useState("");

  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    socket.emit('enterChat', firebase.auth().currentUser.uid);
    socket.on('getMsg', function (obj) {
      setChatData(obj);
    });
  }, []);

  const sendMessage = () => {
    var user = firebase.auth().currentUser;
    var data = {
      'photoURL': user.photoURL,
      'name': user.displayName,
      'uid': user.uid,
      'msg': formValue,
    };
    socket.emit('msg', data);
    setFormValue("");
  };
  return (
    <>
      <main>
        {chatData.slice(0).reverse().map((message) => <ChatMessage message={message} />)}
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


