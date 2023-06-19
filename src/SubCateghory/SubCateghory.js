import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import userdata from "../jsonData/SubCateghory.json";
import Sidebar from "../Sidebar/Sidebar";
import "./SubCateghory.css";
import { subCategoryList } from "../api/auth";

export const SubCateghory = () => {
  const { id } = useParams();
  console.log(id);
  const [subCategory, setSubcategory] = useState([]);
  useEffect(() => {
    subCategoryList(id).then((data) => {
      console.log(data);
      setSubcategory(data);
    });
  }, []);

  return (
    <div>
      <Sidebar />
      <Banner />
      <Container>
        <Row>
          {subCategory.map((value) => (
            <Col md={4} key={value.id}>
              <div className="card mb-3 subcategoryBox">
                <Link to={`/category/${value.sub_category_name}`}>
                  {value.sub_category_name}
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
