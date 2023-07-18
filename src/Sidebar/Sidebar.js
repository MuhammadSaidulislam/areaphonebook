import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { cardList, logout } from "../api/auth";
import { Container, Dropdown, Accordion } from "react-bootstrap";
const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const savedUserProfile = localStorage.getItem("areaphonebook");
  const userProfile = JSON.parse(savedUserProfile);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // card list
    cardList().then((data) => {
      setCategories(data);
    });
  }, []);


  const logoutBtn = () => {
    logout();
    return navigate(`/narayanganj`);
  };

  

  return (
    <>
      <div className="navbar">
        <Container>
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <Link
            to="/narayanganj"
            style={{ color: "#fff", fontSize: "18px", marginRight: "10px" }}
          >
            Area Phonebook
          </Link>
          <Dropdown className="navDropdown">
            <Dropdown.Toggle id="dropdown-basic">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </Dropdown.Toggle>

            <Dropdown.Menu className="navbarDropdown">
              {/*
             <Dropdown href="#/action-2">Search</Dropdown>
              <Dropdown href="#/action-3">Language</Dropdown>
              <Dropdown href="#/action-1">Dark/Light</Dropdown>
            */}
              <Dropdown>
                <Link to="/report">Report</Link>
              </Dropdown>
              <Dropdown>
                <Link to="/">Change city</Link>
              </Dropdown>
              {userProfile ? (
                <>
                  <Dropdown>
                    <button onClick={logoutBtn}>Logout</button>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Dropdown>
                    <Link to="/signup">Login</Link>
                  </Dropdown>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
        <div id="accordion"> 
          <Accordion>
          {categories.map((category,i) =>
            <Accordion.Item eventKey={i} key={`category`+i}>
              <Accordion.Header>{category.category_name}</Accordion.Header>
              <Accordion.Body>
             <div className="subCategorySidebar">
             {category.subCategory && category.subCategory.map((subCategory,j) => 
              <Link key={`subcategory`+j} to={`/narayanganj/${category.category_name}/${subCategory.sub_category_name}`}>{subCategory.sub_category_name}</Link>
              )}
             </div>
              
            
              </Accordion.Body>
            </Accordion.Item>
            )}
          </Accordion>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
