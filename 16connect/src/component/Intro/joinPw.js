import React from 'react';
import { useState, useEffect, useRef } from "react";

const JoinPw = ({getUserPw, getUserPwCheck}) => {

    function onChangePw(e) {
        getUserPw(e.target.value);
    }
    function onChangePwCheck(e) {
        getUserPwCheck(e.target.value);
    }

    return (
        <div className="joinPw" style={{marginTop:"12%"}}>
            <div className='firstBox'>
                <div className="titleBox">비밀번호</div>

                <div className="inputBox">
                    <input className="pwInput" onChange={onChangePw} placeholder="10-18자 이내, 영문, 숫자 사용 가능" type="password"></input>
                </div>
            </div>
            <div className='secondBox'>
                <div className="titleBox">비밀번호 확인</div>
                <div className="inputBox">
                    <input className="pwInput" onChange={onChangePwCheck} placeholder="비밀번호를 한번 더 입력해주세요." type="password"></input>
                </div>
            </div>
        </div>
      );
}

export default JoinPw;