import React from 'react';
import { useState, useEffect, useRef } from "react";

const JoinMbti = ({getUserMbti}) => {
    const [isE, setIsE] = useState(true);
    const [isS, setIsS] = useState(true);
    const [isT, setIsT] = useState(true);
    const [isJ, setIsJ] = useState(true);

    useEffect(() => {
        if (isE) {
            document.getElementById("e").style.backgroundColor = "red";
            document.getElementById("i").style.backgroundColor = "white";
        } else {
            document.getElementById("i").style.backgroundColor = "red";
            document.getElementById("e").style.backgroundColor = "white";
        }
        getUserMbti([isE, isS, isT, isJ]);
    }, [isE])

    useEffect(() => {
        if(isS) {
            document.getElementById("s").style.backgroundColor = "red";
            document.getElementById("n").style.backgroundColor = "white";
        } else {
            document.getElementById("n").style.backgroundColor = "red";
            document.getElementById("s").style.backgroundColor = "white";
        }
        getUserMbti([isE, isS, isT, isJ]);
    }, [isS])

    useEffect(() => {
        if(isT) {
            document.getElementById("t").style.backgroundColor = "red";
            document.getElementById("f").style.backgroundColor = "white";
        } else {
            document.getElementById("f").style.backgroundColor = "red";
            document.getElementById("t").style.backgroundColor = "white";
        }
        getUserMbti([isE, isS, isT, isJ]);
    }, [isT])

    useEffect(() => {
        if(isJ) {
            document.getElementById("j").style.backgroundColor = "red";
            document.getElementById("p").style.backgroundColor = "white";
        } else {
            document.getElementById("p").style.backgroundColor = "red";
            document.getElementById("j").style.backgroundColor = "white";
        }
        getUserMbti([isE, isS, isT, isJ]);
    }, [isJ])
    
    return (
        <div className="joinMbti" style={{marginTop:"12%"}}>
            <div className="titleBox">MBTI</div> 

            <div className="inputBox">
                <div className='1btn'>
                    <button id="e" onClick={() => setIsE(true)}>E</button>
                    <button id="i" onClick={() => setIsE(false)}>I</button>
                </div>
                <div className='2btn'>
                    <button id="s" onClick={() => setIsS(true)}>S</button>
                    <button id="n" onClick={() => setIsS(false)}>N</button>
                </div>
                <div className='3btn'>
                    <button id="t" onClick={() => setIsT(true)}>T</button>
                    <button id="f" onClick={() => setIsT(false)}>F</button>
                </div>
                <div className='4btn'>
                    <button id="j" onClick={() => setIsJ(true)}>J</button>
                    <button id="p" onClick={() => setIsJ(false)}>P</button>
                </div>
            </div>
        </div>
      );
}

export default JoinMbti;