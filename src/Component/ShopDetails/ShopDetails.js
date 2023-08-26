import React, { useEffect } from "react";
import { useParams } from "react-router";
import Layout from "./../Layout/Layout";
import { shopDetails, relatedShop, getReview } from "../../api/auth";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./ShopDetails.css";
import { API } from "../../config";
import Review from "../Review/Review";
import { Rating } from 'react-simple-star-rating';
import userIcon from "../../assets/image/other/user.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faStar, faCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
const ShopDetails = () => {
  const { id } = useParams();
  const [shopDetail, setShopDetail] = useState({});
  const [relatedShopList, setRelatedShopList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    shopDetails(id).then((data) => {
      setShopDetail(data);
    });
    relatedShop(id).then((data) => {
      setRelatedShopList(data)
    });
    getReview(id).then((data) => {
      setReviewList(data);
    });
  }, []);
  return (
    <Layout>
      <Container>
      {shopDetail && shopDetail.shop_id ? <>
        <Row className="d-flex justify-content-center">
          <Col md={8}>
            <div className="shopDetail">
              <h1>Shop details</h1>
              <div className="shopImage">
                <img src={`${API}/${shopDetail.shop_image}`} alt="shop" width="100%" />
              </div>
              <div className="shopDetails">
                <div className="shopName">
                  <div className="shopTitle">{shopDetail.title}</div>
                  {shopDetail && shopDetail.post_id ? <></> : <>
                    <div className="shopDes">
                      <p>{shopDetail.mobile}</p><p style={{ margin: '0px 4px', fontSize: '8px' }}><FontAwesomeIcon icon={faCircle} /></p>
                      <p>{shopDetail.address}</p>
                    </div>
                  </>}
                </div>
                {shopDetail && shopDetail.post_id ? <></>: <>
                  <div className="shopDetailsSocial">
                    <div className="rating">
                      <FontAwesomeIcon icon={faStar} />
                      <span>2</span>
                    </div>
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                </> }
              </div>
              <div className="shopService">
                <h2><b>সার্ভিসঃ </b>{shopDetail.service}</h2>
              </div>

              {/* related shop */}
              <Row>
                {relatedShopList && relatedShopList.length > 0 ?
                  <Col md={12} className="mt-2">
                    <h1>Shop related post</h1>
                  </Col> : <></>
                }
                {relatedShopList && relatedShopList.map((data, i) => <>
                  <Col md={6} key={`relatedShop` + i}>
                    <div className="shopCard mb-3">
                      <div className="shopCardImg">
                        <img src={`${API}/${data.shop_image}`} className="img-fluid rounded-start" alt="..." />
                      </div>
                      <div className="shopCardContent">
                        <Link to={`${data.shop_id}`} className="card-title">
                          {data.title}
                        </Link>
                        <div className="">
                          <p className="card-text">{data.number}</p>
                          <p className="card-text">{data.address}</p>
                        </div>
                      </div>
                      <div className="shopCardSocial">
                        <div className="rating">
                          <FontAwesomeIcon icon={faStar} />
                          <span>2</span>
                        </div>
                        <FontAwesomeIcon icon={faPhone} />
                      </div>
                    </div>
                  </Col>
                </>)}
              </Row>
              {/* rating */}
              {shopDetail && shopDetail.post_id ? <></> : <><Review id={id} /></>}
            </div>
          </Col>
          {shopDetail && shopDetail.post_id ? <></> : <>
          <Col md={4}>
          {reviewList && reviewList.length ? <><h1 className="reviewHeading">Review</h1></>:
          <><h1 className="reviewHeading">No review</h1></>}
           
          {reviewList && reviewList.map((data, i) => <>
            <div className="reviewBox">
              <div className="reviewImg"><img src={userIcon} alt="" /></div>
              <div className="reviewContent">
                <h1>{data.user_name}</h1>
                <Rating readonly size={20} initialValue={data.rating} />
                <p>{data.review}</p>
              </div>
            </div>
          </>)}
        </Col>
          </>}
         
        </Row>
        </>:<><Loader/></>}
        

        {/* modal */}
      </Container>
    </Layout>
  );
};

export default ShopDetails;
