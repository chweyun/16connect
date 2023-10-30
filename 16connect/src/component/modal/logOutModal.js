import { React, useState, useEffect } from "react";
import axios from "axios";
import "./modal.css";

const LogOutModal = ( {setLogModalOpen, setIsFinished} ) => {

    const [isLogout, setIsLogout] = useState(false);

    function handleLogout() {
      setIsLogout(true);
    }

    return (
      <div className="logOutModal">
        {isLogout ? <h2>로그아웃 되었습니다.</h2> : <h2>로그아웃 하시겠습니까?</h2> }
    
        <div>
            {isLogout ? null : <button onClick={() => handleLogout()}>확인</button>}
            {isLogout ? <button onClick={() => {setLogModalOpen(false); setIsFinished(true);}}>닫기</button> :
            <button onClick={() => {setLogModalOpen(false)}}>취소</button> }
        </div>
      </div>
    );
}
  
export default LogOutModal;
  