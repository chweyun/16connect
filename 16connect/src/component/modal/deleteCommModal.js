import { React, useState } from "react";
import axios from "axios";
import './modal.css';

const DeleteCommModal = ( {setDeleteCommModalOpen, commId} ) => {

    const handleCommDelete = async() => {
        await axios({
            header: {'Content-Type' : 'application/json'}
            , url: '/api/v1/comment/' + commId
            , method: 'DELETE'
        })
        .then((res) => {
            if (res.status === 200) {
                setDeleteCommModalOpen(false);
                window.location.reload();
            }
        })
        .catch((err) => {
            alert('죄송합니다. 잠시후 다시 시도해주세요.');
            console.log(err.res);
        });
    }

    return (
      <div className="writeModal">
        <h2>댓글을 삭제하시겠습니까?</h2>
        <div>
            <button onClick={() => handleCommDelete()}>삭제</button>
            <button onClick={() => {setDeleteCommModalOpen(false)}}>취소</button>
        </div>
      </div>
    );
}
  
export default DeleteCommModal;
  