import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = (props) => {

  return (
    <>
      <div className={`sidebar ${props.isCollapsed ? "" : "collapsed"}`}>
        <aside className="sidebar-content" id="sidebar-wrapper">
          <div className="sidebar-brand text-center">
           <p>Areaphonebook</p>
          </div>

          <ul className="sidebar-menu">
            <li className="dropdown">
            <Link to="/categoryAdd">Category</Link>
            </li>
            <li className="dropdown">
            <Link to="/subCategoryAdd">Sub-category</Link>
            </li>
            <li className="dropdown">
            <Link to="/filter">Filter</Link>
            </li>
            <li className="dropdown">
            <Link to="/pendingList">Pending list</Link>
            </li>
            <li className="dropdown">
            <Link to="/allList">All list</Link>
            </li>
            <li className="dropdown">
            <Link to="/reportList">Report list</Link>
            </li>
            
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
