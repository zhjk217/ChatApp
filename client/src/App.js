import React from 'react';
import "./Stylesheets/App.css";
import { ChatRoom } from './Components/ChatRoom';
import UI from './Components/UI';
import SignOut from "./Components/Signout";
import firebase from "firebase";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Components/Loading";

const firebaseConfig = {
  apiKey: "AIzaSyDIFKORtZaeCcWSA7kuhb0c1Aw7-vtq-hU",
  authDomain: "chatapp-84774.firebaseapp.com",
  databaseURL: "https://chatapp-84774-default-rtdb.firebaseio.com",
  projectId: "chatapp-84774",
  storageBucket: "chatapp-84774.appspot.com",
  messagingSenderId: "543391953679",
  appId: "1:543391953679:web:c4f5fe4cb3cffea650847a"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <Loading />
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  return (
    <div className="App">
      <header>
        <h1>
          <span role="img" aria-label="message">
            Community Chat App 💬
          </span>
        </h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <UI />}</section>
    </div>
  );
}

export default App;