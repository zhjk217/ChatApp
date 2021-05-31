import React ,{ useState,useEffect} from "react";
import "../Stylesheets/ChatRoom.css";
import firebase from "firebase";
import "firebase/auth";
import ChatMessage from './ChatMessages';
import {socket} from '../Services/socket';

export const ChatRoom =()=> {

  const [error, setError] = useState(null);

  const [formValue, setFormValue] = useState("");

  const [chatData, setChatData] = useState([]);

  const [constructorHasRun, setConstructorHasRun] = useState(false);

  useEffect(() => {
    if (constructorHasRun) return;
    fetch("chat/getallmessage")
      .then(res => res.json())
      .then(
        (result) => { 
          setChatData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
      setConstructorHasRun(true);
});

  const sendMessage = async (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    var data = {
      'photoURL':user.photoURL,
      'name': user.displayName,
      'uid': user.uid,
      'msg': formValue,
    };
    await fetch("chat/message",{
                 method: 'POST',
                 body: JSON.stringify(data),
                 headers: new Headers({
                  'Content-Type': 'application/json'
                })})  
                .then(res => res.json())
            .then((result) => { 
              console.log(result.msg);
            },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
            (error) => {
              setError(error);
               }
            );
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


