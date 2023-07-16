import React, { useEffect, useState } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import Sidebar from "../Sidebar/Sidebar";
import "./SubCateghory.css";
import { subCategoryList } from "../api/auth";
import { API } from "../config";

export const SubCateghory = () => {
  const { category } = useParams();
  const [subCategory, setSubcategory] = useState([]);
  useEffect(() => {
    subCategoryList(category).then((data) => {
      setSubcategory(data);
    });
  }, []);


  return (
    <div>
      <Sidebar />
      <Banner />
      <Container>
        <Row>
          {subCategory.length === 0 ? <><h1 className="text-center">No data</h1></> : subCategory.map((value,i) => (
            <Col md={4} key={`sub`+i}>
              <div className="card mb-3 subcategoryBox">
                <Link to={`/narayanganj/${value.category_name}/${value.sub_category_name}`}>
                <img src={`${API}/${value.sub_category_image}`} /> {value.sub_category_name}
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
