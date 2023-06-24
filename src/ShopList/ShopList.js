import React, { useEffect } from "react";
import { subCategoryShopList } from "../api/auth";
import { useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { Link } from 'react-router-dom';
const ShopList = () => {
  const { id } = useParams();
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    subCategoryShopList(id).then((data) => {
      setShopList(data);
    });
  }, [shopList]);
  return (
    <>
      <Sidebar />
      <Banner />
      <Container>
        <Row>
          {shopList.map((value) => (
            <Col md={4} key={value.id}>
              <div className="card mb-3">
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
                      <Link to={`${value.shop_id}`} className="card-title">{value.shop_name}</Link>
                      <p className="card-text">মোবাইল: {value.ward}</p>
                      <p className="card-text">মালিক: {value.shop_owner}</p>
                      <p className="card-text">স্থান: {value.address}</p>
                      <p className="card-text">বিস্তারিত: {value.service}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ShopList;
