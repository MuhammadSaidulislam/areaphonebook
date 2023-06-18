import React, { useEffect, useState } from "react";
import "./Categhory.css";
import { Card, Col, Container, Row, Button, Collapse } from "react-bootstrap";
import data from "../jsonData/Categhory.json";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { allSubCategoryList, categoryList, subCategoryList } from "../api/auth";
import Footer from "../Footer/Footer";

export const Categhory = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const navigate = useNavigate();
console.log('category',category);
  useEffect(() => {
    categoryList().then((data) => {
      setCategory(data.data);
      // for (let i = 0; i < data.data.length; i++) {
      //   subCategoryList(data.data[i].categoryName).then((data) => {
      //     console.log("subcategoryone", data);
      //     setSubCategory(data);
      //   });
      // }
    });
  }, []);
  const subCategoryValue = (category) => {
    subCategoryList(category).then((data) => {
      setSubCategory(data);
    });
  };

  // collapse
  const [openCollapseId, setOpenCollapseId] = useState(null);

  const toggleCollapse = (collapseId, category) => {
    subCategoryValue(category);
    setOpenCollapseId((prevCollapseId) =>
      prevCollapseId === collapseId ? null : collapseId
    );
  };
  const [subCategoryItem, setSubCategoryItem] = useState([]);
  const subcategoryShow = (category) => {
    return (
      <>
        {subCategoryItem.map((item) => (
          <span className="col-6 topic tp1" key={item.id}>
            {item.sub_category_name}
          </span>
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await subcategoryShow(category);
      setSubCategoryItem(data);
    };
  }, []);

  return (
    <>
      <SideBar />
      <Banner />
      <Container>
        <Row>
          {category.map((data, id) => (
            <Col md={6} lg={4} key={`homeCategory` + data.id}>
              <div className="card">
                <div
                  className="card-header"
                  data-toggle="collapse"
                  data-target="#1"
                >
                  <div className="overflow-hidden">
                    <div className="card-content">
                      <div className="cleartfix">
                        <div className="media align-items-stretch d-flex">
                          <div className="align-self-center">
                            <img
                              className="manu-img"
                              //   src={data.categoryName}
                              //   alt={data.categoryName}
                              src="image"
                              alt="image"
                            />
                          </div>
                          <div className="media-body">
                            <h3 className="manu-item">
                              <Link to={`/${data.categoryName}`}>
                                {data.categoryName}
                              </Link>
                            </h3>

                            <Row>
                             {subcategoryShow(data.categoryName)} 
                              {/*
                             {subCategory.slice(0, 3).map((nameList, i) => (
                                <>
                                  <span
                                    key={nameList.id}
                                    className="col-6 topic tp1"
                                  >
                                    {nameList.sub_category_name}
                                  </span>
                                </>
                              ))}
                            */}

                              <span
                                className="col-6 topic tp4"
                                onClick={() =>
                                  toggleCollapse(
                                    `a${data.categoryName}`,
                                    data.categoryName
                                  )
                                }
                                aria-expanded={
                                  openCollapseId === `a${data.categoryName}`
                                }
                                aria-controls={`a${data.categoryName}`}
                              >
                                {" "}
                                <a data-toggle="collapse">
                                  আরো দেখুন{" "}
                                  <i className="fa fa-chevron-down"></i>
                                </a>{" "}
                              </span>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="a${data.categoryName}"
                  className={`collapse ${
                    openCollapseId === `a${data.categoryName}` ? "show" : ""
                  }`}
                >
                  <Container>
                    <Row>
                      {subCategory.map((subData) => (
                        <>
                          <Col xs={6}>
                            <span className="topic">
                              {" "}
                              <button key={subData.sub_id} className="lol">
                                {subData.sub_category_name}
                              </button>
                            </span>
                          </Col>
                        </>
                      ))}
                    </Row>
                  </Container>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
