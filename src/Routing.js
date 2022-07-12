import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Login from './Admin/Login';
import { Categhory } from './Categhory/Categhory';
import { SubCateghory } from './SubCateghory/SubCateghory';

const Routing = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Categhory />}></Route>
          <Route path="/:id" exact element={<SubCateghory />}></Route>
          <Route path="/login" exact element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing