import { React, useState } from "react";
import axios from "axios";
import './modal.css';

const WriteModal = ( {setWriteModalOpen, board} ) => {

    const [isPost, setIsPost] = useState(false);

    const handlePost = async() => {
        console.log(board);
        if (board.title == '') {
            alert('제목을 입력하세요.');
            setWriteModalOpen(false);
        } else if (board.content == '') {
            alert('내용을 입력하세요.');
            setWriteModalOpen(false);
        } else {
            await axios({
                header: {'Content-Type' : 'application/json'}
                , url: '/api/v1/board'
                , method: 'POST'
                , dataType: 'text'
                , params: {
                    'user_id' : board.user_id,
                    'title' : board.title, 
                    'content' : board.content,
                    'category' : board.category 
                }
            })
            .then((res) => {
                if (res.status === 200) {
                console.log(board);
                setIsPost(true);
                }
            })
            .catch((err) => {
                alert('죄송합니다. 잠시후 다시 시도해주세요.');
                setWriteModalOpen(false);
                console.log(err.res);
            });
        }
    }

    function handleBack() {
        window.history.back();
    }

    return (
      <div className="writeModal">
        {isPost ? <h2>게시글이 성공적으로 등록되었습니다.</h2> : <h2>게시글을 등록하시겠습니까?</h2> }
    
        <div>
            {isPost ? null : <button onClick={() => handlePost()}>등록</button>}
            {isPost ? <button onClick={() => {setWriteModalOpen(false); handleBack();}}>닫기</button> :
            <button onClick={() => {setWriteModalOpen(false)}}>취소</button> }
        </div>
      </div>
    );
}
  
export default WriteModal;
  