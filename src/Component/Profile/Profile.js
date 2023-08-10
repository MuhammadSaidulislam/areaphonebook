import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Banner from "../../Banner/Banner";
import "./Profile.css";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  categoryList,
  filterList,
  pendingShopList,
  shopUpdate,
  subCategoryList,
  userInfo,
  userPost,
} from "../../api/auth";
import { v4 as uuidv4 } from "uuid";
import { API } from "../../config";
import CreateProfile from "./CreateProfile";
import CreatePost from "./CreatePost";
const Profile = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [userShop, setUserShop] = useState();
  const [createProfile, setCreateProfile] = useState(false);
  const [postBox, setPostBox] = useState(false);
  const [postList, setPostList] = useState([]);
  const [profileShow, setProfileShow] = useState(true);
  const [editShow, setEditShow] = useState(false);
  const [dayTime, setDayTime] = useState([]);
  const [shopServiceList, setShopServiceList] = useState([]);
  // edit profile
  const [shopEmail, setShopEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopCategory, setShopCategory] = useState("");
  const [shopSubCategory, setShopSubCategory] = useState("");

  const [shopOwner, setShopOwner] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopService, setShopService] = useState("");
  const [shopId, setShopId] = useState("");
  // post modal
  const [postShow, setPostShow] = useState(false);
  const handleClose = () => setPostShow(false);
  const handleShow = () => setPostShow(true);
  // create profile modal
  const [profileModal, setProfileModal] = useState(false);

  const savedUserProfile = localStorage.getItem("areaphonebook");
  const userProfile = JSON.parse(savedUserProfile);
  const form = useRef(null);
  const {
    handleSubmit,
  } = useForm();
  const selectCat = (category) => {
    setShopCategory(category);
    subCategoryList(category).then((data) => {
      setSubCategory(data);
    });
  };



  useEffect(() => {
    // category wise sub-category
    categoryList().then((data) => {
      setCategory(data.data);
    });
    // user profile
    userInfo(userProfile.mobile).then((data) => {
      console.log('shop', data);
      if (data.message) {
        setCreateProfile(true);
      } else {
        // setProfileModal(false);
        setShopServiceList(data);


        setCreateProfile(false);
        setUserShop(data[0]);

        setShopId(data[0].shop_id);
        setShopCategory(data[0].category);
        setShopSubCategory(data[0].sub_category);
        setShopName(data[0].shop_name);
        setShopOwner(data[0].shop_owner);
        setShopAddress(data[0].address);
        setShopService(data[0].service);
        setShopEmail(data[0].email);
        console.log('data[0].shop_time', data.shop_time);
        setDayTime(data[0].shop_time);

        //  setPostBox(true);
        setProfileShow(true);

      }
    });
    // post list

    userPost(userProfile.mobile).then((data) => {
      console.log("post", data);
      if (data.length === 0) {
        console.log("no post");
      } else {
        setPostList(data);
      }
    });
  }, []);

  const handleShowModal = () => {
    setProfileModal(true);
  };
  // profile function
  const profileFunction = () => {
    setPostBox(false);
    setProfileShow(true);
    //  setDisplayProfile(true);
  };
  // post function
  const postFunction = () => {
    setCreateProfile(false);
    setPostBox(true);
    setProfileShow(false);

  };
  // edit profile
  const editProfile = () => {
    setProfileShow(false);
  };


  const updateShop = () => {
    const shop = {
      shop_owner: shopOwner,
      shop_name: shopName,
      category: shopCategory,
      sub_category: shopSubCategory,
      email: shopEmail,
      address: shopAddress,
      service: shopService,
    };
    shopUpdate(shop, shopId).then((data) => {
      setProfileShow(true);
    });
  };

  return (
    <>
      <Sidebar />
      <Banner profileFunction={profileFunction} postFunction={postFunction} />
      <section className="profile">
        {/* create profile add */}
        <CreateProfile profileModal={profileModal} setProfileModal={setProfileModal} />

        {/* post list */}
        {postBox ? (
          <>
            <Container>
              <Row className="d-flex justify-content-center">
                <Col md={6} className="text-center mb-4">
                  <button className="btn btn-info" onClick={handleShow}>
                    আপনার পোস্ট যুক্ত করুন
                  </button>
                </Col>
              </Row>
              <Row>
                {postList &&
                  postList.map((data) => (
                    <Col md={6}>
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
                  ))}
              </Row>
            </Container>
          </>
        ) : (
          <></>
        )}
        {/* profile show */}

        {profileShow ? (
          <>
            <Container>
              <Row className="d-flex justify-content-center">
                <Col md={6} className="text-center mb-4">
                  <button className="btn btn-info" onClick={handleShowModal}>
                    আপনার সার্ভিস যুক্ত করুন
                  </button>
                </Col>
              </Row>
              <Row className="">
                {shopServiceList && shopServiceList.map((data) => <Col md={6}>
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
                    {data.shop_time && data.shop_time.length ? <><div className="row g-0">
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>Start time</th>
                          <th>End time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.shop_time && data.shop_time.map((data) => <>
                          <tr>
                            <td>{data.day}</td>
                            <td>{data.start_time}</td>
                            <td>{data.end_time}</td>
                          </tr>
                        </>)}
                      </tbody>
                    </Table>
                  </div></>:<></>}
                    
                  </div>
                </Col>)}
              </Row>
            </Container>
          </>
        ) : (
          <></>
        )}

      </section>

      {/* create post */}
      <CreatePost postShow={postShow} setPostShow={setPostShow} />

    </>
  );
};

export default Profile;
