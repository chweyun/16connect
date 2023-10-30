import React from 'react';
import { useState, useEffect, useRef } from "react";

const JoinBirth = ({getUserBirth}) => {
    function onChangeBirth(e) {
        getUserBirth(e.target.value);
    }

    return (
        <div className="joinBirth" style={{marginTop:"12%"}}>            
            <div className="titleBox">생일</div>

            <div className="inputBox">
                <input className="idInput" type="date" onChange={onChangeBirth}></input>
            </div>
        </div>
      );
}

export default JoinBirth;