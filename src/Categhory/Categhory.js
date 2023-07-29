import React, { useEffect, useState } from "react";
import "./Categhory.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { cardList } from "../api/auth";
import { API } from "../config";
import Loader from "../Component/Loader/Loader";

export const Categhory = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    cardList().then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <>
      <SideBar />
      <Container>
        <Row>
          <Banner />
          {categories && categories.length > 0 ? <>
            {categories && categories.map((category, i) => (
              <Col md={6} lg={4} key={`category` + i}>
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
                                src={`${API}/${category.categoryImage}`}
                                alt={category.categoryImage}
                              />
                            </div>
                            <div className="media-body">
                              <h3 className="manu-item">
                                <Link
                                  to={`/narayanganj/news/${category.category_name}`}
                                >
                                  {category.category_name}
                                </Link>
                              </h3>
                              <Row>
                                {category.subCategory &&
                                  category.subCategory
                                    .slice(0, 3)
                                    .map((subCategory, j) => (
                                      <>
                                        <span
                                          key={`subCategory` + j}
                                          className="col-6 topic tp1"
                                        >
                                          {subCategory.sub_category_name}
                                        </span>
                                      </>
                                    ))}
  
                                <span
                                  className="col-6 topic tp4"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#${category.category_name}`}
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
                  <div id={category.category_name} className="collapse">
                    <Container>
                      <Row>
                        {category.subCategory &&
                          category.subCategory.map((subData, k) => (
                            <>
                              <Col xs={6} key={`subValue` + k}>
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
            </>:<><Loader/></>}
          
        </Row>
      </Container>
    </>
  );
};
