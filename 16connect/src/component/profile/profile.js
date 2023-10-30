import React from 'react';
import { useState, useEffect } from "react";

import DropOutModal from '../modal/dropOutModal';
import LogOutModal from '../modal/logOutModal';

const Profile = () => {
    sessionStorage.setItem('backFrom', 'profile');

    const userId = sessionStorage.getItem('userId');
    const userPw = sessionStorage.getItem('userPw');
    const userBirth = sessionStorage.getItem('userBirth').substring(0,10);
    const userMbti = sessionStorage.getItem('userMbti');
    const userPreferMbti = sessionStorage.getItem('userPreferMbti');

    function handleModify(whichBtn) {
      sessionStorage.setItem('backFrom', 'profile');
      sessionStorage.setItem('which_modify_btn', whichBtn);
      window.location.href = "/profile";
    }

    const [dropModalOpen, setDropModalOpen] = useState(false);
    const [logModalOpen, setLogModalOpen] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
      if (isFinished) {
        sessionStorage.clear();
        window.location.href = "/";
      }
    }, [isFinished])

    return (
        <div className="profile">
          <div>
            <h3>프로필</h3>

            <div style={{marginTop:"100px", display:"inline-block", width: "100%"}}>
              <div style={{float: "left", marginRight:"100px"}}>아이디</div>
              <div style={{float: "left"}}>{userId}</div>
            </div>

            <div style={{display:"inline-block", width: "100%"}}>
              <div style={{float: "left", marginRight:"100px"}}>비밀번호</div>
              <div style={{float: "left", marginRight:"100px"}}>**********</div>
              <div onClick={()=> handleModify("비밀번호")}>수정</div>
            </div>

            <div style={{display:"inline-block", width: "100%"}}>
              <div style={{float: "left", marginRight:"100px"}}>생일</div>
              <div style={{float: "left", marginRight:"100px"}}>{userBirth}</div>
              <div onClick={()=> handleModify("생일")}>수정</div>
            </div>

            <div style={{display:"inline-block", width: "100%"}}>
              <div style={{float: "left", marginRight:"100px"}}>MBTI</div>
              <div style={{float: "left", marginRight:"100px"}}>{userMbti}</div>
              <div onClick={()=> handleModify("MBTI")}>수정</div>
            </div>
          </div>

          <div>
            <h3 style={{marginTop:"50px"}}>커뮤니티</h3>

            <div style={{marginTop:"10px", display:"inline-block", width: "100%"}}>
              <div onClick={()=> {window.location.href = "/list"; sessionStorage.setItem('whichList', '내가 작성한 글')}} style={{float: "left", marginRight:"100px"}}>내가 작성한 글</div>
            </div>

            <div style={{display:"inline-block", width: "100%"}}>
              <div onClick={()=> {window.location.href = "/list"; sessionStorage.setItem('whichList', '내가 작성한 댓글')}} style={{float: "left", marginRight:"100px"}}>내가 작성한 댓글</div>
            </div>

            <div style={{display:"inline-block", width: "100%"}}>
              <div onClick={()=> {window.location.href = "/list"; sessionStorage.setItem('whichList', '좋아요한 글')}} style={{float: "left", marginRight:"100px"}}>좋아요한 글</div>
            </div>
          </div>

          <div>
            <button onClick={() => setLogModalOpen(true)}>로그아웃</button>
            {logModalOpen && <LogOutModal setLogModalOpen={setLogModalOpen} setIsFinished={setIsFinished} />}
          </div>

          <div>
            <button onClick={() => {setDropModalOpen(true)}}>회원탈퇴</button>
            {dropModalOpen && <DropOutModal setDropModalOpen={setDropModalOpen} setIsFinished={setIsFinished} />}
          </div>
        </div>
      );
}

export default Profile;