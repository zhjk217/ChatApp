import React, { useState } from "react";
import $ from "jquery";
import '../Stylesheets/UI.css';
import SignIn from "./SignIn";
import Register from "./Register";

export default function UI() {

  const [Status, SetStatus] = useState(true);

  const getstatus = (boolean) =>{
    SetStatus(boolean);

    if(!boolean)
    $('.floatline').animate({marginLeft:"300px"});
    else
    $('.floatline').animate({marginLeft:"0px"});
  };
  return (
    <div className="UI">
      <div className="form">
        <h3>Welcome</h3>
        <div className="status">
          <span></span>
         
          <div className="signin" onClick={() =>getstatus(true)}><div className="floatline"></div>SignIn</div>
          <div className="register" onClick={() =>getstatus(false)}>Register</div>
        </div>
        {Status ? <SignIn /> : <Register />}
      </div>
      </div>
  );
}