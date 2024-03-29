import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Categhory } from "./Categhory/Categhory";
import Signup from "./Signup/Signup";
import { SubCateghory } from "./SubCateghory/SubCateghory";
import ShopList from "./ShopList/ShopList";
import CityCorporation from "./Component/CityCorporation/CityCorporation";
import ShopDetails from "./Component/ShopDetails/ShopDetails";
import Report from "./Component/Report/Report";
import Profile from "./Component/Profile/Profile";
import Login from './Component/Admin/Login';
import CreateCategory from "./Component/Admin/CreateCategory/CreateCategory";
import CreateSubCategory from "./Component/Admin/CreateSubCategory/CreateSubCategory";
import PendingList from "./Component/Admin/PendingList/PendingList";
import AllShop from "./Component/Admin/AllShop/AllShop";
import ReportList from "./Component/Admin/ReportList/ReportList";
import Filter from "./Component/Admin/Filter/Filter";
import NewsList from './Component/NewsFeed/NewsList';


const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CityCorporation />}></Route>
          <Route path="/narayanganj" element={<Categhory />}></Route>
          <Route path="/narayanganj/news/:category" element={<SubCateghory />}></Route>

          <Route path="/signup" element={<Signup />}></Route>
          {/* <Route path="/userDashboard" element={<Shop />}></Route>
          */} 
          <Route path="/narayanganj/:category/:sub" element={<ShopList />}></Route>
          
          <Route path="/narayanganj/:category/:sub/:id" element={<ShopDetails />}></Route>
          
          <Route path="/narayanganj/news/:category/:id" element={<ShopDetails />}></Route>

          <Route path="/report" element={<Report />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          {/* news feed */}
          <Route path="/narayanganj/newsFeed" element={<NewsList />}></Route>
          <Route path="/narayanganj/newsFeed/:id" element={<ShopDetails />}></Route>
          {/* admin */}
          <Route path="/admin" element={<Login />}></Route>
          <Route path="/categoryAdd" element={<CreateCategory />}></Route>
          <Route path="/subCategoryAdd" element={<CreateSubCategory />}></Route>
          <Route path="/pendingList" element={<PendingList />}></Route>
          <Route path="/allList" element={<AllShop />}></Route>
          <Route path="/reportList" element={<ReportList />}></Route>
          <Route path="/filter" element={<Filter />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
