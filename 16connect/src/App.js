import './App.css';
import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";

import Intro from "./component/Intro/Intro";
import Join from "./component/Intro/join";
import Main from "./component/home/main";
import Alert from "./component/home/alert";
import Profile from './component/profile/profileModify';
import BoardDetail from './component/home/boardDetail';
import Write from './component/home/write';
import BoardUpdate from './component/home/boardUpdate';
import List from './component/profile/list';

export const AppContext = createContext();

function App() {

  const whichList = 0;

  return (
    <div>
      <Routes>
        <Switch>
          <Route path="/alert">
            <Alert />
          </Route>
          <Route path="/join" >
            <Join />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/main">
            <Main />
          </Route> 
          <Route path="/board/:id">
            <BoardDetail />
          </Route>
          <Route path="/write">
            <Write />
          </Route>
          <Route path="/update/:id">
            <BoardUpdate />
          </Route>
          <Route path="/">
            <Intro />
          </Route>
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
