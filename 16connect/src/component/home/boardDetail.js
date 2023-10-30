import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Board from './board';

const BoardDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [board, setBoard] = useState({});
    const [likeNum, setLikeNum] = useState(0);
    const [isAlreadyLike, setIsAlreadyLike] = useState(false);
    const [likeId, setLikeId] = useState('');

    const getBoard = async() => {
        axios({
          header: {'Content-Type' : 'application/json'}
          , url: '/api/v1/board/' + id
          , method: 'GET'
        })
        .then((res) => {
          if (res.status === 200) {
            setBoard(res.data);
            getLikeNum(res.data.id);
            console.log(board);
          }
        })
        .catch((err) => {
          console.log(err.res);
        });
    }

    const getLikeNum = (boardId) => {
      axios({
        header: {'Content-Type' : 'application/json'}
        , url: '/api/v1/like/' + boardId
        , method: 'GET'
      })
      .then((res) => {
        if (res.status === 200) {
          setLikeNum(res.data.length);

          for (let i=0;i<res.data.length;i++) {
            if (res.data[i].user_id == sessionStorage.getItem('userId')) {
              setIsAlreadyLike(true);
              setLikeId(res.data[i].id);
            }
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.res);
      });
    }

    useEffect(() => {
        getBoard();
    }, [])

    return (
        <div>
            {loading ? (
                <h2>loading...</h2>
            ) : (
                <Board
                id = {board.id}
                title = {board.title}
                content = {board.content}
                userId = {board.user_id}
                userMbti = {board.user_mbti}
                userBirth = {board.user_birth}
                category = {board.category}
                createdTime = {board.created_date_time}
                cmntNum = {board.cmnt_num}
                setLikeNum = {setLikeNum}
                likeNum = {likeNum}
                img = {board.img}
                isAlreadyLike = {isAlreadyLike}
                setIsAlreadyLike = {setIsAlreadyLike}
                likeId = {likeId}
                />
            )}
        </div>
    );
};

export default BoardDetail;