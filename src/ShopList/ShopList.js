import React, { useEffect } from "react";
import { subCategoryShopList } from "../api/auth";
import { useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
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
          <Col md={12}>
            <h1>ShopList</h1>
          </Col>
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
                      <a className="card-title">{value.shop_name}</a>
                      <p className="card-text">মোবাইল: {value.mobile}</p>
                      <p className="card-text">ওয়ার্ড নং: {value.ward}</p>
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
