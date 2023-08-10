import React, { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "./../Layout/Layout";
import { shopDetails,relatedShop } from "../../api/auth";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ShopDetails.css";
import { API } from "../../config";


const ShopDetails = () => {
  const { id } = useParams();
  const [shopDetail, setShopDetail] = useState({});
  const [relatedShopList,setRelatedShopList]=useState([]);
  useEffect(() => {
    shopDetails(id).then((data) => {
      setShopDetail(data);
    });

    relatedShop(id).then((data) => {
     console.log('related',data);
     setRelatedShopList(data)
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
                <span>Title: </span> {shopDetail.title}
              </h4>
              <h4>
                <span>Category: </span> {shopDetail.category}
              </h4>
              <h4>
                <span>Sub-category: </span> {shopDetail.sub_category}
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
        <Row>
        {relatedShopList && relatedShopList.length > 0 ?
          <Col md={12} className="mt-2">
        <h1>Shop related post</h1>
        </Col>: <></>
        }
        
        {relatedShopList && relatedShopList.map((data)=><>
          <Col md={4}>
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4 d-flex">
                <img
                  src={`${API}/${data.shop_image}`}
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body subcategory">
                  <p className="card-title">{data.title}</p>
                  <p className="card-text">মোবাইল: {data.mobile}</p>
                  <p className="card-text">
                    মালিক: {data.shop_owner}
                  </p>
                  <p className="card-text">স্থান: {data.address}</p>
                  <p className="card-text">
                    বিস্তারিত: {data.service}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>
          </>)}
        </Row>
      </Container>
    </Layout>
  );
};

export default ShopDetails;
