import React, { useCallback, useRef, useState, useEffect } from 'react';
import './chat.css';

// 참고 : https://learnote-dev.com/java/Spring-%EA%B2%8C%EC%8B%9C%ED%8C%90-API-%EB%A7%8C%EB%93%A4%EA%B8%B0-webSocket%EC%9C%BC%EB%A1%9C-%EC%B1%84%ED%8C%85%EC%84%9C%EB%B2%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/#%EC%84%9C%EB%A1%A0
// 참고 : https://velog.io/@postlist/SpringBoot-WebSocket-%EB%A7%8C%EB%93%A4%EA%B8%B0-React-%EC%B1%84%ED%8C%85%EA%B5%AC%ED%98%84
const Chat = ( {roomId} ) => {
    sessionStorage.setItem('backFrom', 'chat');
    const [msg, setMsg] = useState("");

    const userMbti = sessionStorage.getItem('userMbti');

    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const [randomId, setRandomId] = useState(userMbti + " " + Math.ceil((Math.random() * 9999) + 1000));

    const ws = useRef(null);

    const msgBox = chatt.map((item, idx) => (
      <div id='chatDiv' key={idx} className={item.sender === randomId ? 'me' : 'other'}>
          <span><b>{item.sender}</b></span> [ {String(new Date().getHours()) + ":" + String(new Date().getMinutes())} ]<br/>
          <span>{item.message}</span>
      </div>
    ));

    useEffect(() => {
      if(socketData !== undefined) {
          const tempData = chatt.concat(socketData);
          console.log(tempData);
          setChatt(tempData);
      }
    }, [socketData]);

    const onText = event => {
      setMsg(event.target.value);
    }

    const webSocketLogin = useCallback(() => {
      ws.current = new WebSocket("ws://localhost:8080/ws/chat");

      ws.current.onmessage = (message) => {
          const dataSet = JSON.parse(message.data);
          setSocketData(dataSet);
      }
    });

    useEffect(() => {
      webSocketLogin();
      console.log(userMbti);

      const enterData = {
        type: "ENTER",
        roomId: roomId,
        sender: randomId,
        message: "enter"
      }

      const temp = JSON.stringify(enterData);
        
      if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
          ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
              console.log(ws.current.readyState);
              ws.current.send(temp);
          }
      } else {
          ws.current.send(temp);
      }

      setChkLog(true);
    }, [])
  
    const send = useCallback(() => {
      if(!chkLog) {
          webSocketLogin();
          setChkLog(true);
      }

      if(msg !== ''){
        const data = {
            type: "TALK",
            roomId: roomId,
            sender: randomId,
            message: msg
        };  //전송 데이터(JSON)

        console.log(data);

        const temp = JSON.stringify(data);
        
        if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
            ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                console.log(ws.current.readyState);
                ws.current.send(temp);
            }
        } else {
            ws.current.send(temp);
        }
      }else {
          alert("메세지를 입력하세요.");
          document.getElementById("msg").focus();
          return;
      }
      setMsg("");
    });

    return (
        <div className="chat" style={{marginTop: "12%"}}>
          <h1 style={{textAlign:"center"}}>{roomId}</h1>
          <div id='chatt'>
              <div id='talk'>
                  
                  <div className='talk-shadow'></div>
                  {msgBox}
              </div>

              <div id='sendZone'>
                <textarea id='msg' value={msg} onChange={onText}
                  onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
                <input type='button' value='전송' id='btnSend' onClick={send}/>
              </div>

          </div>
        </div>
      );
}

export default Chat;