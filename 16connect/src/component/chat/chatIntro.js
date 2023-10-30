import React, { useCallback, useRef, useState, useEffect } from 'react';
import './chat.css';
import Chat from './chat';

// 참고 : https://learnote-dev.com/java/Spring-%EA%B2%8C%EC%8B%9C%ED%8C%90-API-%EB%A7%8C%EB%93%A4%EA%B8%B0-webSocket%EC%9C%BC%EB%A1%9C-%EC%B1%84%ED%8C%85%EC%84%9C%EB%B2%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/#%EC%84%9C%EB%A1%A0
// 참고 : https://velog.io/@postlist/SpringBoot-WebSocket-%EB%A7%8C%EB%93%A4%EA%B8%B0-React-%EC%B1%84%ED%8C%85%EA%B5%AC%ED%98%84
const ChatIntro = () => {
    const [isAlreadyEntered, setIsAlreadyEntered] = useState(false);

    const [isE, setIsE] = useState('E');
    const [isS, setIsS] = useState('S');
    const [isT, setIsT] = useState('T');
    const [isJ, setIsJ] = useState('J');
    const [category, setCategory] = useState('ESTJ');

    function handleE() {
        if (isE == 'E') {
            setIsE('I');
        } else {
            setIsE('E');
        }
        }
        function handleS() {
        if (isS == 'S') {
            setIsS('N');
        } else {
            setIsS('S');
        }
    }
    function handleT() {
        if (isT == 'T') {
            setIsT('F');
        } else {
            setIsT('T');
        }
    }
    function handleJ() {
        if (isJ == 'J') {
            setIsJ('P');
        } else {
            setIsJ('J');
        }
    }

    useEffect(() => {
        var tmp = [];
        if (isE == 'E') {
            tmp.push('E');
        } else {
            tmp.push('I');
        }
        if (isS == 'S') {
            tmp.push('S');
        } else {
            tmp.push('N');
        }
        if (isT == 'T') {
            tmp.push('T');
        } else {
            tmp.push('F');
        }
        if (isJ == 'J') {
            tmp.push('J') 
        } else {
            tmp.push('P');
        }
        var mbti = tmp[0]+tmp[1]+tmp[2]+tmp[3];
        setCategory(mbti);
        console.log(mbti);
    }, [isE, isS, isT, isJ]);

    function handleEnter() {
        setIsAlreadyEntered(true);
    }


    return (
        <div className="chatIntro" style={{marginTop: "12%"}}>
            {isAlreadyEntered ? <Chat roomId={category}/> : 
            <div>
                <div className="inputBox" style={{paddingLeft: "20%", marginRight: "20%", width: "100vw", marginTop: "140px", backgroundColor: "white"}}>
                    <button id="e" onClick={handleE} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isE}</button>
                    <button id="s" onClick={handleS} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isS}</button>
                    <button id="t" onClick={handleT} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isT}</button>
                    <button id="j" onClick={handleJ} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isJ}</button>
                </div>

                <button onClick={handleEnter} style={{marginLeft: "32%", marginTop: "20%", height: "6vh"}}>입장하기</button>
            </div>}
        </div>
      );
}

export default ChatIntro;