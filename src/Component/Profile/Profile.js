import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Banner from "../../Banner/Banner";
import "./Profile.css";
import { Container, Row, Col, Modal } from "react-bootstrap";
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
const Profile = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userShop, setUserShop] = useState();
  const [createProfile, setCreateProfile] = useState(false);
  const [postBox, setPostBox] = useState(false);
  const [postList, setPostList] = useState([]);
  const [profileShow, setProfileShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  // edit profile
  const [shopEmail, setShopEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopCategory, setShopCategory] = useState("");
  const [shopSubCategory, setShopSubCategory] = useState("");
  const [shopTagsCategory, setShopTagsCategory] = useState([]);
  const [shopOwner, setShopOwner] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopService, setShopService] = useState("");
  const [shopId, setShopId] = useState("");
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  // filter tags
  const setShopTagCategory = (subCategory) => {
    filterList(shopCategory,subCategory).then((data) => {
      setShopTagsCategory(data.tags)
    });
  };

  useEffect(() => {
    // category wise sub-category
    categoryList().then((data) => {
      setCategory(data.data);
    });
    // user profile
    userInfo(userProfile.mobile).then((data) => {
      if (data.message) {
        console.log("no shop");
        setCreateProfile(true);
      } else {
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

  const handleFileDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
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
    setEditShow(false);
  };
  // edit profile
  const editProfile = () => {
    setEditShow(true);
    setProfileShow(false);
  };
  // form data
  let onSubmit = () => {
    const uuid = uuidv4();
    const shopData = new FormData(form.current);
    shopData.append("shop_image", selectedFile);
    shopData.append("shop_id", uuid);
    shopData.append("post_id", "");
    shopData.append("mobile", userProfile.mobile);
    const jsonObject = {};
    for (const [key, value] of shopData.entries()) {
      jsonObject[key] = value;
    }

    console.log('create',shopData);


    pendingShopList(shopData).then((data) => {
      console.log("shop", data);
      if (data.message) {
        return navigate("/narayanganj");
      }
    });
  };

  // post add
  let onSubmitPost = () => {
    const uuid = uuidv4();
    const postData = new FormData(form.current);
    postData.append("shop_image", selectedFile);
    postData.append("shop_id", uuid);
    postData.append("post_id", uuid);
    postData.append("mobile", userProfile.mobile);
    // const jsonObject = {};
    // for (const [key, value] of postData.entries()) {
    //   jsonObject[key] = value;
    // }
    console.log('postData',postData);
    pendingShopList(postData).then((data) => {
      console.log("post", data);
      setShow(false);
      // if (data.message) {
      //   return navigate("/narayanganj");
      // }
    });
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
      console.log("update", data);
      setEditShow(false);
      setProfileShow(true);
    });
  };

  return (
    <>
      <Sidebar />
      <Banner profileFunction={profileFunction} postFunction={postFunction} />
      <section className="profile">
        {/* create profile add */}
        {createProfile ? (
          <>
            <Container>
              <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                <Row className="d-flex justify-content-center">
                  <Col md={6}>
                    <label>Shop image</label> <br />
                    <input
                      type="file"
                      name="shop_image"
                      placeholder="Enter your image"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <label>Category select</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="category"
                      onChange={(event) => selectCat(event.target.value)}
                    >
                      <option defaultValue>Open this select menu</option>
                      {category.map((item, i) => (
                        <option
                          key={`category_name` + i}
                          value={item.category_name}
                        >
                          {item.category_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col md={6}>
                    <label>Sub-category select</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="sub_category"
                      onChange={(e)=>setShopTagCategory(e.target.value)}
                    >
                      <option defaultValue>Open this select menu</option>
                      {subCategory &&
                        subCategory.map((item, i) => (
                          <option
                            key={`subcategory` + i}
                            value={item.sub_category_name}
                          >
                            {item.sub_category_name}
                          </option>
                        ))}
                    </select>
                  </Col>
                  <Col md={6}>
                    <label>Filter tags</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="tags"
                    >
                      <option defaultValue>Open this select menu</option>
                    
                    {shopTagsCategory &&
                        shopTagsCategory.map((item, i) => 
                          <option
                            key={`shopTagsCategory` + i}
                            value={item}
                          >
                            {item}
                          </option>
                        )}
                    
                    </select>
                  </Col>
                  <Col md={6}>
                    <label>Shop owner</label>
                    <input
                      type="text"
                      name="shop_owner"
                      className="form-control"
                      placeholder="Shop owner"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <label>Shop name</label>
                    <input
                      type="text"
                      name="shop_name"
                      className="form-control"
                      placeholder="Shop name"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <label>E-mail address</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="E-mail"
                      required
                    />
                  </Col>
                  
                  <Col md={6}>
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Address"
                      required
                    />
                  </Col>
                  <Col md={6}>
                    <label>Service</label>
                    <input
                      type="text"
                      name="service"
                      className="form-control"
                      placeholder="Service"
                      required
                    />
                  </Col>
                  <Col md={12} className="text-center mt-3">
                    <button type="submit" className="btn btn-info">
                      Save
                    </button>
                  </Col>
                </Row>
              </form>
            </Container>
          </>
        ) : (
          <></>
        )}
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
                              <p className="card-title">{data.shop_name}</p>
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
                <Col md={8}>
                  <Row>
                    <Col md={6}>
                      <p>Shop name: {userShop && userShop.shop_name}</p>
                    </Col>
                    <Col md={6}>
                      <p>Shop owner: {userShop && userShop.shop_owner}</p>
                    </Col>
                    <Col md={6}>
                      <p>Category: {userShop && userShop.category}</p>
                    </Col>
                    <Col md={6}>
                      <p>Sub-category: {userShop && userShop.sub_category}</p>
                    </Col>
                    <Col md={12} className="text-center">
                      <button className="btn btn-danger" onClick={editProfile}>
                        Edit profile
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <></>
        )}
        {editShow ? (
          <>
            <Container>
              <Row className="d-flex justify-content-center">
                <Col md={6}>
                  <label>Shop image</label> <br />
                  <input
                    onChange={handleFileDrop}
                    type="file"
                    placeholder="Enter your image"
                  />
                </Col>
                <Col md={6}>
                  <label>Category select</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="category"
                    onChange={(event) => selectCat(event.target.value)}
                  >
                    <option defaultValue>{shopCategory}</option>
                    {category.map((item, i) => (
                      <option
                        key={`category_name` + i}
                        value={item.category_name}
                      >
                        {item.category_name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={6}>
                  <label>Sub-category select</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="sub_category"
                    onChange={(event) => setShopSubCategory(event.target.value)}
                  >
                    <option defaultValue>{shopSubCategory}</option>
                    {subCategory &&
                      subCategory.map((item, i) => (
                        <option
                          key={`subcategory` + i}
                          value={item.sub_category_name}
                        >
                          {item.sub_category_name}
                        </option>
                      ))}
                  </select>
                </Col>
                <Col md={6}>
                  <label>Shop owner</label>
                  <input
                    type="text"
                    name="shop_owner"
                    className="form-control"
                    placeholder="Shop owner"
                    value={shopOwner}
                    onChange={(e) => setShopOwner(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <label>Shop name</label>
                  <input
                    type="text"
                    name="shop_name"
                    className="form-control"
                    placeholder="Shop name"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <label>E-mail address</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="E-mail"
                    value={shopEmail}
                    onChange={(e) => setShopEmail(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <label>Ward no</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="ward"
                  >
                    <option defaultValue>Open this select menu</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                </Col>
                <Col md={6}>
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <label>Service</label>
                  <input
                    type="text"
                    name="service"
                    className="form-control"
                    placeholder="Service"
                    value={shopService}
                    onChange={(e) => setShopService(e.target.value)}
                  />
                </Col>
                <Col md={12} className="text-center mt-3">
                  <button
                    onClick={() => updateShop()}
                    type="submit"
                    className="btn btn-info"
                  >
                    Save
                  </button>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <></>
        )}
      </section>

      {/* create post modal */}
      <Modal show={show} size="lg" onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <form ref={form} onSubmit={handleSubmit(onSubmitPost)}>
            <Row className="d-flex justify-content-center">
            <Col md={6}>
              <label>Shop image</label> <br />
              <input
                type="file"
                name="shop_image"
                placeholder="Enter your image"
                required
              />
            </Col>
            <Col md={6}>
              <label>Category select</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="category"
                onChange={(event) => selectCat(event.target.value)}
              >
                <option defaultValue>Open this select menu</option>
                {category.map((item, i) => (
                  <option
                    key={`category_name` + i}
                    value={item.category_name}
                  >
                    {item.category_name}
                  </option>
                ))}
              </select>
            </Col>
            <Col md={6}>
              <label>Sub-category select</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="sub_category"
                onChange={(e)=>setShopTagCategory(e.target.value)}
              >
                <option defaultValue>Open this select menu</option>
                {subCategory &&
                  subCategory.map((item, i) => (
                    <option
                      key={`subcategory` + i}
                      value={item.sub_category_name}
                    >
                      {item.sub_category_name}
                    </option>
                  ))}
              </select>
            </Col>
            <Col md={6}>
              <label>Filter tags</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="tags"
              >
                <option defaultValue>Open this select menu</option>
              
              {shopTagsCategory &&
                  shopTagsCategory.map((item, i) => 
                    <option
                      key={`shopTagsCategory` + i}
                      value={item}
                    >
                      {item}
                    </option>
                  )}
              
              </select>
            </Col>
            <Col md={6}>
              <label>Shop owner</label>
              <input
                type="text"
                name="shop_owner"
                className="form-control"
                placeholder="Shop owner"
                required
              />
            </Col>
            <Col md={6}>
              <label>Shop name</label>
              <input
                type="text"
                name="shop_name"
                className="form-control"
                placeholder="Shop name"
                required
              />
            </Col>
            <Col md={6}>
              <label>E-mail address</label>
              <input
                type="text"
                name="email"
                className="form-control"
                placeholder="E-mail"
                required
              />
            </Col>
            
            <Col md={6}>
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Address"
                required
              />
            </Col>
            <Col md={6}>
              <label>Service</label>
              <input
                type="text"
                name="service"
                className="form-control"
                placeholder="Service"
                required
              />
            </Col>
            <Col md={12} className="text-center mt-3">
              <button type="submit" className="btn btn-info">
                Save
              </button>
            </Col>
          </Row>
            </form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
