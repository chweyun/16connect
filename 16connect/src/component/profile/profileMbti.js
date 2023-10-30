import { React, useState, useEffect } from "react";
import axios from "axios";

import ModifyModal from "../modal/modifyModal";

const ProfileMbti = () => {

    const [modModalOpen, setModModalOpen] = useState(false);

    const [isE, setIsE] = useState(true);
    const [isS, setIsS] = useState(true);
    const [isT, setIsT] = useState(true);
    const [isJ, setIsJ] = useState(true);
    const [modifyMbti, setModifyMbti] = useState([]);

    useEffect(() => {
        if (isE) {
            document.getElementById("e").style.backgroundColor = "red";
            document.getElementById("i").style.backgroundColor = "white";
        } else {
            document.getElementById("i").style.backgroundColor = "red";
            document.getElementById("e").style.backgroundColor = "white";
        }
        setModifyMbti([isE, isS, isT, isJ]);
    }, [isE])

    useEffect(() => {
        if(isS) {
            document.getElementById("s").style.backgroundColor = "red";
            document.getElementById("n").style.backgroundColor = "white";
        } else {
            document.getElementById("n").style.backgroundColor = "red";
            document.getElementById("s").style.backgroundColor = "white";
        }
        setModifyMbti([isE, isS, isT, isJ]);
    }, [isS])

    useEffect(() => {
        if(isT) {
            document.getElementById("t").style.backgroundColor = "red";
            document.getElementById("f").style.backgroundColor = "white";
        } else {
            document.getElementById("f").style.backgroundColor = "red";
            document.getElementById("t").style.backgroundColor = "white";
        }
        setModifyMbti([isE, isS, isT, isJ]);
    }, [isT])

    useEffect(() => {
        if(isJ) {
            document.getElementById("j").style.backgroundColor = "red";
            document.getElementById("p").style.backgroundColor = "white";
        } else {
            document.getElementById("p").style.backgroundColor = "red";
            document.getElementById("j").style.backgroundColor = "white";
        }
        setModifyMbti([isE, isS, isT, isJ]);
    }, [isJ])

    function handleMbti() {
        var tmp = []
        if (modifyMbti[0] == true) {
            tmp.push("E")
        } else {
            tmp.push("I")
        }
        if (modifyMbti[1] == true) {
            tmp.push("S")
        } else {
            tmp.push("N")
        }
        if (modifyMbti[2] == true) {
            tmp.push("T")
        } else {
            tmp.push("F")
        }
        if (modifyMbti[3] == true) {
            tmp.push("J")
        } else {
            tmp.push("P")
        }
        var mbti = tmp[0]+tmp[1]+tmp[2]+tmp[3];

        axios({
            header: {'Content-Type' : 'application/json'}
            , url: '/api/v1/auth/' + sessionStorage.getItem('userId')
            , method: 'PATCH'
            , data: {
              'pw' : sessionStorage.getItem('userPw'),
              'birth' : sessionStorage.getItem('userBirth'),
              'mbti' : mbti,
              'prefer_mbti' : sessionStorage.getItem('userPreferMbti')
            }
          })
        .then((res) => {
            console.log("200", res.data);
            if (res.status === 200) {
                console.log("success");
                sessionStorage.setItem('userMbti', mbti);
                setModModalOpen(true);
            }
        })
        .catch((err) => {
            console.log(err.res);
        });
    }
    
    return (
      <div className="profileMbti">
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
          <div id="alertBox" style={{color: "red"}}/>

          <div className="btnBox">
              <button onClick={handleMbti}>변경 완료</button>
                {modModalOpen && <ModifyModal setModModalOpen={setModModalOpen} />}
          </div>
      </div>
    );
}
  
export default ProfileMbti;
  