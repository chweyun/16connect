import { React, useState, useEffect } from "react";
import axios from "axios";

import ProfilePw from './profilePw';
import ProfileBirth from './profileBirth';
import ProfileMbti from './profileMbti';

const ProfileModify = () => {

    function handleBack() {
        sessionStorage.removeItem('which_modify_btn');
        window.history.back();
    }
    
    return (
      <div className="profileModify">
        <div>
            <button style={{float: "left", width: "6%"}} onClick={() => handleBack()}>뒤로가기</button>
            <div style={{width: "90%", textAlign:"center"}}>
                {sessionStorage.getItem('which_modify_btn')} 변경</div>
        </div>

        {sessionStorage.getItem('which_modify_btn') == '비밀번호' ? <ProfilePw /> : null}
        {sessionStorage.getItem('which_modify_btn') == '생일' ? <ProfileBirth /> : null}
        {sessionStorage.getItem('which_modify_btn') == 'MBTI' ? <ProfileMbti /> : null}
      </div>
    );
}
  
export default ProfileModify;
  