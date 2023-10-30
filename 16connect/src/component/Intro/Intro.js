import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./Intro.css";
import Logo from "../assets/logo.png";

const Intro = () => {

  useEffect(() => {
    // 인트로 화면으로 이동시 세션스토리지 초기화
    sessionStorage.clear();
  }, [])

  const [idValue, setIdValue] = useState('');
  const [pwValue, setPwValue] = useState('');

  const onChangeId = (e) => {
    setIdValue(e.target.value);
  }
  const onChangePw = (e) => {
    setPwValue(e.target.value);
  }

  function handleLogin(e) {
    axios({
      header: {'Content-Type' : 'application/json'}
      , url: '/api/v1/auth/login'
      , method: 'POST'
      , dataType: 'text'
      , data: {
        'id' : idValue,
        'pw' : pwValue
      }
    })
    .then((res) => {
      handleUser(res.data);
      if (res.status === 200) {
        console.log("로그인")
        // handleUser();
        window.location.href = "/main";
      }
    })
    .catch((err) => {
      console.log(err.res);
      alert("로그인 정보를 다시 한 번 확인해주세요.");
    });
  }

  function handleUser(data) {
    sessionStorage.setItem('userId', data.id);
    sessionStorage.setItem('userBirth', data.birth);
    sessionStorage.setItem('userMbti', data.mbti);
    sessionStorage.setItem('userPreferMbti', data.prefer_mbti);
  }

  // function handleUser() {
  //   axios({
  //     header: {'Content-Type' : 'application/json'}
  //     , url: '/api/v1/auth/' + idValue
  //     , method: 'GET'
  //   })
  //   .then((res) => {
  //       // console.log(res);
  //     sessionStorage.setItem('userId', idValue);
  //     sessionStorage.setItem('userPw', pwValue);
  //     sessionStorage.setItem('userBirth', res.data.birth);
  //     sessionStorage.setItem('userMbti', res.data.mbti);
  //     sessionStorage.setItem('userPreferMbti', res.data.prefer_mbti);
      
  //   })
  //   .catch((err) => {
  //     console.log(err.res);
  //     alert("회원 정보를 다시 한 번 확인해주세요.");
  //   });
  // }

  function handleJoin(e) {
    window.location.href = "/join"
  }

  return (
    <div className="intro">
      <div className="logoBox">
        <img src={Logo} width="500px" />
      </div>
      <div className="btmBox">
        <div className="inputBox">
          <div className="idBox">
            <input className="idInput" placeholder="id" onChange={onChangeId} ></input>
          </div>
          <div className="pwBox">
            <input className="pwInput" placeholder="password" onChange={onChangePw} type="password"></input>
          </div>
        </div>
        <div className="btnBox">
          <div className="loginBox">
            <button className="loginBtn" onClick={handleLogin}>로그인</button>
          </div>
          <div className="joinBox">
              <button className="joinBtn" onClick={handleJoin}>회원가입</button>
          </div>
        </div>
      </div>
    </div>
  );
}
  
  export default Intro;
  