import React from "react";
import Layout from "./../Layout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import "./CityCorporation.css";
import { Link } from "react-router-dom";

const CityCorporation = () => {
  return (
    <Layout>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={8}>
          <Row>
          <Col md={12}>
            <div className="cityCorporationHeading">
              <h1>City Corporation</h1>
            </div>
          </Col>
          <Col md={6}>
            <div className="corporationCard">
            <Link to="/narayanganj">
            <img src="https://upload.wikimedia.org/wikipedia/bn/thumb/f/fe/%E0%A6%A8%E0%A6%BE%E0%A6%B0%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A6%A3%E0%A6%97%E0%A6%9E%E0%A7%8D%E0%A6%9C_%E0%A6%B8%E0%A6%BF%E0%A6%9F%E0%A6%BF_%E0%A6%95%E0%A6%B0%E0%A7%8D%E0%A6%AA%E0%A7%8B%E0%A6%B0%E0%A7%87%E0%A6%B6%E0%A6%A8_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg/1200px-%E0%A6%A8%E0%A6%BE%E0%A6%B0%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A6%A3%E0%A6%97%E0%A6%9E%E0%A7%8D%E0%A6%9C_%E0%A6%B8%E0%A6%BF%E0%A6%9F%E0%A6%BF_%E0%A6%95%E0%A6%B0%E0%A7%8D%E0%A6%AA%E0%A7%8B%E0%A6%B0%E0%A7%87%E0%A6%B6%E0%A6%A8_%E0%A6%B2%E0%A7%8B%E0%A6%97%E0%A7%8B.svg.png" />
            <p>Narayanganj</p>
            </Link>
            </div>
          </Col>
          <Col md={6}>
            <div className="corporationCard">
              <img src="https://dscc.portal.gov.bd/sites/default/files/files/dscc.portal.gov.bd/npfblock//2021-06-15-14-37-eebab09afbfc0343f0b7b448740d1931.png" />
              <p>Coming soon...</p>
            </div>
          </Col>
          </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default CityCorporation;
