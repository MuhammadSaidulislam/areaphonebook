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
    subCategoryList(id).then((data)=>{
        console.log(data);
        setSubcategory(data)
    })
  }, []);

  return (
    <div>
      <Sidebar />
      <Banner />
      <Container>
        <Row>
          <h1>Sub category</h1>
              {subCategory.map((value) => (
                <Col md={4} key={value.id}>
                  <div className="card mb-3">
                  <Link to={`/category/${value.sub_category_name}`}>{value.sub_category_name}</Link>
                    {/*
                
                <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={value.photo}
                          className="img-fluid rounded-start"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body subcategory">
                          <a className="card-title">{value.name}</a>
                          <p className="card-text">মোবাইল: {value.number}</p>
                          <p className="card-text">ওয়ার্ড নং: {value.wordNo}</p>
                          <p className="card-text">স্থান: {value.location}</p>
                          <p className="card-text">বিস্তারিত: {value.detail}</p>
                        </div>
                      </div>
                    </div>
                */}
                  </div>
                </Col>
              ))}
        </Row>
      </Container>
    </div>
  );
};
