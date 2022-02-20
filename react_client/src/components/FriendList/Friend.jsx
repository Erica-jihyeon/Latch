import React from "react";
import './Friend.css'
import default_logo from '../../img/default_logo.png'

export default function FriendListItem () {
  return (
    <div className="item_box">
      <img src={default_logo} alt="logo" id="avater" />
      <div className="item_text">
        <h4>Name</h4>
        <p className="friendList_detail" >detail?</p>
      </div>
    </div>
  )
}