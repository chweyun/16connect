import { React, useState, useEffect } from "react";
import axios from "axios";

import MyBoardList from './myBoardList';
import MyCommentList from "./myCommentList";
import MyLikeList from './myLikeList';

import BackIcon from "../assets/back.png";
import NextBtn from "../assets/nextbtn.png";
import EndBtn from "../assets/endBtn.png";
import { AppContext } from "../../App";

const List = () => {

    var whichList = sessionStorage.getItem('whichList');

    function handleBack() {
        sessionStorage.removeItem('whichList');
        window.history.back();
    }

    return (
      <div className="list">
        <div className="topBar">
            <div className="backBtn" onClick={handleBack}>
                    <img className="backIcon" src={BackIcon} width="50px" />
            </div>
            <div className="title" style={{fontSize:"24px", textAlign: "center"}}>{whichList}</div>
        </div>
        <div>
        {whichList == '내가 작성한 글' ? <MyBoardList /> : null}
        {whichList == '내가 작성한 댓글' ? <MyCommentList /> : null}
        {whichList == '좋아요한 글' ? <MyLikeList /> : null}
        </div>
      </div>
    );
}
  
export default List;
  