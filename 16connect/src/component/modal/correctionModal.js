import { React, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './modal.css';

const CorrectionModal = ( {setCorrectModalOpen, id} ) => {

    function handleBack() {
        window.history.back();
    }

    const [isDelete, setIsDelete] = useState(false);

    const handleDelete = async() => {
        console.log(id);
        await axios({
            header: {'Content-Type' : 'application/json'}
            , url: '/api/v1/board/' + id
            , method: 'DELETE'
        })
        .then((res) => {
            if (res.status === 200) {
                setIsDelete(true);
            }
        })
        .catch((err) => {
            console.log(err.res);
        });
    }

    return (
      <div className="writeModal">
        {isDelete ? <h2>게시글이 성공적으로 삭제되었습니다.</h2> : null}
        {isDelete ? <button onClick={() => {setCorrectModalOpen(false);  handleBack();}}>닫기</button> : null}

        {isDelete ? null : <Link to={`/update/${id}`}><button>수정하기</button></Link>} 
        {isDelete ? null : <button onClick={() => handleDelete()}>삭제하기</button>}    
        {isDelete ? null : <button onClick={() => {setCorrectModalOpen(false)}}>닫기</button>}
      </div>
    );
}

export default CorrectionModal;