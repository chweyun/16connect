import { React, useState, useEffect } from "react";
import axios from "axios";
import "./modal.css";

const DropOutModal = ( {setDropModalOpen, setIsFinished} ) => {

    const userId = sessionStorage.getItem('userId');
    const userPw = sessionStorage.getItem('userPw');

    const [isDropout, setIsDropout] = useState(false);

    function handleDropout() {
      setIsDropout(true);

      axios({
        header: {'Content-Type' : 'application/json'}
        , url: '/api/v1/auth'
        , method: 'DELETE'
        , data: {
          id : userId,
          pw : userPw
        }
      })
      .then((res) => {
          console.log(res.data);
      })
      .catch((err) => {
          console.log(err);
      });
    }

    return (
      <div className="dropOutModal">
        {isDropout ? <h2>또 봐요, 안녕!</h2> : <h2>정말로 탈퇴하시겠습니까?</h2>}
        
        <div>
            {isDropout ? null : <button onClick={() => {handleDropout()}}>확인</button>}
            {isDropout ? <button onClick={() => {setDropModalOpen(false); setIsFinished(true);}}>닫기</button> : 
            <button onClick={() => {setDropModalOpen(false)}}>취소</button> }
        </div>
      </div>
    );
}
  
export default DropOutModal;
  