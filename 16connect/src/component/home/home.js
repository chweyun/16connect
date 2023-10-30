import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './home.css';

import Write from "../assets/write.png";

const Home = () => {

    const [isE, setIsE] = useState('ALL');
    const [isS, setIsS] = useState('ALL');
    const [isT, setIsT] = useState('ALL');
    const [isJ, setIsJ] = useState('ALL');
    const [category, setCategory] = useState('XXXX');

    function handleE() {
      if (isE == 'ALL') {
        setIsE('E');
      } else if (isE == 'E') {
        setIsE('I');
      } else {
        setIsE('ALL');
      }
    }
    function handleS() {
      if (isS == 'ALL') {
        setIsS('S');
      } else if (isS == 'S') {
        setIsS('N');
      } else {
        setIsS('ALL');
      }
    }
    function handleT() {
      if (isT == 'ALL') {
        setIsT('T');
      } else if (isT == 'T') {
        setIsT('F');
      } else {
        setIsT('ALL');
      }
    }
    function handleJ() {
      if (isJ == 'ALL') {
        setIsJ('J');
      } else if (isJ == 'J') {
        setIsJ('P');
      } else {
        setIsJ('ALL');
      }
    }

    useEffect(() => {
      var tmp = [];
      if (isE == 'ALL') {
        tmp.push('X');
      } else if (isE == 'E') {
        tmp.push('E');
      } else {
        tmp.push('I');
      }
      if (isS == 'ALL') {
        tmp.push('X');
      } else if (isS == 'S') {
        tmp.push('S');
      } else {
        tmp.push('N');
      }
      if (isT == 'ALL') {
        tmp.push('X');
      } else if (isT == 'T') {
        tmp.push('T');
      } else {
        tmp.push('F');
      }
      if (isJ == 'ALL') {
        tmp.push('X');
      } else if (isJ == 'J') {
        tmp.push('J') 
      } else {
        tmp.push('P');
      }
      var mbti = tmp[0]+tmp[1]+tmp[2]+tmp[3];
      setCategory(mbti);
    }, [isE, isS, isT, isJ]);

    useEffect(() => {
      getBoardList();
    }, [])

    useEffect(() => {
      getBoardList();
    }, [category])

    const [boardList, setBoardList] = useState([]);

    const getBoardList = async() => {
      await axios({
        header: {'Content-Type' : 'application/json'}
        , url: '/api/v1/board/list/' + category
        , method: 'GET'
      })
      .then((res) => {
        if (res.status === 200) {
          let newArr = [...res.data];
          newArr.sort((a,b) => b.id - a.id);
          setBoardList(newArr);
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

    function resize() { // 게시글 리스트 보여지는 height 자동 조절하는 함수
        let textarea = document.getElementById("home");
        textarea.style.height = "0px";
 
        let scrollHeight = textarea.scrollHeight;
        let style = window.getComputedStyle(textarea);
        let borderTop = parseInt(style.borderTop);
        let borderBottom = parseInt(style.borderBottom);
 
        textarea.style.height = (scrollHeight + borderTop + borderBottom + 1000)+"px";
    }
    window.addEventListener("load", resize);
    window.onresize = resize;

    // TODO 상세 페이지에서 뒤로가기 시 스크롤 위치 유지

    return (
        <div className="home" id="home" style={{marginTop: "8%"}}>
            <div className="inputBox" style={{paddingLeft: "20%", marginRight: "20%", position: "fixed", left: "0", right: "0", width: "100vw", backgroundColor: "white"}}>
                <button id="e" onClick={handleE} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isE}</button>
                <button id="s" onClick={handleS} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isS}</button>
                <button id="t" onClick={handleT} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isT}</button>
                <button id="j" onClick={handleJ} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isJ}</button>
            </div>
            <div style={{paddingTop: "6%", paddingBottom: "120px"}}>
              <ul style={{listStyleType: "none"}}>
                {boardList.map((board) => (
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
            <Link to={'/write'}>
              <img src={Write} width="100px" style={{position: "fixed", top: "60%", right:"22%"}} />
            </Link>
        </div>
      );
}

export default Home;