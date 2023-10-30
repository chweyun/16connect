import React from 'react';
import { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from '../../App.js';

import Logo from "../assets/logo_small.png";
import Bell from "../assets/bell.png";
import Reload from "../assets/reload.png";

const Alert = () => {

    function handleBack() {
        window.history.back();
    }

    return (
        <div className="alert">
            <div>
                <button style={{float: "left", width: "6%"}} onClick={() => handleBack()}>뒤로가기</button>
            </div>
        </div>
      );
}

export default Alert;