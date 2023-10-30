import { React } from "react";
import "./modal.css";

const ModifyModal = ( {setModModalOpen} ) => {

    return (
      <div className="modifyModal">
        <h2>변경이 완료되었습니다.</h2>
    
        <div>
            <button onClick={() => {setModModalOpen(false); window.history.back();}}>닫기</button>
        </div>
      </div>
    );
}
  
export default ModifyModal;
  