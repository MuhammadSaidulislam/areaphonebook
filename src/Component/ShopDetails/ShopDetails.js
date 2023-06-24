import React, { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "./../Layout/Layout";
import { shopDetails } from "../../api/auth";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
          <Col md={6}>
            <div className="shopDetail">
            <h1>Shop details</h1>
              <h4>Mobile: {shopDetail.mobile}</h4>
              <h4>Shop owner: {shopDetail.shop_owner}</h4>
              <h4>Shop name: {shopDetail.shop_name}</h4>
              <h4>Category: {shopDetail.category}</h4>
              <h4>Sub-category: {shopDetail.sub_category}</h4>
              <h4>Email: {shopDetail.email}</h4>
              <h4>Ward: {shopDetail.ward}</h4>
              <h4>Address: {shopDetail.address}</h4>
              <h4>Service: {shopDetail.service}</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ShopDetails;
