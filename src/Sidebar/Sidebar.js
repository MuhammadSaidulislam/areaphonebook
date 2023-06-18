import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import main from "../jsonData/Categhory.json";
import "./Sidebar.css";
import { categoryList, subCategoryList } from "../api/auth";
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

  const toggleCollapse = (collapseId,category) => {
    subCategoryValue(category)
    setOpenCollapseId((prevCollapseId) =>
      prevCollapseId === collapseId ? null : collapseId
    );
  };
  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars" onClick={showSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars-close">
              <FontAwesomeIcon icon={faClose} />
            </Link>
          </li>
        </ul>
        <ul className="nav-menu-items">
          <div id="accordion">
            {category.map((data, i) => (
              <div className="card" key={i}>
                <div className="card-header">
                  <button
                    className="btn"
                    onClick={() => toggleCollapse(`a${i}`,data.categoryName)}
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
                  {subCategory.map((subData) =>
                    <div className="accordion-body">
                        <Link to={`/category/${subData.sub_category_name}`} className='btn'>{subData.sub_category_name}</Link>
                    </div>
                )}
                  </>
                </div>
              </div>
            ))}
          </div>

          {/*
                {category.map(data =>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <div className="accordion-header">
                                    <button onClick={()=>subCategoryValue(data.categoryName)} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${data.categoryName}`} aria-expanded="true">
                                        {data.categoryName}
                                    </button>
                                </div>
                                <div id={data.categoryName} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    {subCategory.map((subData) =>
                                        <div className="accordion-body">
                                            <button key={subData.sub_id} className='btn'>{subData.sub_category_name}</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                */}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
