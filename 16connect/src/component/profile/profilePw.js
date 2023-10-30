import { React, useState, useEffect } from "react";
import axios from "axios";

import ModifyModal from "../modal/modifyModal";

const ProfilePw = ( {userPw} ) => {

    const [modifyPw, setModifyPw] = useState("");
    const [modifyPwCheck, setModifyPwCheck] = useState("");

    const [modModalOpen, setModModalOpen] = useState(false);

    function onChangePw(e) {
      setModifyPw(e.target.value);
    }
    function onChangePwCheck(e) {
      setModifyPwCheck(e.target.value);
    }

    function handlePw(e) {
      // password 유효성 검사
      if(modifyPw.length < 10 || modifyPw > 18) {
        document.getElementById("alertBox").innerText = "비밀번호는 10-18자 이내로 입력하세요.";
        return false;
      } else if (modifyPw == userPw) {
        document.getElementById("alertBox").innerText = "이전 비밀번호와 다른 비밀번호를 입력하세요.";
        return false;
      } else {
          document.getElementById("alertBox").innerText = "";
          // password 일치 여부
          if (modifyPw != modifyPwCheck) {
              document.getElementById("alertBox").innerText = "비밀번호가 일치하지 않습니다.";
              return false;
          } else {
              document.getElementById("alertBox").innerText = "";

              axios({
                  header: {'Content-Type' : 'application/json'}
                  , url: '/api/v1/auth/' + sessionStorage.getItem('userId')
                  , method: 'PATCH'
                  , data: {
                    'pw' : modifyPw,
                    'birth' : sessionStorage.getItem('userBirth'),
                    'mbti' : sessionStorage.getItem('userMbti'),
                    'prefer_mbti' : sessionStorage.getItem('userPreferMbti')
                  }
                })
              .then((res) => {
                  console.log("200", res.data);
                  if (res.status === 200) {
                      console.log("success");
                      setModModalOpen(true);
                  }
              })
              .catch((err) => {
                  console.log(err.res);
              });
          }
      }
    }
    
    return (
      <div className="profilePw">

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
            <div id="alertBox" style={{color: "red"}}/>
        </div>

        <div className="btnBox">
          <button onClick={handlePw}>변경 완료</button>
          {modModalOpen && <ModifyModal setModModalOpen={setModModalOpen} />}
        </div>

      </div>
    );
}
  
export default ProfilePw;
  