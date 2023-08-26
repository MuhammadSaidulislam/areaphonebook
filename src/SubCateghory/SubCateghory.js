import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import Sidebar from "../Sidebar/Sidebar";
import "./SubCateghory.css";
import { categoriesPost, subCategoryList } from "../api/auth";
import { API } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Component/Loader/Loader";
export const SubCateghory = () => {
  const { category } = useParams();
  const [subCategory, setSubcategory] = useState([]);
  console.log('category', category);
  useEffect(() => {
    categoriesPost(category).then((data) => {
      console.log('suv', data);
      setSubcategory(data);
    });
  }, []);


  return (
    <div>
      <Sidebar />
      <Banner />
      <Container>
        <Row>
        {subCategory && subCategory.length > 0 ? <>
          {subCategory.length === 0 ? <><h1 className="text-center">No data</h1></> : subCategory.map((value, i) => (
            <Col md={4} key={`shop` + i}>
              <div className="newsCard">
                <div className="cardNewsImg"><img src={`${API}/${value.shop_image}`} className="" alt="..." /></div>
                <div className="cardContent">
                  <Link to={`${value.shop_id}`} className="card-title">
                    {value.title}
                  </Link>
                  <p>মোবাইল: {value.mobile}</p>
                  <p>সার্ভিস: {value.service.length > 100 ? `${value.service.slice(0, 60)}...` : value.service}</p>
                </div>
                <div className="newsSocial">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <FontAwesomeIcon icon={faPhone} />
                </div>
              </div>
            </Col>
          ))}
          </>:<><Loader/></>}
        </Row>
      </Container>
    </div>
  );
};
