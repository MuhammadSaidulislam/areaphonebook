import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsLeftRightToLine,
  faBars,
  faEllipsisVertical,
  faEye,
  faLocationArrow,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { cardList, logout } from "../api/auth";
import { Container, Dropdown, Accordion, Navbar, DropdownButton } from "react-bootstrap";
import logo from "../assets/image/logo/logo.png"
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

  const [showNav, setShowNav] = useState(false);
  const navClick = () => {
    setShowNav(!showNav)
  };

  return (
    <>
      <Navbar className="navbar" sticky="top">
        <Container>
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <Link
            to="/narayanganj"
            style={{ color: "#fff", fontSize: "18px", marginRight: "10px" }}
          >
            <img src={logo} width={33} /> Area Phonebook
          </Link>


          <div className="d-flex justify-content-end align-items-center logo-div">
            <div className="nav-item dropdown">
              <a onClick={navClick} href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </a>
              <div className={showNav ? `dropdown-menu show navPosition` : `navDrop`} aria-labelledby="navbarDropdownMenuLink" x-placement="bottom-start">


                <Link className="dropdown-item" to="/report"><FontAwesomeIcon icon={faEye} /> Report</Link>
                <Link className="dropdown-item" to="/"><FontAwesomeIcon icon={faLocationArrow} /> Change city</Link>
                {userProfile ? (
                  <>
                    <button className="dropdown-item" onClick={logoutBtn}><FontAwesomeIcon icon={faArrowRightToBracket} /> Logout</button>
                  </>
                ) : (
                  <>
                    <Link className="dropdown-item" to="/signup"><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</Link>
                  </>
                )}
              </div>
            </div>
          </div>

        </Container>
      </Navbar>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <div id="accordion">
            <Accordion>
              {categories.map((category, i) =>
                <Accordion.Item eventKey={i} key={`category` + i}>
                  <Accordion.Header>{category.category_name}</Accordion.Header>
                  <Accordion.Body>
                    <div className="subCategorySidebar">
                      {category.subCategory && category.subCategory.map((subCategory, j) =>
                        <Link key={`subcategory` + j} to={`/narayanganj/${category.category_name}/${subCategory.sub_category_name}`}>{subCategory.sub_category_name}</Link>
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
