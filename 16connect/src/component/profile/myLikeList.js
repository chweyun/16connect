import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyLikeList = () => {

    const [myLikeList, setMyLikeList] = useState([]);
    const userId = sessionStorage.getItem('userId');

    const getMyLikeList = async() => {
        await axios({
          header: {'Content-Type' : 'application/json'}
          , url: '/api/v1/myPage/like/' + userId
          , method: 'GET'
        })
        .then((res) => {
          if (res.status === 200) {
            let newArr = [...res.data];
            console.log(newArr);
            newArr.sort((a,b) => b.id - a.id);
            setMyLikeList(newArr);
          }
        })
        .catch((err) => {
          console.log(err.res);
        });
      } 
  
      function handleAge(date) { // date를 나이로 변환해주는 함수   
          var now = new Date();
          var tmpBirth = new Date(date);
    
          now = now.getFullYear();
          tmpBirth = tmpBirth.getFullYear();
    
          return (now - tmpBirth + 1);
      }
  
      useEffect(() => {
          getMyLikeList();
        }, [])

    return (
      <div className="myLikeList" style={{marginTop:"12%"}}>
        <div style={{paddingTop: "6%"}}>
            <ul style={{listStyleType: "none"}}>
            {myLikeList.map((board) => (
                <li key={board.id}>
                    <Link to={`/board/${board.id}`} className="a">
                        <div style={{backgroundColor: "gray", fontSize: "20px", color: "white", width: "80px", textAlign: "center", borderRadius: "10px", marginBottom: "12px"}}>{board.category}</div>
                        <div style={{fontSize: "26px", fontWeight: "bold"}}>{board.title}</div>
                        <div>
                        <p>{board.user_mbti} · {handleAge(board.user_birth)} · 좋아요 {board.like_num} · 댓글 {board.cmnt_num}</p>
                        <hr style={{width: "90%", align: "left", marginLeft: "0%", color: "gray", border: "0.5"}}/>
                        </div>
                    </Link>
                </li>
            ))}
            </ul>
        </div>
      </div>
    );
}
  
export default MyLikeList;
  