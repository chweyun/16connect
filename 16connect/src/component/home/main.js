import React from 'react';
import { useState, useEffect } from "react";

import Logo from "../assets/logo_small.png";
import Bell from "../assets/bell.png";
import BellNotChecked from "../assets/bell_alert.png"
import Reload from "../assets/reload.png";

import Home from "./home.js";
import ChatIntro from "../chat/chatIntro";
import Profile from "../profile/profile.js";


const Main = () => {
    const [whichBtn, setWhichBtn] = useState(1);

    function handleAlert(e) {
        window.location.href = "/alert";
    }

    useEffect(() => {
        console.log(sessionStorage.getItem('userMbti'));
        console.log(sessionStorage.length);
    }, [])

    useEffect(() => {
        console.log(sessionStorage.getItem('backFrom'));
        if (sessionStorage.getItem('backFrom') == 'profile') {
            setWhichBtn(3);
            sessionStorage.setItem('backFrom', 'home');
        } else if (sessionStorage.getItem('backFrom') == 'chat') {
            setWhichBtn(2);
            sessionStorage.setItem('backFrom', 'home');
        } else if (sessionStorage.getItem('backFrom') == 'home') {
            setWhichBtn(1);
        }

        // 알림 구현
    }, [sessionStorage.getItem('backFrom')])

    return (
        <div className="main">
            <div className="topBar" style={{position: "fixed", top: "0", left: "0", right: "0", height: "14%", backgroundColor: "white"}}>
                <div className="bell" onClick={handleAlert} style={{float: "left", width: "30%"}}>
                    <img src={Bell} width="50px" />
                </div>
                <img src={Logo} width="200px" />
                {whichBtn == 1 ? 
                <div className="reLoad" onClick={() => {window.location.reload()}} style={{float: "right", width: "30%"}}>
                    <img src={Reload} width="50px" />
                </div> 
                : null}
            </div>

            <div className="middleBox" style={{marginTop: "4%"}}>
                {whichBtn == 1 ? <Home /> : null}
                {whichBtn == 2 ? <ChatIntro /> : null}
                {whichBtn == 3 ? <Profile /> : null}
            </div>  

            <div className='btmBox' style={{backgroundColor:"gray", height:"100px", position: "fixed", bottom: "0", left: "0", right: "0"}}>
                <div className='homeBtn' onClick={() => setWhichBtn(1)} style={{float: "left", width: "30%", fontSize: "40px"}}>홈</div>
                <div className='chatBtn' onClick={() => setWhichBtn(2)} style={{float: "left", width: "20%", fontSize: "40px"}}>대화</div>
                <div className='profileBtn' onClick={() => setWhichBtn(3)} style={{float: "right", width: "30%", fontSize: "40px"}}>프로필</div>
            </div>
        </div>
      );
}

export default Main;