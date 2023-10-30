import { React, useState, useEffect } from "react";
import axios from "axios";

// import "./join.css";
import BackIcon from "../assets/back.png";
import NextBtn from "../assets/nextbtn.png";
import EndBtn from "../assets/endBtn.png";

import JoinId from "./joinId";
import JoinPw from "./joinPw";
import JoinBirth from "./joinBirth";
import JoinMbti from "./joinMbti";

const Join = () => {

    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userBirth, setUserBirth] = useState('');
    const [userMbti, setUserMbti] = useState([]);


    function handleBack(e) {
        if (stepCount <= 0) {
            window.location.href = "/";
        }
        else {
            setStepCount(stepCount-1)
        }
    }

    function duplicatedCheck() {
        axios({
            url: '/api/v1/auth/signup/exists/' + userId
            , method: 'GET'
            , dataType: 'json'
        })
        .then((res) => {
            console.log(res);
            if(res.data === true) {
                // 중복하는 아이디가 이미 존재하는 경우
                document.getElementById("alertBox").innerText = "이미 존재하는 아이디입니다.";
                return false;
            } else {
                document.getElementById("alertBox").innerText = "";
                setStepCount(stepCount+1);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function handlePost() {
        console.log(userMbti);
        axios({
            header: {'Content-Type' : 'application/json'}
            , url: '/api/v1/auth/signup'
            , method: 'POST'
            , dataType: 'text'
            , data: {
              'id' : userId,
              'pw' : userPw,
              'birth' : userBirth,
              'mbti' : userMbti
            }
          })
        .then((res) => {
            console.log("200", res.data);
            if (res.status === 200) {
                console.log("success");
                alert("회원가입이 완료되었습니다.");
                window.location.href = "/";
            }
        })
        .catch((err) => {
            console.log(err.res);
        });
    }

    function handleNext(e) {
        console.log(userId, userPw, userBirth, userMbti);
        if(stepCount == 0) {
            // id 유효성 검사
            if (userId.length < 6 || userId.length > 12) {
                document.getElementById("alertBox").innerText = "아이디는 6-12자 이내로 입력하세요.";
                return false;
            } else {
                // id 중복확인
                duplicatedCheck();
            }
        }
        else if (stepCount == 1) {
            // password 유효성 검사
            if(userPw.length < 10 || userPw > 18) {
                document.getElementById("alertBox").innerText = "비밀번호는 10-18자 이내로 입력하세요.";
                return false;
            } else {
                document.getElementById("alertBox").innerText = "";
                // password 일치 여부
                if (userPw != userPwCheck) {
                    document.getElementById("alertBox").innerText = "비밀번호가 일치하지 않습니다.";
                    return false;
                } else {
                    document.getElementById("alertBox").innerText = "";
                    setStepCount(stepCount+1);
                }
            }
        }
        else if (stepCount == 2) {
            var now_utc = Date.now() // 지금 날짜를 밀리초로
            var timeOff = new Date().getTimezoneOffset()*60000; // 분단위를 밀리초로 변환
            var today = new Date(now_utc-timeOff);
            var tmpBirth = new Date(`${userBirth}`);

            // birth 과거인지 검사
            if (tmpBirth >= today) {
                document.getElementById("alertBox").innerText = "생년월일은 과거만 선택 가능합니다.";
                return false;
            } else if (userBirth == "") {
                document.getElementById("alertBox").innerText = "생년월일을 선택하세요.";
                return false;
            } else {
                document.getElementById("alertBox").innerText = "";
                setStepCount(stepCount+1);
                setIsEnd(true);
            }
        }
        else if (stepCount == 3) {
            var tmp = []
            if (userMbti[0] == true) {
                tmp.push("E")
            } else {
                tmp.push("I")
            }
            if (userMbti[1] == true) {
                tmp.push("S")
            } else {
                tmp.push("N")
            }
            if (userMbti[2] == true) {
                tmp.push("T")
            } else {
                tmp.push("F")
            }
            if (userMbti[3] == true) {
                tmp.push("J")
            } else {
                tmp.push("P")
            }
            var mbti = tmp[0]+tmp[1]+tmp[2]+tmp[3];
            setUserMbti(mbti);
            handlePost();
        }
    }

    const [stepCount, setStepCount] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [userPwCheck, setUserPwCheck] = useState("");

    useEffect(() => {
        console.log(stepCount);
    }, [stepCount])

    function getUserId(userId) {
        setUserId(userId);
    }
    function getUserPw(userPw) {
        setUserPw(userPw);
    }
    function getUserPwCheck(userPwCheck) {
        setUserPwCheck(userPwCheck);
    }
    function getUserBirth(userBirth) {
        setUserBirth(userBirth);
    }
    function getUserMbti(userMbti) {
        setUserMbti(userMbti);
    }

    return (
      <div className="join">
        <div className="topBar">
            <div className="backBtn" onClick={handleBack}>
                    <img className="backIcon" src={BackIcon} width="18px" />
            </div>
            <div className="title">회원가입</div>
        </div>
        <div className="middleBox">
            {stepCount == 0 ? <JoinId getUserId={getUserId} /> : null}
            {stepCount == 1 ? <JoinPw getUserPw={getUserPw} getUserPwCheck={getUserPwCheck}/> : null}
            {stepCount == 2 ? <JoinBirth getUserBirth={getUserBirth} /> : null}
            {stepCount == 3 ? <JoinMbti getUserMbti={getUserMbti} /> : null}

            <div id="alertBox" style={{color: "red"}}/>
        </div>

        <div className="btnBox">
            <div className="nextBox" onClick={handleNext}>
                <img className="nextBtn" src=
                {isEnd ? EndBtn : NextBtn}
                 width="400px" />
            </div>
        </div>
      </div>
    );
}
  
export default Join;
  