import React, { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "./../Layout/Layout";
import { shopDetails } from "../../api/auth";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ShopDetails.css";
import { API } from "../../config";

const ShopDetails = () => {
  const { id } = useParams();
  const [shopDetail, setShopDetail] = useState({});
  useEffect(() => {
    shopDetails(id).then((data) => {
      setShopDetail(data);
    });
  }, []);
  return (
    <Layout>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={8}>
            <div className="shopDetail">
            <h1>Shop details</h1>
              <div className="shopImage">
                <img src={`${API}/${shopDetail.shop_image}`} alt="shop" />
              </div>
              <h4>
                <span>Mobile: </span> {shopDetail.mobile}
              </h4>
              <h4>
                <span>Shop owner: </span> {shopDetail.shop_owner}
              </h4>
              <h4>
                <span>Shop name:</span> {shopDetail.shop_name}
              </h4>
              <h4>
                <span>Category: </span> {shopDetail.category}
              </h4>
              <h4>
                <span>Sub-category: </span> {shopDetail.sub_category}
              </h4>
              <h4>
                <span>Email: </span> {shopDetail.email}
              </h4>
              <h4>
                <span>Ward: </span> {shopDetail.ward}
              </h4>
              <h4>
                <span>Address: </span> {shopDetail.address}
              </h4>
              <h4>
                <span>Service: </span> {shopDetail.service}
              </h4>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ShopDetails;
