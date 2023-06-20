import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Login from './Admin/Login';
import { Categhory } from './Categhory/Categhory';
import Signup from './Signup/Signup';
import { SubCateghory } from './SubCateghory/SubCateghory';
import Shop from './Shop/Shop';
import ShopList from './ShopList/ShopList';
import AddService from './Admin/AddService';

const Routing = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Categhory />}></Route>
          <Route path="/:id" element={<SubCateghory />}></Route>
          <Route path="/admin" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/category/:id" element={<ShopList/>}></Route>
          <Route path="/dashboard" element={<AddService/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing