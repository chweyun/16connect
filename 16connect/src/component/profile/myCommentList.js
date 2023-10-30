import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyCommentList = () => {

    const [myCommentList, setMyCommentList] = useState([]);
    const userId = sessionStorage.getItem('userId');

    const getMyCommentList = async() => {
      await axios({
        header: {'Content-Type' : 'application/json'}
        , url: '/api/v1/myPage/comment/' + userId
        , method: 'GET'
      })
      .then((res) => {
        if (res.status === 200) {
          let newArr = [...res.data];
          console.log(newArr);
          newArr.sort((a,b) => b.id - a.id);
          setMyCommentList(newArr);
        }
      })
      .catch((err) => {
        console.log(err.res);
      });
    } 

    function handleTime(date) {
        var result = date.substring(0,10) + "  " + date.substring(11,16);
        return result;
    }

    useEffect(() => {
        getMyCommentList();
      }, [])

    return (
      <div className="myCommentlist" style={{marginTop:"12%"}}>
        <div style={{paddingTop: "6%"}}>
            <ul style={{listStyleType: "none"}}>
            {myCommentList.map((comment) => (
                <li key={comment.id}>
                    <Link to={`/board/${comment.board_id}`} className="a">
                        <div style={{fontSize: "26px", fontWeight: "bold"}}>{comment.content}</div>
                        <div>
                            <p>{comment.title}</p>
                            <p>{comment.updated_time ? handleTime(comment.updated_time) : handleTime(comment.created_time)}</p>
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
  
export default MyCommentList;
  