import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faDotCircle, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import main from "../jsonData/Categhory.json";
import "./Sidebar.css";
import { categoryList, subCategoryList } from "../api/auth";
import { Container, Dropdown } from "react-bootstrap";
const Sidebar = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const categhory = main.categhory;
  const subCateghorySearch = (subCateghoryName, sub_id) => {
    return navigate(`/${subCateghoryName}`);
  };

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    categoryList().then((data) => {
      setCategory(data.data);
    });
  }, []);
  const subCategoryValue = (category) => {
    subCategoryList(category).then((data) => {
      setSubCategory(data);
    });
  };

  const [openCollapseId, setOpenCollapseId] = useState(null);

  const toggleCollapse = (collapseId, category) => {
    subCategoryValue(category);
    setOpenCollapseId((prevCollapseId) =>
      prevCollapseId === collapseId ? null : collapseId
    );
  };

  const subCategoryLink = (subCategory) => {
    setSidebar(false);
    return navigate(`/category/${subCategory}`);
  };

  return (
    <>
      <div className="navbar">
        <Container>
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </Link>
          <Link
            to="/"
            style={{ color: "#fff", fontSize: "18px", marginRight: "10px" }}
          >
            Area Phonebook
          </Link>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FontAwesomeIcon icon={faEllipsisVertical} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Signup</Dropdown.Item>
              <Dropdown.Item href="#/action-1">Login</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Search</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Language</Dropdown.Item>
              <Dropdown.Item href="#/action-1">Dark/Light</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Report</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Change city</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        {/*
       <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars-close">
              <FontAwesomeIcon icon={faClose} />
            </Link>
          </li>
        </ul>
      */}
        <ul className="nav-menu-items">
          <div id="accordion">
            {category.map((data, i) => (
              <div className="" key={`sidebar` + i}>
                <div className="categorySidebar">
                  <button
                    className=""
                    onClick={() => toggleCollapse(`a${i}`, data.categoryName)}
                    aria-expanded={openCollapseId === `a${i}`}
                    aria-controls={`a${i}`}
                  >
                    {data.categoryName}
                  </button>
                </div>
                <div
                  id={`a${i}`}
                  className={`collapse ${
                    openCollapseId === `a${i}` ? "show" : ""
                  }`}
                  data-bs-parent="#accordion"
                >
                  <>
                    {subCategory.map((subData, i) => (
                      <div
                        className="subCategorySidebar"
                        key={`subcategory` + i}
                        onClick={() =>
                          subCategoryLink(subData.sub_category_name)
                        }
                      >
                        <button>{subData.sub_category_name}</button>
                      </div>
                    ))}
                  </>
                </div>
              </div>
            ))}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
