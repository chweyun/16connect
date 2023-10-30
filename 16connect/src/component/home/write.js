import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import WriteModal from '../modal/writeModal'; 

import back from "../assets/back.png";
import Logo from "../assets/logo_small.png";
import Pen from "../assets/pen.png"

const Write = () => {

    const [isE, setIsE] = useState('ALL');
    const [isS, setIsS] = useState('ALL');
    const [isT, setIsT] = useState('ALL');
    const [isJ, setIsJ] = useState('ALL');
    const [category, setCategory] = useState('XXXX');

    const [writeModalOpen, setWriteModalOpen] = useState(false);

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

    function handleBack() {
        window.history.back();
    }

    const [board, setBoard] = useState({
        user_id: sessionStorage.getItem('userId'),
        title: '',
        content: '',
        category: category
    })

    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard({
            ...board,
            [name]: value,
            category: category,
        });
    };
    
    return (
        <div>
            <div className="topBar">
                <div className="back">
                    <img src={back} width="50px" onClick={() => handleBack()}/>
                </div>
                <img src={Logo} width="200px" />
                <div className="reLoad" style={{float: "right", width: "30%"}}>
                    <img src={Pen} onClick={()=>{setWriteModalOpen(true)}} width="90px" />
                </div> 
            </div>

            <div className="inputBox" style={{paddingLeft: "20%", marginRight: "20%", width: "100vw", marginTop: "140px", backgroundColor: "white"}}>
                <button id="e" onClick={handleE} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isE}</button>
                <button id="s" onClick={handleS} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isS}</button>
                <button id="t" onClick={handleT} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isT}</button>
                <button id="j" onClick={handleJ} style={{height: "50px", width: "50px", marginRight: "50px", fontSize: "20px"}}>{isJ}</button>
            </div>
            <div style={{marginTop: "30px"}}>
                <input type="text" name="title" onChange={onChange} placeholder='제목을 입력해주세요' style={{width: "90vw", height: "40px"}}/>
            </div>
            <br />
            <div>
                <textarea
                name="content"
                onChange={onChange}
                cols="30"
                rows="10"
                placeholder='내용을 입력해주세요'
                style={{width: "90vw", height: "400px"}}
                ></textarea>
            </div>
            {writeModalOpen && <WriteModal setWriteModalOpen={setWriteModalOpen} board={board} />}
        </div>
    );
};

export default Write;