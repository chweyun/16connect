import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './modal.css';

const UpdateModal = ( {setUpdateModalOpen, board} ) => {

    const [isUpdate, setIsUpdate] = useState(false);

    function handleBack() {
        window.history.back();
    }

    const handlePatch = async() => {
        if (board.title == '') {
            alert('제목을 입력하세요.');
            setUpdateModalOpen(false);
        } else if (board.content == '') {
            alert('내용을 입력하세요.');
            setUpdateModalOpen(false);
        } else {
            await axios({
                header: {'Content-Type' : 'application/json'}
                , url: '/api/v1/board/' + board.id
                , method: 'PATCH'
                , dataType: 'text'
                , data: {
                    'user_id' : board.user_id,
                    'title' : board.title, 
                    'content' : board.content,
                    'category' : board.category 
                }
            })
            .then((res) => {
                if (res.status === 200) {
                console.log(board);
                setIsUpdate(true);
                }
            })
            .catch((err) => {
                console.log(err.res);
            });
        }
    }

    return (
      <div className="updateModal">
            {isUpdate ? <h2>게시글이 성공적으로 수정되었습니다.</h2> : <h2>게시글을 수정하시겠습니까?</h2> }
            
            <div>
                {isUpdate ? null : <button onClick={() => handlePatch()}>수정</button>}
                {isUpdate ? <button onClick={() => {setUpdateModalOpen(false); handleBack();}}>닫기</button> :
                <button onClick={() => {setUpdateModalOpen(false)}}>취소</button> }
            </div>
      </div>
    );
}

export default UpdateModal;