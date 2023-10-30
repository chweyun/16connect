import React, { useEffect, useState } from 'react';
import axios from "axios";

import Logo from "../assets/logo_small.png";
import back from "../assets/back.png";
import likeNone from "../assets/like_none.png";
import likeFill from "../assets/like_fill.png";
import commentIcon from "../assets/comment.png";

import CorrectionModal from '../modal/correctionModal';
import DeleteCommModal from '../modal/deleteCommModal';

import './board.css'

const Board = ({ id, title, content, userId, userMbti, userBirth, category, createdTime, cmntNum, setLikeNum, likeNum, img, isAlreadyLike, setIsAlreadyLike, likeId }) => {
    
    useEffect(() => { 
        // 글 작성자만 수정, 삭제 가능
        if (userId == sessionStorage.getItem('userId')) {
            const newBtn = document.createElement('button');
            newBtn.appendChild(document.createTextNode('···'));
            document.getElementById('correctBtn').appendChild(newBtn);
            newBtn.addEventListener('click', function() {setCorrectModalOpen(true);});
        }
    }, [])

    function handleBack() {
        window.history.back();
    }

    function handleAge(date) { // date를 나이로 변환해주는 함수   
        var now = new Date();
        var tmpBirth = new Date(date);
  
        now = now.getFullYear();
        tmpBirth = tmpBirth.getFullYear();
  
        return (now - tmpBirth + 1);
    }

    function handleTime(date) {
        var result = date.substring(0,10) + "  " + date.substring(11,16);
        return result;
    }

    const [correctModalOpen, setCorrectModalOpen] = useState(false);

    const handleLike = async() => {
        if (userId == sessionStorage.getItem('userId')) {
            alert('자신의 게시글에는 좋아요를 누를 수 없습니다.');
            return;
        }

        if (isAlreadyLike) {
            handleDeleteLike();
        } else {
            await axios({
                header: {'Content-Type' : 'application/json'}
                , url: '/api/v1/like'
                , method: 'POST'
                , data: {
                    'user_id' : sessionStorage.getItem('userId'),
                    'board_id' : id
                }
                })
                .then((res) => {
                    if (res.status === 200) {
                        setLikeNum(prev => prev+1)
                    }
                })
                .catch((err) => {
                    console.log(err.res);
            });
        }
        setIsAlreadyLike(prev => !prev);
    }

    const handleDeleteLike = async() => {
        console.log(likeId);
        await axios({
            header: {'Content-Type' : 'application/json'}
            , url: '/api/v1/like/' + likeId
            , method: 'DELETE'
            })
            .then((res) => {
                if (res.status === 200) {
                    setLikeNum(prev => prev-1)
                }
            })
            .catch((err) => {
                console.log(err.res);
        });
    }

    const [commentList, setCommentList] = useState([]);

    const getCommentList = async() => {
        await axios({
            header: {'Content-Type' : 'application/json'}
            , url: '/api/v1/comment/' + id
            , method: 'GET'
        })
        .then((res) => {
            if (res.status === 200) {
              let newArr = [...res.data];
              newArr.sort((a,b) => a.group - b.group);
              setCommentList(newArr);
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
        getCommentList();
    }, []);

    const [reComm, setReComm] = useState({
        depth: 0,
        group: null
    });

    const [comment, setComment] = useState({
        parent_content: '',
        board_id: id,
        user_id: sessionStorage.getItem('userId'),
        content: ''
    })

    const onChange = (event) => {
        const { value, name } = event.target;
        setComment({
            ...comment,
            [name]: value
        });
    }

    const handleRecomm = (groupId, parContent) => {
        document.querySelector('input').value = '';
        document.getElementById("comBtn").innerHTML = "등록";

        console.log(parContent);
        setReComm({
            parent_content: parContent,
            depth: 1,
            group: groupId
        })
    }


    const handlePost = async() => {
        if (document.getElementById("comBtn").innerHTML == "수정") {
            handlePatch();
            return;
        }

        console.log(comment);

        if (comment.content == '') {
            alert('댓글 내용을 입력하세요.');
        } else {
            await axios({
                header: {'Content-Type' : 'application/json'}
                , url: '/api/v1/comment'
                , method: 'POST'
                , dataType: 'text'
                , data: {
                    'board_id' : comment.board_id,
                    'user_id' : comment.user_id,
                    'content' : comment.content,
                    'depth' : reComm.depth,
                    'group' : reComm.group
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(comment);
                    window.location.reload();
                }
            })
            .catch((err) => {
                alert('죄송합니다. 잠시후 다시 시도해주세요.');
                console.log(err.res);
            });
        }
    }

    const handlecommBox = () => {
        setReComm({
            parent_content: '',
            depth: 0,
            group: null
        })
    }

    const handleCommCorrect = async(commId, content) => {
        document.querySelector('input').value = content;
        document.getElementById("comBtn").innerHTML = "수정";
        setComment({
            id : commId
        })
        console.log(comment);
    }

    const handlePatch = async() => {
        if (comment.content == '') {
            alert('댓글 내용을 입력하세요.');
        } else {
            await axios({
                header: {'Content-Type' : 'application/json'}
                , url: '/api/v1/comment/' + comment.id
                , method: 'PATCH'
                , dataType: 'text'
                , data: {
                    'content' : comment.content
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(comment);
                    window.location.reload();
                }
            })
            .catch((err) => {
                alert('죄송합니다. 잠시후 다시 시도해주세요.');
                console.log(err.res);
            });
        }
    }

    const [deleteCommModalOpen, setDeleteCommModalOpen] = useState(false);
    const [commId, setCommId] = useState('');

    return (
        <div>
            <div className="topBar">
                <div className="back">
                    <img src={back} width="50px" onClick={() => handleBack()}/>
                </div>
                <img src={Logo} width="200px" />
            </div>

            <div className="boardDiv">
                <div className="titleDiv">{category}</div>
                <h1>{title}</h1>
                <h4>{userMbti} · {handleAge(userBirth)} </h4>
                <h5>{handleTime(createdTime)}</h5>
                <div id="correctBtn" ></div>
                <hr />
                <h3>{content}</h3>
                <br/><br/>
                <div>
                    <img src={isAlreadyLike ? likeFill : likeNone} onClick={handleLike} width="30px" style={{marginRight:"10px"}}/> {likeNum} 
                    <img src={commentIcon} width="30px" style={{marginLeft:"20px", marginRight:"10px"}}/> {cmntNum}
                </div>
            </div>
            {/* 댓글 시작 */}
            <div className='comDiv'>
                <ul className='comUl'>
                <hr style={{marginTop: "4%"}}/>
                {commentList.map((comment) => (
                    <li key={comment.id}>
                        <div>
                            {comment.depth ? <p>↳</p> : null}
                            {comment.user_id == sessionStorage.getItem('userId') ? 
                                <div className="commCorrectBtn">
                                    <button onClick={() => handleCommCorrect(comment.id,comment.content)}>수정</button>
                                    <button onClick={() => {setDeleteCommModalOpen(true); setCommId(comment.id);}}>삭제</button>
                            </div> : null}
                            {comment.user_id == userId ?  
                            <p style={{color: "#FA6262", fontWeight: "bold"}}>{comment.user_mbti} · {handleAge(comment.user_birth)} | {comment.updated_time ? handleTime(comment.updated_time) : handleTime(comment.created_time)}</p> :
                            <p>{comment.user_mbti} · {handleAge(comment.user_birth)} | {comment.updated_time ? handleTime(comment.updated_time) : handleTime(comment.created_time)}</p>}
                            
                            <p className='reComP' onClick={() => handleRecomm(comment.group, comment.content)}>답글 달기
                            </p>

                            <h3>{comment.content}</h3>
                        </div>
                        <hr />
                    </li>
                ))}
                </ul>
            </div>
            <div className='comInputDiv'>
                {reComm.depth==1 ? <div className="reCommDiv">'{reComm.parent_content}' 에 대댓글을 입력중입니다...<button className='reCommBtn' onClick={handlecommBox}>X</button></div> : null}
                <input className='comInput' name="content" onChange={onChange} placeholder='댓글을 작성해보세요.'></input>
                <button className='comBtn' id='comBtn' onClick={handlePost}>등록</button>
            </div>
            
            {correctModalOpen && <CorrectionModal setCorrectModalOpen={setCorrectModalOpen} id={id}/>}
            {deleteCommModalOpen && <DeleteCommModal setDeleteCommModalOpen={setDeleteCommModalOpen} commId={commId}/>}
        </div>
    );
};

export default Board;