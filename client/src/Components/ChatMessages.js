import React from "react";
import firebase from "firebase";
import "firebase/database";
import "../Stylesheets/ChatMessage.css";

export default function ChatMessages(props) {
    const { photoURL,name,uid,msg } = props.message;
    const messageClass =
      uid === firebase.auth().currentUser.uid ? "sent" : "received";
    return (
      <>
        <div className={`message ${messageClass}`}>
          <img
            src={
              photoURL ||
              "https://png.pngtree.com/png-vector/20190217/ourlarge/pngtree-vector-chat-icon-png-image_555480.jpg"
            }
            alt="profile_pic"
          />
          <div>
          <p className="name">{name}</p>
          <div>{msg.split('\n').map(function(item) {
                  return (
                    <p>
                      {item}
                    </p>
                  )
                })} </div>
          </div>
        </div>
      </>
    );
  }