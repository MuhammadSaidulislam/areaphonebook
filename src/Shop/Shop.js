import React, { useEffect, useState } from "react";
import "./Shop.css";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import {
  categoryList,
  pendingShopList,
  shopCreate,
  subCategoryList,
  userInfo,
  userPost,
} from "../api/auth";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const Shop = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const savedUserProfile = localStorage.getItem("areaphonebook");
  const userProfile = JSON.parse(savedUserProfile);
  const [userShop, setUserShop] = useState([]);

  useEffect(() => {
    categoryList().then((data) => {
      setCategory(data.data);
    });
  }, []);
  const [subCategory, setSubCategory] = useState([]);
  console.log("subCategory", subCategory);
  const selectCat = (category) => {
    console.log("category", category);
    setSelectCategory(category);
    subCategoryList(category).then((data) => {
      setSubCategory(data);
    });
  };
  // shop
  const [sub_category, setSub_category] = useState("");
  const [shop_owner, setShop_owner] = useState("");
  const [shop_name, setShop_name] = useState("");
  const [email, setEmail] = useState("");
  const [ward, setWard] = useState("");
  console.log("ward", ward);
  const [address, setAddress] = useState("");
  const [service, setService] = useState("");
  const handleSubCategoryChange = (e) => {
    setSub_category(e.target.value);
  };
  const handleShopOwner = (e) => {
    setShop_owner(e.target.value);
  };
  const handleShopName = (e) => {
    setShop_name(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleWard = (e) => {
    setWard(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleService = (e) => {
    setService(e.target.value);
  };
  const generateRandomNumber = () => {
    const min = 1000000; // Minimum 7-digit number (inclusive)
    const max = 9999999; // Maximum 7-digit number (inclusive)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
  };
  const uuid = uuidv4();
  const createShopFunction = () => {
    const shop = {
      shop_id: uuid,
      post_id: "",
      mobile: userProfile.mobile,
      shop_owner,
      shop_name,
      category: selectCategory,
      sub_category,
      email,
      ward,
      address,
      service,
    };
    pendingShopList(shop).then((data) => {
      if (data.message) {
        return navigate("/");
      }
    });
  };
  // profile info
  useEffect(() => {
    userInfo(userProfile.mobile).then((data) => {
      console.log('profile',data);
      if (data.message) {
        console.log("no shop");
      } else {
        setUserShop(data);
      }
    });
  }, []);

  // post create
  const postId = uuidv4();
  const createPostFunction = () => {
    const shop = {
      shop_id: uuid,
      post_id: postId,
      mobile: userProfile.mobile,
      shop_owner,
      shop_name,
      category: selectCategory,
      sub_category,
      email,
      ward,
      address,
      service,
    };
    pendingShopList(shop).then((data) => {
      console.log('pending',data);
      if (data.message) {
        return navigate("/");
      }
    });
  };
  // post api
  const [post,setPost]=useState([])
  useEffect(()=>{
    userPost(userProfile.mobile).then((data) => {
      console.log('post',data);
      if (data.length === 0) {
        console.log("no post");
      } else {
        setPost(data);
      }
    });
  },[])

  return (
    <>
      <Sidebar />
      <Banner />
      <div className="shopInformation">
        <Container>
          <Row>
            <Col md={12}>
              <h1 className="text-center">Shop information</h1>
            </Col>
          </Row>
          <Row className="">
            <Col md={5} className="shopBox">
              {userShop &&
                userShop.map((data) => (
                  <>
                    <h2>Shop Information</h2>
                    <p>Mobile: {data.mobile}</p>
                    <p>Shop owner: {data.shop_owner}</p>
                    <p>Shop name: {data.shop_name}</p>
                    <p>Category: {data.category}</p>
                    <p>Sub category: {data.sub_category}</p>
                    <p>Service: {data.service}</p>
                    <button className="btn btn-info">Edit</button>
                  </>
                ))}
            </Col>
            <Col md={7}>
              <div className="postList">
                <Tabs
                  defaultActiveKey="profile"
                  id="fill-tab-example"
                  className="mb-3"
                  fill
                >
             {/* post list */}
                  <Tab eventKey="home" title="Post list">
                    <Row>
                    {post && post.map((data)=> <Col md={6}>
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src="{value.photo}"
                            className="img-fluid rounded-start"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body subcategory">
                            <p className="card-title">{data.shop_name}</p>
                            <p className="card-text">
                              মোবাইল: {data.mobile}
                            </p>
                            <p className="card-text">
                              মালিক: {data.shop_owner}
                            </p>
                            <p className="card-text">
                              স্থান: {data.address}
                            </p>
                            <p className="card-text">
                              বিস্তারিত: {data.service}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>)}
                     
                    </Row>
                  </Tab>
                {/* write post */}
                  <Tab eventKey="profile" title="Write post">
                    <Row>
                      <Col md={6}>
                        <label>Category select</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(event) => selectCat(event.target.value)}
                        >
                          <option defaultValue>Open this select menu</option>
                          {category.map((item, i) => (
                            <option
                              onChange={() => selectCat(item.categoryName)}
                              key={`categoryName` + i}
                              value={item.categoryName}
                            >
                              {item.categoryName}
                            </option>
                          ))}
                        </select>
                      </Col>
                      <Col md={6}>
                        <label>Sub-category select</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={handleSubCategoryChange}
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
                        <label>Shop owner</label>
                        <input
                          type="text"
                          onChange={handleShopOwner}
                          className="form-control"
                          placeholder="Shop owner"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <label>Shop name</label>
                        <input
                          type="text"
                          onChange={handleShopName}
                          className="form-control"
                          placeholder="Shop name"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <label>E-mail address</label>
                        <input
                          type="text"
                          onChange={handleEmail}
                          className="form-control"
                          placeholder="E-mail"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <label>Ward no</label>
                        <label>Sub-category select</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={handleWard}
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
                          onChange={handleAddress}
                          className="form-control"
                          placeholder="Address"
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <label>Service</label>
                        <input
                          type="text"
                          onChange={handleService}
                          className="form-control"
                          placeholder="Service"
                          required
                        />
                      </Col>
                      <Col md={12} className="text-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-info"
                          onClick={createPostFunction}
                        >
                          Save
                        </button>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>

          {userShop.length ? (
            <></>
          ) : (
            <>
              <Row>
                <Col md={6}>
                  <label>Category select</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => selectCat(event.target.value)}
                  >
                    <option defaultValue>Open this select menu</option>
                    {category.map((item, i) => (
                      <option
                        onChange={() => selectCat(item.categoryName)}
                        key={`categoryName` + i}
                        value={item.categoryName}
                      >
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={6}>
                  <label>Sub-category select</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSubCategoryChange}
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
                  <label>Shop owner</label>
                  <input
                    type="text"
                    onChange={handleShopOwner}
                    className="form-control"
                    placeholder="Shop owner"
                    required
                  />
                </Col>
                <Col md={6}>
                  <label>Shop name</label>
                  <input
                    type="text"
                    onChange={handleShopName}
                    className="form-control"
                    placeholder="Shop name"
                    required
                  />
                </Col>
                <Col md={6}>
                  <label>E-mail address</label>
                  <input
                    type="text"
                    onChange={handleEmail}
                    className="form-control"
                    placeholder="E-mail"
                    required
                  />
                </Col>
                <Col md={6}>
                  <label>Ward no</label>
                  <label>Sub-category select</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleWard}
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
                    onChange={handleAddress}
                    className="form-control"
                    placeholder="Address"
                    required
                  />
                </Col>
                <Col md={6}>
                  <label>Service</label>
                  <input
                    type="text"
                    onChange={handleService}
                    className="form-control"
                    placeholder="Service"
                    required
                  />
                </Col>
                <Col md={12} className="text-center mt-3">
                  <button
                    type="submit"
                    className="btn btn-info"
                    onClick={()=>createShopFunction()}
                  >
                    Save
                  </button>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default Shop;
