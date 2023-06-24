import React from 'react';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Login from './Admin/Login';
import { Categhory } from './Categhory/Categhory';
import Signup from './Signup/Signup';
import { SubCateghory } from './SubCateghory/SubCateghory';
import Shop from './Shop/Shop';
import ShopList from './ShopList/ShopList';
import AddService from './Admin/AddService';
import CityCorporation from './Component/CityCorporation/CityCorporation';
import ShopDetails from './Component/ShopDetails/ShopDetails';

const Routing = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<CityCorporation />}></Route>
          <Route path="/narayanganj" element={<Categhory />}></Route>
          <Route path="/narayanganj/:id" element={<SubCateghory />}></Route>
          <Route path="/admin" element={<Login/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/narayanganj/:sub/:id" element={<ShopList/>}></Route>
         <Route path="/narayanganj/:category/:sub/:id" element={<ShopDetails/>}></Route>
          <Route path="/dashboard" element={<AddService/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing