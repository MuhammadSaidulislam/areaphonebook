import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Login from './Admin/Login';
import { Categhory } from './Categhory/Categhory';
import Signup from './Signup/Signup';
import { SubCateghory } from './SubCateghory/SubCateghory';

const Routing = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Categhory />}></Route>
          <Route path="/:id" exact element={<SubCateghory />}></Route>
          <Route path="/admin" exact element={<Login/>}></Route>
          <Route path="/signup" exact element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing