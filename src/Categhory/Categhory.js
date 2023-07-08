import React, { useEffect, useState } from "react";
import "./Categhory.css";
import { Card, Col, Container, Row, Button, Collapse } from "react-bootstrap";
import data from "../jsonData/Categhory.json";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import {
  allSubCategoryList,
  cardList,
  categoryList,
  subCategoryList,
} from "../api/auth";
import Footer from "../Footer/Footer";
import Loader from "../Component/Loader/Loader";

export const Categhory = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const navigate = useNavigate();

  // const [categories, setCategories] = useState({
  //   categhory: []
  // });

  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  console.log("cardArray", categories);
  useEffect(() => {
    setIsLoading(true);

    cardList().then((data) => {
      //  / console.log('card',data);
      setCategories(data);
    });
  }, []);

  return (
    <>
      <SideBar />
      <Container>
        <Row>
          <Banner />
          {categories.map((category) => (
            <Col md={6} lg={4} key={data.id}>
              <div className="card categorySubcategory">
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
                              src={data.categoryImage}
                              alt="image"
                            />
                          </div>
                          <div className="media-body">
                            <h3 className="manu-item">
                              <Link
                                to={`/narayanganj/${category.categoryName}`}
                              >
                                {category.categoryName}
                              </Link>
                            </h3>
                            <Row>
                              {category.subCategory &&
                                category.subCategory
                                  .slice(0, 3)
                                  .map((subCategory) => (
                                    <>
                                      <span
                                        key={subCategory.id}
                                        className="col-6 topic tp1"
                                      >
                                        {subCategory.sub_category_name}
                                      </span>
                                    </>
                                  ))}

                              <span
                                className="col-6 topic tp4"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${category.categoryName}`}
                              >
                                <a className="extra">
                                  আরো দেখুন{" "}
                                  <i className="fa fa-chevron-down"></i>
                                </a>
                              </span>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id={category.categoryName} className="collapse">
                  <Container>
                    <Row>
                      {category.subCategory &&
                        category.subCategory.map((subData) => (
                          <>
                            <Col xs={6}>
                              <span className="topic">
                                {" "}
                                <Link
                                  to={`/narayanganj/${subData.category_name}/${subData.sub_category_name}`}
                                  key={subData.sub_id}
                                  className="lol"
                                >
                                  {subData.sub_category_name}
                                </Link>
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

          {categories.categhory &&
            categories.categhory.map((data) => (
              <Col md={6} lg={4} key={data.id}>
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
                                src={data.categoryImage}
                                alt="image"
                              />
                            </div>
                            <div className="media-body">
                              <h3 className="manu-item">
                                <Link to={`/narayanganj/${data.categoryName}`}>
                                  {data.categoryName}
                                </Link>
                              </h3>
                              <Row>
                                {data.subCategory &&
                                  data.subCategory
                                    .slice(0, 3)
                                    .map((nameList) => (
                                      <>
                                        <span
                                          key={nameList.id}
                                          className="col-6 topic tp1"
                                        >
                                          {nameList.sub_category_name}
                                        </span>
                                      </>
                                    ))}

                                <span
                                  className="col-6 topic tp4"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#${data.categoryName}`}
                                >
                                  {" "}
                                  <a
                                    href="#1"
                                    data-toggle="collapse"
                                    className="extra"
                                  >
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

                  <div id={data.categoryName} className="collapse">
                    <Container>
                      <Row>
                        {data.subCategory &&
                          data.subCategory.map((subData) => (
                            <>
                              <Col xs={6}>
                                <span className="topic">
                                  {" "}
                                  <Link
                                    to={`/narayanganj/${subData.category_name}/${subData.sub_category_name}`}
                                    key={subData.sub_id}
                                    className="lol"
                                  >
                                    {subData.sub_category_name}
                                  </Link>
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

          {/*
      
      {isLoading ? <><Loader/></>:<>
        
          </>}
      */}
        </Row>
      </Container>
    </>
  );
};
