import React from 'react';
import { useState, useEffect, useRef } from "react";
import "./joinId.css";

const JoinId = ({ getUserId }) => {

    function onChangeId(e) {
        getUserId(e.target.value);
    }

    return (
        <div className="joinId" style={{marginTop:"12%"}}>
            <div className="titleBox">아이디</div>

            <div className="inputBox">
                <input className="idInput" id="id" 
                placeholder="6-12자 이내, 영문, 숫자 사용 가능"
                onChange={onChangeId}/>
            </div>
        </div>
      );
}

export default JoinId;