import { React, useState, useEffect } from "react";
import axios from "axios";

import ModifyModal from "../modal/modifyModal";

const ProfileBirth = () => {

    const [modifyBirth, setModifyBirth] = useState('');
    const [modModalOpen, setModModalOpen] = useState(false);

    function onChangeBirth(e) {
      setModifyBirth(e.target.value);
    }

    function handleBirth() {
      var now_utc = Date.now() // 지금 날짜를 밀리초로
      var timeOff = new Date().getTimezoneOffset()*60000; // 분단위를 밀리초로 변환
      var today = new Date(now_utc-timeOff);
      var tmpBirth = new Date(`${modifyBirth}`);

      // birth 과거인지 검사
      if (tmpBirth >= today) {
          document.getElementById("alertBox").innerText = "생년월일은 과거만 선택 가능합니다.";
          return false;
      } else if (modifyBirth == "") {
          document.getElementById("alertBox").innerText = "생년월일을 선택하세요.";
          return false;
      } else {
          document.getElementById("alertBox").innerText = "";

          axios({
              header: {'Content-Type' : 'application/json'}
              , url: '/api/v1/auth/' + sessionStorage.getItem('userId')
              , method: 'PATCH'
              , data: {
                'pw' : sessionStorage.getItem('userPw'),
                'birth' : modifyBirth,
                'mbti' : sessionStorage.getItem('userMbti'),
                'prefer_mbti' : sessionStorage.getItem('userPreferMbti')
              }
            })
          .then((res) => {
              console.log("200", res.data);
              if (res.status === 200) {
                  console.log("success");
                  sessionStorage.setItem('userBirth', modifyBirth);
                  setModModalOpen(true);
              }
          })
          .catch((err) => {
              console.log(err.res);
          });
      }
    }
    
    return (
      <div className="profileBirth">
          <div className='firstBox'>
              <div className="titleBox">생일</div>


              <div className="inputBox">
                <input className="idInput" type="date" onChange={onChangeBirth}></input>
            </div>
          </div>
          <div id="alertBox" style={{color: "red"}}/>

          <div className="btnBox">
          <button onClick={handleBirth}>변경 완료</button>
            {modModalOpen && <ModifyModal setModModalOpen={setModModalOpen} />}
        </div>
      </div>
    );
}
  
export default ProfileBirth;
  