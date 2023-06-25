import React, { useEffect, useState } from "react";
import "./Shop.css";
import Sidebar from "../Sidebar/Sidebar";
import Banner from "../Banner/Banner";
import { Col, Container, Row } from "react-bootstrap";
import {
  categoryList,
  pendingShopList,
  shopCreate,
  subCategoryList,
  userInfo,
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
  console.log('ward',ward);
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
      if (data.message) {
        console.log("no shop");
      } else {
        setUserShop(data);
      }
    });
  }, []);
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
          <Row>
            {userShop &&
              userShop.map((data) => (
                <Col md={6} className="shopBox">
                  <h6>Shop Information</h6>
                  <p>Mobile: {data.mobile}</p>
                  <p>Shop owner: {data.shop_owner}</p>
                  <p>Shop name: {data.shop_name}</p>
                  <p>Category: {data.category}</p>
                  <p>Sub category: {data.sub_category}</p>
                  <p>Service: {data.service}</p>
                </Col>
              ))}
          </Row>
          <Row>
            <Col md={6}>
              <label>Category select</label>
              <select
                className="form-select"
                aria-label="Default select example"
              >
                <option defaultValue>Open this select menu</option>
                {category.map((item, i) => (
                  <option
                    onClick={() => selectCat(item.categoryName)}
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
                onClick={createShopFunction}
              >
                Save
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Shop;
